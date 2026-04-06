"use client";

import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/onboarding";
  };

  return (
    <>
      <section
        className="hm-page-banner bg-cover"
        style={{
          backgroundImage: "url('/images/turnups/04.jpeg')",
          minHeight: "260px",
        }}
      >
        <div className="container">
          <h1>Join the Movement</h1>
          <p className="subtitle">
            Create your account and start your Hustle Mentality cruise experience.
          </p>
        </div>
      </section>

      <section className="hm-auth-section section-padding fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="hm-contact-form">
                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                  <img
                    src="/images/newlogo.png"
                    alt="Hustle Mentality"
                    style={{ height: "60px", marginBottom: "15px" }}
                  />
                  <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--headings-color)" }}>
                    Create Your Account
                  </h3>
                  <p style={{ color: "var(--text-color)", fontSize: "15px" }}>
                    Already have an account?{" "}
                    <a href="/login" style={{ color: "var(--theme-color3)", fontWeight: 600 }}>
                      Log In
                    </a>
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" placeholder="(555) 000-0000" value={form.phone} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Create password" value={form.password} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Confirm</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm password" value={form.confirmPassword} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-12">
                      <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", fontSize: "14px" }}>
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={form.agreeTerms}
                          onChange={handleChange}
                          style={{ width: "auto", accentColor: "var(--theme-color3)", marginTop: "3px" }}
                        />
                        I agree to the Terms &amp; Conditions and Privacy Policy
                      </label>
                    </div>
                    <div className="col-12 mt-3">
                      <button type="submit" className="theme-btn-main" style={{ width: "100%", justifyContent: "center" }}>
                        <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                        <span className="theme-btn">Create Account</span>
                        <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                      </button>
                    </div>
                  </div>
                </form>

                <div style={{ textAlign: "center", marginTop: "25px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <p style={{ color: "var(--text-color)", fontSize: "14px", marginBottom: "15px" }}>
                    Or sign up with
                  </p>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="hm-social-btn">
                      <i className="fab fa-google"></i> Google
                    </button>
                    <button className="hm-social-btn">
                      <i className="fab fa-facebook-f"></i> Facebook
                    </button>
                    <button className="hm-social-btn">
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
