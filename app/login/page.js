"use client";

import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/dashboard";
  };

  return (
    <>
      <section
        className="hm-page-banner bg-cover"
        style={{
          backgroundImage: "url('/images/turnups/05.jpeg')",
          minHeight: "260px",
        }}
      >
        <div className="container">
          <h1>Welcome Back</h1>
          <p className="subtitle">Log in to continue your Hustle Mentality experience.</p>
        </div>
      </section>

      <section className="hm-auth-section section-padding fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="hm-contact-form">
                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                  <div className="hm-auth-logo-badge">
                    <img
                      src="/images/newlogo.png"
                      alt="Hustle Mentality"
                      className="hm-auth-logo-img"
                    />
                  </div>
                  <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--headings-color)" }}>
                    Log In
                  </h3>
                  <p style={{ color: "var(--text-color)", fontSize: "15px" }}>
                    Don&apos;t have an account?{" "}
                    <a href="/signup" style={{ color: "var(--theme-color3)", fontWeight: 600 }}>
                      Sign Up
                    </a>
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                      <input
                        type="checkbox"
                        name="remember"
                        checked={form.remember}
                        onChange={handleChange}
                        style={{ width: "auto", accentColor: "var(--theme-color3)" }}
                      />
                      Remember me
                    </label>
                    <a href="#" style={{ fontSize: "14px", color: "var(--theme-color3)", fontWeight: 500 }}>
                      Forgot Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="theme-btn-main"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span className="theme-btn-arrow-left">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                    <span className="theme-btn">Log In</span>
                    <span className="theme-btn-arrow-right">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "25px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <p style={{ color: "var(--text-color)", fontSize: "14px", marginBottom: "15px" }}>
                    Or log in with
                  </p>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                    <button type="button" className="hm-social-btn">
                      <i className="fab fa-google"></i> Google
                    </button>
                    <button type="button" className="hm-social-btn">
                      <i className="fab fa-facebook-f"></i> Facebook
                    </button>
                    <button type="button" className="hm-social-btn">
                      <i className="fab fa-apple"></i> Apple
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
