export const metadata = {
  title: "Packages & Pricing - Hustle Mentality",
  description: "View cabin packages and pricing for The Bahamas Wave aboard the Norwegian Getaway. Choose from Inside, Oceanview, Balcony, Club Suite, or Haven cabins.",
};

export default function PackagesPage() {
  return (
    <>
      {/* Page Banner */}
      <section
        className="hm-page-banner bg-cover"
        style={{
          backgroundImage: "url('/images/turnups/02.jpeg')",
        }}
      >
        <div className="container">
          <h1 className="wow fadeInUp">Packages &amp; Pricing</h1>
          <div className="hm-breadcrumb wow fadeInUp" data-wow-delay=".2s">
            <a href="/">Home</a>
            <span className="separator">/</span>
            <span>Packages</span>
          </div>
          <p className="subtitle wow fadeInUp" data-wow-delay=".3s">
            Choose the cabin that fits your style. All packages include the full Hustle Mentality experience aboard the Norwegian Getaway.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding fix hm-packages-pricing">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Choose Your Cabin</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  The Bahamas Wave Packages
                </h2>
              </div>
              <p className="wow fadeInUp mt-3" data-wow-delay=".2s" style={{ color: "var(--text-color)" }}>
                Every package includes 3 nights accommodation on the Norwegian Getaway, all meals, community events,
                deck parties, and access to the full Hustle Mentality experience.
              </p>
            </div>
          </div>

          {/* Row 1: Standard Cabins */}
          <div className="row g-4 justify-content-center">
            {/* Inside */}
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="hm-pricing-card">
                <div className="plan-icon">
                  <i className="fa-solid fa-bed"></i>
                </div>
                <h4 className="plan-name">Inside</h4>
                <div className="plan-price">
                  $577<span>/person</span>
                </div>
                <div className="plan-period">47 cabins &bull; 2–3 guests</div>
                <ul className="plan-features">
                  <li>
                    <i className="fa-solid fa-check"></i>
                    3-night cruise accommodation
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    All meals included (buffet &amp; dining room)
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Community events &amp; deck parties
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Cabin buddy matching
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Hustle Mentality welcome kit
                  </li>
                  <li className="not-included">
                    <i className="fa-solid fa-times"></i>
                    Ocean view / balcony
                  </li>
                  <li className="not-included">
                    <i className="fa-solid fa-times"></i>
                    Priority excursion booking
                  </li>
                </ul>
                <a href="/contact" className="theme-btn-main" style={{ width: "100%", justifyContent: "center" }}>
                  <span className="theme-btn-arrow-left">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="theme-btn">Reserve Now</span>
                  <span className="theme-btn-arrow-right">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>

            {/* Oceanview */}
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="hm-pricing-card">
                <div className="plan-icon">
                  <i className="fa-solid fa-window-maximize"></i>
                </div>
                <h4 className="plan-name">Oceanview</h4>
                <div className="plan-price">
                  $636<span>/person</span>
                </div>
                <div className="plan-period">12 cabins &bull; 2–3 guests</div>
                <ul className="plan-features">
                  <li>
                    <i className="fa-solid fa-check"></i>
                    3-night cruise accommodation
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    All meals included (buffet &amp; dining room)
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Community events &amp; deck parties
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Cabin buddy matching
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Hustle Mentality welcome kit
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Picture window ocean view
                  </li>
                  <li className="not-included">
                    <i className="fa-solid fa-times"></i>
                    Private balcony
                  </li>
                </ul>
                <a href="/contact" className="theme-btn-main" style={{ width: "100%", justifyContent: "center" }}>
                  <span className="theme-btn-arrow-left">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="theme-btn">Reserve Now</span>
                  <span className="theme-btn-arrow-right">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>

            {/* Balcony - Featured */}
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".4s">
              <div className="hm-pricing-card featured">
                <div className="plan-icon">
                  <i className="fa-solid fa-ship"></i>
                </div>
                <h4 className="plan-name">Balcony</h4>
                <div className="plan-price">
                  $725<span>/person</span>
                </div>
                <div className="plan-period">57 cabins &bull; 2–3 guests</div>
                <ul className="plan-features">
                  <li>
                    <i className="fa-solid fa-check"></i>
                    3-night cruise accommodation
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    All meals included (buffet, dining &amp; specialty)
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Community events &amp; deck parties
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Cabin buddy matching
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Hustle Mentality welcome kit + merch
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Private balcony with ocean view
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Priority excursion booking
                  </li>
                </ul>
                <a href="/contact" className="theme-btn-main" style={{ width: "100%", justifyContent: "center" }}>
                  <span className="theme-btn-arrow-left">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="theme-btn">Reserve Now</span>
                  <span className="theme-btn-arrow-right">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Row 2: Premium Cabins */}
          <div className="row g-4 justify-content-center mt-2">
            {/* Club Balcony Suite */}
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="hm-pricing-card">
                <div className="plan-icon">
                  <i className="fa-solid fa-star"></i>
                </div>
                <h4 className="plan-name">Club Balcony Suite</h4>
                <div className="plan-price">
                  $855<span>/person</span>
                </div>
                <div className="plan-period">4 cabins &bull; 2 guests</div>
                <ul className="plan-features">
                  <li>
                    <i className="fa-solid fa-check"></i>
                    3-night suite accommodation
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    All meals + specialty dining
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    VIP community events &amp; deck parties
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Premium welcome kit + exclusive merch
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Private balcony &amp; premium location
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Concierge service
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Priority excursion booking
                  </li>
                </ul>
                <a href="/contact" className="theme-btn-main" style={{ width: "100%", justifyContent: "center" }}>
                  <span className="theme-btn-arrow-left">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="theme-btn">Reserve Now</span>
                  <span className="theme-btn-arrow-right">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>

            {/* Haven Suite */}
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="hm-pricing-card">
                <div className="plan-icon">
                  <i className="fa-solid fa-crown"></i>
                </div>
                <h4 className="plan-name">Haven Suite</h4>
                <div className="plan-price">
                  From $1,559<span>/person</span>
                </div>
                <div className="plan-period">5 cabins &bull; 2–3 guests</div>
                <ul className="plan-features">
                  <li>
                    <i className="fa-solid fa-check"></i>
                    3-night Haven suite accommodation
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    All meals + unlimited specialty dining
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    VIP community events &amp; deck parties
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Haven exclusive area access
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Butler &amp; concierge service
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Private balcony &amp; priority embarkation
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Premium beverage package
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Private Haven restaurant &amp; lounge
                  </li>
                </ul>
                <p style={{ fontSize: "13px", color: "var(--text-color)", marginTop: "10px", marginBottom: "15px" }}>
                  Penthouse $1,559/pp &bull; Family Villa $2,080/pp
                </p>
                <a href="/contact" className="theme-btn-main" style={{ width: "100%", justifyContent: "center" }}>
                  <span className="theme-btn-arrow-left">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="theme-btn">Reserve Now</span>
                  <span className="theme-btn-arrow-right">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding fix section-bg">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title bg-white">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">The Details</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  What&apos;s Included in Every Package
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="hm-value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-utensils"></i>
                </div>
                <h5>All Meals</h5>
                <p>Breakfast, lunch, dinner, and snacks. Buffet and main dining room included with every package.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="hm-value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-music"></i>
                </div>
                <h5>Deck Parties</h5>
                <p>Exclusive Hustle Mentality themed deck parties with live DJs, entertainment, and community vibes.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".4s">
              <div className="hm-value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-people-group"></i>
                </div>
                <h5>Community Events</h5>
                <p>Networking mixers, group dining, themed nights, and activities designed to connect you with your tribe.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".5s">
              <div className="hm-value-card">
                <div className="value-icon">
                  <i className="fa-solid fa-gift"></i>
                </div>
                <h5>Welcome Kit</h5>
                <p>Custom Hustle Mentality welcome kit with branded essentials to kick off your cruise experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="section-padding fix hm-packages-payment">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6 wow fadeInUp">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Flexible Options</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Payment Plans Available
                </h2>
              </div>
              <div className="mt-4" style={{ lineHeight: 1.7, color: "var(--text-color)" }}>
                <p>
                  We believe everyone deserves an incredible cruise experience. That&apos;s why
                  we offer a structured payment plan to help you secure your spot and pay over time.
                </p>
              </div>
              <ul className="choose-us-block-content1 mt-3">
                <li className="wow fadeInUp" data-wow-delay=".2s">
                  <div className="icon">
                    <i className="fa-solid fa-credit-card fa-2x" style={{ color: "var(--theme-color3)" }}></i>
                  </div>
                  <div className="content">
                    <h4 className="title">10% Deposit</h4>
                    <div className="text">
                      Lock in your spot with a 10% deposit of your total fare. Your cabin is reserved
                      the moment we receive your deposit.
                    </div>
                  </div>
                </li>
                <li className="wow fadeInUp" data-wow-delay=".3s">
                  <div className="icon">
                    <i className="fa-solid fa-calendar-days fa-2x" style={{ color: "var(--theme-color3)" }}></i>
                  </div>
                  <div className="content">
                    <h4 className="title">Scheduled Payments</h4>
                    <div className="text">
                      25% due 6 months before sailing, another 25% at 4 months, and the
                      remaining balance due 2 months before departure.
                    </div>
                  </div>
                </li>
                <li className="wow fadeInUp" data-wow-delay=".4s">
                  <div className="icon">
                    <i className="fa-solid fa-percent fa-2x" style={{ color: "var(--theme-color3)" }}></i>
                  </div>
                  <div className="content">
                    <h4 className="title">Pay in Full &amp; Save</h4>
                    <div className="text">
                      Prefer to pay up front? Full payment is always accepted and
                      locks in your rate immediately. No surprises, no deadlines.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
              <div style={{ borderRadius: "20px", overflow: "hidden" }}>
                <img
                  src="/images/turnups/03.jpeg"
                  alt="Festive crowd energy"
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
                Lock In Your Spot Today
              </h3>
              <div className="text wow fadeInUp" data-wow-delay=".3s">
                125 cabins. 294 guests. Reserve yours with a 10% deposit and start your payment plan.
              </div>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".5s">
              <a href="/contact" className="theme-btn-main">
                <span className="theme-btn-arrow-left">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <span className="theme-btn">Contact Us to Book</span>
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
