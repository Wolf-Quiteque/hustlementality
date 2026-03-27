export const metadata = {
  title: "Gallery - Hustle Mentality",
  description: "Browse photos from the Hustle Mentality cruise experience. Deck parties, island excursions, community events, and more.",
};

export default function GalleryPage() {
  return (
    <>
      {/* Page Banner */}
      <section
        className="hm-page-banner bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=1920&q=80')",
        }}
      >
        <div className="container">
          <h1 className="wow fadeInUp">Gallery</h1>
          <div className="hm-breadcrumb wow fadeInUp" data-wow-delay=".2s">
            <a href="/">Home</a>
            <span className="separator">/</span>
            <span>Gallery</span>
          </div>
          <p className="subtitle wow fadeInUp" data-wow-delay=".3s">
            A glimpse of what the Hustle Mentality cruise experience looks like.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Cruise Moments</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Experience the Vibe
                </h2>
              </div>
              <p className="wow fadeInUp mt-3" data-wow-delay=".2s" style={{ color: "var(--text-color)" }}>
                These are the moments waiting for you on The Bahamas Wave.
                From sunset deck parties to crystal-clear island waters.
              </p>
            </div>
          </div>

          <div className="hm-gallery-grid wow fadeInUp" data-wow-delay=".3s">
            <div className="hm-gallery-item tall">
              <img
                src="https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&q=80"
                alt="Sunset deck party"
              />
              <div className="overlay">
                <h5>Sunset Deck Parties</h5>
              </div>
            </div>
            <div className="hm-gallery-item">
              <img
                src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80"
                alt="Tropical beach"
              />
              <div className="overlay">
                <h5>Caribbean Beaches</h5>
              </div>
            </div>
            <div className="hm-gallery-item">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80"
                alt="DJ party"
              />
              <div className="overlay">
                <h5>Live DJ Sets</h5>
              </div>
            </div>
            <div className="hm-gallery-item">
              <img
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80"
                alt="Group dining"
              />
              <div className="overlay">
                <h5>Community Dining</h5>
              </div>
            </div>
            <div className="hm-gallery-item">
              <img
                src="https://images.unsplash.com/photo-1559599238-308793637427?w=600&q=80"
                alt="Island excursion"
              />
              <div className="overlay">
                <h5>Island Adventures</h5>
              </div>
            </div>
            <div className="hm-gallery-item">
              <img
                src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80"
                alt="Crystal clear waters"
              />
              <div className="overlay">
                <h5>Crystal Clear Waters</h5>
              </div>
            </div>
            <div className="hm-gallery-item tall">
              <img
                src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80"
                alt="Snorkeling"
              />
              <div className="overlay">
                <h5>Snorkeling Excursions</h5>
              </div>
            </div>
            <div className="hm-gallery-item">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"
                alt="Morning yoga"
              />
              <div className="overlay">
                <h5>Sunrise Yoga</h5>
              </div>
            </div>
            <div className="hm-gallery-item">
              <img
                src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80"
                alt="Beach activities"
              />
              <div className="overlay">
                <h5>Beach Activities</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Gallery - Full Width Images */}
      <section className="fix section-bg section-padding">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title bg-white">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Destinations</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Where We&apos;re Headed
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".2s">
              <div className="hm-destination-card">
                <img
                  src="https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=600&q=80"
                  alt="Nassau"
                />
                <div className="dest-overlay">
                  <span className="dest-tag">Nassau</span>
                  <h4>Bahamas Capital</h4>
                  <p>Vibrant culture, colorful architecture, and stunning beaches.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".3s">
              <div className="hm-destination-card">
                <img
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80"
                  alt="CocoCay"
                />
                <div className="dest-overlay">
                  <span className="dest-tag">CocoCay</span>
                  <h4>Private Island Paradise</h4>
                  <p>Pristine beaches, water sports, and exclusive amenities.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".4s">
              <div className="hm-destination-card">
                <img
                  src="https://images.unsplash.com/photo-1559599238-308793637427?w=600&q=80"
                  alt="Cozumel"
                />
                <div className="dest-overlay">
                  <span className="dest-tag">Cozumel</span>
                  <h4>Mexican Caribbean</h4>
                  <p>Snorkeling, Mayan ruins, and authentic cuisine.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Moments CTA */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Get Inspired</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Your Photos Could Be Here
                </h2>
              </div>
              <p className="wow fadeInUp mt-3 mb-4" data-wow-delay=".2s" style={{ color: "var(--text-color)" }}>
                Join The Bahamas Wave and create your own unforgettable moments.
                Tag us with #HustleMentality to be featured.
              </p>
              <a href="/packages" className="theme-btn-main wow fadeInUp" data-wow-delay=".3s">
                <span className="theme-btn-arrow-left">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <span className="theme-btn">Reserve Your Spot</span>
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
