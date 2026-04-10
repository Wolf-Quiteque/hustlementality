"use client";

import { useState } from "react";
import AppNav from "../components/AppNav";

const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const packages = [
  { id: "inside", name: "Inside", price: 577, icon: "fa-solid fa-bed", features: ["All meals", "Community events", "Welcome kit"] },
  { id: "oceanview", name: "Oceanview", price: 636, icon: "fa-solid fa-window-maximize", features: ["All meals", "Community events", "Picture window ocean view"] },
  { id: "balcony", name: "Balcony", price: 725, icon: "fa-solid fa-ship", features: ["All meals + specialty", "Private balcony", "Priority excursions"], popular: true },
  { id: "club-suite", name: "Club Balcony Suite", price: 855, icon: "fa-solid fa-star", features: ["Specialty dining", "Private balcony", "Concierge service"] },
  { id: "haven", name: "Haven Suite", price: 1559, icon: "fa-solid fa-crown", features: ["Unlimited dining", "Haven access", "Butler service", "Beverage package"] },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedPkg, setSelectedPkg] = useState("balcony");
  const [paymentPlan, setPaymentPlan] = useState("monthly");
  const [form, setForm] = useState({
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const pkg = packages.find((p) => p.id === selectedPkg);
  const total = pkg?.price || 0;
  const deposit = Math.round(total * 0.1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    window.location.href = "/booking/confirmation";
  };

  return (
    <>
      <AppNav />

      <section style={{ background: "var(--theme-color2)", paddingTop: "80px" }}>
        <div className="container" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontSize: "28px", marginBottom: "5px" }}>Book Your Cruise</h2>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>The Bahamas Wave &bull; May 2027</p>
          </div>

          {/* Steps indicator */}
          <div className="hm-progress-bar" style={{ marginTop: "25px" }}>
            {[
              { n: 1, l: "Package" },
              { n: 2, l: "Details" },
              { n: 3, l: "Payment" },
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

      <section className="section-padding fix" style={{ background: "#f5f7fa" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              {/* Step 1: Select Package */}
              {step === 1 && (
                <>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Select Your Package</h3>
                  <div className="row g-3">
                    {packages.map((p) => (
                      <div key={p.id} className="col-md-4">
                        <button
                          type="button"
                          className={`hm-booking-pkg-card ${selectedPkg === p.id ? "selected" : ""}`}
                          onClick={() => setSelectedPkg(p.id)}
                        >
                          {p.popular && <div className="hm-pkg-popular">Most Popular</div>}
                          <i className={`${p.icon} fa-2x`} style={{ color: selectedPkg === p.id ? "var(--theme-color1)" : "var(--theme-color3)", marginBottom: "12px" }}></i>
                          <h5>{p.name}</h5>
                          <div className="hm-pkg-price">${fmt(p.price)}<span>/person</span></div>
                          <ul className="hm-pkg-features">
                            {p.features.map((f, i) => (
                              <li key={i}><i className="fa-solid fa-check"></i> {f}</li>
                            ))}
                          </ul>
                          {selectedPkg === p.id && (
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
              {step === 2 && (
                <div className="hm-contact-form" style={{ padding: "35px" }}>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Booking Details</h3>

                  <div className="hm-booking-summary" style={{ marginBottom: "25px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", background: "rgba(27, 107, 147, 0.08)", borderRadius: "12px" }}>
                      <div>
                        <strong>{pkg.name}</strong>
                        <span style={{ display: "block", fontSize: "14px", color: "var(--text-color)" }}>3 Nights &bull; The Bahamas Wave</span>
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--theme-color2)" }}>
                        ${fmt(total)}
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
                        <span>${fmt(total)} today</span>
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

                  <h5 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "15px" }}>Add-Ons</h5>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                    {[
                      { label: "Shore Excursion Bundle (2 stops)", price: "$199" },
                      { label: "Premium Beverage Package", price: "$199" },
                      { label: "Travel Insurance", price: "$89" },
                      { label: "Professional Photo Package", price: "$149" },
                    ].map((addon, i) => (
                      <label key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#f8f9fa", borderRadius: "10px", cursor: "pointer" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <input type="checkbox" style={{ width: "auto", accentColor: "var(--theme-color3)" }} />
                          {addon.label}
                        </span>
                        <strong>{addon.price}</strong>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="hm-contact-form" style={{ padding: "35px" }}>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Payment Information</h3>

                  <div style={{ padding: "15px 20px", background: "rgba(40, 167, 69, 0.08)", borderRadius: "12px", marginBottom: "25px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <i className="fa-solid fa-lock" style={{ color: "#28a745", fontSize: "18px" }}></i>
                    <span style={{ fontSize: "14px", color: "#28a745" }}>Your payment information is encrypted and secure</span>
                  </div>

                  <div style={{ padding: "15px 20px", background: "rgba(27, 107, 147, 0.08)", borderRadius: "12px", marginBottom: "25px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span>{pkg.name}</span>
                      <span>${fmt(total)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                      <strong>Due Today ({paymentPlan === "full" ? "Full payment" : "Deposit"})</strong>
                      <strong style={{ color: "var(--theme-color2)", fontSize: "20px" }}>
                        ${paymentPlan === "full" ? fmt(total) : deposit}
                      </strong>
                    </div>
                  </div>

                  <form onSubmit={handleConfirm}>
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="form-group">
                          <label>Name on Card</label>
                          <input type="text" name="cardName" placeholder="Full name as on card" value={form.cardName} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label>Card Number</label>
                          <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input type="text" name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>CVV</label>
                          <input type="text" name="cvv" placeholder="123" value={form.cvv} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-12 mt-2">
                        <button type="submit" className="theme-btn-main" style={{ width: "100%", justifyContent: "center" }}>
                          <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                          <span className="theme-btn">
                            {paymentPlan === "full" ? `Pay $${fmt(total)}` : `Pay $${deposit} Deposit`}
                          </span>
                          <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Nav buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "25px" }}>
                {step > 1 ? (
                  <button onClick={() => setStep((s) => s - 1)} className="hm-btn-outline">
                    <i className="fa-solid fa-arrow-left"></i> Back
                  </button>
                ) : <div></div>}
                {step < 3 && (
                  <button onClick={() => setStep((s) => s + 1)} className="theme-btn-main">
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
