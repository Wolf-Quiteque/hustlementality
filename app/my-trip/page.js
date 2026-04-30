"use client";

import { useState, useEffect } from "react";
import AppNav from "../components/AppNav";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import api from "../lib/client-api";

const DEFAULT_AVATAR = "/images/default-avatar.png";

const fallbackItinerary = [
  { day: 1, title: "Departure from Miami", loc: "Port of Miami, FL", desc: "Board the Norwegian Getaway, welcome mixer, set sail at 4:00 PM.", icon: "fa-solid fa-anchor" },
  { day: 2, title: "Great Stirrup Cay", loc: "Great Stirrup Cay, Bahamas", desc: "NCL's private island! Beach parties, water sports, snorkeling. 7 AM–5 PM.", icon: "fa-solid fa-umbrella-beach" },
  { day: 3, title: "Nassau, Bahamas", loc: "Nassau", desc: "Junkanoo Beach, cultural tours, Bay Street shopping, nightlife. 7 AM–5 PM.", icon: "fa-solid fa-location-dot" },
  { day: 4, title: "Return to Miami", loc: "Port of Miami, FL", desc: "Arrive 7:00 AM. Exchange contacts, share memories!", icon: "fa-solid fa-ship" },
];

const defaultPackingList = [
  { item: "Valid passport", checked: false },
  { item: "Sunscreen (reef-safe)", checked: false },
  { item: "Swimsuits (2-3)", checked: false },
  { item: "Formal outfit for dinner night", checked: false },
  { item: "All-white outfit for farewell party", checked: false },
  { item: "Comfortable walking shoes", checked: false },
  { item: "Medications / prescriptions", checked: false },
  { item: "Phone charger / portable battery", checked: false },
  { item: "Snorkel gear (optional)", checked: false },
];

function MyTripContent() {
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [matches, setMatches] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [packingList, setPackingList] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.get("/bookings"),
      api.get("/matching/matches"),
      api.get("/cruises"),
      api.get("/trips/packing-list"),
      api.get("/trips/documents"),
    ]).then(([bookingsRes, matchesRes, cruisesRes, packingRes, docsRes]) => {
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
      if (packingRes.status === "fulfilled") {
        setPackingList(Array.isArray(packingRes.value) ? packingRes.value : []);
      }
      if (docsRes.status === "fulfilled") {
        setDocuments(Array.isArray(docsRes.value) ? docsRes.value : []);
      }
      setLoading(false);
    });
  }, []);

  const hasBooking = !!booking;
  const pkgName = booking?.package?.name || "—";
  const totalCents = booking?.totalCents || 0;
  const paidCents = booking?.paidCents || 0;
  const paidPct = totalCents > 0 ? Math.round((paidCents / totalCents) * 100) : 0;
  const bookingRef = booking?.bookingRef || "—";

  const cabinBuddy = matches.find((m) => m.status === "cabin_buddy");
  const buddyUser = cabinBuddy
    ? (cabinBuddy.userAId === user?.id ? cabinBuddy.userB : cabinBuddy.userA)
    : null;

  const departureDate = booking?.cruise?.departureDate || "2027-05-14";
  const daysUntil = Math.max(0, Math.ceil((new Date(departureDate) - new Date()) / 86400000));

  const displayItinerary = itinerary.length > 0
    ? itinerary.map((e) => ({
        day: e.dayNumber,
        title: e.title,
        loc: e.location || "",
        desc: e.description || "",
        icon: e.icon || "fa-solid fa-calendar-day",
      }))
    : fallbackItinerary;

  // Use API packing list or defaults
  const displayPacking = packingList.length > 0
    ? packingList.map((p) => ({ id: p.id, item: p.item || p.label, checked: p.isChecked || p.checked || false }))
    : defaultPackingList.map((p, i) => ({ id: `default-${i}`, ...p }));

  const togglePackingItem = async (packItem) => {
    const newChecked = !packItem.checked;
    // Optimistic update
    setPackingList((prev) =>
      prev.map((p) => (p.id === packItem.id ? { ...p, isChecked: newChecked, checked: newChecked } : p))
    );
    try {
      await api.patch(`/trips/packing-list/${packItem.id}`, { isChecked: newChecked });
    } catch {
      // Revert on failure
      setPackingList((prev) =>
        prev.map((p) => (p.id === packItem.id ? { ...p, isChecked: !newChecked, checked: !newChecked } : p))
      );
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "TBD";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  // Document statuses
  const docItems = [
    { label: "Boarding Pass", status: "Available soon", icon: "fa-solid fa-ticket" },
    { label: "Travel Insurance", status: "Not purchased", icon: "fa-solid fa-shield" },
    { label: "Passport Copy", status: "Not uploaded", icon: "fa-solid fa-passport" },
    { label: "Excursion Tickets", status: "Not booked", icon: "fa-solid fa-map" },
  ];
  // Overlay API documents if available
  if (documents.length > 0) {
    documents.forEach((doc) => {
      const existing = docItems.find((d) => d.label.toLowerCase().includes(doc.label?.toLowerCase()));
      if (existing) {
        existing.status = "Uploaded";
      }
    });
  }

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
        <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "var(--theme-color3)" }}></i>
      </div>
    );
  }

  const cruiseName = booking?.cruise?.name || "The Bahamas Wave";
  const cruiseRoute = booking?.cruise?.route || "Miami → Great Stirrup Cay → Nassau → Miami";
  const cruiseNights = booking?.cruise?.nights || 3;

  return (
    <>
      {/* Trip hero */}
      <section
        className="hm-trip-hero bg-cover"
        style={{
          backgroundImage: `url('${booking?.cruise?.heroImageUrl || "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=80"}')`,
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
              <h1 style={{ color: "#fff", fontSize: "30px", marginBottom: "6px" }}>{cruiseName}</h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", margin: 0 }}>
                {cruiseNights}-Night Cruise &bull; {cruiseRoute}
              </p>
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
          <div className="row g-4">
            {/* Left: Itinerary */}
            <div className="col-lg-8">
              {/* Trip details cards */}
              <div className="row g-3 mb-4">
                {[
                  { icon: "fa-solid fa-calendar", label: "Departure", value: formatDate(departureDate) },
                  { icon: "fa-solid fa-bed", label: "Cabin", value: hasBooking ? pkgName : "—" },
                  { icon: "fa-solid fa-user-group", label: "Buddy", value: buddyUser ? `${buddyUser.firstName} ${buddyUser.lastName}` : "Not matched" },
                  { icon: "fa-solid fa-hashtag", label: "Booking", value: hasBooking ? bookingRef : "—" },
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
                {displayItinerary.map((day, i) => (
                  <div key={i} style={{
                    display: "flex",
                    gap: "12px",
                    padding: "14px 0",
                    borderBottom: i < displayItinerary.length - 1 ? "1px solid var(--hm-app-border, rgba(0,0,0,0.06))" : "none",
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
                      {day.loc && (
                        <p style={{ fontSize: "12px", color: "var(--theme-color3)", margin: "0 0 4px" }}>
                          <i className={day.icon} style={{ marginRight: "4px" }}></i>{day.loc}
                        </p>
                      )}
                      {day.desc && (
                        <p style={{ fontSize: "13px", color: "var(--text-color)", margin: 0, lineHeight: 1.5 }}>{day.desc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cabin buddy */}
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
                        {buddyUser.profile?.age ? `Age ${buddyUser.profile.age}` : ""}
                        {buddyUser.profile?.city ? ` • ${buddyUser.profile.city}` : ""}
                        {cabinBuddy?.matchScore ? ` • ${cabinBuddy.matchScore}% Match` : ""}
                      </span>
                      {buddyUser.profile?.interests?.length > 0 && (
                        <div className="hm-buddy-tags" style={{ marginTop: "10px" }}>
                          {buddyUser.profile.interests.slice(0, 4).map((tag, i) => (
                            <span key={i} className="hm-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "30px", color: "var(--text-color)" }}>
                    <i className="fa-solid fa-users fa-3x" style={{ color: "#ccc", marginBottom: "15px" }}></i>
                    <p>No cabin buddy yet.</p>
                    <a href="/browse" className="theme-btn-main" style={{ display: "inline-flex" }}>
                      <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                      <span className="theme-btn">Browse Travelers</span>
                      <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right sidebar */}
            <div className="col-lg-4">
              {/* Payment status */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Payment Status</h4>
                </div>
                {hasBooking ? (
                  <>
                    <div style={{ marginBottom: "15px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontWeight: 600 }}>${(paidCents / 100).toFixed(0)} of ${(totalCents / 100).toFixed(0)}</span>
                        <span style={{ color: "var(--theme-color3)", fontWeight: 500 }}>{paidPct}%</span>
                      </div>
                      <div className="hm-progress-track">
                        <div className="hm-progress-bar-fill" style={{ width: `${paidPct}%` }}></div>
                      </div>
                    </div>
                    <a href="/booking" className="theme-btn-main" style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}>
                      <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                      <span className="theme-btn">Make Payment</span>
                      <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px", color: "var(--text-color)" }}>
                    <p>No booking yet</p>
                    <a href="/booking" className="theme-btn-main" style={{ display: "inline-flex" }}>
                      <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                      <span className="theme-btn">Book Now</span>
                      <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                )}
              </div>

              {/* Packing checklist */}
              <div className="hm-dash-section">
                <div className="hm-dash-section-header">
                  <h4>Packing Checklist</h4>
                </div>
                {displayPacking.map((item) => (
                  <div key={item.id} className="hm-check-item" onClick={() => item.id && !String(item.id).startsWith("default") && togglePackingItem(item)} style={{ cursor: item.id && !String(item.id).startsWith("default") ? "pointer" : "default" }}>
                    <i
                      className={item.checked ? "fa-solid fa-check-circle" : "fa-regular fa-circle"}
                      style={{ color: item.checked ? "#28a745" : "#ccc", fontSize: "18px" }}
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
                {docItems.map((doc, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 0",
                    borderBottom: i < docItems.length - 1 ? "1px solid var(--hm-app-border, rgba(0,0,0,0.06))" : "none",
                  }}>
                    <i className={doc.icon} style={{ color: "var(--theme-color3)", fontSize: "18px", width: "24px", textAlign: "center" }}></i>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: "14px" }}>{doc.label}</div>
                      <div style={{ fontSize: "12px", color: doc.status === "Uploaded" ? "#28a745" : "var(--text-color)" }}>{doc.status}</div>
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

export default function MyTripPage() {
  return (
    <ProtectedRoute>
      <AppNav />
      <MyTripContent />
    </ProtectedRoute>
  );
}
