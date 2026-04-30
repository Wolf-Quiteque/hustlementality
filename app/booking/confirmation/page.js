"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AppNav from "../../components/AppNav";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/client-api";

const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function ConfirmationContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        if (bookingId) {
          const data = await api.get(`/bookings/${bookingId}`);
          setBooking(data);
        } else {
          // Fallback: get most recent booking
          const bookings = await api.get("/bookings");
          const list = Array.isArray(bookings) ? bookings : [];
          if (list.length > 0) setBooking(list[0]);
        }
      } catch {}
      setLoading(false);
    };
    loadBooking();
  }, [bookingId]);

  const firstName = user?.firstName || "Traveler";
  const email = user?.email || "";

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
        <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "var(--theme-color3)" }}></i>
      </div>
    );
  }

  const bookingRef = booking?.bookingRef || "—";
  const pkgName = booking?.package?.name || "Cruise Package";
  const cruiseName = booking?.cruise?.name || "The Bahamas Wave";
  const nights = booking?.cruise?.nights || 3;
  const totalCents = booking?.totalCents || 0;
  const paidCents = booking?.paidCents || 0;
  const remainingCents = totalCents - paidCents;

  const formatDate = (dateStr) => {
    if (!dateStr) return "TBD";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const departureDate = booking?.cruise?.departureDate;

  const summaryItems = [
    { label: "Confirmation #", value: bookingRef },
    { label: "Package", value: pkgName },
    { label: "Duration", value: `${nights} Nights` },
    { label: "Departure", value: formatDate(departureDate) },
    { label: "Cruise", value: cruiseName },
    { label: "Amount Paid", value: `$${fmt((paidCents / 100).toFixed(2))}` },
    { label: "Remaining Balance", value: `$${fmt((remainingCents / 100).toFixed(2))}` },
  ];

  return (
    <section style={{ background: "var(--hm-app-page-bg, #f5f7fa)", minHeight: "calc(100vh - 70px)", paddingTop: "70px", display: "flex", alignItems: "center" }}>
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
                Welcome aboard, {firstName}! Your spot on {cruiseName} is officially reserved.
                {departureDate && ` We can't wait to set sail with you in ${formatDate(departureDate)}.`}
              </p>

              <div style={{
                background: "var(--hm-app-panel-bg, rgba(27, 107, 147, 0.06))",
                borderRadius: "16px",
                padding: "25px",
                marginBottom: "30px",
                textAlign: "left",
              }}>
                <h5 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "15px" }}>Booking Summary</h5>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {summaryItems.map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < summaryItems.length - 1 ? "1px solid var(--hm-app-border, rgba(0,0,0,0.05))" : "none" }}>
                      <span style={{ color: "var(--text-color)", fontSize: "14px" }}>{item.label}</span>
                      <span style={{ fontWeight: 600, fontSize: "14px" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {email && (
                <p style={{ fontSize: "14px", color: "var(--text-color)", marginBottom: "25px" }}>
                  A confirmation email has been sent to <strong>{email}</strong>.
                  Check your dashboard for next steps.
                </p>
              )}

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
  );
}

export default function ConfirmationPage() {
  return (
    <ProtectedRoute>
      <AppNav />
      <ConfirmationContent />
    </ProtectedRoute>
  );
}
