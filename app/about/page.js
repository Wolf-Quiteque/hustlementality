export const metadata = {
  title: "About Us - Hustle Mentality",
  description: "Learn about Hustle Mentality - a community-driven cruise experience company bringing travelers together for unforgettable voyages.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Banner */}
      <section
        className="hm-page-banner bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80')",
        }}
      >
        <div className="container">
          <h1 className="wow fadeInUp">About Us</h1>
          <div className="hm-breadcrumb wow fadeInUp" data-wow-delay=".2s">
            <a href="/">Home</a>
            <span className="separator">/</span>
            <span>About Us</span>
          </div>
          <p className="subtitle wow fadeInUp" data-wow-delay=".3s">
            Building a community of travelers who hustle hard and vacation harder.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-xl-6 col-lg-6 wow fadeInUp">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Our Story</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Born From a Love of Travel &amp; Community
                </h2>
              </div>
              <div className="about-text mt-4" style={{
                padding: "20px 24px",
                background: "rgba(240, 244, 248, 0.95)",
                borderRadius: "12px",
                borderLeft: "4px solid var(--theme-color1)",
                lineHeight: 1.7,
              }}>
                Hustle Mentality started with a simple idea: what if we could bring together
                like-minded travelers who work hard and deserve an incredible vacation experience?
                Founded in Miami, we&apos;re building a movement that combines the energy of
                entrepreneurial spirits with the relaxation of the open sea.
              </div>
              <div className="about-text mt-3" style={{
                padding: "20px 24px",
                background: "rgba(240, 244, 248, 0.95)",
                borderRadius: "12px",
                borderLeft: "4px solid var(--theme-color3)",
                lineHeight: 1.7,
              }}>
                Our first cruise — The Bahamas Wave — sets sail in March 2027, and we&apos;re
                already building a community of 500+ travelers who are ready to embark on this
                journey together. We believe that the best vacations are the ones shared with
                people who match your vibe.
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 wow fadeInUp" data-wow-delay=".3s">
              <div style={{ borderRadius: "20px", overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80"
                  alt="Group of friends on a cruise"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding fix section-bg pt-0">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title bg-white">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">What Drives Us</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Our Mission &amp; Vision
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="dst-step-card" style={{ textAlign: "left" }}>
                <div className="dst-step-icon" style={{ textAlign: "center" }}>
                  <i className="fa-solid fa-bullseye fa-3x"></i>
                </div>
                <h4 className="dst-step-title" style={{ textAlign: "center" }}>Our Mission</h4>
                <p className="dst-step-text">
                  To create unforgettable community-driven travel experiences that connect
                  ambitious, fun-loving travelers. We match cabin partners, curate onboard
                  events, and build a tribe of people who share a passion for adventure and
                  good vibes.
                </p>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".4s">
              <div className="dst-step-card" style={{ textAlign: "left" }}>
                <div className="dst-step-icon" style={{ textAlign: "center" }}>
                  <i className="fa-solid fa-eye fa-3x"></i>
                </div>
                <h4 className="dst-step-title" style={{ textAlign: "center" }}>Our Vision</h4>
                <p className="dst-step-text">
                  To become the go-to community cruise platform for travelers who hustle hard
                  and play harder. We envision a world where solo travelers never have to
                  vacation alone, and every cruise becomes a family reunion of kindred spirits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">What We Stand For</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Our Core Values
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="hm-value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-users"></i>
                </div>
                <h5>Community First</h5>
                <p>Everything we do is about bringing people together. The connections made on our cruises last a lifetime.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="hm-value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h5>Safety &amp; Trust</h5>
                <p>Verified profiles, secure payments, and a dedicated team ensure every traveler feels safe and supported.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".4s">
              <div className="hm-value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-fire"></i>
                </div>
                <h5>Hustle &amp; Heart</h5>
                <p>We celebrate people who work hard and deserve to play hard. Our cruises are the reward for the grind.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".5s">
              <div className="hm-value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-compass"></i>
                </div>
                <h5>Adventure Awaits</h5>
                <p>From deck parties to island excursions, we curate experiences that push boundaries and create memories.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="section-padding fix section-bg">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title bg-white">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">The Crew</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Meet the Team Behind Hustle Mentality
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="hm-team-card">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80"
                  alt="CEO"
                  className="team-img"
                />
                <div className="team-info">
                  <h5>Marcus Johnson</h5>
                  <span>Founder &amp; CEO</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="hm-team-card">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80"
                  alt="Head of Experience"
                  className="team-img"
                />
                <div className="team-info">
                  <h5>Aisha Williams</h5>
                  <span>Head of Experience</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".4s">
              <div className="hm-team-card">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80"
                  alt="Head of Operations"
                  className="team-img"
                />
                <div className="team-info">
                  <h5>Devon Carter</h5>
                  <span>Head of Operations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-xl-6 col-lg-6 wow fadeInUp">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Why Us</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Why Travel With Hustle Mentality?
                </h2>
              </div>
              <ul className="choose-us-block-content1 mt-4">
                <li className="wow fadeInUp" data-wow-delay=".2s">
                  <div className="icon">
                    <i className="fa-solid fa-handshake fa-2x" style={{ color: "var(--theme-color3)" }}></i>
                  </div>
                  <div className="content">
                    <h4 className="title">Cabin Partner Matching</h4>
                    <div className="text">
                      Never cruise alone. Our matching system pairs you with compatible
                      travelers based on interests, lifestyle, and travel preferences.
                    </div>
                  </div>
                </li>
                <li className="wow fadeInUp" data-wow-delay=".3s">
                  <div className="icon">
                    <i className="fa-solid fa-calendar-check fa-2x" style={{ color: "var(--theme-color3)" }}></i>
                  </div>
                  <div className="content">
                    <h4 className="title">Curated Events &amp; Activities</h4>
                    <div className="text">
                      From themed deck parties to group excursions, every moment is
                      planned to maximize fun and connection.
                    </div>
                  </div>
                </li>
                <li className="wow fadeInUp" data-wow-delay=".4s">
                  <div className="icon">
                    <i className="fa-solid fa-wallet fa-2x" style={{ color: "var(--theme-color3)" }}></i>
                  </div>
                  <div className="content">
                    <h4 className="title">Flexible Payment Plans</h4>
                    <div className="text">
                      We make the cruise accessible with flexible payment options
                      so you can lock in your spot and pay over time.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-xl-6 col-lg-6 wow fadeInUp" data-wow-delay=".3s">
              <div style={{ borderRadius: "20px", overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80"
                  alt="Friends on cruise deck"
                  style={{ width: "100%", height: "auto" }}
                />
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
                Ready to Join the Movement?
              </h3>
              <div className="text wow fadeInUp" data-wow-delay=".3s">
                Be part of the Hustle Mentality community. The Bahamas Wave sets sail March 2027.
              </div>
            </div>
            <form action="#" className="wow fadeInUp" data-wow-delay=".5s">
              <input type="email" placeholder="Enter your email" />
              <button type="submit" className="theme-btn-main">
                <span className="theme-btn-arrow-left">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <span className="theme-btn">Join the Waitlist</span>
                <span className="theme-btn-arrow-right">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
