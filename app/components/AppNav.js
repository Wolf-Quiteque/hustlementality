"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import api from "../lib/client-api";

const navItems = [
  { href: "/dashboard", label: "Home", icon: "fa-solid fa-house" },
  { href: "/browse", label: "Browse", icon: "fa-solid fa-users" },
  { href: "/matches", label: "Matches", icon: "fa-solid fa-heart" },
  { href: "/chat", label: "Chat", icon: "fa-solid fa-comments" },
  { href: "/my-trip", label: "Trip", icon: "fa-solid fa-ship" },
];

const DEFAULT_AVATAR = "/images/default-avatar.png";
const DARK_THEME_LOGO = "/images/logo-darktheme.png";

export default function AppNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const avatarUrl = user?.profile?.avatarUrl || DEFAULT_AVATAR;
  const displayName = user ? `${user.firstName} ${user.lastName}` : "";

  useEffect(() => {
    api.get("/notifications/unread-count")
      .then((data) => setUnreadCount(data.count || 0))
      .catch(() => {});
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
  };

  return (
    <>
      {/* Mobile top header bar */}
      <div className="hm-app-mobile-header">
        <a href="/dashboard">
          <img src={DARK_THEME_LOGO} alt="HM" className="hm-mobile-logo" />
        </a>
        <div className="hm-app-mobile-header-actions">
          <div className="hm-app-nav-notif">
            <i className="fa-solid fa-bell"></i>
            {unreadCount > 0 && <span className="hm-notif-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>}
          </div>
          <div style={{ position: "relative" }} ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="hm-app-nav-avatar"
              style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}
            >
              <img
                src={avatarUrl}
                alt={displayName || "Profile"}
                onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
              />
            </button>
            {menuOpen && (
              <div style={{
                position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#fff",
                borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", minWidth: "180px",
                zIndex: 1000, overflow: "hidden",
              }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>{displayName}</div>
                  <div style={{ fontSize: "12px", color: "#888" }}>{user?.email}</div>
                </div>
                <a href="/dashboard" style={{ display: "block", padding: "10px 16px", fontSize: "14px", color: "#333", textDecoration: "none" }}
                  onClick={() => setMenuOpen(false)}>
                  <i className="fa-solid fa-gauge" style={{ width: "20px" }}></i> Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  style={{ display: "block", width: "100%", padding: "10px 16px", fontSize: "14px",
                    color: "#dc3545", border: "none", background: "none", textAlign: "left", cursor: "pointer",
                    borderTop: "1px solid #eee" }}
                >
                  <i className="fa-solid fa-right-from-bracket" style={{ width: "20px" }}></i> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop top nav / Mobile bottom tab bar */}
      <div className="hm-app-nav">
        <div className="hm-app-nav-inner">
          <a href="/dashboard" className="hm-app-nav-brand">
            <img src={DARK_THEME_LOGO} alt="HM" className="hm-app-nav-logo" />
          </a>
          <div className="hm-app-nav-links">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`hm-app-nav-link ${pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)) ? "active" : ""}`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
          <div className="hm-app-nav-user">
            <div className="hm-app-nav-notif">
              <i className="fa-solid fa-bell"></i>
              {unreadCount > 0 && <span className="hm-notif-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>}
            </div>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="hm-app-nav-avatar"
                style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}
              >
                <img
                  src={avatarUrl}
                  alt={displayName || "Profile"}
                  onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                />
              </button>
              {menuOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#fff",
                  borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", minWidth: "180px",
                  zIndex: 1000, overflow: "hidden",
                }}>
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>{displayName}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{user?.email}</div>
                  </div>
                  <a href="/dashboard" style={{ display: "block", padding: "10px 16px", fontSize: "14px", color: "#333", textDecoration: "none" }}
                    onClick={() => setMenuOpen(false)}>
                    <i className="fa-solid fa-gauge" style={{ width: "20px" }}></i> Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    style={{ display: "block", width: "100%", padding: "10px 16px", fontSize: "14px",
                      color: "#dc3545", border: "none", background: "none", textAlign: "left", cursor: "pointer",
                      borderTop: "1px solid #eee" }}
                  >
                    <i className="fa-solid fa-right-from-bracket" style={{ width: "20px" }}></i> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
