"use client";

import { useState, useEffect } from "react";
import AppNav from "../components/AppNav";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import api from "../lib/client-api";

const DEFAULT_AVATAR = "/images/default-avatar.png";

function MatchesContent() {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.get("/matching/matches"),
      api.get("/chat/conversations"),
    ]).then(([matchRes, convRes]) => {
      if (matchRes.status === "fulfilled") setMatches(Array.isArray(matchRes.value) ? matchRes.value : []);
      if (convRes.status === "fulfilled") setConversations(Array.isArray(convRes.value) ? convRes.value : []);
      setLoading(false);
    });
  }, []);

  // Merge conversation data with matches
  const enrichedMatches = matches.map((m) => {
    const partner = m.userAId === user?.id ? m.userB : m.userA;
    const conv = conversations.find((c) => c.matchId === m.id);
    return {
      id: m.id,
      partner,
      matchScore: m.matchScore,
      status: m.status,
      lastMsg: conv?.lastMessage || "",
      lastMsgAt: conv?.lastMessageAt,
      unread: conv?.unreadCount || 0,
      conversationId: conv?.conversationId,
    };
  });

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
        <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "var(--theme-color3)" }}></i>
      </div>
    );
  }

  const timeAgo = (dateStr) => {
    if (!dateStr) return "New match!";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <section className="section-padding" style={{ background: "var(--hm-app-page-bg, #f5f7fa)", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12">
            <div style={{ marginBottom: "30px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--headings-color)" }}>Your Matches</h2>
              <p style={{ color: "var(--text-color)" }}>
                {enrichedMatches.length > 0 ? `${enrichedMatches.length} travelers matched with you` : "No matches yet. Start browsing!"}
              </p>
            </div>

            {enrichedMatches.map((m) => (
              <div key={m.id} className="hm-match-card">
                <div className="hm-match-card-left">
                  <div className="hm-match-card-img-wrap">
                    <img
                      src={m.partner?.profile?.avatarUrl || DEFAULT_AVATAR}
                      alt={m.partner?.firstName}
                      className="hm-match-card-img"
                      onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                    />
                    {m.status === "cabin_buddy" && (
                      <div className="hm-match-cabin-badge"><i className="fa-solid fa-star"></i></div>
                    )}
                  </div>
                  <div className="hm-match-card-info">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
                        {m.partner?.firstName} {m.partner?.lastName}{m.partner?.profile?.age ? `, ${m.partner.profile.age}` : ""}
                      </h4>
                      {m.status === "cabin_buddy" && <span className="hm-badge-cabin">Cabin Buddy</span>}
                    </div>
                    <p style={{ margin: "3px 0 8px", fontSize: "14px", color: "var(--theme-color3)" }}>
                      {m.partner?.profile?.city && <><i className="fa-solid fa-location-dot"></i> {m.partner.profile.city} &bull; </>}
                      {m.matchScore}% match
                    </p>
                    {m.partner?.profile?.interests?.length > 0 && (
                      <div className="hm-buddy-tags" style={{ marginBottom: "8px" }}>
                        {m.partner.profile.interests.slice(0, 3).map((int) => (
                          <span key={int} className="hm-tag" style={{ fontSize: "12px", padding: "3px 10px" }}>{int}</span>
                        ))}
                      </div>
                    )}
                    {m.lastMsg ? (
                      <p style={{ margin: 0, fontSize: "14px", color: "var(--text-color)" }}>
                        <i className="fa-solid fa-comment" style={{ marginRight: "6px", opacity: 0.4 }}></i>
                        {m.lastMsg}
                        <span style={{ marginLeft: "8px", fontSize: "12px", opacity: 0.5 }}>{timeAgo(m.lastMsgAt)}</span>
                      </p>
                    ) : (
                      <p style={{ margin: 0, fontSize: "14px", color: "var(--theme-color1)", fontWeight: 500 }}>
                        <i className="fa-solid fa-sparkles" style={{ marginRight: "6px" }}></i>
                        New match!
                      </p>
                    )}
                  </div>
                </div>
                <div className="hm-match-card-actions">
                  <a href="/chat" className="hm-match-action-btn" title="Chat">
                    <i className="fa-solid fa-comment"></i>
                    {m.unread > 0 && <span className="hm-unread-dot">{m.unread}</span>}
                  </a>
                </div>
              </div>
            ))}

            {enrichedMatches.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <i className="fa-solid fa-heart fa-4x" style={{ color: "#ccc", marginBottom: "20px" }}></i>
                <h3>No Matches Yet</h3>
                <p style={{ color: "var(--text-color)" }}>Browse travelers and swipe to find your cabin buddy!</p>
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <a href="/browse" className="theme-btn-main">
                <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                <span className="theme-btn">Browse More Travelers</span>
                <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MatchesPage() {
  return (
    <ProtectedRoute>
      <AppNav />
      <MatchesContent />
    </ProtectedRoute>
  );
}
