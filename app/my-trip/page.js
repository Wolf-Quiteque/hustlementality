"use client";

import AppNav from "../components/AppNav";

const itinerary = [
  { day: 1, title: "Departure from Miami", loc: "Port of Miami, FL", desc: "Board the Norwegian Getaway, welcome mixer, set sail at 4:00 PM.", icon: "fa-solid fa-anchor" },
  { day: 2, title: "Great Stirrup Cay", loc: "Great Stirrup Cay, Bahamas", desc: "NCL's private island! Beach parties, water sports, snorkeling. 7 AM–5 PM.", icon: "fa-solid fa-umbrella-beach" },
  { day: 3, title: "Nassau, Bahamas", loc: "Nassau", desc: "Junkanoo Beach, cultural tours, Bay Street shopping, nightlife. 7 AM–5 PM.", icon: "fa-solid fa-location-dot" },
  { day: 4, title: "Return to Miami", loc: "Port of Miami, FL", desc: "Arrive 7:00 AM. Exchange contacts, share memories!", icon: "fa-solid fa-ship" },
];

const packingList = [
  { item: "Valid passport", checked: true },
  { item: "Sunscreen (reef-safe)", checked: true },
  { item: "Swimsuits (2-3)", checked: false },
  { item: "Formal outfit for dinner night", checked: false },
  { item: "All-white outfit for farewell party", checked: false },
  { item: "Comfortable walking shoes", checked: false },
  { item: "Medications / prescriptions", checked: true },
  { item: "Phone charger / portable battery", checked: false },
  { item: "Snorkel gear (optional)", checked: false },
];

export default function MyTripPage() {
  const daysUntilCruise = 350;

  return (
    <>
      <AppNav />

      {/* Trip hero */}
      <section
        className="hm-trip-hero bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=80')",
          position: "relative",
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "var(--hm-app-trip-overlay, linear-gradient(135deg, rgba(11, 37, 69, 0.92) 0%, rgba(27, 107, 147, 0.75) 100%))",
        }}></div>
        <div className="container" style={{ position: "relative", zIndex: 2, padding: "50px 0 40px" }}>
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 style={{ color: "#fff", fontSize: "30px", marginBottom: "6px" }}>The Bahamas Wave</h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", margin: 0 }}>
                3-Night Cruise &bull; Miami &rarr; Great Stirrup Cay &rarr; Nassau &rarr; Miami
              </p>
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
          <div className="row g-4">
            {/* Left: Itinerary */}
            <div className="col-lg-8">
              {/* Trip details cards */}
              <div className="row g-3 mb-4">
                {[
                  { icon: "fa-solid fa-calendar", label: "Departure", value: "May 14, 2027" },
                  { icon: "fa-solid fa-bed", label: "Cabin", value: "Balcony" },
                  { icon: "fa-solid fa-user-group", label: "Buddy", value: "Tyler Brooks" },
                  { icon: "fa-solid fa-hashtag", label: "Booking", value: "HM-04821" },
                ].map((d, i) => (
                  <div key={i} className="col-6 col-md-3">
                    <div className="hm-dash-card" style={{ flexDirection: "column", textAlign: "center", padding: "16px 12px" }}>
                      <i className={d.icon} style={{ fontSize: "18px", color: "var(--theme-color3)", marginBottom: "6px" }}></i>
                      <div className="hm-dash-card-label">{d.label}</div>
                      <div className="hm-dash-card-value" style={{ fontSize: "13px" }}>{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Itinerary */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Day-by-Day Itinerary</h4>
                </div>
                {itinerary.map((day, i) => (
                  <div key={i} style={{
                    display: "flex",
                    gap: "12px",
                    padding: "14px 0",
                    borderBottom: i < itinerary.length - 1 ? "1px solid var(--hm-app-border, rgba(0,0,0,0.06))" : "none",
                    alignItems: "flex-start",
                  }}>
                    <div style={{
                      width: "44px",
                      height: "44px",
                      background: "var(--hm-app-surface-strong, var(--theme-color2))",
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Day</span>
                      <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--theme-color1)" }}>{day.day}</span>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h5 style={{ fontSize: "15px", fontWeight: 600, margin: "0 0 2px" }}>{day.title}</h5>
                      <p style={{ fontSize: "12px", color: "var(--theme-color3)", margin: "0 0 4px" }}>
                        <i className={day.icon} style={{ marginRight: "4px" }}></i>{day.loc}
                      </p>
                      <p style={{ fontSize: "13px", color: "var(--text-color)", margin: 0, lineHeight: 1.5 }}>{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cabin buddy */}
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
                      Age 27 &bull; Dallas, TX &bull; 92% Match
                    </span>
                    <div className="hm-buddy-tags" style={{ marginTop: "10px" }}>
                      <span className="hm-tag">Adventure</span>
                      <span className="hm-tag">Music</span>
                      <span className="hm-tag">Water Sports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="col-lg-4">
              {/* Payment status */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Payment Status</h4>
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: 600 }}>$290 of $725</span>
                    <span style={{ color: "var(--theme-color3)", fontWeight: 500 }}>33%</span>
                  </div>
                  <div className="hm-progress-track">
                    <div className="hm-progress-bar-fill" style={{ width: "33%" }}></div>
                  </div>
                </div>
                <a href="/booking" className="theme-btn-main" style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}>
                  <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                  <span className="theme-btn">Make Payment</span>
                  <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                </a>
              </div>

              {/* Packing checklist */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Packing Checklist</h4>
                </div>
                {packingList.map((item, i) => (
                  <div key={i} className="hm-check-item">
                    <i
                      className={item.checked ? "fa-solid fa-check-circle" : "fa-regular fa-circle"}
                      style={{ color: item.checked ? "#28a745" : "#ccc", fontSize: "18px", cursor: "pointer" }}
                    ></i>
                    <span style={{ textDecoration: item.checked ? "line-through" : "none", opacity: item.checked ? 0.6 : 1 }}>
                      {item.item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Documents */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Documents</h4>
                </div>
                {[
                  { label: "Boarding Pass", status: "Available soon", icon: "fa-solid fa-ticket" },
                  { label: "Travel Insurance", status: "Not purchased", icon: "fa-solid fa-shield" },
                  { label: "Passport Copy", status: "Not uploaded", icon: "fa-solid fa-passport" },
                  { label: "Excursion Tickets", status: "Not booked", icon: "fa-solid fa-map" },
                ].map((doc, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 0",
                    borderBottom: i < 3 ? "1px solid var(--hm-app-border, rgba(0,0,0,0.06))" : "none",
                  }}>
                    <i className={doc.icon} style={{ color: "var(--theme-color3)", fontSize: "18px", width: "24px", textAlign: "center" }}></i>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: "14px" }}>{doc.label}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-color)" }}>{doc.status}</div>
                    </div>
                    <i className="fa-solid fa-chevron-right" style={{ fontSize: "12px", color: "#ccc" }}></i>
                  </div>
                ))}
              </div>

              {/* Help */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Need Help?</h4>
                </div>
                <div style={{ fontSize: "14px", color: "var(--text-color)", lineHeight: 1.7 }}>
                  <p><i className="fa-solid fa-phone" style={{ marginRight: "8px", color: "var(--theme-color3)" }}></i> +1 (305) 555-1234</p>
                  <p><i className="fa-solid fa-envelope" style={{ marginRight: "8px", color: "var(--theme-color3)" }}></i> info@hustlementality.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
