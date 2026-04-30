"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppNav from "../components/AppNav";
import ProtectedRoute from "../components/ProtectedRoute";
import api from "../lib/client-api";

const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function BookingContent() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [cruise, setCruise] = useState(null);
  const [packages, setPackages] = useState([]);
  const [selectedPkgId, setSelectedPkgId] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState("monthly");
  const [addOns, setAddOns] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [existingBooking, setExistingBooking] = useState(null);

  useEffect(() => {
    Promise.allSettled([
      api.get("/cruises"),
      api.get("/bookings"),
    ]).then(([cruisesRes, bookingsRes]) => {
      if (cruisesRes.status === "fulfilled") {
        const cruises = Array.isArray(cruisesRes.value) ? cruisesRes.value : [];
        if (cruises.length > 0) {
          const c = cruises[0];
          setCruise(c);
          api.get(`/cruises/${c.id}/packages`)
            .then((pkgs) => {
              const pkgList = Array.isArray(pkgs) ? pkgs : [];
              // Group into 5 tiers matching /packages page — pick cheapest 2-guest variant of each
              const tierOf = (p) => {
                const name = (p.name || "").toLowerCase();
                if (name.includes("haven")) return "Haven Suite";
                if (name.includes("club")) return "Club Balcony Suite";
                if (name.includes("balcony")) return "Balcony";
                if (name.includes("oceanview")) return "Oceanview";
                if (name.includes("inside")) return "Inside";
                return p.name;
              };
              const tierOrder = ["Inside", "Oceanview", "Balcony", "Club Balcony Suite", "Haven Suite"];
              const grouped = {};
              for (const p of pkgList) {
                const tier = tierOf(p);
                const current = grouped[tier];
                // Prefer 2-guest and cheaper
                const isBetter =
                  !current ||
                  (p.maxOccupancy === 2 && current.maxOccupancy !== 2) ||
                  ((p.priceCents || 0) < (current.priceCents || 0) && p.maxOccupancy === current.maxOccupancy);
                if (isBetter) grouped[tier] = { ...p, displayName: tier };
              }
              const deduped = tierOrder
                .map((t) => grouped[t])
                .filter(Boolean);
              setPackages(deduped);
              // Default to most popular or Balcony
              const popular = deduped.find((p) => p.isPopular || p.displayName === "Balcony");
              if (popular) setSelectedPkgId(popular.id);
              else if (deduped.length > 0) setSelectedPkgId(deduped[0].id);
            })
            .catch(() => {});
        }
      }
      if (bookingsRes.status === "fulfilled") {
        const bookings = Array.isArray(bookingsRes.value) ? bookingsRes.value : [];
        if (bookings.length > 0) setExistingBooking(bookings[0]);
      }
      setLoading(false);
    });
  }, []);

  const pkg = packages.find((p) => p.id === selectedPkgId);
  const totalCents = pkg?.priceCents || (pkg?.price ? pkg.price * 100 : 0);
  const total = totalCents / 100;
  const deposit = Math.round(total * 0.1);

  const toggleAddOn = (addOnId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]
    );
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!cruise || !selectedPkgId) return;
    setSubmitting(true);
    setError("");
    try {
      const booking = await api.post("/bookings", {
        cruiseId: cruise.id,
        packageId: selectedPkgId,
        paymentPlan,
        addOnIds: selectedAddOns,
      });
      const bookingId = booking?.id || booking?.bookingId;
      router.push(`/booking/confirmation${bookingId ? `?id=${bookingId}` : ""}`);
    } catch (err) {
      setError(err.message || "Failed to create booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
        <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "var(--theme-color3)" }}></i>
      </div>
    );
  }

  // If user already has a booking, show manage booking view
  if (existingBooking && step === 1) {
    const eb = existingBooking;
    const ebPaid = (eb.paidCents || 0) / 100;
    const ebTotal = (eb.totalCents || 0) / 100;
    const ebPct = ebTotal > 0 ? Math.round((ebPaid / ebTotal) * 100) : 0;

    return (
      <section className="section-padding fix" style={{ background: "var(--hm-app-page-bg, #f5f7fa)" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="hm-contact-form" style={{ padding: "35px" }}>
                <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Your Booking</h3>

                <div style={{ padding: "20px", background: "var(--hm-app-panel-bg, rgba(40, 167, 69, 0.08))", borderRadius: "12px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "18px" }}>{eb.package?.name || "Cruise Package"}</div>
                      <div style={{ fontSize: "14px", color: "var(--text-color)" }}>
                        Ref: {eb.bookingRef || "—"} &bull; Status: {eb.status || "pending"}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--hm-app-price-color, var(--theme-color2))" }}>
                        ${fmt(ebTotal.toFixed(0))}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: 600 }}>${ebPaid.toFixed(0)} paid</span>
                    <span style={{ color: "var(--theme-color3)" }}>{ebPct}%</span>
                  </div>
                  <div className="hm-progress-track">
                    <div className="hm-progress-bar-fill" style={{ width: `${ebPct}%` }}></div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <a href="/my-trip" className="theme-btn-main" style={{ flex: 1, justifyContent: "center" }}>
                    <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                    <span className="theme-btn">View Trip</span>
                    <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const cruiseName = cruise?.name || "The Bahamas Wave";

  // Fallback packages if API returned none
  const displayPackages = packages.length > 0
    ? packages
    : [
        { id: "inside", name: "Inside", priceCents: 57700, icon: "fa-solid fa-bed", features: ["All meals", "Community events", "Welcome kit"] },
        { id: "oceanview", name: "Oceanview", priceCents: 63600, icon: "fa-solid fa-window-maximize", features: ["All meals", "Community events", "Picture window ocean view"] },
        { id: "balcony", name: "Balcony", priceCents: 72500, icon: "fa-solid fa-ship", features: ["All meals + specialty", "Private balcony", "Priority excursions"], popular: true },
        { id: "club-suite", name: "Club Balcony Suite", priceCents: 85500, icon: "fa-solid fa-star", features: ["Specialty dining", "Private balcony", "Concierge service"] },
        { id: "haven", name: "Haven Suite", priceCents: 155900, icon: "fa-solid fa-crown", features: ["Unlimited dining", "Haven access", "Butler service", "Beverage package"] },
      ];

  const getPrice = (p) => (p.priceCents || (p.price ? p.price * 100 : 0)) / 100;
  const getFeatures = (p) => p.features || p.amenities || [];

  return (
    <>
      <section style={{ background: "var(--hm-app-hero-bg, var(--theme-color2))", paddingTop: "80px" }}>
        <div className="container" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontSize: "28px", marginBottom: "5px" }}>Book Your Cruise</h2>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>{cruiseName}</p>
          </div>

          <div className="hm-progress-bar" style={{ marginTop: "25px" }}>
            {[
              { n: 1, l: "Package" },
              { n: 2, l: "Details" },
              { n: 3, l: "Confirm" },
            ].map((s) => (
              <div key={s.n} className={`hm-progress-step ${s.n <= step ? "active" : ""} ${s.n < step ? "completed" : ""}`}>
                <div className="hm-progress-circle">
                  {s.n < step ? <i className="fa-solid fa-check"></i> : s.n}
                </div>
                <span className="hm-progress-label">{s.l}</span>
              </div>
            ))}
            <div className="hm-progress-line">
              <div className="hm-progress-fill" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding fix" style={{ background: "var(--hm-app-page-bg, #f5f7fa)" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              {error && (
                <div style={{ background: "rgba(220,53,69,0.1)", color: "#dc3545", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", fontSize: "14px" }}>
                  <i className="fa-solid fa-circle-exclamation" style={{ marginRight: "8px" }}></i>
                  {error}
                </div>
              )}

              {/* Step 1: Select Package */}
              {step === 1 && (
                <>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Select Your Package</h3>
                  <div className="row g-3">
                    {displayPackages.map((p) => (
                      <div key={p.id} className="col-md-4">
                        <button
                          type="button"
                          className={`hm-booking-pkg-card ${selectedPkgId === p.id ? "selected" : ""}`}
                          onClick={() => setSelectedPkgId(p.id)}
                        >
                          {(p.isPopular || p.popular || p.displayName === "Balcony") && <div className="hm-pkg-popular">Most Popular</div>}
                          <i className={`${p.icon || "fa-solid fa-ship"} fa-2x`} style={{ color: selectedPkgId === p.id ? "var(--theme-color1)" : "var(--theme-color3)", marginBottom: "12px" }}></i>
                          <h5>{p.displayName || p.name}</h5>
                          <div className="hm-pkg-price">${fmt(getPrice(p).toFixed(0))}<span>/person</span></div>
                          <ul className="hm-pkg-features">
                            {getFeatures(p).map((f, i) => (
                              <li key={i}><i className="fa-solid fa-check"></i> {typeof f === "string" ? f : f.name || f.label}</li>
                            ))}
                          </ul>
                          {selectedPkgId === p.id && (
                            <div className="hm-pkg-selected-check">
                              <i className="fa-solid fa-check-circle"></i>
                            </div>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Step 2: Booking Details */}
              {step === 2 && pkg && (
                <div className="hm-contact-form" style={{ padding: "35px" }}>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Booking Details</h3>

                  <div className="hm-booking-summary" style={{ marginBottom: "25px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", background: "var(--hm-app-panel-bg, rgba(27, 107, 147, 0.08))", borderRadius: "12px" }}>
                      <div>
                        <strong>{pkg.displayName || pkg.name}</strong>
                        <span style={{ display: "block", fontSize: "14px", color: "var(--text-color)" }}>
                          {cruise?.nights || 3} Nights &bull; {cruiseName}
                        </span>
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--hm-app-price-color, var(--theme-color2))" }}>
                        ${fmt(total.toFixed(0))}
                      </div>
                    </div>
                  </div>

                  <h5 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "15px" }}>Payment Plan</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <button
                        type="button"
                        className={`hm-plan-option ${paymentPlan === "full" ? "selected" : ""}`}
                        onClick={() => setPaymentPlan("full")}
                      >
                        <strong>Pay in Full</strong>
                        <span>${fmt(total.toFixed(0))} today</span>
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        type="button"
                        className={`hm-plan-option ${paymentPlan === "monthly" ? "selected" : ""}`}
                        onClick={() => setPaymentPlan("monthly")}
                      >
                        <strong>Payment Plan</strong>
                        <span>10% deposit + scheduled payments</span>
                      </button>
                    </div>
                  </div>

                  {addOns.length > 0 && (
                    <>
                      <h5 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "15px" }}>Add-Ons</h5>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                        {addOns.map((addon) => (
                          <label key={addon.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "var(--hm-app-panel-bg, #f8f9fa)", borderRadius: "10px", cursor: "pointer" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <input
                                type="checkbox"
                                checked={selectedAddOns.includes(addon.id)}
                                onChange={() => toggleAddOn(addon.id)}
                                style={{ width: "auto", accentColor: "var(--theme-color3)" }}
                              />
                              {addon.name || addon.label}
                            </span>
                            <strong>${((addon.priceCents || 0) / 100).toFixed(0)}</strong>
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && pkg && (
                <div className="hm-contact-form" style={{ padding: "35px" }}>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Confirm Your Booking</h3>

                  <div style={{ padding: "15px 20px", background: "var(--hm-app-panel-bg, rgba(40, 167, 69, 0.08))", borderRadius: "12px", marginBottom: "25px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <i className="fa-solid fa-lock" style={{ color: "#28a745", fontSize: "18px" }}></i>
                    <span style={{ fontSize: "14px", color: "#28a745" }}>Your booking is secure</span>
                  </div>

                  <div style={{ padding: "15px 20px", background: "var(--hm-app-panel-bg, rgba(27, 107, 147, 0.08))", borderRadius: "12px", marginBottom: "25px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span>{pkg.displayName || pkg.name} — {cruise?.nights || 3} Nights</span>
                      <span>${fmt(total.toFixed(0))}</span>
                    </div>
                    {selectedAddOns.length > 0 && (
                      <div style={{ marginBottom: "8px", fontSize: "14px", color: "var(--text-color)" }}>
                        + {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? "s" : ""}
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid var(--hm-app-border, rgba(0,0,0,0.08))" }}>
                      <strong>{paymentPlan === "full" ? "Total due today" : "Deposit due today (10%)"}</strong>
                      <strong style={{ color: "var(--hm-app-price-color, var(--theme-color2))", fontSize: "20px" }}>
                        ${paymentPlan === "full" ? fmt(total.toFixed(0)) : deposit}
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirm}
                    disabled={submitting}
                    className="theme-btn-main"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span className="theme-btn-arrow-left">
                      <i className={submitting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-arrow-right"}></i>
                    </span>
                    <span className="theme-btn">
                      {submitting ? "Processing..." : paymentPlan === "full" ? `Confirm & Pay $${fmt(total.toFixed(0))}` : `Confirm & Pay $${deposit} Deposit`}
                    </span>
                    <span className="theme-btn-arrow-right">
                      <i className={submitting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-arrow-right"}></i>
                    </span>
                  </button>
                </div>
              )}

              {/* Nav buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "25px" }}>
                {step > 1 ? (
                  <button onClick={() => { setStep((s) => s - 1); setError(""); }} className="hm-btn-outline" disabled={submitting}>
                    <i className="fa-solid fa-arrow-left"></i> Back
                  </button>
                ) : <div></div>}
                {step < 3 && (
                  <button onClick={() => setStep((s) => s + 1)} className="theme-btn-main" disabled={!selectedPkgId}>
                    <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                    <span className="theme-btn">Continue</span>
                    <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BookingPage() {
  return (
    <ProtectedRoute>
      <AppNav />
      <BookingContent />
    </ProtectedRoute>
  );
}
