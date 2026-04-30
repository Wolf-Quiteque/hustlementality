"use client";

import { useState, useEffect } from "react";
import AppNav from "../components/AppNav";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import api from "../lib/client-api";

const DEFAULT_AVATAR = "/images/default-avatar.png";

const styleLabels = { party: "Life of the Party", chill: "Chill & Relax", adventure: "Adventure Seeker", social: "Social Butterfly" };

function BrowseContent() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [passed, setPassed] = useState([]);
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cruiseId, setCruiseId] = useState(null);
  const [matchPopup, setMatchPopup] = useState(null);

  useEffect(() => {
    api.get("/cruises")
      .then((cruises) => {
        const list = Array.isArray(cruises) ? cruises : [];
        if (list.length > 0) {
          const cId = list[0].id;
          setCruiseId(cId);
          return api.get(`/matching/browse?cruiseId=${cId}`);
        }
        return [];
      })
      .then((data) => setProfiles(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const current = profiles[currentIndex];
  const isFinished = !loading && currentIndex >= profiles.length;

  const doSwipe = async (swipeAction) => {
    if (!current || !cruiseId) return;
    const label = swipeAction === "like" ? "liked" : "passed";
    setAction(label);

    try {
      const result = await api.post("/matching/swipe", {
        swipedUserId: current.userId || current.id,
        cruiseId,
        action: swipeAction,
      });
      if (swipeAction === "like") setLiked((prev) => [...prev, current]);
      else setPassed((prev) => [...prev, current]);

      if (result?.isMatch) {
        setMatchPopup(current);
      }
    } catch {
      // Swipe failed — move on anyway
      if (swipeAction === "like") setLiked((prev) => [...prev, current]);
      else setPassed((prev) => [...prev, current]);
    }

    setTimeout(() => {
      setAction(null);
      setCurrentIndex((i) => i + 1);
    }, 400);
  };

  const handleLike = () => doSwipe("like");
  const handlePass = () => doSwipe("pass");

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
        <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "var(--theme-color3)" }}></i>
      </div>
    );
  }

  const name = current ? `${current.firstName || ""} ${current.lastName || ""}`.trim() : "";
  const avatar = current?.avatarUrl || DEFAULT_AVATAR;
  const age = current?.age;
  const city = current?.city;
  const bio = current?.bio;
  const interests = current?.interests || [];
  const style = current?.travelStyle;
  const matchScore = current?.matchScore || current?.match || 0;

  return (
    <>
      {/* Match popup */}
      {matchPopup && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.8)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }} onClick={() => setMatchPopup(null)}>
          <div style={{ textAlign: "center", color: "#fff", padding: "40px" }} onClick={(e) => e.stopPropagation()}>
            <i className="fa-solid fa-heart fa-4x" style={{ color: "var(--theme-color1)", marginBottom: "20px" }}></i>
            <h2 style={{ fontSize: "36px", marginBottom: "10px" }}>It&apos;s a Match!</h2>
            <p style={{ fontSize: "18px", marginBottom: "30px" }}>
              You and {matchPopup.firstName} both liked each other!
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
              <a href="/chat" className="theme-btn-main">
                <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                <span className="theme-btn">Send a Message</span>
                <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
              </a>
              <button onClick={() => setMatchPopup(null)} className="hm-btn-outline" style={{ color: "#fff", borderColor: "#fff" }}>
                Keep Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="section-padding" style={{ background: "var(--hm-app-page-bg, #f5f7fa)", minHeight: "100vh" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-12">
              <div style={{ textAlign: "center", marginBottom: "25px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--headings-color)" }}>
                  Browse Cabin Buddies
                </h2>
                <p style={{ color: "var(--text-color)", fontSize: "15px" }}>
                  {isFinished
                    ? "You've browsed all travelers!"
                    : `${profiles.length - currentIndex} travelers to discover`}
                </p>
              </div>

              {!isFinished && current ? (
                <>
                  <div className={`hm-browse-card ${action === "liked" ? "hm-swipe-right" : action === "passed" ? "hm-swipe-left" : ""}`}>
                    <div className="hm-browse-img-wrap">
                      <img
                        src={avatar}
                        alt={name}
                        className="hm-browse-img"
                        onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                      />
                      <div className="hm-browse-match-badge">{matchScore}% Match</div>
                      {action === "liked" && <div className="hm-swipe-label hm-swipe-like">LIKED</div>}
                      {action === "passed" && <div className="hm-swipe-label hm-swipe-pass">PASS</div>}
                    </div>
                    <div className="hm-browse-info">
                      <h3>{name}{age ? `, ${age}` : ""}</h3>
                      {city && (
                        <p className="hm-browse-location">
                          <i className="fa-solid fa-location-dot"></i> {city}
                        </p>
                      )}
                      {style && (
                        <span className="hm-browse-style">
                          <i className="fa-solid fa-compass"></i> {styleLabels[style] || style}
                        </span>
                      )}
                      {bio && <p className="hm-browse-bio">{bio}</p>}
                      {interests.length > 0 && (
                        <div className="hm-buddy-tags">
                          {interests.map((int) => (
                            <span key={int} className="hm-tag">{int}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="hm-browse-actions">
                    <button className="hm-browse-btn hm-browse-pass" onClick={handlePass}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                    <button className="hm-browse-btn hm-browse-super" onClick={() => doSwipe("super")}>
                      <i className="fa-solid fa-star"></i>
                    </button>
                    <button className="hm-browse-btn hm-browse-like" onClick={handleLike}>
                      <i className="fa-solid fa-heart"></i>
                    </button>
                  </div>
                </>
              ) : (
                <div className="hm-browse-card" style={{ textAlign: "center", padding: "60px 30px" }}>
                  <i className="fa-solid fa-check-circle fa-4x" style={{ color: "var(--theme-color3)", marginBottom: "20px" }}></i>
                  <h3 style={{ marginBottom: "10px" }}>
                    {profiles.length === 0 ? "No Travelers Yet" : "All Caught Up!"}
                  </h3>
                  <p style={{ color: "var(--text-color)", marginBottom: "5px" }}>
                    {profiles.length === 0
                      ? "Be one of the first to sign up! More travelers coming soon."
                      : `You liked ${liked.length} travelers`}
                  </p>
                  {liked.length > 0 && (
                    <p style={{ color: "var(--text-color)", marginBottom: "25px" }}>
                      Check your <a href="/matches" style={{ color: "var(--theme-color3)", fontWeight: 600 }}>Matches</a> to see who liked you back.
                    </p>
                  )}
                </div>
              )}

              {/* Browse stats */}
              {!isFinished && current && (
                <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "20px" }}>
                  <div style={{ textAlign: "center", fontSize: "14px", color: "var(--text-color)" }}>
                    <span style={{ fontWeight: 700, color: "#28a745", fontSize: "18px" }}>{liked.length}</span>
                    <br />Liked
                  </div>
                  <div style={{ textAlign: "center", fontSize: "14px", color: "var(--text-color)" }}>
                    <span style={{ fontWeight: 700, color: "#dc3545", fontSize: "18px" }}>{passed.length}</span>
                    <br />Passed
                  </div>
                  <div style={{ textAlign: "center", fontSize: "14px", color: "var(--text-color)" }}>
                    <span style={{ fontWeight: 700, color: "var(--theme-color3)", fontSize: "18px" }}>
                      {profiles.length - currentIndex}
                    </span>
                    <br />Remaining
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BrowsePage() {
  return (
    <ProtectedRoute>
      <AppNav />
      <BrowseContent />
    </ProtectedRoute>
  );
}
