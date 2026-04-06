"use client";

import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "fa-solid fa-chart-line", description: "Overview & stats" },
  { href: "/admin/content", label: "Content", icon: "fa-solid fa-file-pen", description: "Edit site text & media" },
  { href: "/admin/cruises", label: "Cruises", icon: "fa-solid fa-ship", description: "Manage trips" },
  { href: "/admin/gallery", label: "Gallery", icon: "fa-solid fa-images", description: "Photos & media" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="hm-admin-sidebar">
      {/* Brand */}
      <div className="hm-admin-logo">
        <a href="/admin" className="hm-admin-logo-link">
          <div className="hm-admin-logo-icon">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <div className="hm-admin-logo-text">
            <span className="hm-admin-logo-name">Hustle</span>
            <span className="hm-admin-badge">Admin</span>
          </div>
        </a>
      </div>

      {/* Section label */}
      <div className="hm-admin-nav-section">Menu</div>

      {/* Nav items */}
      <nav className="hm-admin-nav">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              className={`hm-admin-nav-item ${isActive ? "active" : ""}`}
            >
              <div className="hm-admin-nav-icon">
                <i className={item.icon}></i>
              </div>
              <div className="hm-admin-nav-label">
                <span>{item.label}</span>
                <small>{item.description}</small>
              </div>
              {isActive && <div className="hm-admin-nav-indicator"></div>}
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="hm-admin-nav-footer">
        <div className="hm-admin-nav-section">Quick Links</div>
        <a href="/" className="hm-admin-nav-item hm-admin-nav-item-subtle">
          <div className="hm-admin-nav-icon">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </div>
          <div className="hm-admin-nav-label">
            <span>View Site</span>
          </div>
        </a>
        <div className="hm-admin-sidebar-user">
          <div className="hm-admin-sidebar-avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="hm-admin-sidebar-user-info">
            <span>Administrator</span>
            <small>admin@hustle.com</small>
          </div>
        </div>
      </div>
    </aside>
  );
}
