"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AppNav from "../components/AppNav";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import api from "../lib/client-api";

const DEFAULT_AVATAR = "/images/default-avatar.png";

function ChatContent() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConvoId, setActiveConvoId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [loadingConvos, setLoadingConvos] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [sending, setSending] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  const pollRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Load conversations
  useEffect(() => {
    api.get("/chat/conversations")
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setConversations(list);
        if (list.length > 0 && !activeConvoId) {
          setActiveConvoId(list[0].conversationId || list[0].id);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingConvos(false));
  }, []);

  // Load messages when active conversation changes
  const loadMessages = useCallback(async (convoId) => {
    if (!convoId) return;
    setLoadingMsgs(true);
    try {
      const data = await api.get(`/chat/conversations/${convoId}/messages`);
      setMessages(Array.isArray(data) ? data : []);
      // Mark as read
      api.post(`/chat/conversations/${convoId}/read`).catch(() => {});
      // Update unread count in sidebar
      setConversations((prev) =>
        prev.map((c) =>
          (c.conversationId || c.id) === convoId ? { ...c, unreadCount: 0 } : c
        )
      );
    } catch {
      setMessages([]);
    } finally {
      setLoadingMsgs(false);
    }
  }, []);

  useEffect(() => {
    if (activeConvoId) loadMessages(activeConvoId);
  }, [activeConvoId, loadMessages]);

  // Poll for new messages every 8 seconds
  useEffect(() => {
    if (!activeConvoId) return;
    pollRef.current = setInterval(async () => {
      try {
        const data = await api.get(`/chat/conversations/${activeConvoId}/messages`);
        if (Array.isArray(data)) setMessages(data);
        // Also refresh conversations for unread counts
        const convos = await api.get("/chat/conversations");
        if (Array.isArray(convos)) setConversations(convos);
      } catch {}
    }, 8000);
    return () => clearInterval(pollRef.current);
  }, [activeConvoId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !activeConvoId || sending) return;
    const text = newMsg.trim();
    setNewMsg("");
    setSending(true);

    // Optimistic add
    const tempMsg = {
      id: `temp-${Date.now()}`,
      senderId: user?.id,
      content: text,
      createdAt: new Date().toISOString(),
      _sending: true,
    };
    setMessages((prev) => [...prev, tempMsg]);

    try {
      const sent = await api.post(`/chat/conversations/${activeConvoId}/messages`, { content: text });
      setMessages((prev) =>
        prev.map((m) => (m.id === tempMsg.id ? { ...sent, _sending: false } : m))
      );
      // Update last message in sidebar
      setConversations((prev) =>
        prev.map((c) =>
          (c.conversationId || c.id) === activeConvoId
            ? { ...c, lastMessage: text, lastMessageAt: new Date().toISOString() }
            : c
        )
      );
    } catch {
      // Remove optimistic message on failure
      setMessages((prev) => prev.filter((m) => m.id !== tempMsg.id));
      setNewMsg(text); // Restore the message
    } finally {
      setSending(false);
    }
  };

  const selectConvo = (convoId) => {
    setActiveConvoId(convoId);
    if (isMobile) setShowSidebar(false);
  };

  const activeConvo = conversations.find((c) => (c.conversationId || c.id) === activeConvoId);

  const getPartner = (convo) => {
    if (!convo) return null;
    if (convo.partner) return convo.partner;
    if (convo.userA && convo.userB) {
      return convo.userAId === user?.id ? convo.userB : convo.userA;
    }
    return null;
  };

  const partner = getPartner(activeConvo);

  const timeAgo = (dateStr) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Now";
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    return `${days}d`;
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, msg) => {
    const date = msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : "Today";
    if (!groups[date]) groups[date] = [];
    groups[date].push(msg);
    return groups;
  }, {});

  const totalUnread = conversations.reduce((a, c) => a + (c.unreadCount || 0), 0);

  if (loadingConvos) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
        <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "var(--theme-color3)" }}></i>
      </div>
    );
  }

  return (
    <section className="hm-chat-section" style={{ background: "var(--hm-app-page-bg, #f5f7fa)", height: "100vh", overflow: "hidden" }}>
      <div className="hm-chat-container">
        {/* Sidebar */}
        <div className={`hm-chat-sidebar ${isMobile && !showSidebar ? "hm-chat-sidebar-hidden" : ""}`}>
          <div className="hm-chat-sidebar-header">
            <h4>Messages</h4>
            <span style={{ fontSize: "14px", color: "var(--theme-color3)" }}>
              {totalUnread > 0 ? `${totalUnread} new` : ""}
            </span>
          </div>
          {conversations.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-color)" }}>
              <i className="fa-solid fa-comments fa-3x" style={{ color: "#ccc", marginBottom: "15px" }}></i>
              <p>No conversations yet</p>
              <p style={{ fontSize: "13px" }}>Match with travelers to start chatting!</p>
            </div>
          ) : (
            conversations.map((convo) => {
              const convoId = convo.conversationId || convo.id;
              const convoPartner = getPartner(convo);
              return (
                <div
                  key={convoId}
                  className={`hm-chat-convo ${convoId === activeConvoId ? "active" : ""}`}
                  onClick={() => selectConvo(convoId)}
                >
                  <div className="hm-chat-convo-img-wrap">
                    <img
                      src={convoPartner?.profile?.avatarUrl || convoPartner?.avatarUrl || DEFAULT_AVATAR}
                      alt={convoPartner?.firstName || "User"}
                      onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                    />
                    {convo.matchStatus === "cabin_buddy" && <div className="hm-chat-buddy-dot"></div>}
                  </div>
                  <div className="hm-chat-convo-info">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 600, fontSize: "15px" }}>
                        {convoPartner?.firstName || "User"} {convoPartner?.lastName || ""}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--text-color)" }}>
                        {timeAgo(convo.lastMessageAt)}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "13px", color: "var(--text-color)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>
                        {convo.lastMessage || "Start a conversation!"}
                      </span>
                      {(convo.unreadCount || 0) > 0 && <span className="hm-chat-unread">{convo.unreadCount}</span>}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Chat area */}
        <div className="hm-chat-main">
          {activeConvo && partner ? (
            <>
              <div className="hm-chat-header">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    type="button"
                    className="hm-chat-back-btn"
                    onClick={() => setShowSidebar(true)}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <img
                    src={partner?.profile?.avatarUrl || partner?.avatarUrl || DEFAULT_AVATAR}
                    alt={partner?.firstName}
                    style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }}
                    onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                  />
                  <div>
                    <h5 style={{ margin: 0, fontSize: "15px", fontWeight: 600 }}>
                      {partner.firstName} {partner.lastName}
                    </h5>
                    <span style={{ fontSize: "12px", color: "var(--theme-color3)" }}>
                      {activeConvo.matchStatus === "cabin_buddy" ? "Cabin Buddy" : "Matched"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="hm-chat-messages">
                {loadingMsgs ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
                    <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "var(--theme-color3)" }}></i>
                  </div>
                ) : messages.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-color)" }}>
                    <i className="fa-solid fa-hand-wave fa-3x" style={{ color: "#ccc", marginBottom: "15px" }}></i>
                    <p>Say hello to {partner.firstName}!</p>
                  </div>
                ) : (
                  <>
                    {Object.entries(groupedMessages).map(([date, msgs]) => (
                      <div key={date}>
                        <div style={{ textAlign: "center", margin: "20px 0" }}>
                          <span style={{ background: "var(--hm-app-chip-bg, rgba(0,0,0,0.06))", padding: "4px 16px", borderRadius: "20px", fontSize: "13px", color: "var(--text-color)" }}>
                            {date === new Date().toLocaleDateString() ? "Today" : date}
                          </span>
                        </div>
                        {msgs.map((msg) => (
                          <div key={msg.id} className={`hm-chat-msg ${msg.senderId === user?.id ? "hm-chat-msg-me" : "hm-chat-msg-them"}`}>
                            <div className="hm-chat-bubble" style={{ opacity: msg._sending ? 0.6 : 1 }}>
                              {msg.content}
                              <span className="hm-chat-time">{formatTime(msg.createdAt)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              <form className="hm-chat-input" onSubmit={handleSend}>
                <button type="button" className="hm-chat-icon-btn">
                  <i className="fa-solid fa-face-smile"></i>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  disabled={sending}
                />
                <button type="button" className="hm-chat-icon-btn">
                  <i className="fa-solid fa-paperclip"></i>
                </button>
                <button type="submit" className="hm-chat-send-btn" disabled={sending || !newMsg.trim()}>
                  <i className={sending ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-paper-plane"}></i>
                </button>
              </form>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-color)" }}>
              <div style={{ textAlign: "center" }}>
                <i className="fa-solid fa-comments fa-4x" style={{ color: "#ccc", marginBottom: "20px" }}></i>
                <h3>Select a Conversation</h3>
                <p>Choose a match to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <AppNav />
      <ChatContent />
    </ProtectedRoute>
  );
}
