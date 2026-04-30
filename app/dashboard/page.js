"use client";

import { useState, useEffect } from "react";
import AppNav from "../components/AppNav";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import api from "../lib/client-api";

const DEFAULT_AVATAR = "/images/default-avatar.png";

const fallbackEvents = [
  { time: "May 14", title: "Welcome Mixer", icon: "fa-solid fa-champagne-glasses" },
  { time: "May 15", title: "Great Stirrup Cay", icon: "fa-solid fa-umbrella-beach" },
  { time: "May 16", title: "Nassau Excursion", icon: "fa-solid fa-location-dot" },
];

function DashboardContent() {
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [matches, setMatches] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.get("/bookings"),
      api.get("/matching/matches"),
      api.get("/cruises"),
    ]).then(([bookingsRes, matchesRes, cruisesRes]) => {
      if (bookingsRes.status === "fulfilled") {
        const bookings = Array.isArray(bookingsRes.value) ? bookingsRes.value : [];
        if (bookings.length > 0) setBooking(bookings[0]);
      }
      if (matchesRes.status === "fulfilled") {
        setMatches(Array.isArray(matchesRes.value) ? matchesRes.value : []);
      }
      if (cruisesRes.status === "fulfilled") {
        const cruises = Array.isArray(cruisesRes.value) ? cruisesRes.value : [];
        if (cruises.length > 0) {
          api.get(`/cruises/${cruises[0].id}/itinerary`)
            .then((data) => setItinerary(Array.isArray(data) ? data : []))
            .catch(() => {});
        }
      }
      setLoading(false);
    });
  }, []);

  const avatarUrl = user?.profile?.avatarUrl || DEFAULT_AVATAR;
  const firstName = user?.firstName || "Traveler";

  // Compute data from booking
  const hasBooking = !!booking;
  const pkgName = booking?.package?.name || "—";
  const totalCents = booking?.totalCents || 0;
  const paidCents = booking?.paidCents || 0;
  const paidPct = totalCents > 0 ? Math.round((paidCents / totalCents) * 100) : 0;

  // Cabin buddy from matches
  const cabinBuddy = matches.find((m) => m.status === "cabin_buddy");
  const buddyUser = cabinBuddy
    ? (cabinBuddy.userAId === user?.id ? cabinBuddy.userB : cabinBuddy.userA)
    : null;

  // Days until departure
  const departureDate = booking?.cruise?.departureDate || "2027-05-14";
  const daysUntil = Math.max(0, Math.ceil((new Date(departureDate) - new Date()) / 86400000));

  // Itinerary events for sidebar
  const events = itinerary.length > 0
    ? itinerary.map((e) => ({
        time: `Day ${e.dayNumber}`,
        title: e.title,
        icon: e.icon || "fa-solid fa-calendar-day",
      }))
    : fallbackEvents;

  // Recent matches (exclude cabin buddy, take first 3)
  const recentMatches = matches
    .filter((m) => m.status !== "cabin_buddy")
    .slice(0, 3)
    .map((m) => {
      const partner = m.userAId === user?.id ? m.userB : m.userA;
      return { ...partner, score: m.matchScore };
    });

  // Checklist
  const checklist = [
    { label: "Create profile", done: !!user?.profile?.onboardingComplete },
    { label: "Match with cabin buddy", done: !!cabinBuddy },
    { label: "Complete booking", done: hasBooking },
    { label: "Finish payments", done: hasBooking && paidCents >= totalCents },
    { label: "Upload travel documents", done: false },
    { label: "Pack your bags!", done: false },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
        <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "var(--theme-color3)" }}></i>
      </div>
    );
  }

  return (
    <>
      <section className="hm-dash-hero" style={{ background: "var(--hm-app-hero-bg, var(--theme-color2))" }}>
        <div className="container" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="row align-items-center">
            <div className="col-md-8">
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div className="hm-dash-avatar">
                  <img src={avatarUrl} alt="Profile" onError={(e) => { e.target.src = DEFAULT_AVATAR; }} />
                </div>
                <div>
                  <h2 className="hm-dash-greeting" style={{ color: "#fff", fontSize: "28px", marginBottom: "5px" }}>
                    Welcome back, {firstName}!
                  </h2>
                  <p className="hm-dash-subtitle" style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: "15px" }}>
                    The Bahamas Wave &bull; May 2027
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="hm-countdown-box">
                <div className="hm-countdown-num">{daysUntil}</div>
                <div className="hm-countdown-label">Days Until Departure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding fix" style={{ background: "var(--hm-app-page-bg, #f5f7fa)" }}>
        <div className="container">
          {/* Status Cards */}
          <div className="row g-3 mb-4">
            {[
              { icon: "fa-solid fa-ship", label: "Booking", value: hasBooking ? (booking.status === "confirmed" ? "Confirmed" : "Pending") : "None", bg: "rgba(27, 107, 147, 0.1)", color: "var(--theme-color3)" },
              { icon: "fa-solid fa-bed", label: "Cabin", value: hasBooking ? pkgName : "—", bg: "rgba(242, 199, 68, 0.15)", color: "var(--theme-color1)" },
              { icon: "fa-solid fa-heart", label: "Buddy", value: cabinBuddy ? "Matched!" : "Searching", bg: "rgba(40, 167, 69, 0.1)", color: "#28a745" },
              { icon: "fa-solid fa-credit-card", label: "Paid", value: hasBooking ? `$${(paidCents / 100).toFixed(0)} / $${(totalCents / 100).toFixed(0)}` : "—", bg: "rgba(105, 183, 255, 0.14)", color: "var(--theme-color3)" },
            ].map((card, i) => (
              <div key={i} className="col-6 col-lg-3">
                <div className="hm-dash-card">
                  <div className="hm-dash-card-icon" style={{ background: card.bg, color: card.color }}>
                    <i className={card.icon}></i>
                  </div>
                  <div>
                    <div className="hm-dash-card-label">{card.label}</div>
                    <div className="hm-dash-card-value" style={{ color: card.color }}>{card.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4">
            {/* Left column */}
            <div className="col-lg-8">
              {/* Cabin Buddy Card */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Your Cabin Buddy</h4>
                  {buddyUser && <a href="/chat" className="hm-link-sm">Message <i className="fa-solid fa-arrow-right"></i></a>}
                </div>
                {buddyUser ? (
                  <div className="hm-buddy-card">
                    <img
                      src={buddyUser.profile?.avatarUrl || DEFAULT_AVATAR}
                      alt={buddyUser.firstName}
                      className="hm-buddy-img"
                      onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                    />
                    <div className="hm-buddy-info">
                      <h5>{buddyUser.firstName} {buddyUser.lastName}</h5>
                      <span style={{ color: "var(--theme-color3)", fontSize: "14px" }}>
                        {buddyUser.profile?.age ? `Age ${buddyUser.profile.age}` : ""}{buddyUser.profile?.city ? ` • ${buddyUser.profile.city}` : ""}
                      </span>
                      {buddyUser.profile?.bio && (
                        <p style={{ margin: "10px 0 0", color: "var(--text-color)", lineHeight: 1.6 }}>
                          {buddyUser.profile.bio}
                        </p>
                      )}
                      {buddyUser.profile?.interests?.length > 0 && (
                        <div className="hm-buddy-tags">
                          {buddyUser.profile.interests.slice(0, 4).map((tag, i) => (
                            <span key={i} className="hm-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="hm-match-score">
                      <div className="hm-match-circle">{cabinBuddy.matchScore}%</div>
                      <span>Match</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "30px", color: "var(--text-color)" }}>
                    <i className="fa-solid fa-users fa-3x" style={{ color: "#ccc", marginBottom: "15px" }}></i>
                    <p>No cabin buddy yet. Start browsing to find your match!</p>
                    <a href="/browse" className="theme-btn-main" style={{ display: "inline-flex" }}>
                      <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                      <span className="theme-btn">Browse Travelers</span>
                      <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header"><h4>Quick Actions</h4></div>
                <div className="row g-3">
                  {[
                    { href: "/browse", icon: "fa-solid fa-users", label: "Browse Travelers" },
                    { href: "/my-trip", icon: "fa-solid fa-map", label: "View Itinerary" },
                    { href: "/booking", icon: "fa-solid fa-credit-card", label: hasBooking ? "Manage Booking" : "Book Now" },
                  ].map((a, i) => (
                    <div key={i} className="col-4">
                      <a href={a.href} className="hm-quick-action">
                        <i className={a.icon}></i>
                        <span>{a.label}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Progress */}
              {hasBooking && (
                <div className="hm-dash-section">
                  <div className="hm-dash-section-header">
                    <h4>Payment Progress</h4>
                    <a href="/booking" className="hm-link-sm">Pay <i className="fa-solid fa-arrow-right"></i></a>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontWeight: 600, color: "var(--headings-color)" }}>${(paidCents / 100).toFixed(0)} paid</span>
                      <span style={{ color: "var(--text-color)" }}>${(totalCents / 100).toFixed(0)} total</span>
                    </div>
                    <div className="hm-progress-track">
                      <div className="hm-progress-bar-fill" style={{ width: `${paidPct}%` }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <div className="col-lg-4">
              {/* Cruise Events */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header"><h4>Cruise Events</h4></div>
                {events.map((event, i) => (
                  <div key={i} className="hm-event-item">
                    <div className="hm-event-icon"><i className={event.icon}></i></div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--headings-color)" }}>{event.title}</div>
                      <div style={{ fontSize: "13px", color: "var(--text-color)" }}>{event.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Matches */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Recent Matches</h4>
                  <a href="/matches" className="hm-link-sm">View All</a>
                </div>
                {recentMatches.length > 0 ? recentMatches.map((match, i) => (
                  <div key={i} className="hm-match-mini">
                    <img
                      src={match.profile?.avatarUrl || DEFAULT_AVATAR}
                      alt={match.firstName}
                      onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: "15px" }}>{match.firstName}{match.profile?.age ? `, ${match.profile.age}` : ""}</div>
                      <div style={{ fontSize: "13px", color: "var(--theme-color3)" }}>{match.score}% match</div>
                    </div>
                    <a href="/chat" style={{ color: "var(--theme-color3)", fontSize: "18px" }}>
                      <i className="fa-solid fa-comment"></i>
                    </a>
                  </div>
                )) : (
                  <p style={{ color: "var(--text-color)", fontSize: "14px" }}>No matches yet. <a href="/browse" style={{ color: "var(--theme-color3)" }}>Start browsing!</a></p>
                )}
              </div>

              {/* Checklist */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header"><h4>Pre-Cruise Checklist</h4></div>
                {checklist.map((item, i) => (
                  <div key={i} className="hm-check-item">
                    <i className={item.done ? "fa-solid fa-check-circle" : "fa-regular fa-circle"}
                       style={{ color: item.done ? "#28a745" : "#ccc", fontSize: "18px" }}></i>
                    <span style={{ textDecoration: item.done ? "line-through" : "none", opacity: item.done ? 0.6 : 1 }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AppNav />
      <DashboardContent />
    </ProtectedRoute>
  );
}
