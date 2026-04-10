"use client";

import AppNav from "../components/AppNav";

const upcomingEvents = [
  { time: "May 14", title: "Welcome Mixer", icon: "fa-solid fa-champagne-glasses" },
  { time: "May 15", title: "Great Stirrup Cay", icon: "fa-solid fa-umbrella-beach" },
  { time: "May 16", title: "Nassau Excursion", icon: "fa-solid fa-location-dot" },
];

export default function DashboardPage() {
  const daysUntilCruise = 350;

  return (
    <>
      <AppNav />

      <section className="hm-dash-hero" style={{ background: "var(--hm-app-hero-bg, var(--theme-color2))" }}>
        <div className="container" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="row align-items-center">
            <div className="col-md-8">
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div className="hm-dash-avatar">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                    alt="Profile"
                  />
                </div>
                <div>
                  <h2 className="hm-dash-greeting" style={{ color: "#fff", fontSize: "28px", marginBottom: "5px" }}>
                    Welcome back, Marcus!
                  </h2>
                  <p className="hm-dash-subtitle" style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: "15px" }}>
                    The Bahamas Wave &bull; May 2027
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="hm-countdown-box">
                <div className="hm-countdown-num">{daysUntilCruise}</div>
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
              { icon: "fa-solid fa-ship", label: "Booking", value: "Confirmed", bg: "rgba(27, 107, 147, 0.1)", color: "var(--theme-color3)" },
              { icon: "fa-solid fa-bed", label: "Cabin", value: "Balcony", bg: "rgba(242, 199, 68, 0.15)", color: "var(--theme-color1)" },
              { icon: "fa-solid fa-heart", label: "Buddy", value: "Matched!", bg: "rgba(40, 167, 69, 0.1)", color: "#28a745" },
              { icon: "fa-solid fa-credit-card", label: "Paid", value: "$290 / $725", bg: "rgba(105, 183, 255, 0.14)", color: "var(--theme-color3)" },
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
                  <a href="/chat" className="hm-link-sm">Message <i className="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className="hm-buddy-card">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80"
                    alt="Tyler"
                    className="hm-buddy-img"
                  />
                  <div className="hm-buddy-info">
                    <h5>Tyler Brooks</h5>
                    <span style={{ color: "var(--theme-color3)", fontSize: "14px" }}>
                      Age 27 &bull; Dallas, TX
                    </span>
                    <p style={{ margin: "10px 0 0", color: "var(--text-color)", lineHeight: 1.6 }}>
                      Adventure seeker, love the ocean and live music. Looking forward to the
                      deck parties and snorkeling at Great Stirrup Cay. Let&apos;s make this cruise legendary!
                    </p>
                    <div className="hm-buddy-tags">
                      <span className="hm-tag">Adventure</span>
                      <span className="hm-tag">Music</span>
                      <span className="hm-tag">Water Sports</span>
                      <span className="hm-tag">Nightlife</span>
                    </div>
                  </div>
                  <div className="hm-match-score">
                    <div className="hm-match-circle">92%</div>
                    <span>Match</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Quick Actions</h4>
                </div>
                <div className="row g-3">
                  {[
                    { href: "/browse", icon: "fa-solid fa-users", label: "Browse Travelers" },
                    { href: "/my-trip", icon: "fa-solid fa-map", label: "View Itinerary" },
                    { href: "/booking", icon: "fa-solid fa-credit-card", label: "Make Payment" },
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
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Payment Progress</h4>
                  <a href="/booking" className="hm-link-sm">Pay <i className="fa-solid fa-arrow-right"></i></a>
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: 600, color: "var(--headings-color)" }}>$290 paid</span>
                    <span style={{ color: "var(--text-color)" }}>$725 total</span>
                  </div>
                  <div className="hm-progress-track">
                    <div className="hm-progress-bar-fill" style={{ width: "40%" }}></div>
                  </div>
                </div>
                <div className="hm-payment-list">
                  {[
                    { label: "Deposit (10%): $72.55", done: true },
                    { label: "Payment 2 (25%): $181.37", done: true },
                    { label: "Payment 3 (25%): $181.37 (Jan 2027)", done: false },
                    { label: "Final balance: $289.71 (Mar 2027)", done: false },
                  ].map((p, i) => (
                    <div key={i} style={{ fontSize: "14px", color: "var(--text-color)", padding: "4px 0" }}>
                      <i className={p.done ? "fa-solid fa-check-circle" : "fa-regular fa-circle"}
                         style={{ color: p.done ? "#28a745" : "#ccc", marginRight: "6px" }}></i>
                      {p.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="col-lg-4">
              {/* Upcoming Events */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Cruise Events</h4>
                </div>
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="hm-event-item">
                    <div className="hm-event-icon">
                      <i className={event.icon}></i>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--headings-color)" }}>
                        {event.title}
                      </div>
                      <div style={{ fontSize: "13px", color: "var(--text-color)" }}>
                        {event.time}
                      </div>
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
                {[
                  { name: "Olivia", age: 28, img: "photo-1531746020798-e6953c6e8e04", score: 88 },
                  { name: "Jasmine", age: 29, img: "photo-1494790108377-be9c29b29330", score: 85 },
                  { name: "Brittany", age: 30, img: "photo-1438761681033-6461ffad8d80", score: 82 },
                ].map((match, i) => (
                  <div key={i} className="hm-match-mini">
                    <img
                      src={`https://images.unsplash.com/${match.img}?w=80&q=80`}
                      alt={match.name}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: "15px" }}>{match.name}, {match.age}</div>
                      <div style={{ fontSize: "13px", color: "var(--theme-color3)" }}>{match.score}% match</div>
                    </div>
                    <a href="/chat" style={{ color: "var(--theme-color3)", fontSize: "18px" }}>
                      <i className="fa-solid fa-comment"></i>
                    </a>
                  </div>
                ))}
              </div>

              {/* Checklist */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Pre-Cruise Checklist</h4>
                </div>
                {[
                  { label: "Create profile", done: true },
                  { label: "Match with cabin buddy", done: true },
                  { label: "Complete booking", done: true },
                  { label: "Finish payments", done: false },
                  { label: "Upload travel documents", done: false },
                  { label: "Pack your bags!", done: false },
                ].map((item, i) => (
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
