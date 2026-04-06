"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "./components/AdminNav";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // In dev mode, skip auth so admin panel is accessible for testing.
    // In production, require valid admin token.
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) {
      setAuthorized(true);
      return;
    }
    const token = localStorage.getItem("hm_token");
    const role = localStorage.getItem("hm_role");
    if (!token || role !== "admin") {
      router.replace("/login");
      return;
    }
    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return (
      <div className="hm-admin-loading">
        <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
      </div>
    );
  }

  return (
    <div className="hm-admin-layout">
      <AdminNav />
      <main className="hm-admin-main">
        <div className="hm-admin-topbar">
          <h2 className="hm-admin-page-title">Admin Panel</h2>
          <div className="hm-admin-user">
            <i className="fa-solid fa-user-shield"></i>
          </div>
        </div>
        <div className="hm-admin-content">{children}</div>
      </main>
    </div>
  );
}
