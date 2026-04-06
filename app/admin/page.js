"use client";

import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

function StatCard({ label, value, icon, color }) {
  return (
    <div className="hm-admin-stat-card">
      <div className="stat-icon" style={{ background: color }}>
        <i className={icon}></i>
      </div>
      <div className="stat-info">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hm_token");
    fetch(`${API}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setStats(d.data))
      .catch(() => {
        // Use mock data when API not connected
        setStats({
          totalUsers: 0,
          totalBookings: 0,
          bookingsByStatus: [],
          totalRevenueCents: 0,
          registrationsLast30Days: [],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="hm-admin-loading">
        <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
      </div>
    );
  }

  const fmt = (cents) => `$${(cents / 100).toLocaleString()}`;
  const confirmed = stats.bookingsByStatus.find((b) => b.status === "confirmed")?.count || 0;

  return (
    <>
      <h1 className="hm-admin-heading">Dashboard</h1>

      <div className="hm-admin-stats-grid">
        <StatCard label="Total Users" value={stats.totalUsers} icon="fa-solid fa-users" color="#1B6B93" />
        <StatCard label="Total Bookings" value={stats.totalBookings} icon="fa-solid fa-ticket" color="#F2C744" />
        <StatCard label="Confirmed" value={confirmed} icon="fa-solid fa-circle-check" color="#28a745" />
        <StatCard label="Revenue" value={fmt(stats.totalRevenueCents)} icon="fa-solid fa-dollar-sign" color="#0B2545" />
      </div>

      {/* Registration Chart */}
      <div className="hm-admin-card" style={{ marginTop: 24 }}>
        <h3 className="hm-admin-card-title">Registrations (Last 30 Days)</h3>
        <div className="hm-admin-chart">
          {stats.registrationsLast30Days.length === 0 ? (
            <p className="hm-admin-empty">No registrations yet. Data will appear once users start signing up.</p>
          ) : (
            <div className="hm-admin-bar-chart">
              {stats.registrationsLast30Days.map((d) => (
                <div key={d.date} className="hm-admin-bar-col">
                  <div
                    className="hm-admin-bar"
                    style={{ height: `${Math.max(d.count * 10, 4)}px` }}
                    title={`${d.date}: ${d.count} users`}
                  ></div>
                  <span className="hm-admin-bar-label">
                    {new Date(d.date).getDate()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Breakdown */}
      <div className="hm-admin-card" style={{ marginTop: 24 }}>
        <h3 className="hm-admin-card-title">Bookings by Status</h3>
        {stats.bookingsByStatus.length === 0 ? (
          <p className="hm-admin-empty">No bookings yet.</p>
        ) : (
          <div className="hm-admin-table-wrap">
            <table className="hm-admin-table">
              <thead>
                <tr><th>Status</th><th>Count</th></tr>
              </thead>
              <tbody>
                {stats.bookingsByStatus.map((b) => (
                  <tr key={b.status}>
                    <td><span className={`hm-admin-status-badge ${b.status}`}>{b.status}</span></td>
                    <td>{b.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
