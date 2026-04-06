export const metadata = {
  title: "The Trip - The Bahamas Wave | Hustle Mentality",
  description: "Explore The Bahamas Wave - a 7-night cruise from Miami to Nassau, CocoCay & Cozumel. View the full itinerary, destinations, and onboard experiences.",
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
            7 nights. 3 destinations. 1 unforgettable community cruise. March 2027.
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
                  Your 7-Night Caribbean Adventure
                </h2>
              </div>
              <div className="mt-4" style={{ lineHeight: 1.7, color: "var(--text-color)" }}>
                <p className="wow fadeInUp" data-wow-delay=".2s">
                  The Bahamas Wave is Hustle Mentality&apos;s inaugural cruise — a 7-night
                  voyage departing from the Port of Miami, sailing through the crystal-clear
                  waters of the Caribbean to Nassau, CocoCay, and Cozumel.
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
                    <p style={{ margin: 0, fontWeight: 600 }}>March 2027</p>
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
                    <p style={{ margin: 0, fontWeight: 600 }}>7 Nights</p>
                  </div>
                </div>
                <div className="col-6 wow fadeInUp" data-wow-delay=".5s">
                  <div style={{
                    background: "rgba(26, 27, 46, 0.95)",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                  }}>
                    <i className="fa-solid fa-anchor fa-2x mb-2" style={{ color: "var(--theme-color3)" }}></i>
                    <h5 style={{ fontSize: "16px", marginBottom: "5px" }}>Departure Port</h5>
                    <p style={{ margin: 0, fontWeight: 600 }}>Miami, FL</p>
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
                    <p style={{ margin: 0, fontWeight: 600 }}>3 Stops</p>
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
          <div className="row g-4">
            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".2s">
              <div className="hm-destination-card">
                <img
                  src="https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=600&q=80"
                  alt="Nassau, Bahamas"
                />
                <div className="dest-overlay">
                  <span className="dest-tag">Day 3</span>
                  <h4>Nassau, Bahamas</h4>
                  <p>
                    Explore the vibrant culture, colorful colonial architecture, and
                    stunning beaches of the Bahamas capital. Don&apos;t miss the famous
                    Junkanoo Beach and the Queen&apos;s Staircase.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".3s">
              <div className="hm-destination-card">
                <img
                  src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80"
                  alt="CocoCay"
                />
                <div className="dest-overlay">
                  <span className="dest-tag">Day 4</span>
                  <h4>CocoCay, Bahamas</h4>
                  <p>
                    A private island paradise with pristine white sand beaches, crystal-clear
                    waters, and exclusive amenities. Perfect for relaxation and water sports.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".4s">
              <div className="hm-destination-card">
                <img
                  src="https://images.unsplash.com/photo-1559599238-308793637427?w=600&q=80"
                  alt="Cozumel, Mexico"
                />
                <div className="dest-overlay">
                  <span className="dest-tag">Day 6</span>
                  <h4>Cozumel, Mexico</h4>
                  <p>
                    Discover world-class snorkeling, ancient Mayan ruins, and authentic
                    Mexican cuisine on this stunning Caribbean island off the Yucatan coast.
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
                  Your 7-Night Itinerary
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
                    Board the ship, settle into your cabin, and meet your cabin buddy.
                    Welcome aboard mixer on the main deck with drinks and music as we
                    set sail into the sunset. Community introductions and icebreakers follow.
                  </p>
                </div>
              </div>

              <div className="hm-itinerary-item wow fadeInUp" data-wow-delay=".15s">
                <div className="hm-itinerary-day">
                  <span className="day-label">Day</span>
                  <span className="day-num">2</span>
                </div>
                <div className="hm-itinerary-content">
                  <h4>Day at Sea</h4>
                  <div className="location">
                    <i className="fa-solid fa-water"></i> Open Ocean
                  </div>
                  <p>
                    Morning yoga on the deck, pool party, networking brunch, and afternoon
                    activities. Evening features a themed dinner and the first official
                    Hustle Mentality deck party with a live DJ.
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
                    <i className="fa-solid fa-location-dot"></i> Nassau, Bahamas
                  </div>
                  <p>
                    Explore the colorful streets and rich culture of Nassau. Group excursion
                    options include snorkeling at the reef, a cultural walking tour of
                    downtown, or a beach day at Junkanoo Beach.
                  </p>
                </div>
              </div>

              <div className="hm-itinerary-item wow fadeInUp" data-wow-delay=".25s">
                <div className="hm-itinerary-day">
                  <span className="day-label">Day</span>
                  <span className="day-num">4</span>
                </div>
                <div className="hm-itinerary-content">
                  <h4>CocoCay Private Island</h4>
                  <div className="location">
                    <i className="fa-solid fa-location-dot"></i> CocoCay, Bahamas
                  </div>
                  <p>
                    A full day on a private island paradise. Water sports, beach volleyball,
                    floating bar, and island exploration. Group cabana experience and
                    sunset beach bonfire to close out the day.
                  </p>
                </div>
              </div>

              <div className="hm-itinerary-item wow fadeInUp" data-wow-delay=".3s">
                <div className="hm-itinerary-day">
                  <span className="day-label">Day</span>
                  <span className="day-num">5</span>
                </div>
                <div className="hm-itinerary-content">
                  <h4>Day at Sea</h4>
                  <div className="location">
                    <i className="fa-solid fa-water"></i> Open Ocean
                  </div>
                  <p>
                    Spa and wellness day, cooking class with the ship&apos;s chef,
                    afternoon karaoke competition, and trivia. Evening features
                    a formal community dinner and awards night.
                  </p>
                </div>
              </div>

              <div className="hm-itinerary-item wow fadeInUp" data-wow-delay=".35s">
                <div className="hm-itinerary-day">
                  <span className="day-label">Day</span>
                  <span className="day-num">6</span>
                </div>
                <div className="hm-itinerary-content">
                  <h4>Cozumel, Mexico</h4>
                  <div className="location">
                    <i className="fa-solid fa-location-dot"></i> Cozumel, Mexico
                  </div>
                  <p>
                    World-class snorkeling and diving, zip-line adventures through the
                    jungle, or explore ancient Mayan ruins. Group taco tour and tequila
                    tasting in the evening before returning to the ship.
                  </p>
                </div>
              </div>

              <div className="hm-itinerary-item wow fadeInUp" data-wow-delay=".4s">
                <div className="hm-itinerary-day">
                  <span className="day-label">Day</span>
                  <span className="day-num">7</span>
                </div>
                <div className="hm-itinerary-content">
                  <h4>Final Day at Sea</h4>
                  <div className="location">
                    <i className="fa-solid fa-water"></i> Open Ocean — Heading Home
                  </div>
                  <p>
                    Last full day onboard. Morning fitness challenge, afternoon pool
                    party, farewell community dinner, and the grand finale — an all-white
                    deck party to close out an unforgettable week.
                  </p>
                </div>
              </div>

              <div className="hm-itinerary-item wow fadeInUp" data-wow-delay=".45s">
                <div className="hm-itinerary-day" style={{ background: "var(--theme-color1)" }}>
                  <span className="day-label" style={{ color: "var(--theme-color2)" }}>Day</span>
                  <span className="day-num" style={{ color: "var(--theme-color2)" }}>8</span>
                </div>
                <div className="hm-itinerary-content" style={{ borderLeftColor: "var(--theme-color3)" }}>
                  <h4>Return to Miami</h4>
                  <div className="location">
                    <i className="fa-solid fa-location-dot"></i> Port of Miami, Florida
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
                March 2027
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
