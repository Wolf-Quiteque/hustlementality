"use client";

import { useState } from "react";

const interests = [
  "Dancing", "Nightlife", "Fitness", "Yoga", "Photography",
  "Foodie", "Adventure", "Water Sports", "Music", "Networking",
  "Relaxation", "Culture", "Shopping", "Gaming", "Reading",
  "Hiking", "Art", "Entrepreneurship",
];

const travelStyles = [
  { id: "party", icon: "fa-solid fa-champagne-glasses", label: "Life of the Party", desc: "I'm here for the deck parties and nightlife" },
  { id: "chill", icon: "fa-solid fa-umbrella-beach", label: "Chill & Relax", desc: "Pool deck, spa days, and ocean views" },
  { id: "adventure", icon: "fa-solid fa-person-hiking", label: "Adventure Seeker", desc: "Excursions, water sports, and exploring" },
  { id: "social", icon: "fa-solid fa-people-group", label: "Social Butterfly", desc: "Meeting people and making connections" },
];

const ageRanges = ["21-25", "26-30", "31-35", "36-40", "40+"];
const cabinPrefs = ["Early riser", "Night owl", "Quiet sleeper", "Light sleeper", "Flexible"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    age: "",
    city: "",
    bio: "",
    interests: [],
    travelStyle: "",
    cabinPrefs: [],
    ageRange: "",
    genderPref: "",
    photo: null,
  });

  const toggleInterest = (interest) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const toggleCabinPref = (pref) => {
    setProfile((prev) => ({
      ...prev,
      cabinPrefs: prev.cabinPrefs.includes(pref)
        ? prev.cabinPrefs.filter((p) => p !== pref)
        : [...prev.cabinPrefs, pref],
    }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleFinish = () => {
    window.location.href = "/dashboard";
  };

  return (
    <>
      <section style={{ background: "var(--theme-color2)", padding: "100px 0 40px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img src="/images/newlogo.png" alt="HM" style={{ height: "50px", marginBottom: "15px" }} />
            <h2 style={{ color: "#fff", fontSize: "28px" }}>Build Your Traveler Profile</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px" }}>
              Step {step} of 4 — {step === 1 ? "About You" : step === 2 ? "Your Interests" : step === 3 ? "Travel Style" : "Cabin Preferences"}
            </p>
          </div>

          {/* Progress bar */}
          <div className="hm-progress-bar">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`hm-progress-step ${s <= step ? "active" : ""} ${s < step ? "completed" : ""}`}>
                <div className="hm-progress-circle">
                  {s < step ? <i className="fa-solid fa-check"></i> : s}
                </div>
                <span className="hm-progress-label">
                  {s === 1 ? "About You" : s === 2 ? "Interests" : s === 3 ? "Travel Style" : "Cabin Prefs"}
                </span>
              </div>
            ))}
            <div className="hm-progress-line">
              <div className="hm-progress-fill" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="hm-contact-form" style={{ padding: "40px" }}>

                {/* Step 1: About You */}
                {step === 1 && (
                  <div className="hm-onboard-step">
                    <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "25px", color: "var(--headings-color)" }}>
                      Tell Us About Yourself
                    </h3>
                    <div className="row g-3">
                      <div className="col-12" style={{ textAlign: "center", marginBottom: "10px" }}>
                        <div className="hm-avatar-upload">
                          <div className="hm-avatar-placeholder">
                            <i className="fa-solid fa-camera fa-2x"></i>
                            <span>Upload Photo</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Age</label>
                          <input
                            type="number"
                            placeholder="Your age"
                            value={profile.age}
                            onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>City, State</label>
                          <input
                            type="text"
                            placeholder="e.g. Miami, FL"
                            value={profile.city}
                            onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label>Bio</label>
                          <textarea
                            placeholder="Tell potential cabin buddies about yourself... What are you looking forward to on the cruise?"
                            value={profile.bio}
                            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                            style={{ minHeight: "120px" }}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Interests */}
                {step === 2 && (
                  <div className="hm-onboard-step">
                    <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px", color: "var(--headings-color)" }}>
                      Select Your Interests
                    </h3>
                    <p style={{ color: "var(--text-color)", marginBottom: "25px" }}>
                      Choose at least 3 interests. These help us match you with compatible cabin buddies.
                    </p>
                    <div className="hm-interest-grid">
                      {interests.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          className={`hm-interest-chip ${profile.interests.includes(interest) ? "selected" : ""}`}
                          onClick={() => toggleInterest(interest)}
                        >
                          {interest}
                          {profile.interests.includes(interest) && (
                            <i className="fa-solid fa-check" style={{ marginLeft: "6px", fontSize: "12px" }}></i>
                          )}
                        </button>
                      ))}
                    </div>
                    <p style={{ marginTop: "15px", fontSize: "14px", color: "var(--theme-color3)" }}>
                      {profile.interests.length} selected
                    </p>
                  </div>
                )}

                {/* Step 3: Travel Style */}
                {step === 3 && (
                  <div className="hm-onboard-step">
                    <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px", color: "var(--headings-color)" }}>
                      What&apos;s Your Travel Style?
                    </h3>
                    <p style={{ color: "var(--text-color)", marginBottom: "25px" }}>
                      Pick the one that best describes you on vacation.
                    </p>
                    <div className="row g-3">
                      {travelStyles.map((style) => (
                        <div key={style.id} className="col-md-6">
                          <button
                            type="button"
                            className={`hm-style-card ${profile.travelStyle === style.id ? "selected" : ""}`}
                            onClick={() => setProfile((p) => ({ ...p, travelStyle: style.id }))}
                          >
                            <i className={`${style.icon} fa-2x`}></i>
                            <h5>{style.label}</h5>
                            <p>{style.desc}</p>
                            {profile.travelStyle === style.id && (
                              <div className="hm-style-check">
                                <i className="fa-solid fa-check"></i>
                              </div>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Cabin Preferences */}
                {step === 4 && (
                  <div className="hm-onboard-step">
                    <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px", color: "var(--headings-color)" }}>
                      Cabin Buddy Preferences
                    </h3>
                    <p style={{ color: "var(--text-color)", marginBottom: "25px" }}>
                      Help us find your ideal cabin partner.
                    </p>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Preferred Buddy Age Range</label>
                          <select
                            value={profile.ageRange}
                            onChange={(e) => setProfile((p) => ({ ...p, ageRange: e.target.value }))}
                          >
                            <option value="">Any age</option>
                            {ageRanges.map((ar) => (
                              <option key={ar} value={ar}>{ar}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Gender Preference</label>
                          <select
                            value={profile.genderPref}
                            onChange={(e) => setProfile((p) => ({ ...p, genderPref: e.target.value }))}
                          >
                            <option value="">No preference</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="nonbinary">Non-binary</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12">
                        <label style={{ fontWeight: 600, marginBottom: "12px", display: "block" }}>
                          I am a... (select all that apply)
                        </label>
                        <div className="hm-interest-grid">
                          {cabinPrefs.map((pref) => (
                            <button
                              key={pref}
                              type="button"
                              className={`hm-interest-chip ${profile.cabinPrefs.includes(pref) ? "selected" : ""}`}
                              onClick={() => toggleCabinPref(pref)}
                            >
                              {pref}
                              {profile.cabinPrefs.includes(pref) && (
                                <i className="fa-solid fa-check" style={{ marginLeft: "6px", fontSize: "12px" }}></i>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="hm-btn-outline"
                    >
                      <i className="fa-solid fa-arrow-left"></i> Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="theme-btn-main"
                    >
                      <span className="theme-btn-arrow-left">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                      <span className="theme-btn">Continue</span>
                      <span className="theme-btn-arrow-right">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleFinish}
                      className="theme-btn-main"
                    >
                      <span className="theme-btn-arrow-left">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                      <span className="theme-btn">Complete Profile</span>
                      <span className="theme-btn-arrow-right">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
