export const metadata = {
  title: "The Trip - The Bahamas Wave | Hustle Mentality",
  description: "Explore The Bahamas Wave - a 3-night cruise aboard the Norwegian Getaway from Miami to Great Stirrup Cay & Nassau. View the full itinerary, destinations, and onboard experiences.",
};

export default function TripPage() {
  return (
    <>
      {/* Page Banner */}
      <section
        className="hm-page-banner bg-cover"
        style={{
          backgroundImage: "url('/images/turnups/04.jpeg')",
        }}
      >
        <div className="container">
          <h1 className="wow fadeInUp">The Bahamas Wave</h1>
          <div className="hm-breadcrumb wow fadeInUp" data-wow-delay=".2s">
            <a href="/">Home</a>
            <span className="separator">/</span>
            <span>The Trip</span>
          </div>
          <p className="subtitle wow fadeInUp" data-wow-delay=".3s">
            3 nights. 2 destinations. 1 unforgettable community cruise. May 14–17, 2027.
          </p>
        </div>
      </section>

      {/* Trip Overview */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-xl-6 col-lg-6 wow fadeInUp">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Trip Overview</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Your 3-Night Bahamas Adventure
                </h2>
              </div>
              <div className="mt-4" style={{ lineHeight: 1.7, color: "var(--text-color)" }}>
                <p className="wow fadeInUp" data-wow-delay=".2s">
                  The Bahamas Wave is Hustle Mentality&apos;s inaugural cruise — a 3-night
                  voyage aboard the Norwegian Getaway, departing from the Port of Miami
                  to Great Stirrup Cay and Nassau, Bahamas.
                </p>
                <p className="wow fadeInUp" data-wow-delay=".3s">
                  This isn&apos;t just a cruise — it&apos;s a curated experience designed for
                  our community. Deck parties, networking mixers, group excursions, and
                  unforgettable moments await you.
                </p>
              </div>
              {/* Trip quick facts */}
              <div className="row g-3 mt-3">
                <div className="col-6 wow fadeInUp" data-wow-delay=".3s">
                  <div style={{
                    background: "rgba(26, 27, 46, 0.95)",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                  }}>
                    <i className="fa-solid fa-calendar fa-2x mb-2" style={{ color: "var(--theme-color3)" }}></i>
                    <h5 style={{ fontSize: "16px", marginBottom: "5px" }}>Departure</h5>
                    <p style={{ margin: 0, fontWeight: 600 }}>May 14, 2027</p>
                  </div>
                </div>
                <div className="col-6 wow fadeInUp" data-wow-delay=".4s">
                  <div style={{
                    background: "rgba(26, 27, 46, 0.95)",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                  }}>
                    <i className="fa-solid fa-moon fa-2x mb-2" style={{ color: "var(--theme-color3)" }}></i>
                    <h5 style={{ fontSize: "16px", marginBottom: "5px" }}>Duration</h5>
                    <p style={{ margin: 0, fontWeight: 600 }}>3 Nights</p>
                  </div>
                </div>
                <div className="col-6 wow fadeInUp" data-wow-delay=".5s">
                  <div style={{
                    background: "rgba(26, 27, 46, 0.95)",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                  }}>
                    <i className="fa-solid fa-ship fa-2x mb-2" style={{ color: "var(--theme-color3)" }}></i>
                    <h5 style={{ fontSize: "16px", marginBottom: "5px" }}>Ship</h5>
                    <p style={{ margin: 0, fontWeight: 600 }}>Norwegian Getaway</p>
                  </div>
                </div>
                <div className="col-6 wow fadeInUp" data-wow-delay=".6s">
                  <div style={{
                    background: "rgba(26, 27, 46, 0.95)",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                  }}>
                    <i className="fa-solid fa-map-marker-alt fa-2x mb-2" style={{ color: "var(--theme-color3)" }}></i>
                    <h5 style={{ fontSize: "16px", marginBottom: "5px" }}>Destinations</h5>
                    <p style={{ margin: 0, fontWeight: 600 }}>2 Stops</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 wow fadeInUp" data-wow-delay=".3s">
              <div style={{ borderRadius: "20px", overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80"
                  alt="Caribbean cruise ship"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="section-padding fix section-bg">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title bg-white">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Where We&apos;re Going</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Our Destinations
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="hm-destination-card">
                <img
                  src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80"
                  alt="Great Stirrup Cay"
                />
                <div className="dest-overlay">
                  <span className="dest-tag">Day 2</span>
                  <h4>Great Stirrup Cay</h4>
                  <p>
                    NCL&apos;s private island paradise! Pristine beaches, water sports,
                    snorkeling, cabana vibes, and beach parties. A full day in paradise
                    from 7:00 AM to 5:00 PM.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="hm-destination-card">
                <img
                  src="https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=600&q=80"
                  alt="Nassau, Bahamas"
                />
                <div className="dest-overlay">
                  <span className="dest-tag">Day 3</span>
                  <h4>Nassau, Bahamas</h4>
                  <p>
                    Explore the vibrant capital — colorful colonial architecture,
                    stunning Junkanoo Beach, shopping on Bay Street, cultural tours,
                    and legendary Nassau nightlife. 7:00 AM to 5:00 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day-by-Day Itinerary */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Day by Day</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Your 3-Night Itinerary
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="hm-itinerary-item wow fadeInUp" data-wow-delay=".1s">
                <div className="hm-itinerary-day">
                  <span className="day-label">Day</span>
                  <span className="day-num">1</span>
                </div>
                <div className="hm-itinerary-content">
                  <h4>Departure from Miami</h4>
                  <div className="location">
                    <i className="fa-solid fa-location-dot"></i> Port of Miami, Florida
                  </div>
                  <p>
                    Board the Norwegian Getaway, settle into your cabin, and meet your cabin buddy.
                    Welcome aboard mixer on the main deck with drinks and music as we
                    set sail at 4:00 PM. Community introductions and icebreakers follow.
                  </p>
                </div>
              </div>

              <div className="hm-itinerary-item wow fadeInUp" data-wow-delay=".15s">
                <div className="hm-itinerary-day">
                  <span className="day-label">Day</span>
                  <span className="day-num">2</span>
                </div>
                <div className="hm-itinerary-content">
                  <h4>Great Stirrup Cay</h4>
                  <div className="location">
                    <i className="fa-solid fa-location-dot"></i> Great Stirrup Cay, Bahamas &bull; 7:00 AM – 5:00 PM
                  </div>
                  <p>
                    A full day on NCL&apos;s private island paradise! Beach parties, water
                    sports, snorkeling in crystal-clear waters, cabana vibes, and group
                    beach activities. Evening deck party back on the ship to cap off
                    an incredible day.
                  </p>
                </div>
              </div>

              <div className="hm-itinerary-item wow fadeInUp" data-wow-delay=".2s">
                <div className="hm-itinerary-day">
                  <span className="day-label">Day</span>
                  <span className="day-num">3</span>
                </div>
                <div className="hm-itinerary-content">
                  <h4>Nassau, Bahamas</h4>
                  <div className="location">
                    <i className="fa-solid fa-location-dot"></i> Nassau, Bahamas &bull; 7:00 AM – 5:00 PM
                  </div>
                  <p>
                    Explore the vibrant capital of the Bahamas. Group excursion
                    options include snorkeling at the reef, a cultural walking tour of
                    downtown, shopping on Bay Street, or a beach day at Junkanoo Beach.
                    Farewell party on deck that evening.
                  </p>
                </div>
              </div>

              <div className="hm-itinerary-item wow fadeInUp" data-wow-delay=".25s">
                <div className="hm-itinerary-day" style={{ background: "var(--theme-color1)" }}>
                  <span className="day-label" style={{ color: "var(--theme-color2)" }}>Day</span>
                  <span className="day-num" style={{ color: "var(--theme-color2)" }}>4</span>
                </div>
                <div className="hm-itinerary-content" style={{ borderLeftColor: "var(--theme-color3)" }}>
                  <h4>Return to Miami</h4>
                  <div className="location">
                    <i className="fa-solid fa-location-dot"></i> Port of Miami, Florida &bull; Arrive 7:00 AM
                  </div>
                  <p>
                    Disembarkation morning. Say goodbye to your new tribe — but not
                    for long. Exchange contacts, share photos, and start planning for
                    the next Hustle Mentality voyage!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onboard Experience */}
      <section className="section-padding fix section-bg">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title bg-white">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Life Onboard</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  What a Day on the Cruise Looks Like
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-xl-4 col-lg-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="news-card-items-1">
                <div className="news-image">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"
                    alt="Morning yoga on cruise deck"
                  />
                </div>
                <div className="news-content">
                  <ul className="date-list">
                    <li>
                      <i className="fa-regular fa-clock"></i> 7:00 AM - 10:00 AM
                    </li>
                  </ul>
                  <h4 className="title">
                    <a href="/trip">Morning Wellness &amp; Breakfast</a>
                  </h4>
                  <p>
                    Start your day with sunrise yoga on the deck, hit the fitness center,
                    then enjoy a group breakfast with your new travel friends.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 wow fadeInUp" data-wow-delay=".5s">
              <div className="news-card-items-1">
                <div className="news-image">
                  <img
                    src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80"
                    alt="Island exploration and beach activities"
                  />
                </div>
                <div className="news-content">
                  <ul className="date-list">
                    <li>
                      <i className="fa-regular fa-clock"></i> 10:00 AM - 5:00 PM
                    </li>
                  </ul>
                  <h4 className="title">
                    <a href="/trip">Daytime Adventures</a>
                  </h4>
                  <p>
                    Shore excursions, pool parties, group activities, and island
                    exploration. Choose your own adventure or join the community events.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 wow fadeInUp" data-wow-delay=".7s">
              <div className="news-card-items-1">
                <div className="news-image">
                  <img
                    src="/images/turnups/07.jpeg"
                    alt="Evening entertainment and nightlife"
                  />
                </div>
                <div className="news-content">
                  <ul className="date-list">
                    <li>
                      <i className="fa-regular fa-clock"></i> 6:00 PM - Late
                    </li>
                  </ul>
                  <h4 className="title">
                    <a href="/trip">Evening Entertainment</a>
                  </h4>
                  <p>
                    Themed dinners, live entertainment, networking mixers, and deck
                    parties with DJs that keep the energy going all night long.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="cta-banner-section bg-cover"
        style={{ backgroundImage: "url('images/icons/line-1-1.png')" }}
      >
        <div className="container">
          <div className="cta-banner-wrapper">
            <div className="content">
              <h3 className="title char-animation">
                Ready to Set Sail?
                <br />
                May 2027
              </h3>
              <div className="text wow fadeInUp" data-wow-delay=".3s">
                Secure your spot on The Bahamas Wave before cabins sell out.
              </div>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".5s">
              <a href="/packages" className="theme-btn-main">
                <span className="theme-btn-arrow-left">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <span className="theme-btn">View Packages</span>
                <span className="theme-btn-arrow-right">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
