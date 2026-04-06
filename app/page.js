import React from "react";
import { getSiteContent, parseJson, text } from "./lib/api";

export default async function Home() {
  const c = await getSiteContent("home");

  const heroTitle = text(c, "home_hero_title", "Set Sail With Your Tribe");
  const heroSubtitle = text(c, "home_hero_subtitle", "Join the Hustle Mentality community for an unforgettable cruise experience. Connect with fellow travelers, match with your perfect cabin partner, and embark on the voyage of a lifetime.");
  const heroBg = text(c, "home_hero_bg_image", "/images/turnups/04.jpeg");
  const heroThumb = text(c, "home_hero_thumb_image", "/images/turnups/01.jpeg");
  const heroThumbText = text(c, "home_hero_thumb_text", "The Bahamas Wave - March 2027");
  const heroCta = text(c, "home_hero_cta", "Reserve Your Spot");

  const aboutSubtitle = text(c, "home_about_subtitle", "Who We Are");
  const aboutTitle = text(c, "home_about_title", "Community-Driven Cruise Experiences Like No Other");
  const aboutText = text(c, "home_about_text", "Hustle Mentality brings together adventurous travelers who share a love for the open sea, vibrant culture, and unforgettable experiences. We organize community-driven cruise trips where guests travel together, connect before departure, and create lifelong memories.");
  const aboutImage = text(c, "home_about_image", "/images/turnups/03.jpeg");
  const aboutFeatures = parseJson(c, "home_about_features", [
    { icon: "fa-solid fa-ship", title: "Curated Voyages", text: "Handpicked cruise itineraries with exciting destinations and onboard experiences tailored for our community." },
    { icon: "fa-solid fa-users", title: "Travel Together", text: "Match with compatible cabin partners, build connections before you board, and travel with your new tribe." },
  ]);

  const cruiseSubtitle = text(c, "home_cruise_subtitle", "The Bahamas Wave");
  const cruiseTitle = text(c, "home_cruise_title", "7-Night Cruise Experience Awaits You");
  const cruiseBlocks = parseJson(c, "home_cruise_blocks", [
    { icon: "fa-solid fa-anchor", title: "The Voyage", titleLine2: "Miami to Bahamas", text: "Set sail from the Port of Miami for an incredible 7-night journey through the Caribbean. March 2027 marks the beginning of something extraordinary.", image: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=600&q=80", link: "/packages", linkText: "Reserve Now" },
    { icon: "fa-solid fa-umbrella-beach", title: "Destinations", titleLine2: "Island Paradise", text: "Explore Nassau's vibrant culture and nightlife, relax on CocoCay's pristine private beaches, and discover the adventure of Cozumel, Mexico.", image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80", link: "/trip", linkText: "View Itinerary" },
    { icon: "fa-solid fa-music", title: "Onboard", titleLine2: "Experience", text: "Deck parties with live DJs, group dining experiences, networking mixers, themed nights, and exclusive community events that keep the vibe alive all cruise long.", image: "/images/turnups/02.jpeg", link: "/trip", linkText: "See Activities" },
    { icon: "fa-solid fa-water", title: "Shore", titleLine2: "Excursions", text: "Snorkeling in crystal-clear waters, island tours, zip-lining through tropical canopy, cultural experiences, and guided group adventures at every stop.", image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80", link: "/trip", linkText: "Explore More" },
  ]);

  const stats = parseJson(c, "home_stats", [
    { label: "Travelers\nSigned Up", value: "500", suffix: "+" },
    { label: "Guest\nSatisfaction", value: "98", suffix: "%" },
    { label: "Destinations\nTo Explore", value: "3", suffix: " Stops" },
    { label: "Of Nonstop\nAdventure", value: "7", suffix: " Nights" },
  ]);

  const testimonials = parseJson(c, "home_testimonials", [
    { name: "Olivia", age: 28, location: "Tallahassee, FL", text: "This is my first cruise, super excited. I can't wait to see the Bahamas. Just learned a new line dance, where's the DJ!!! Looking for a cabin buddy who loves to have fun and explore.", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80" },
    { name: "Madison", age: 26, location: "Houston, TX", text: "I love the ocean, plan on sitting on the deck, and tanning. Love the restaurants on the boat. Who wants some girl time? Looking for a chill cabin partner who enjoys good food and relaxation.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
    { name: "Marcus", age: 31, location: "Atlanta, GA", text: "The Hustle Mentality community vibe is unmatched. Already have my cabin buddy lined up. If you're on the fence, just book it. You won't regret it. Let's get this cruise going!", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  ]);

  const steps = parseJson(c, "home_steps", [
    { icon: "fa-solid fa-user-plus", title: "Create Your Account", text: "Sign up on the platform and get access to the full Hustle Mentality experience. It only takes a minute." },
    { icon: "fa-solid fa-id-card", title: "Build Your Profile", text: "Tell us about yourself, your travel style, interests, and what you're looking for in a cabin partner." },
    { icon: "fa-solid fa-ship", title: "Connect & Set Sail", text: "Match with travelers, confirm your cabin partner, complete your booking, and get ready for March 2027!" },
  ]);

  const ctaTitleRaw = text(c, "home_cta_title", "Don't Miss the Voyage\nMarch 2027");
  const ctaLines = ctaTitleRaw.split("\n");
  const ctaText = text(c, "home_cta_text", "Join the Hustle Mentality community and be the first to know about cruise updates, early bird pricing, and exclusive events.");

  return (
    <>
     {/* Hero Section Start */}
    <section
      id="home"
      className="hero-section-2 fix hero-2 bg-cover"
      style={{ backgroundImage: `url('${heroBg}')` }}
    >
      <div className="hero-items">
        <div className="content">
          <h1 className="hero-title char-animation">
            {heroTitle.includes("Your Tribe") ? (
              <>Set Sail With <br /> <span>Your Tribe</span></>
            ) : heroTitle}
          </h1>
          <p className="wow fadeInUp" data-wow-delay=".3s">{heroSubtitle}</p>
          <a className="theme-btn-main wow fadeInUp" data-wow-delay=".5s" href="/signup">
            <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
            <span className="theme-btn">{heroCta}</span>
            <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
          </a>
        </div>
        <div className="hero-wrap wow fadeInUp" data-wow-delay=".3s">
          <div className="hero-thumb">
            <img src={heroThumb} alt="The Bahamas Wave cruise destination" />
            <div className="small-content">
              <h4 className="title">{heroThumbText}</h4>
              <a href="/trip" className="icon"><i className="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* About Section Start */}
    <section id="about" className="about-section fix section-padding pt-90">
      <div className="container">
        <div className="row g-4">
          <div className="col-xl-7 col-lg-6">
            <div className="about-block-items-1">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">{aboutSubtitle}</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">{aboutTitle}</h2>
              </div>
              <div className="about-wrap">
                <div className="about-counter wow fadeInUp" data-wow-delay=".3s">
                  <h3 className="count-box">
                    <span className="count-text" data-speed="3000" data-stop="7">0</span>{" "}Nights
                  </h3>
                  <p>Of Pure <br /> Adventure</p>
                  <a className="theme-btn-main" href="/trip">
                    <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                    <span className="theme-btn">View Trip Details</span>
                    <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                  </a>
                </div>
                <div className="about-right-items">
                  <div className="about-text wow fadeInUp" data-wow-delay=".3s">{aboutText}</div>
                  <div className="about-icon-items wow fadeInUp" data-wow-delay=".5s">
                    {aboutFeatures.map((feat, i) => (
                      <div className="icon-items" key={i}>
                        <div className="icon"><i className={`${feat.icon} fa-2x`} style={{ color: "var(--theme-color1)" }}></i></div>
                        <div className="content">
                          <h4 className="title">{feat.title}</h4>
                          <div className="text">{feat.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="about-image-1 fix">
              <img data-speed=".8" src={aboutImage} alt="Cruise ship at sunset" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Service Section (Cruise Overview) Start */}
    <section id="cruise" className="service-section fix section-padding section-bg">
      <div className="container">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-6">
            <div className="sec-title mb-50 text-center">
              <div className="sec-sub-title bg-white">
                <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">{cruiseSubtitle}</h6>
              </div>
              <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">{cruiseTitle}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="service-wrapper bb-top tp-service-pin">
        {cruiseBlocks.map((block, i) => (
          <div className="service-block-1 tp-service-panel" key={i}>
            <div className="container">
              <div className="row g-4 align-items-lg-center">
                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="content">
                    <div className="icon"><i className={`${block.icon} fa-3x`} style={{ color: "var(--theme-color1)" }}></i></div>
                    <h3 className="title">
                      <a href="/trip">{block.title} <span className="d-block">{block.titleLine2}</span></a>
                    </h3>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="service-image">
                    <img src={block.image} alt={block.title} />
                    <img src={block.image} alt="" />
                    <span className="number">{String(i + 1).padStart(2, "0")}<b>.</b></span>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="content-2">
                    <div className="text">{block.text}</div>
                    <a href={block.link} className="link-btn">{block.linkText} <i className="fa-solid fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Stats Section Start */}
    <section className="experience-speaks-section fix">
      <div className="container">
        <p className="experience-text char-animation">The Hustle Mentality Experience</p>
        <div className="experience-speaks-wrapper wow fadeInUp" data-wow-delay=".3s">
          {stats.map((stat, i) => {
            const lines = stat.label.split("\n");
            const isEven = i % 2 === 1;
            return (
              <React.Fragment key={i}>
                {i > 0 && <div className="line-shape"><img src="images/icons/line-1-2.png" alt="" /></div>}
                <div className="experience-speaks-card-items">
                  {!isEven && <p>{lines.map((l, j) => <React.Fragment key={j}>{l}{j < lines.length - 1 && <br />}</React.Fragment>)}</p>}
                  <h3 className={`count-box${isEven ? " style-2" : ""}`}>
                    <span className="count-text" data-speed="3000" data-stop={stat.value}>0</span>{stat.suffix}
                  </h3>
                  {isEven && <p>{lines.map((l, j) => <React.Fragment key={j}>{l}{j < lines.length - 1 && <br />}</React.Fragment>)}</p>}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>

    {/* Traveler Profiles Section Start */}
    <section
      className="testimonial-section section-padding fix bg-cover"
      style={{ backgroundImage: "url('/images/turnups/05.jpeg')" }}
    >
      <div className="container">
        <div className="row g-4">
          <div className="col-xl-4 col-lg-8">
            <div className="testimonial-left-items-1">
              <div className="sec-title">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle text-white">Traveler Profiles</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim text-white">Meet Your Future Cabin Buddies</h2>
              </div>
              <a className="theme-btn-main wow fadeInUp" data-wow-delay=".3s" href="/contact">
                <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                <span className="theme-btn">Create Your Profile</span>
                <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
              </a>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="ratting-box-items">
              <div className="rating">
                <h3 className="num">4.9</h3>
                <div className="star">
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                <p>From 500+ Travelers, <br /> Community Rated</p>
              </div>
              <div className="client-image">
                {testimonials.slice(0, 4).map((t, i) => (
                  <img key={i} src={t.image} alt={t.name} className={`icon-${i + 1}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="col-xl-5 col-lg-6 wow fadeInUp" data-wow-delay=".7s">
            <div className="tetsimonial-right-items">
              <div className="swiper testimonial-slider">
                <div className="swiper-wrapper">
                  {testimonials.map((t, i) => (
                    <div className="swiper-slide" key={i}>
                      <div className="testi-slider-block">
                        <div className="quote-icon"><i className="fa-solid fa-quote-left fa-2x" style={{ color: "var(--theme-color1)" }}></i></div>
                        <div className="star">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        </div>
                        <div className="text">{t.text}</div>
                        <div className="client-info">
                          <div className="client-img"><img src={t.image} alt={t.name} /></div>
                          <div className="info-content">
                            <h5 className="name">{t.name}</h5>
                            <span>Age {t.age} &bull; {t.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="array-button">
                <button className="array-prev"><i className="far fa-chevron-left"></i></button>
                <button className="array-next"><i className="far fa-chevron-right"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Next Steps Section Start */}
    <section className="benefit-section fix section-padding pb-110">
      <div className="container">
        <div className="row g-4 align-items-end mb-30">
          <div className="col-xl-7 col-lg-7">
            <div className="sec-title mb-0">
              <div className="sec-sub-title">
                <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Next Steps</h6>
              </div>
              <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">Ready to Join the Voyage? Here&apos;s What to Do</h2>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 wow fadeInUp">
            <p className="mb-2">Getting started is easy. Follow these three steps and you&apos;ll be on your way to the cruise experience of a lifetime with the Hustle Mentality community.</p>
          </div>
        </div>

        <div className="row g-4 mt-4">
          {steps.map((step, i) => (
            <div className="col-lg-4 wow fadeInUp" data-wow-delay={`${0.3 + i * 0.2}s`} key={i}>
              <div className="dst-step-card">
                <div className="dst-step-number">{String(i + 1).padStart(2, "0")}</div>
                <div className="dst-step-icon"><i className={`${step.icon} fa-3x`}></i></div>
                <h4 className="dst-step-title">{step.title}</h4>
                <p className="dst-step-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Cta Banner Section Start */}
    <section
      id="contact"
      className="cta-banner-section bg-cover"
      style={{ backgroundImage: "url('images/icons/line-1-1.png')" }}
    >
      <div className="container">
        <div className="cta-banner-wrapper">
          <div className="content">
            <h3 className="title char-animation">
              {ctaLines.map((line, i) => (
                <span key={i}>{line}{i < ctaLines.length - 1 && <br />}</span>
              ))}
            </h3>
            <div className="text wow fadeInUp" data-wow-delay=".3s">{ctaText}</div>
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
