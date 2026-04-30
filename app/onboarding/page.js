"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import api from "../lib/client-api";
import ProtectedRoute from "../components/ProtectedRoute";

const allowedAvatarTypes = ["image/jpeg", "image/png", "image/webp"];
const maxAvatarSize = 10 * 1024 * 1024;

const interests = [
  "Dancing", "Nightlife", "Fitness", "Yoga", "Photography",
  "Foodie", "Advent8ure", "Water Sports", "Music", "Networking",
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
const cabinPrefOptions = ["Early riser", "Night owl", "Quiet sleeper", "Light sleeper", "Flexible"];
const cityStateOptions = [
  "Albuquerque, NM",
  "Anchorage, AK",
  "Atlanta, GA",
  "Austin, TX",
  "Baltimore, MD",
  "Baton Rouge, LA",
  "Billings, MT",
  "Birmingham, AL",
  "Boise, ID",
  "Boston, MA",
  "Buffalo, NY",
  "Burlington, VT",
  "Charleston, SC",
  "Charleston, WV",
  "Charlotte, NC",
  "Cheyenne, WY",
  "Chicago, IL",
  "Cincinnati, OH",
  "Cleveland, OH",
  "Columbia, SC",
  "Columbus, OH",
  "Dallas, TX",
  "Denver, CO",
  "Des Moines, IA",
  "Detroit, MI",
  "Fargo, ND",
  "Fort Lauderdale, FL",
  "Fort Worth, TX",
  "Greensboro, NC",
  "Hartford, CT",
  "Honolulu, HI",
  "Houston, TX",
  "Indianapolis, IN",
  "Jackson, MS",
  "Jacksonville, FL",
  "Kansas City, MO",
  "Las Vegas, NV",
  "Lexington, KY",
  "Little Rock, AR",
  "Los Angeles, CA",
  "Louisville, KY",
  "Manchester, NH",
  "Memphis, TN",
  "Miami, FL",
  "Milwaukee, WI",
  "Minneapolis, MN",
  "Nashville, TN",
  "New Orleans, LA",
  "New York, NY",
  "Newark, NJ",
  "Norfolk, VA",
  "Oklahoma City, OK",
  "Omaha, NE",
  "Orlando, FL",
  "Philadelphia, PA",
  "Phoenix, AZ",
  "Pittsburgh, PA",
  "Portland, ME",
  "Portland, OR",
  "Providence, RI",
  "Raleigh, NC",
  "Richmond, VA",
  "Sacramento, CA",
  "Salt Lake City, UT",
  "San Antonio, TX",
  "San Diego, CA",
  "San Francisco, CA",
  "San Jose, CA",
  "Seattle, WA",
  "Sioux Falls, SD",
  "St. Louis, MO",
  "Tallahassee, FL",
  "Tampa, FL",
  "Virginia Beach, VA",
  "Washington, DC",
  "Wichita, KS",
  "Wilmington, DE",
];

function OnboardingContent() {
  const { refreshUser } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [profile, setProfile] = useState({
    age: "",
    city: "",
    bio: "",
    avatarUrl: "",
    interests: [],
    travelStyle: "",
    cabinPrefs: [],
    ageRange: "",
    genderPref: "",
  });

  // Load existing profile to resume progress
  useEffect(() => {
    api.get("/profiles/me")
      .then((data) => {
        setProfile((prev) => ({
          ...prev,
          age: data.age || "",
          city: data.city || "",
          bio: data.bio || "",
          avatarUrl: data.avatarUrl || "",
          interests: data.interests || [],
          travelStyle: data.travelStyle || "",
          cabinPrefs: data.cabinPrefs || [],
          ageRange: data.preferredAgeRange || "",
          genderPref: data.genderPref === "no_preference" ? "" : (data.genderPref || ""),
        }));
        setAvatarPreview(data.avatarUrl || "");
        // Resume from saved step
        if (data.onboardingStep > 0 && data.onboardingStep < 4) {
          setStep(data.onboardingStep + 1);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingProfile(false));
  }, []);

  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!allowedAvatarTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > maxAvatarSize) {
      setError("Profile photos must be 10MB or smaller.");
      event.target.value = "";
      return;
    }

    setError("");
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    event.target.value = "";
  };

  const uploadAvatarIfNeeded = async () => {
    if (!avatarFile) return true;

    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("file", avatarFile);

      const uploaded = await api.postForm("/uploads/avatar", formData);
      const publicUrl = uploaded.publicUrl || "";
      setProfile((prev) => ({ ...prev, avatarUrl: publicUrl }));
      if (publicUrl) setAvatarPreview(publicUrl);
      setAvatarFile(null);
      return true;
    } catch (err) {
      setError(err.message || "Photo upload failed. Please try again.");
      return false;
    } finally {
      setUploadingAvatar(false);
    }
  };

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

  const saveStep = async (stepNum) => {
    setSaving(true);
    setError("");
    try {
      if (stepNum === 1) {
        const uploaded = await uploadAvatarIfNeeded();
        if (!uploaded) return false;

        await api.patch("/profiles/me/onboarding/1", {
          age: profile.age ? Number(profile.age) : null,
          city: profile.city || null,
          bio: profile.bio || null,
        });
      } else if (stepNum === 2) {
        await api.patch("/profiles/me/onboarding/2", {
          interests: profile.interests,
        });
      } else if (stepNum === 3) {
        await api.patch("/profiles/me/onboarding/3", {
          travelStyle: profile.travelStyle || null,
        });
      } else if (stepNum === 4) {
        await api.patch("/profiles/me/onboarding/4", {
          preferredAgeRange: profile.ageRange || null,
          genderPref: profile.genderPref || "no_preference",
          cabinPrefs: profile.cabinPrefs,
        });
      }
      return true;
    } catch (err) {
      setError(err.message || "Failed to save. Please try again.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const nextStep = async () => {
    const saved = await saveStep(step);
    if (saved) setStep((s) => Math.min(s + 1, 4));
  };

  const prevStep = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleFinish = async () => {
    const saved = await saveStep(4);
    if (!saved) return;
    setSaving(true);
    try {
      await api.post("/profiles/me/onboarding/complete");
      await refreshUser();
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to complete onboarding.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingProfile) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
        <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "var(--theme-color3)" }}></i>
      </div>
    );
  }

  const isBusy = saving || uploadingAvatar;
  const busyLabel = uploadingAvatar ? "Uploading..." : "Saving...";
  const cityOptions = profile.city && !cityStateOptions.includes(profile.city)
    ? [profile.city, ...cityStateOptions]
    : cityStateOptions;

  return (
    <>
      <section style={{ background: "var(--hm-app-hero-bg, var(--theme-color2))", padding: "100px 0 40px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img src="/images/newlogo.png" alt="HM" style={{ height: "50px", marginBottom: "15px" }} />
            <h2 style={{ color: "#fff", fontSize: "28px" }}>Build Your Traveler Profile</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px" }}>
              Step {step} of 4 — {step === 1 ? "About You" : step === 2 ? "Your Interests" : step === 3 ? "Travel Style" : "Cabin Preferences"}
            </p>
          </div>

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

      <section className="section-padding fix" style={{ background: "var(--hm-app-page-bg, transparent)" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="hm-contact-form" style={{ padding: "40px" }}>

                {error && (
                  <div style={{ background: "rgba(220,53,69,0.1)", color: "#dc3545", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", fontSize: "14px" }}>
                    <i className="fa-solid fa-circle-exclamation" style={{ marginRight: "8px" }}></i>
                    {error}
                  </div>
                )}

                {/* Step 1: About You */}
                {step === 1 && (
                  <div className="hm-onboard-step">
                    <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "25px", color: "var(--headings-color)" }}>
                      Tell Us About Yourself
                    </h3>
                    <div className="row g-3">
                      <div className="col-12" style={{ textAlign: "center", marginBottom: "10px" }}>
                        <div className="hm-avatar-upload">
                          <label className={`hm-avatar-placeholder ${avatarPreview ? "has-image" : ""}`}>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={handleAvatarChange}
                              disabled={isBusy}
                              style={{ display: "none" }}
                            />
                            {avatarPreview ? (
                              <>
                                <img src={avatarPreview} alt="Profile preview" />
                                <span>Change Photo</span>
                              </>
                            ) : (
                              <>
                                <i className="fa-solid fa-camera fa-2x"></i>
                                <span>Upload Photo</span>
                              </>
                            )}
                          </label>
                          <p style={{ marginTop: "10px", fontSize: "12px", color: "var(--text-color)" }}>
                            JPG, PNG, or WebP. Max 10MB.
                          </p>
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
                          <select
                            value={profile.city}
                            onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
                          >
                            <option value="">Select your city</option>
                            {cityOptions.map((city) => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
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
                          {cabinPrefOptions.map((pref) => (
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
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", paddingTop: "20px", borderTop: "1px solid var(--hm-app-border, rgba(0,0,0,0.08))" }}>
                  {step > 1 ? (
                    <button type="button" onClick={prevStep} className="hm-btn-outline" disabled={isBusy}>
                      <i className="fa-solid fa-arrow-left"></i> Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  {step < 4 ? (
                    <button type="button" onClick={nextStep} className="theme-btn-main" disabled={isBusy}>
                      <span className="theme-btn-arrow-left">
                        <i className={isBusy ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-arrow-right"}></i>
                      </span>
                      <span className="theme-btn">{isBusy ? busyLabel : "Continue"}</span>
                      <span className="theme-btn-arrow-right">
                        <i className={isBusy ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-arrow-right"}></i>
                      </span>
                    </button>
                  ) : (
                    <button type="button" onClick={handleFinish} className="theme-btn-main" disabled={isBusy}>
                      <span className="theme-btn-arrow-left">
                        <i className={isBusy ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-arrow-right"}></i>
                      </span>
                      <span className="theme-btn">{isBusy ? (uploadingAvatar ? "Uploading..." : "Completing...") : "Complete Profile"}</span>
                      <span className="theme-btn-arrow-right">
                        <i className={isBusy ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-arrow-right"}></i>
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

export default function OnboardingPage() {
  return (
    <ProtectedRoute requireOnboarding={false}>
      <OnboardingContent />
    </ProtectedRoute>
  );
}
