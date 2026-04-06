"use client";

import AppNav from "../components/AppNav";

const matches = [
  {
    name: "Tyler Brooks",
    age: 27,
    city: "Dallas, TX",
    img: "photo-1519085360753-af0119f7cbe7",
    match: 92,
    status: "Cabin Buddy",
    interests: ["Adventure", "Music", "Water Sports"],
    lastMsg: "Can't wait for the deck party!",
    time: "2m ago",
    unread: 2,
  },
  {
    name: "Olivia Thompson",
    age: 28,
    city: "Tallahassee, FL",
    img: "photo-1531746020798-e6953c6e8e04",
    match: 88,
    status: "Matched",
    interests: ["Dancing", "Nightlife", "Photography"],
    lastMsg: "Hey! So excited for the cruise 🚢",
    time: "1h ago",
    unread: 1,
  },
  {
    name: "Jasmine Chen",
    age: 29,
    city: "Charlotte, NC",
    img: "photo-1573497019940-1c28c88b4f3e",
    match: 85,
    status: "Matched",
    interests: ["Yoga", "Adventure", "Photography"],
    lastMsg: "Are you doing the sunrise yoga?",
    time: "3h ago",
    unread: 0,
  },
  {
    name: "Brittany James",
    age: 30,
    city: "Detroit, MI",
    img: "photo-1438761681033-6461ffad8d80",
    match: 82,
    status: "Matched",
    interests: ["Networking", "Nightlife", "Dancing"],
    lastMsg: "",
    time: "New match!",
    unread: 0,
  },
  {
    name: "Darius Mitchell",
    age: 33,
    city: "Chicago, IL",
    img: "photo-1560250097-0b93528c311a",
    match: 90,
    status: "Matched",
    interests: ["Fitness", "Foodie", "Music"],
    lastMsg: "Yo let's link up on the ship!",
    time: "5h ago",
    unread: 0,
  },
];

export default function MatchesPage() {
  return (
    <>
      <AppNav />

      <section className="section-padding" style={{ background: "var(--hm-app-page-bg, #f5f7fa)", minHeight: "100vh" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <div style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--headings-color)" }}>
                  Your Matches
                </h2>
                <p style={{ color: "var(--text-color)" }}>
                  {matches.length} travelers matched with you
                </p>
              </div>

              {/* Match cards */}
              {matches.map((m, i) => (
                <div key={i} className="hm-match-card">
                  <div className="hm-match-card-left">
                    <div className="hm-match-card-img-wrap">
                      <img
                        src={`https://images.unsplash.com/${m.img}?w=200&q=80`}
                        alt={m.name}
                        className="hm-match-card-img"
                      />
                      {m.status === "Cabin Buddy" && (
                        <div className="hm-match-cabin-badge">
                          <i className="fa-solid fa-star"></i>
                        </div>
                      )}
                    </div>
                    <div className="hm-match-card-info">
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>{m.name}, {m.age}</h4>
                        {m.status === "Cabin Buddy" && (
                          <span className="hm-badge-cabin">Cabin Buddy</span>
                        )}
                      </div>
                      <p style={{ margin: "3px 0 8px", fontSize: "14px", color: "var(--theme-color3)" }}>
                        <i className="fa-solid fa-location-dot"></i> {m.city} &bull; {m.match}% match
                      </p>
                      <div className="hm-buddy-tags" style={{ marginBottom: "8px" }}>
                        {m.interests.map((int) => (
                          <span key={int} className="hm-tag" style={{ fontSize: "12px", padding: "3px 10px" }}>{int}</span>
                        ))}
                      </div>
                      {m.lastMsg && (
                        <p style={{ margin: 0, fontSize: "14px", color: "var(--text-color)" }}>
                          <i className="fa-solid fa-comment" style={{ marginRight: "6px", opacity: 0.4 }}></i>
                          {m.lastMsg}
                          <span style={{ marginLeft: "8px", fontSize: "12px", opacity: 0.5 }}>{m.time}</span>
                        </p>
                      )}
                      {!m.lastMsg && (
                        <p style={{ margin: 0, fontSize: "14px", color: "var(--theme-color1)", fontWeight: 500 }}>
                          <i className="fa-solid fa-sparkles" style={{ marginRight: "6px" }}></i>
                          {m.time}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="hm-match-card-actions">
                    <a href="/chat" className="hm-match-action-btn" title="Chat">
                      <i className="fa-solid fa-comment"></i>
                      {m.unread > 0 && <span className="hm-unread-dot">{m.unread}</span>}
                    </a>
                    <a href="/chat" className="hm-match-action-btn" title="View Profile">
                      <i className="fa-solid fa-user"></i>
                    </a>
                  </div>
                </div>
              ))}

              {/* Browse more CTA */}
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <a href="/browse" className="theme-btn-main">
                  <span className="theme-btn-arrow-left">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="theme-btn">Browse More Travelers</span>
                  <span className="theme-btn-arrow-right">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
