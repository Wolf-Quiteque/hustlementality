"use client";

import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Home", icon: "fa-solid fa-house" },
  { href: "/browse", label: "Browse", icon: "fa-solid fa-users" },
  { href: "/matches", label: "Matches", icon: "fa-solid fa-heart" },
  { href: "/chat", label: "Chat", icon: "fa-solid fa-comments" },
  { href: "/my-trip", label: "Trip", icon: "fa-solid fa-ship" },
];

export default function AppNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top header bar — logo + actions */}
      <div className="hm-app-mobile-header">
        <a href="/dashboard">
          <img src="/images/newlogo.png" alt="HM" className="hm-mobile-logo" />
        </a>
        <div className="hm-app-mobile-header-actions">
          <div className="hm-app-nav-notif">
            <i className="fa-solid fa-bell"></i>
            <span className="hm-notif-badge">3</span>
          </div>
          <a href="/dashboard" className="hm-app-nav-avatar">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
              alt="Profile"
            />
          </a>
        </div>
      </div>

      {/* Desktop top nav / Mobile bottom tab bar */}
      <div className="hm-app-nav">
        <div className="hm-app-nav-inner">
          <a href="/dashboard" className="hm-app-nav-brand">
            <img src="/images/newlogo.png" alt="HM" className="hm-app-nav-logo" />
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
              <span className="hm-notif-badge">3</span>
            </div>
            <a href="/dashboard" className="hm-app-nav-avatar">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                alt="Profile"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
