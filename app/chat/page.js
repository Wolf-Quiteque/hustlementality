"use client";

import { useState, useEffect } from "react";
import AppNav from "../components/AppNav";

const conversations = [
  { name: "Tyler Brooks", img: "photo-1519085360753-af0119f7cbe7", unread: 2, last: "Can't wait for the deck party!", time: "2m", isBuddy: true },
  { name: "Olivia Thompson", img: "photo-1531746020798-e6953c6e8e04", unread: 1, last: "Hey! So excited 🚢", time: "1h", isBuddy: false },
  { name: "Jasmine Chen", img: "photo-1573497019940-1c28c88b4f3e", unread: 0, last: "Sunrise yoga?", time: "3h", isBuddy: false },
  { name: "Darius Mitchell", img: "photo-1560250097-0b93528c311a", unread: 0, last: "Let's link up on the ship!", time: "5h", isBuddy: false },
];

const initialMessages = [
  { from: "them", text: "Hey Marcus! Super excited we're cabin buddies for the cruise! 🚢", time: "10:30 AM" },
  { from: "me", text: "Yooo Tyler! Same here man, this is gonna be legendary!", time: "10:32 AM" },
  { from: "them", text: "For real! I've been looking at the itinerary. Day 6 in Cozumel looks insane — snorkeling and zip-lining", time: "10:33 AM" },
  { from: "me", text: "100%. I'm def doing the snorkeling. You down for the deck party on Day 2?", time: "10:35 AM" },
  { from: "them", text: "Bro obviously 😂 I heard they got a DJ from Miami spinning. It's about to be a movie", time: "10:36 AM" },
  { from: "me", text: "Facts. What about the welcome mixer on Day 1? Good way to meet the whole crew", time: "10:38 AM" },
  { from: "them", text: "I'm there. Also thinking about the fitness challenge on Day 7. You work out?", time: "10:40 AM" },
  { from: "me", text: "Every day bro 💪 Let's hit the ship gym together", time: "10:41 AM" },
  { from: "them", text: "Say less! Can't wait for the deck party! This cruise is gonna be one for the books", time: "10:42 AM" },
];

export default function ChatPage() {
  const [activeConvo, setActiveConvo] = useState(0);
  const [messages, setMessages] = useState(initialMessages);
  const [newMsg, setNewMsg] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setMessages((prev) => [...prev, { from: "me", text: newMsg, time: "Now" }]);
    setNewMsg("");
  };

  const selectConvo = (i) => {
    setActiveConvo(i);
    if (isMobile) setShowSidebar(false);
  };

  return (
    <>
      <AppNav />

      <section className="hm-chat-section" style={{ background: "#f5f7fa", height: "100vh", overflow: "hidden" }}>
        <div className="hm-chat-container">
          {/* Sidebar */}
          <div className={`hm-chat-sidebar ${isMobile && !showSidebar ? "hm-chat-sidebar-hidden" : ""}`}>
            <div className="hm-chat-sidebar-header">
              <h4>Messages</h4>
              <span style={{ fontSize: "14px", color: "var(--theme-color3)" }}>
                {conversations.reduce((a, c) => a + c.unread, 0)} new
              </span>
            </div>
            {conversations.map((convo, i) => (
              <div
                key={i}
                className={`hm-chat-convo ${i === activeConvo ? "active" : ""}`}
                onClick={() => selectConvo(i)}
              >
                <div className="hm-chat-convo-img-wrap">
                  <img
                    src={`https://images.unsplash.com/${convo.img}?w=100&q=80`}
                    alt={convo.name}
                  />
                  {convo.isBuddy && <div className="hm-chat-buddy-dot"></div>}
                </div>
                <div className="hm-chat-convo-info">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600, fontSize: "15px" }}>{convo.name}</span>
                    <span style={{ fontSize: "12px", color: "var(--text-color)" }}>{convo.time}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", color: "var(--text-color)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>
                      {convo.last}
                    </span>
                    {convo.unread > 0 && <span className="hm-chat-unread">{convo.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat area */}
          <div className="hm-chat-main">
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
                  src={`https://images.unsplash.com/${conversations[activeConvo].img}?w=80&q=80`}
                  alt=""
                  style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <h5 style={{ margin: 0, fontSize: "15px", fontWeight: 600 }}>
                    {conversations[activeConvo].name}
                  </h5>
                  <span style={{ fontSize: "12px", color: "var(--theme-color3)" }}>
                    {conversations[activeConvo].isBuddy ? "Cabin Buddy" : "Matched"}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button className="hm-chat-icon-btn"><i className="fa-solid fa-phone"></i></button>
                <button className="hm-chat-icon-btn"><i className="fa-solid fa-video"></i></button>
              </div>
            </div>

            <div className="hm-chat-messages">
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <span style={{ background: "rgba(0,0,0,0.06)", padding: "4px 16px", borderRadius: "20px", fontSize: "13px", color: "var(--text-color)" }}>
                  Today
                </span>
              </div>
              {messages.map((msg, i) => (
                <div key={i} className={`hm-chat-msg ${msg.from === "me" ? "hm-chat-msg-me" : "hm-chat-msg-them"}`}>
                  <div className="hm-chat-bubble">
                    {msg.text}
                    <span className="hm-chat-time">{msg.time}</span>
                  </div>
                </div>
              ))}
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
              />
              <button type="button" className="hm-chat-icon-btn">
                <i className="fa-solid fa-paperclip"></i>
              </button>
              <button type="submit" className="hm-chat-send-btn">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
