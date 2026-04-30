"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AppNav from "../components/AppNav";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import api from "../lib/client-api";

const DEFAULT_AVATAR = "/images/default-avatar.png";
const POLL_INTERVAL_MS = 8000;
const SIDEBAR_REFRESH_EVERY_N_TICKS = 4; // ~32s
const NEAR_BOTTOM_PX = 100;
const NEAR_TOP_PX = 100;
const PAGE_SIZE = 50;

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
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [hasMoreOlder, setHasMoreOlder] = useState(true);
  const [sendError, setSendError] = useState("");

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const pollRef = useRef(null);
  const lastMessageIdRef = useRef(null);
  const oldestMessageIdRef = useRef(null);
  const wasAtBottomRef = useRef(true);
  const justSentRef = useRef(false);
  const sendErrorTimeoutRef = useRef(null);
  const pollTickRef = useRef(0);

  const isNearBottom = () => {
    const el = messagesContainerRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_BOTTOM_PX;
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Initial load of conversations sidebar
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

  // Load message history when active conversation changes
  const loadMessages = useCallback(async (convoId) => {
    if (!convoId) return;
    setLoadingMsgs(true);
    setHasMoreOlder(true);
    try {
      const data = await api.get(`/chat/conversations/${convoId}/messages`);
      const list = Array.isArray(data) ? data : [];
      setMessages(list);
      lastMessageIdRef.current = list.length ? list[list.length - 1].id : null;
      oldestMessageIdRef.current = list.length ? list[0].id : null;
      if (list.length < PAGE_SIZE) setHasMoreOlder(false);
      justSentRef.current = true;
      api.post(`/chat/conversations/${convoId}/read`).catch(() => {});
      setConversations((prev) =>
        prev.map((c) =>
          (c.conversationId || c.id) === convoId ? { ...c, unreadCount: 0 } : c
        )
      );
    } catch {
      setMessages([]);
      lastMessageIdRef.current = null;
      oldestMessageIdRef.current = null;
    } finally {
      setLoadingMsgs(false);
    }
  }, []);

  useEffect(() => {
    if (activeConvoId) loadMessages(activeConvoId);
  }, [activeConvoId, loadMessages]);

  // Incremental polling: only fetch messages newer than what we've seen.
  // Pauses when the tab is hidden, resumes (with an immediate catch-up fetch) on return.
  useEffect(() => {
    if (!activeConvoId) return;

    const fetchIncremental = async () => {
      try {
        const lastId = lastMessageIdRef.current;
        const url = lastId
          ? `/chat/conversations/${activeConvoId}/messages?after=${lastId}`
          : `/chat/conversations/${activeConvoId}/messages`;
        const data = await api.get(url);
        const newMsgs = Array.isArray(data) ? data : [];

        if (newMsgs.length > 0) {
          wasAtBottomRef.current = isNearBottom();
          setMessages((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            return [...prev, ...newMsgs.filter((m) => !existingIds.has(m.id))];
          });
          lastMessageIdRef.current = newMsgs[newMsgs.length - 1].id;
          api.post(`/chat/conversations/${activeConvoId}/read`).catch(() => {});
        }

        // Refresh sidebar every Nth tick so unread counts and last-messages
        // from OTHER conversations update without flooding the network
        pollTickRef.current = (pollTickRef.current + 1) % SIDEBAR_REFRESH_EVERY_N_TICKS;
        if (pollTickRef.current === 0) {
          api.get("/chat/conversations").then((convos) => {
            if (Array.isArray(convos)) setConversations(convos);
          }).catch(() => {});
        }
      } catch {}
    };

    const startPolling = () => {
      if (pollRef.current) return;
      pollRef.current = setInterval(fetchIncremental, POLL_INTERVAL_MS);
    };

    const stopPolling = () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        fetchIncremental();
        startPolling();
      }
    };

    if (typeof document === "undefined" || !document.hidden) startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeConvoId]);

  // Smart scroll: only auto-scroll if user was already near the bottom or just sent a message.
  // Prevents poll updates from yanking the user away while reading older history.
  useEffect(() => {
    if (justSentRef.current || wasAtBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({
        behavior: justSentRef.current ? "auto" : "smooth",
      });
      justSentRef.current = false;
    }
  }, [messages]);

  // Load older messages when scrolled near the top, preserving scroll position.
  const loadOlder = useCallback(async () => {
    if (loadingOlder || !hasMoreOlder || !activeConvoId || !oldestMessageIdRef.current) return;
    setLoadingOlder(true);
    const container = messagesContainerRef.current;
    const prevScrollHeight = container?.scrollHeight ?? 0;
    const prevScrollTop = container?.scrollTop ?? 0;
    try {
      const data = await api.get(
        `/chat/conversations/${activeConvoId}/messages?before=${oldestMessageIdRef.current}&limit=${PAGE_SIZE}`
      );
      const olderMsgs = Array.isArray(data) ? data : [];
      if (olderMsgs.length === 0) {
        setHasMoreOlder(false);
      } else {
        setMessages((prev) => [...olderMsgs, ...prev]);
        oldestMessageIdRef.current = olderMsgs[0].id;
        if (olderMsgs.length < PAGE_SIZE) setHasMoreOlder(false);
        // Restore relative scroll position so the user keeps reading the same message
        requestAnimationFrame(() => {
          if (container) {
            container.scrollTop =
              container.scrollHeight - prevScrollHeight + prevScrollTop;
          }
        });
      }
    } catch {} finally {
      setLoadingOlder(false);
    }
  }, [activeConvoId, loadingOlder, hasMoreOlder]);

  const handleScroll = (e) => {
    if (e.currentTarget.scrollTop < NEAR_TOP_PX) {
      loadOlder();
    }
  };

  const handleSend = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!newMsg.trim() || !activeConvoId || sending) return;
    const text = newMsg.trim();
    setNewMsg("");
    setSending(true);
    setSendError("");
    if (sendErrorTimeoutRef.current) {
      clearTimeout(sendErrorTimeoutRef.current);
      sendErrorTimeoutRef.current = null;
    }

    const tempMsg = {
      id: `temp-${Date.now()}`,
      senderId: user?.id,
      content: text,
      createdAt: new Date().toISOString(),
      _sending: true,
    };
    justSentRef.current = true;
    setMessages((prev) => [...prev, tempMsg]);

    try {
      const sent = await api.post(
        `/chat/conversations/${activeConvoId}/messages`,
        { content: text }
      );
      setMessages((prev) =>
        prev.map((m) => (m.id === tempMsg.id ? { ...sent, _sending: false } : m))
      );
      // Advance the polling cursor so we don't re-fetch our own message
      if (sent?.id) lastMessageIdRef.current = sent.id;
      setConversations((prev) =>
        prev.map((c) =>
          (c.conversationId || c.id) === activeConvoId
            ? { ...c, lastMessage: text, lastMessageAt: new Date().toISOString() }
            : c
        )
      );
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== tempMsg.id));
      setNewMsg(text);
      setSendError(err?.message || "Could not send message");
      sendErrorTimeoutRef.current = setTimeout(() => setSendError(""), 3000);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  // Cleanup error timeout on unmount
  useEffect(() => {
    return () => {
      if (sendErrorTimeoutRef.current) clearTimeout(sendErrorTimeoutRef.current);
    };
  }, []);

  const selectConvo = (convoId) => {
    setActiveConvoId(convoId);
    if (isMobile) setShowSidebar(false);
  };

  const activeConvo = conversations.find(
    (c) => (c.conversationId || c.id) === activeConvoId
  );

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

              <div
                className="hm-chat-messages"
                ref={messagesContainerRef}
                onScroll={handleScroll}
              >
                {loadingOlder && (
                  <div style={{ textAlign: "center", padding: "10px", color: "var(--text-color)" }}>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span style={{ fontSize: "12px", marginLeft: "8px" }}>Loading older messages…</span>
                  </div>
                )}
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

              {sendError && (
                <div style={{
                  background: "rgba(220,53,69,0.1)",
                  color: "#dc3545",
                  padding: "8px 16px",
                  fontSize: "13px",
                  borderTop: "1px solid rgba(220,53,69,0.2)",
                }}>
                  <i className="fa-solid fa-circle-exclamation" style={{ marginRight: "6px" }}></i>
                  Failed to send: {sendError}
                </div>
              )}

              <form className="hm-chat-input" onSubmit={handleSend}>
                <button type="button" className="hm-chat-icon-btn">
                  <i className="fa-solid fa-face-smile"></i>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyDown={handleKeyDown}
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
