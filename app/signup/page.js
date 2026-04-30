"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { user, loading: authLoading, signup, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setGoogleLoading(false);
    }
  };
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.replace(user.profile?.onboardingComplete ? "/dashboard" : "/onboarding");
    }
  }, [user, authLoading, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!form.agreeTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);
    try {
      await signup({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        agreeTerms: form.agreeTerms,
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || user) return null;

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

                {error && (
                  <div style={{ background: "rgba(220,53,69,0.1)", color: "#dc3545", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", fontSize: "14px" }}>
                    <i className="fa-solid fa-circle-exclamation" style={{ marginRight: "8px" }}></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required disabled={loading} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required disabled={loading} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required disabled={loading} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" placeholder="(555) 000-0000" value={form.phone} onChange={handleChange} disabled={loading} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Create password" value={form.password} onChange={handleChange} required disabled={loading} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Confirm</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm password" value={form.confirmPassword} onChange={handleChange} required disabled={loading} />
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
                      <button type="submit" className="theme-btn-main" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
                        <span className="theme-btn-arrow-left"><i className={loading ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-arrow-right"}></i></span>
                        <span className="theme-btn">{loading ? "Creating Account..." : "Create Account"}</span>
                        <span className="theme-btn-arrow-right"><i className={loading ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-arrow-right"}></i></span>
                      </button>
                    </div>
                  </div>
                </form>

                <div style={{ textAlign: "center", marginTop: "25px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <p style={{ color: "var(--text-color)", fontSize: "14px", marginBottom: "15px" }}>
                    Or sign up with
                  </p>
                  <button
                    type="button"
                    className="hm-social-btn"
                    onClick={handleGoogle}
                    disabled={loading || googleLoading}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <i className={googleLoading ? "fa-solid fa-spinner fa-spin" : "fab fa-google"}></i>
                    {googleLoading ? " Connecting..." : " Continue with Google"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
