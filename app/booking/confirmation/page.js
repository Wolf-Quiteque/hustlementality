"use client";

import AppNav from "../../components/AppNav";

export default function ConfirmationPage() {
  return (
    <>
      <AppNav />

      <section style={{ background: "#f5f7fa", minHeight: "calc(100vh - 70px)", paddingTop: "70px", display: "flex", alignItems: "center" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="hm-contact-form" style={{ textAlign: "center", padding: "50px 40px" }}>
                <div style={{
                  width: "100px",
                  height: "100px",
                  background: "rgba(40, 167, 69, 0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 25px",
                }}>
                  <i className="fa-solid fa-check fa-3x" style={{ color: "#28a745" }}></i>
                </div>

                <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "10px", color: "var(--headings-color)" }}>
                  Booking Confirmed!
                </h2>
                <p style={{ color: "var(--text-color)", fontSize: "16px", marginBottom: "30px", lineHeight: 1.7 }}>
                  Welcome aboard, Marcus! Your spot on The Bahamas Wave is officially reserved.
                  We can&apos;t wait to set sail with you in May 2027.
                </p>

                <div style={{
                  background: "rgba(27, 107, 147, 0.06)",
                  borderRadius: "16px",
                  padding: "25px",
                  marginBottom: "30px",
                  textAlign: "left",
                }}>
                  <h5 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "15px" }}>Booking Summary</h5>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { label: "Confirmation #", value: "HM-2027-04821" },
                      { label: "Package", value: "Balcony Cabin" },
                      { label: "Duration", value: "3 Nights" },
                      { label: "Departure", value: "May 14, 2027" },
                      { label: "Ship", value: "Norwegian Getaway" },
                      { label: "Deposit Paid (10%)", value: "$72.55" },
                      { label: "Remaining Balance", value: "$652.91" },
                      { label: "Next Payment (25%)", value: "Nov 14, 2026" },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 7 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                        <span style={{ color: "var(--text-color)", fontSize: "14px" }}>{item.label}</span>
                        <span style={{ fontWeight: 600, fontSize: "14px" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: "14px", color: "var(--text-color)", marginBottom: "25px" }}>
                  A confirmation email has been sent to <strong>marcus@email.com</strong>.
                  Check your dashboard for next steps.
                </p>

                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="/dashboard" className="theme-btn-main">
                    <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                    <span className="theme-btn">Go to Dashboard</span>
                    <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                  </a>
                  <a href="/browse" className="hm-btn-outline">
                    Find Cabin Buddy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
