"use client";

import { useState } from "react";
import AppNav from "../components/AppNav";

const travelers = [
  {
    id: 1,
    name: "Olivia Thompson",
    age: 28,
    city: "Tallahassee, FL",
    bio: "First cruise ever! Super excited. I can't wait to see the Bahamas. Just learned a new line dance, where's the DJ!!! Looking for a cabin buddy who loves to have fun and explore new places.",
    img: "photo-1531746020798-e6953c6e8e04",
    interests: ["Dancing", "Nightlife", "Photography", "Foodie"],
    style: "Life of the Party",
    match: 88,
  },
  {
    id: 2,
    name: "Madison Rivera",
    age: 26,
    city: "Houston, TX",
    bio: "I love the ocean, plan on sitting on the deck and tanning all day. Love the restaurants on the boat. Who wants some girl time? Looking for a chill cabin partner who enjoys good food and relaxation.",
    img: "photo-1494790108377-be9c29b29330",
    interests: ["Relaxation", "Foodie", "Yoga", "Shopping"],
    style: "Chill & Relax",
    match: 75,
  },
  {
    id: 3,
    name: "Jasmine Chen",
    age: 29,
    city: "Charlotte, NC",
    bio: "Yoga instructor by day, adventure seeker by night. Can't wait for sunrise yoga on the deck and snorkeling in crystal-clear waters. Let's make memories!",
    img: "photo-1573497019940-1c28c88b4f3e",
    interests: ["Yoga", "Adventure", "Water Sports", "Photography"],
    style: "Adventure Seeker",
    match: 85,
  },
  {
    id: 4,
    name: "Brittany James",
    age: 30,
    city: "Detroit, MI",
    bio: "Entrepreneur and event planner. I throw the best parties — and this cruise is about to be one of them. Looking for a cabin buddy with big energy and good vibes.",
    img: "photo-1438761681033-6461ffad8d80",
    interests: ["Networking", "Nightlife", "Entrepreneurship", "Dancing"],
    style: "Social Butterfly",
    match: 82,
  },
  {
    id: 5,
    name: "Keisha Williams",
    age: 25,
    city: "New York, NY",
    bio: "Solo traveler exploring the world one trip at a time. Love immersing myself in new cultures, trying local food, and meeting people from all walks of life.",
    img: "photo-1524504388940-b1c1722653e1",
    interests: ["Culture", "Foodie", "Photography", "Adventure"],
    style: "Adventure Seeker",
    match: 79,
  },
  {
    id: 6,
    name: "Darius Mitchell",
    age: 33,
    city: "Chicago, IL",
    bio: "Fitness enthusiast and foodie — yes both. Looking forward to the gym on the ship and the buffet right after. Let's get active and eat well!",
    img: "photo-1560250097-0b93528c311a",
    interests: ["Fitness", "Foodie", "Adventure", "Music"],
    style: "Adventure Seeker",
    match: 90,
  },
];

export default function BrowsePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [passed, setPassed] = useState([]);
  const [action, setAction] = useState(null); // "liked" or "passed" for animation

  const current = travelers[currentIndex];
  const isFinished = currentIndex >= travelers.length;

  const handleLike = () => {
    setAction("liked");
    setLiked((prev) => [...prev, current]);
    setTimeout(() => {
      setAction(null);
      setCurrentIndex((i) => i + 1);
    }, 400);
  };

  const handlePass = () => {
    setAction("passed");
    setPassed((prev) => [...prev, current]);
    setTimeout(() => {
      setAction(null);
      setCurrentIndex((i) => i + 1);
    }, 400);
  };

  const resetBrowse = () => {
    setCurrentIndex(0);
    setLiked([]);
    setPassed([]);
  };

  return (
    <>
      <AppNav />

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
                    ? `You've browsed all travelers!`
                    : `${travelers.length - currentIndex} travelers to discover`}
                </p>
              </div>

              {!isFinished ? (
                <>
                  <div className={`hm-browse-card ${action === "liked" ? "hm-swipe-right" : action === "passed" ? "hm-swipe-left" : ""}`}>
                    <div className="hm-browse-img-wrap">
                      <img
                        src={`https://images.unsplash.com/${current.img}?w=600&q=80`}
                        alt={current.name}
                        className="hm-browse-img"
                      />
                      <div className="hm-browse-match-badge">{current.match}% Match</div>
                      {action === "liked" && <div className="hm-swipe-label hm-swipe-like">LIKED</div>}
                      {action === "passed" && <div className="hm-swipe-label hm-swipe-pass">PASS</div>}
                    </div>
                    <div className="hm-browse-info">
                      <h3>{current.name}, {current.age}</h3>
                      <p className="hm-browse-location">
                        <i className="fa-solid fa-location-dot"></i> {current.city}
                      </p>
                      <span className="hm-browse-style">
                        <i className="fa-solid fa-compass"></i> {current.style}
                      </span>
                      <p className="hm-browse-bio">{current.bio}</p>
                      <div className="hm-buddy-tags">
                        {current.interests.map((int) => (
                          <span key={int} className="hm-tag">{int}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hm-browse-actions">
                    <button className="hm-browse-btn hm-browse-pass" onClick={handlePass}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                    <button className="hm-browse-btn hm-browse-super" onClick={handleLike}>
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
                  <h3 style={{ marginBottom: "10px" }}>All Caught Up!</h3>
                  <p style={{ color: "var(--text-color)", marginBottom: "5px" }}>
                    You liked <strong>{liked.length}</strong> travelers
                  </p>
                  <p style={{ color: "var(--text-color)", marginBottom: "25px" }}>
                    Check your <a href="/matches" style={{ color: "var(--theme-color3)", fontWeight: 600 }}>Matches</a> to see who liked you back.
                  </p>
                  <button onClick={resetBrowse} className="hm-btn-outline">
                    <i className="fa-solid fa-rotate"></i> Browse Again
                  </button>
                </div>
              )}

              {/* Browse stats */}
              {!isFinished && (
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
                      {travelers.length - currentIndex}
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
