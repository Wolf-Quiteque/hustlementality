import { getSiteContent, parseJson, text } from "../lib/api";

export const metadata = {
  title: "About Us - Hustle Mentality",
  description: "Learn about Hustle Mentality - a community-driven cruise experience company bringing travelers together for unforgettable voyages.",
};

export default async function AboutPage() {
  const c = await getSiteContent("about");

  const bannerImage = text(c, "about_banner_image", "/images/turnups/05.jpeg");
  const bannerSubtitle = text(c, "about_banner_subtitle", "Building a community of travelers who hustle hard and vacation harder.");

  const storyTitle = text(c, "about_story_title", "Born From a Love of Travel & Community");
  const storyP1 = text(c, "about_story_p1", "Hustle Mentality started with a simple idea: what if we could bring together like-minded travelers who work hard and deserve an incredible vacation experience? Founded in Miami, we're building a movement that combines the energy of entrepreneurial spirits with the relaxation of the open sea.");
  const storyP2 = text(c, "about_story_p2", "Our first cruise — The Bahamas Wave — sets sail in March 2027, and we're already building a community of 500+ travelers who are ready to embark on this journey together. We believe that the best vacations are the ones shared with people who match your vibe.");
  const storyImage = text(c, "about_story_image", "/images/turnups/06.jpeg");

  const mission = text(c, "about_mission", "To create unforgettable community-driven travel experiences that connect ambitious, fun-loving travelers. We match cabin partners, curate onboard events, and build a tribe of people who share a passion for adventure and good vibes.");
  const vision = text(c, "about_vision", "To become the go-to community cruise platform for travelers who hustle hard and play harder. We envision a world where solo travelers never have to vacation alone, and every cruise becomes a family reunion of kindred spirits.");

  const values = parseJson(c, "about_values", [
    { icon: "fa-solid fa-users", title: "Community First", text: "Everything we do is about bringing people together. The connections made on our cruises last a lifetime." },
    { icon: "fa-solid fa-shield-halved", title: "Safety & Trust", text: "Verified profiles, secure payments, and a dedicated team ensure every traveler feels safe and supported." },
    { icon: "fa-solid fa-fire", title: "Hustle & Heart", text: "We celebrate people who work hard and deserve to play hard. Our cruises are the reward for the grind." },
    { icon: "fa-solid fa-compass", title: "Adventure Awaits", text: "From deck parties to island excursions, we curate experiences that push boundaries and create memories." },
  ]);

  const team = parseJson(c, "about_team", [
    { name: "Marcus Johnson", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" },
    { name: "Aisha Williams", role: "Head of Experience", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80" },
    { name: "Devon Carter", role: "Head of Operations", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80" },
  ]);

  const whyUs = parseJson(c, "about_why_us", [
    { icon: "fa-solid fa-handshake", title: "Cabin Partner Matching", text: "Never cruise alone. Our matching system pairs you with compatible travelers based on interests, lifestyle, and travel preferences." },
    { icon: "fa-solid fa-calendar-check", title: "Curated Events & Activities", text: "From themed deck parties to group excursions, every moment is planned to maximize fun and connection." },
    { icon: "fa-solid fa-wallet", title: "Flexible Payment Plans", text: "We make the cruise accessible with flexible payment options so you can lock in your spot and pay over time." },
  ]);
  const whyUsImage = text(c, "about_why_us_image", "/images/turnups/01.jpeg");

  return (
    <>
      {/* Page Banner */}
      <section className="hm-page-banner bg-cover" style={{ backgroundImage: `url('${bannerImage}')` }}>
        <div className="container">
          <h1 className="wow fadeInUp">About Us</h1>
          <div className="hm-breadcrumb wow fadeInUp" data-wow-delay=".2s">
            <a href="/">Home</a><span className="separator">/</span><span>About Us</span>
          </div>
          <p className="subtitle wow fadeInUp" data-wow-delay=".3s">{bannerSubtitle}</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-xl-6 col-lg-6 wow fadeInUp">
              <div className="sec-title mb-0">
                <div className="sec-sub-title"><h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Our Story</h6></div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">{storyTitle}</h2>
              </div>
              <div className="about-text mt-4" style={{ padding: "20px 24px", background: "rgba(26,27,46,0.95)", borderRadius: "12px", borderLeft: "4px solid var(--theme-color1)", lineHeight: 1.7 }}>
                {storyP1}
              </div>
              <div className="about-text mt-3" style={{ padding: "20px 24px", background: "rgba(26,27,46,0.95)", borderRadius: "12px", borderLeft: "4px solid var(--theme-color3)", lineHeight: 1.7 }}>
                {storyP2}
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 wow fadeInUp" data-wow-delay=".3s">
              <div style={{ borderRadius: "20px", overflow: "hidden" }}>
                <img src={storyImage} alt="Group of friends on a cruise" style={{ width: "100%", height: "auto" }} />
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
                <div className="sec-sub-title bg-white"><h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">What Drives Us</h6></div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">Our Mission &amp; Vision</h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="dst-step-card" style={{ textAlign: "left" }}>
                <div className="dst-step-icon" style={{ textAlign: "center" }}><i className="fa-solid fa-bullseye fa-3x"></i></div>
                <h4 className="dst-step-title" style={{ textAlign: "center" }}>Our Mission</h4>
                <p className="dst-step-text">{mission}</p>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".4s">
              <div className="dst-step-card" style={{ textAlign: "left" }}>
                <div className="dst-step-icon" style={{ textAlign: "center" }}><i className="fa-solid fa-eye fa-3x"></i></div>
                <h4 className="dst-step-title" style={{ textAlign: "center" }}>Our Vision</h4>
                <p className="dst-step-text">{vision}</p>
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
                <div className="sec-sub-title"><h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">What We Stand For</h6></div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">Our Core Values</h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            {values.map((val, i) => (
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`${0.2 + i * 0.1}s`} key={i}>
                <div className="hm-value-card">
                  <div className="value-icon"><i className={val.icon}></i></div>
                  <h5>{val.title}</h5>
                  <p>{val.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      {/*
      <section className="section-padding fix section-bg">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title bg-white"><h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">The Crew</h6></div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">Meet the Team Behind Hustle Mentality</h2>
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {team.map((member, i) => (
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${0.2 + i * 0.1}s`} key={i}>
                <div className="hm-team-card">
                  <img src={member.image} alt={member.role} className="team-img" />
                  <div className="team-info">
                    <h5>{member.name}</h5>
                    <span>{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Why Choose Us */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-xl-6 col-lg-6 wow fadeInUp">
              <div className="sec-title mb-0">
                <div className="sec-sub-title"><h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Why Us</h6></div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">Why Travel With Hustle Mentality?</h2>
              </div>
              <ul className="choose-us-block-content1 mt-4">
                {whyUs.map((item, i) => (
                  <li className="wow fadeInUp" data-wow-delay={`${0.2 + i * 0.1}s`} key={i}>
                    <div className="icon"><i className={`${item.icon} fa-2x`} style={{ color: "var(--theme-color3)" }}></i></div>
                    <div className="content">
                      <h4 className="title">{item.title}</h4>
                      <div className="text">{item.text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-xl-6 col-lg-6 wow fadeInUp" data-wow-delay=".3s">
              <div style={{ borderRadius: "20px", overflow: "hidden" }}>
                <img src={whyUsImage} alt="Friends on cruise deck" style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner-section bg-cover" style={{ backgroundImage: "url('images/icons/line-1-1.png')" }}>
        <div className="container">
          <div className="cta-banner-wrapper">
            <div className="content">
              <h3 className="title char-animation">Ready to Join the Movement?</h3>
              <div className="text wow fadeInUp" data-wow-delay=".3s">Be part of the Hustle Mentality community. The Bahamas Wave sets sail March 2027.</div>
            </div>
            <form action="#" className="wow fadeInUp" data-wow-delay=".5s">
              <input type="email" placeholder="Enter your email" />
              <button type="submit" className="theme-btn-main">
                <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                <span className="theme-btn">Join the Waitlist</span>
                <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
