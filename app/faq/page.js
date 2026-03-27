export const metadata = {
  title: "FAQ - Hustle Mentality",
  description: "Frequently asked questions about Hustle Mentality cruise experiences, cabin matching, packages, and booking.",
};

export default function FaqPage() {
  return (
    <>
      {/* Page Banner */}
      <section
        className="hm-page-banner bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')",
        }}
      >
        <div className="container">
          <h1 className="wow fadeInUp">Frequently Asked Questions</h1>
          <div className="hm-breadcrumb wow fadeInUp" data-wow-delay=".2s">
            <a href="/">Home</a>
            <span className="separator">/</span>
            <span>FAQ</span>
          </div>
          <p className="subtitle wow fadeInUp" data-wow-delay=".3s">
            Everything you need to know about the Hustle Mentality cruise experience.
          </p>
        </div>
      </section>

      {/* General FAQ */}
      <section className="faq-section section-padding fix">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5 wow fadeInUp">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">General</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  About Hustle Mentality
                </h2>
              </div>
              <p className="mt-3" style={{ color: "var(--text-color)", lineHeight: 1.7 }}>
                New to Hustle Mentality? Here are the most common questions we get
                about who we are and what we do.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="faq-content-1">
                <ul className="accordion-box">
                  <li className="accordion block active-block wow fadeInUp">
                    <div className="acc-btn active">
                      What is Hustle Mentality?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content current">
                      <div className="content">
                        <div className="text">
                          Hustle Mentality is a community-driven cruise experience
                          platform. We organize group cruise trips where travelers can
                          connect before boarding, match with compatible cabin partners,
                          and enjoy curated social activities throughout the voyage. Think
                          of it as a social network meets travel agency for cruise lovers
                          who hustle hard and play harder.
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="accordion block wow fadeInUp" data-wow-delay=".2s">
                    <div className="acc-btn">
                      When does the first cruise depart?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">
                          The Bahamas Wave, our inaugural cruise, sets sail in March 2027.
                          The 7-night voyage departs from the Port of Miami and visits
                          Nassau, CocoCay, and Cozumel. Early bird pricing is available
                          for those who book before December 2026.
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="accordion block wow fadeInUp" data-wow-delay=".3s">
                    <div className="acc-btn">
                      Who is Hustle Mentality for?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">
                          Hustle Mentality is for anyone who loves travel and community.
                          Whether you&apos;re a solo traveler looking for cabin partners,
                          a group of friends wanting a curated experience, or someone
                          who just wants to meet new people on a cruise — we&apos;ve got
                          you covered. Our community celebrates people who work hard and
                          deserve an amazing vacation.
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking FAQ */}
      <section className="faq-section section-padding fix section-bg">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5 wow fadeInUp">
              <div className="sec-title mb-0">
                <div className="sec-sub-title bg-white">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Booking</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Reservations &amp; Payments
                </h2>
              </div>
              <p className="mt-3" style={{ color: "var(--text-color)", lineHeight: 1.7 }}>
                Questions about booking your spot, payment plans, and what&apos;s
                included in each package.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="faq-content-1">
                <ul className="accordion-box">
                  <li className="accordion block active-block wow fadeInUp">
                    <div className="acc-btn active">
                      How do I book my spot?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content current">
                      <div className="content">
                        <div className="text">
                          You can reserve your spot by visiting our Packages page and
                          selecting your preferred cabin type. A $250 deposit secures
                          your cabin. You can also contact us directly and our team will
                          walk you through the booking process.
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="accordion block wow fadeInUp" data-wow-delay=".2s">
                    <div className="acc-btn">
                      What payment plans are available?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">
                          We offer flexible monthly payment plans. After your $250 deposit,
                          the remaining balance can be split into monthly payments as low
                          as $100/month. Full payment must be completed 60 days before
                          departure. We accept all major credit cards and payment methods.
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="accordion block wow fadeInUp" data-wow-delay=".3s">
                    <div className="acc-btn">
                      What&apos;s included in the cruise package?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">
                          All packages include 7-night cabin accommodation, all meals
                          (buffet and main dining room), community events and deck parties,
                          cabin buddy matching, and a Hustle Mentality welcome kit. Higher
                          tier packages include additional perks like specialty dining,
                          ocean view or balcony, priority excursion booking, and beverage packages.
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="accordion block wow fadeInUp" data-wow-delay=".4s">
                    <div className="acc-btn">
                      Is the deposit refundable?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">
                          Yes, the $250 deposit is fully refundable up to 90 days before
                          departure. After that, the deposit is non-refundable but can
                          be transferred to another traveler. Travel insurance is also
                          available for added protection.
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cabin Matching FAQ */}
      <section className="faq-section section-padding fix">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5 wow fadeInUp">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Cabin Matching</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Finding Your Travel Partner
                </h2>
              </div>
              <p className="mt-3" style={{ color: "var(--text-color)", lineHeight: 1.7 }}>
                Our cabin matching system is designed to pair you with compatible
                travelers. Here&apos;s how it works.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="faq-content-1">
                <ul className="accordion-box">
                  <li className="accordion block active-block wow fadeInUp">
                    <div className="acc-btn active">
                      How does cabin matching work?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content current">
                      <div className="content">
                        <div className="text">
                          After creating your traveler profile, our platform uses your
                          preferences, interests, and travel style to suggest compatible
                          cabin partners. You can browse profiles, see compatibility
                          scores, and connect with potential matches. Once both travelers
                          confirm, the cabin pairing is set.
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="accordion block wow fadeInUp" data-wow-delay=".2s">
                    <div className="acc-btn">
                      Can I go solo or do I need a cabin partner?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">
                          You can absolutely join solo! Many of our travelers come alone
                          and find their cabin buddy through our matching system. If you
                          prefer to have the cabin to yourself, solo cabin options are
                          available at a different rate. The goal is flexibility that works for you.
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="accordion block wow fadeInUp" data-wow-delay=".3s">
                    <div className="acc-btn">
                      Can I bring my own cabin partner?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">
                          Of course! If you already have a friend, family member, or
                          partner you want to share a cabin with, you can book together
                          and skip the matching process. Just select the same cabin during
                          booking and both travelers complete their profiles.
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="accordion block wow fadeInUp" data-wow-delay=".4s">
                    <div className="acc-btn">
                      What if my cabin match doesn&apos;t work out?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">
                          We encourage travelers to chat and video call before the trip
                          to make sure the match is a good fit. If issues arise before
                          departure, we can rematch you with another compatible traveler.
                          Our team is available to mediate and ensure everyone has a great experience.
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onboard FAQ */}
      <section className="faq-section section-padding fix section-bg">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5 wow fadeInUp">
              <div className="sec-title mb-0">
                <div className="sec-sub-title bg-white">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Onboard</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  The Cruise Experience
                </h2>
              </div>
              <p className="mt-3" style={{ color: "var(--text-color)", lineHeight: 1.7 }}>
                What to expect once you&apos;re on the ship and enjoying the
                Hustle Mentality experience.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="faq-content-1">
                <ul className="accordion-box">
                  <li className="accordion block active-block wow fadeInUp">
                    <div className="acc-btn active">
                      What events are planned onboard?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content current">
                      <div className="content">
                        <div className="text">
                          We plan a full schedule of community events including welcome
                          mixers, themed deck parties with live DJs, networking brunches,
                          group fitness classes, karaoke nights, trivia competitions,
                          cooking classes, and a grand farewell all-white party. Plus
                          all the regular ship activities and amenities.
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="accordion block wow fadeInUp" data-wow-delay=".2s">
                    <div className="acc-btn">
                      Do I have to participate in group activities?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">
                          Not at all! All community events are optional. You&apos;re free
                          to enjoy the cruise at your own pace — relax by the pool, explore
                          on your own, or join in on the group activities. It&apos;s your
                          vacation, your way. We just make sure there&apos;s always
                          something fun happening if you want to join.
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="accordion block wow fadeInUp" data-wow-delay=".3s">
                    <div className="acc-btn">
                      What about shore excursions?
                      <div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">
                          We organize group excursions at each port of call — snorkeling,
                          cultural tours, zip-lining, beach days, and more. These are
                          optional add-ons. You can also explore independently or book
                          your own excursions. Ocean View and Balcony packages include
                          priority excursion booking.
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section
        className="cta-banner-section bg-cover"
        style={{ backgroundImage: "url('images/icons/line-1-1.png')" }}
      >
        <div className="container">
          <div className="cta-banner-wrapper">
            <div className="content">
              <h3 className="title char-animation">
                Still Have Questions?
              </h3>
              <div className="text wow fadeInUp" data-wow-delay=".3s">
                Our team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
              </div>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".5s">
              <a href="/contact" className="theme-btn-main">
                <span className="theme-btn-arrow-left">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <span className="theme-btn">Contact Us</span>
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
