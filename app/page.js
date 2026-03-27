export default function Home() {
  return (
    <>
     {/* Hero Section Start */}
    <section
      id="home"
      className="hero-section-2 fix hero-2 bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=80')",
      }}
    >
      <div className="hero-items">
        <div className="content">
          <h1 className="hero-title char-animation">
            Set Sail With <br /> <span>Your Tribe</span>
          </h1>
          <p className="wow fadeInUp" data-wow-delay=".3s">
            Join the Hustle Mentality community for an unforgettable cruise
            experience. Connect with fellow travelers, match with your perfect cabin
            partner, and embark on the voyage of a lifetime.
          </p>
          <a className="theme-btn-main wow fadeInUp" data-wow-delay=".5s" href="/signup">
            <span className="theme-btn-arrow-left">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
            <span className="theme-btn">Reserve Your Spot</span>
            <span className="theme-btn-arrow-right">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </a>
        </div>
        <div className="hero-wrap wow fadeInUp" data-wow-delay=".3s">
          <div className="hero-thumb">
            <img
              src="https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=600&q=80"
              alt="The Bahamas Wave cruise destination"
            />
            <div className="small-content">
              <h4 className="title">The Bahamas Wave - March 2027</h4>
              <a href="/trip" className="icon">
                <i className="fa-solid fa-arrow-right"></i>
              </a>
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
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Who We Are</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Community-Driven Cruise Experiences Like No Other
                </h2>
              </div>
              <div className="about-wrap">
                <div className="about-counter wow fadeInUp" data-wow-delay=".3s">
                  <h3 className="count-box">
                    <span className="count-text" data-speed="3000" data-stop="7">
                      0
                    </span>{" "}
                    Nights
                  </h3>
                  <p>
                    Of Pure <br /> Adventure
                  </p>
                  <a className="theme-btn-main" href="/trip">
                    <span className="theme-btn-arrow-left">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                    <span className="theme-btn">View Trip Details</span>
                    <span className="theme-btn-arrow-right">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </a>
                </div>
                <div className="about-right-items">
                  <div className="about-text wow fadeInUp" data-wow-delay=".3s">
                    Hustle Mentality brings together adventurous travelers who
                    share a love for the open sea, vibrant culture, and unforgettable
                    experiences. We organize community-driven cruise trips where guests
                    travel together, connect before departure, and create lifelong
                    memories.
                  </div>
                  <div className="about-icon-items wow fadeInUp" data-wow-delay=".5s">
                    <div className="icon-items">
                      <div className="icon">
                        <i
                          className="fa-solid fa-ship fa-2x"
                          style={{ color: "var(--theme-color1)" }}
                        ></i>
                      </div>
                      <div className="content">
                        <h4 className="title">Curated Voyages</h4>
                        <div className="text">
                          Handpicked cruise itineraries with exciting destinations and
                          onboard experiences tailored for our community.
                        </div>
                      </div>
                    </div>
                    <div className="icon-items">
                      <div className="icon">
                        <i
                          className="fa-solid fa-users fa-2x"
                          style={{ color: "var(--theme-color1)" }}
                        ></i>
                      </div>
                      <div className="content">
                        <h4 className="title">Travel Together</h4>
                        <div className="text">
                          Match with compatible cabin partners, build connections before
                          you board, and travel with your new tribe.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="about-image-1 fix">
              <img
                data-speed=".8"
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
                alt="Cruise ship at sunset"
              />
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
                <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">
                  The Bahamas Wave
                </h6>
              </div>
              <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                7-Night Cruise Experience Awaits You
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="service-wrapper bb-top tp-service-pin">
        <div className="service-block-1 tp-service-panel">
          <div className="container">
            <div className="row g-4 align-items-lg-center">
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="content">
                  <div className="icon">
                    <i className="fa-solid fa-anchor fa-3x" style={{ color: "var(--theme-color1)" }}></i>
                  </div>
                  <h3 className="title">
                    <a href="/trip">
                      The Voyage <span className="d-block">Miami to Bahamas</span>
                    </a>
                  </h3>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="service-image">
                  <img src="https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=600&q=80" alt="Cruise ship departure from Miami" />
                  <img src="https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=600&q=80" alt="" />
                  <span className="number">01<b>.</b></span>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="content-2">
                  <div className="text">
                    Set sail from the Port of Miami for an incredible 7-night journey
                    through the Caribbean. March 2027 marks the beginning of something
                    extraordinary.
                  </div>
                  <a href="/packages" className="link-btn">
                    Reserve Now <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="service-block-1 tp-service-panel">
          <div className="container">
            <div className="row g-4 align-items-lg-center">
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="content">
                  <div className="icon">
                    <i className="fa-solid fa-umbrella-beach fa-3x" style={{ color: "var(--theme-color1)" }}></i>
                  </div>
                  <h3 className="title">
                    <a href="/trip">
                      Destinations <span className="d-block">Island Paradise</span>
                    </a>
                  </h3>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="service-image">
                  <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80" alt="Nassau Bahamas tropical beach" />
                  <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80" alt="" />
                  <span className="number">02<b>.</b></span>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="content-2">
                  <div className="text">
                    Explore Nassau&apos;s vibrant culture and nightlife, relax on
                    CocoCay&apos;s pristine private beaches, and discover the adventure
                    of Cozumel, Mexico.
                  </div>
                  <a href="/trip" className="link-btn">
                    View Itinerary <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="service-block-1 tp-service-panel">
          <div className="container">
            <div className="row g-4 align-items-lg-center">
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="content">
                  <div className="icon">
                    <i className="fa-solid fa-music fa-3x" style={{ color: "var(--theme-color1)" }}></i>
                  </div>
                  <h3 className="title">
                    <a href="/trip">
                      Onboard <span className="d-block">Experience</span>
                    </a>
                  </h3>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="service-image">
                  <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80" alt="Cruise deck party with DJ" />
                  <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80" alt="" />
                  <span className="number">03<b>.</b></span>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="content-2">
                  <div className="text">
                    Deck parties with live DJs, group dining experiences, networking
                    mixers, themed nights, and exclusive community events that keep the
                    vibe alive all cruise long.
                  </div>
                  <a href="/trip" className="link-btn">
                    See Activities <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="service-block-1 tp-service-panel">
          <div className="container">
            <div className="row g-4 align-items-lg-center">
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="content">
                  <div className="icon">
                    <i className="fa-solid fa-water fa-3x" style={{ color: "var(--theme-color1)" }}></i>
                  </div>
                  <h3 className="title">
                    <a href="/trip">
                      Shore <span className="d-block">Excursions</span>
                    </a>
                  </h3>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="service-image">
                  <img src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80" alt="Snorkeling excursion in crystal clear water" />
                  <img src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80" alt="" />
                  <span className="number">04<b>.</b></span>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="content-2">
                  <div className="text">
                    Snorkeling in crystal-clear waters, island tours, zip-lining through
                    tropical canopy, cultural experiences, and guided group adventures at
                    every stop.
                  </div>
                  <a href="/trip" className="link-btn">
                    Explore More <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats Section Start */}
    <section className="experience-speaks-section fix">
      <div className="container">
        <p className="experience-text char-animation">The Hustle Mentality Experience</p>
        <div className="experience-speaks-wrapper wow fadeInUp" data-wow-delay=".3s">
          <div className="experience-speaks-card-items">
            <p>Travelers <br /> Signed Up</p>
            <h3 className="count-box">
              <span className="count-text" data-speed="3000" data-stop="500">0</span>+
            </h3>
          </div>
          <div className="line-shape">
            <img src="images/icons/line-1-2.png" alt="" />
          </div>
          <div className="experience-speaks-card-items">
            <h3 className="count-box style-2">
              <span className="count-text" data-speed="3000" data-stop="98">0</span>%
            </h3>
            <p>Guest <br /> Satisfaction</p>
          </div>
          <div className="line-shape">
            <img src="images/icons/line-1-2.png" alt="" />
          </div>
          <div className="experience-speaks-card-items">
            <p>Destinations <br /> To Explore</p>
            <h3 className="count-box">
              <span className="count-text" data-speed="3000" data-stop="3">0</span>{" "}Stops
            </h3>
          </div>
          <div className="line-shape">
            <img src="images/icons/line-1-2.png" alt="" />
          </div>
          <div className="experience-speaks-card-items">
            <h3 className="count-box style-2">
              <span className="count-text" data-speed="3000" data-stop="7">0</span>{" "}Nights
            </h3>
            <p>Of Nonstop <br /> Adventure</p>
          </div>
        </div>
      </div>
    </section>

    {/* Traveler Profiles Section Start */}
    <section
      className="testimonial-section section-padding fix bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')",
      }}
    >
      <div className="container">
        <div className="row g-4">
          <div className="col-xl-4 col-lg-8">
            <div className="testimonial-left-items-1">
              <div className="sec-title">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle text-white">
                    Traveler Profiles
                  </h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim text-white">
                  Meet Your Future Cabin Buddies
                </h2>
              </div>
              <a className="theme-btn-main wow fadeInUp" data-wow-delay=".3s" href="/contact">
                <span className="theme-btn-arrow-left">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <span className="theme-btn">Create Your Profile</span>
                <span className="theme-btn-arrow-right">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </a>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="ratting-box-items">
              <div className="rating">
                <h3 className="num">4.9</h3>
                <div className="star">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p>From 500+ Travelers, <br /> Community Rated</p>
              </div>
              <div className="client-image">
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80" alt="Traveler 1" className="icon-1" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Traveler 2" className="icon-2" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Traveler 3" className="icon-3" />
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="Traveler 4" className="icon-4" />
              </div>
            </div>
          </div>

          <div className="col-xl-5 col-lg-6 wow fadeInUp" data-wow-delay=".7s">
            <div className="tetsimonial-right-items">
              <div className="swiper testimonial-slider">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="testi-slider-block">
                      <div className="quote-icon">
                        <i className="fa-solid fa-quote-left fa-2x" style={{ color: "var(--theme-color1)" }}></i>
                      </div>
                      <div className="star">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <div className="text">
                        This is my first cruise, super excited. I can&apos;t wait to see
                        the Bahamas. Just learned a new line dance, where&apos;s the DJ!!!
                        Looking for a cabin buddy who loves to have fun and explore.
                      </div>
                      <div className="client-info">
                        <div className="client-img">
                          <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80" alt="Olivia" />
                        </div>
                        <div className="info-content">
                          <h5 className="name">Olivia</h5>
                          <span>Age 28 &bull; Tallahassee, FL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="testi-slider-block">
                      <div className="quote-icon">
                        <i className="fa-solid fa-quote-left fa-2x" style={{ color: "var(--theme-color1)" }}></i>
                      </div>
                      <div className="star">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <div className="text">
                        I love the ocean, plan on sitting on the deck, and tanning. Love
                        the restaurants on the boat. Who wants some girl time? Looking
                        for a chill cabin partner who enjoys good food and relaxation.
                      </div>
                      <div className="client-info">
                        <div className="client-img">
                          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Madison" />
                        </div>
                        <div className="info-content">
                          <h5 className="name">Madison</h5>
                          <span>Age 26 &bull; Houston, TX</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="testi-slider-block">
                      <div className="quote-icon">
                        <i className="fa-solid fa-quote-left fa-2x" style={{ color: "var(--theme-color1)" }}></i>
                      </div>
                      <div className="star">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <div className="text">
                        The Hustle Mentality community vibe is unmatched. Already have my
                        cabin buddy lined up. If you&apos;re on the fence, just book it.
                        You won&apos;t regret it. Let&apos;s get this cruise going!
                      </div>
                      <div className="client-info">
                        <div className="client-img">
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Marcus" />
                        </div>
                        <div className="info-content">
                          <h5 className="name">Marcus</h5>
                          <span>Age 31 &bull; Atlanta, GA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="array-button">
                <button className="array-prev">
                  <i className="far fa-chevron-left"></i>
                </button>
                <button className="array-next">
                  <i className="far fa-chevron-right"></i>
                </button>
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
                <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">
                  Next Steps
                </h6>
              </div>
              <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                Ready to Join the Voyage? Here&apos;s What to Do
              </h2>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 wow fadeInUp">
            <p className="mb-2">
              Getting started is easy. Follow these three steps and you&apos;ll be on
              your way to the cruise experience of a lifetime with the Hustle
              Mentality community.
            </p>
          </div>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-4 wow fadeInUp" data-wow-delay=".3s">
            <div className="dst-step-card">
              <div className="dst-step-number">01</div>
              <div className="dst-step-icon">
                <i className="fa-solid fa-user-plus fa-3x"></i>
              </div>
              <h4 className="dst-step-title">Create Your Account</h4>
              <p className="dst-step-text">
                Sign up on the platform and get access to the full Hustle
                Mentality experience. It only takes a minute.
              </p>
              <a href="/contact" className="link-btn">
                Get Started <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-4 wow fadeInUp" data-wow-delay=".5s">
            <div className="dst-step-card">
              <div className="dst-step-number">02</div>
              <div className="dst-step-icon">
                <i className="fa-solid fa-id-card fa-3x"></i>
              </div>
              <h4 className="dst-step-title">Build Your Profile</h4>
              <p className="dst-step-text">
                Tell us about yourself, your travel style, interests, and what
                you&apos;re looking for in a cabin partner.
              </p>
              <a href="/about" className="link-btn">
                Learn More <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-4 wow fadeInUp" data-wow-delay=".7s">
            <div className="dst-step-card">
              <div className="dst-step-number">03</div>
              <div className="dst-step-icon">
                <i className="fa-solid fa-ship fa-3x"></i>
              </div>
              <h4 className="dst-step-title">Connect &amp; Set Sail</h4>
              <p className="dst-step-text">
                Match with travelers, confirm your cabin partner, complete your
                booking, and get ready for March 2027!
              </p>
              <a href="/packages" className="link-btn">
                Reserve Now <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
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
              Don&apos;t Miss the Voyage
              <br />
              March 2027
            </h3>
            <div className="text wow fadeInUp" data-wow-delay=".3s">
              Join the Hustle Mentality community and be the first to know
              about cruise updates, early bird pricing, and exclusive events.
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
