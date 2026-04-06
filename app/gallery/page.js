import { getSiteContent, parseJson, text } from "../lib/api";

export const metadata = {
  title: "Gallery - Hustle Mentality",
  description: "Browse photos from the Hustle Mentality cruise experience. Deck parties, island excursions, community events, and more.",
};

export default async function GalleryPage() {
  const c = await getSiteContent("gallery");

  const bannerImage = text(c, "gallery_banner_image", "/images/turnups/04.jpeg");

  const images = parseJson(c, "gallery_images", [
    { url: "/images/turnups/01.jpeg", alt: "Packed crowd good vibes", caption: "Good Vibes Only", tall: true },
    { url: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80", alt: "Tropical beach", caption: "Caribbean Beaches" },
    { url: "/images/turnups/02.jpeg", alt: "Neon party night", caption: "Neon Nights" },
    { url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80", alt: "Group dining", caption: "Community Dining" },
    { url: "/images/turnups/03.jpeg", alt: "Golden hour party crowd", caption: "Golden Hour Party" },
    { url: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80", alt: "Crystal clear waters", caption: "Crystal Clear Waters" },
    { url: "/images/turnups/04.jpeg", alt: "Massive crowd main stage", caption: "The Main Stage", tall: true },
    { url: "/images/turnups/05.jpeg", alt: "Hands up celebration", caption: "Hands Up" },
    { url: "/images/turnups/06.jpeg", alt: "Outdoor day party", caption: "Day Party Energy" },
    { url: "/images/turnups/07.jpeg", alt: "Purple reign themed party", caption: "Purple Reign" },
    { url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80", alt: "Beach activities", caption: "Beach Activities" },
  ]);

  const destinations = parseJson(c, "gallery_destinations", [
    { name: "Nassau", title: "Bahamas Capital", text: "Vibrant culture, colorful architecture, and stunning beaches.", image: "https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=600&q=80" },
    { name: "CocoCay", title: "Private Island Paradise", text: "Pristine beaches, water sports, and exclusive amenities.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80" },
    { name: "Cozumel", title: "Mexican Caribbean", text: "Snorkeling, Mayan ruins, and authentic cuisine.", image: "https://images.unsplash.com/photo-1559599238-308793637427?w=600&q=80" },
  ]);

  return (
    <>
      {/* Page Banner */}
      <section className="hm-page-banner bg-cover" style={{ backgroundImage: `url('${bannerImage}')` }}>
        <div className="container">
          <h1 className="wow fadeInUp">Gallery</h1>
          <div className="hm-breadcrumb wow fadeInUp" data-wow-delay=".2s">
            <a href="/">Home</a><span className="separator">/</span><span>Gallery</span>
          </div>
          <p className="subtitle wow fadeInUp" data-wow-delay=".3s">A glimpse of what the Hustle Mentality cruise experience looks like.</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title"><h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Cruise Moments</h6></div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">Experience the Vibe</h2>
              </div>
              <p className="wow fadeInUp mt-3" data-wow-delay=".2s" style={{ color: "var(--text-color)" }}>
                These are the moments waiting for you on The Bahamas Wave. From sunset deck parties to crystal-clear island waters.
              </p>
            </div>
          </div>
          <div className="hm-gallery-grid wow fadeInUp" data-wow-delay=".3s">
            {images.map((img, i) => (
              <div className={`hm-gallery-item${img.tall ? " tall" : ""}`} key={i}>
                <img src={img.url} alt={img.alt} />
                <div className="overlay"><h5>{img.caption}</h5></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="fix section-bg section-padding">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title bg-white"><h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Destinations</h6></div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">Where We&apos;re Headed</h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            {destinations.map((dest, i) => (
              <div className="col-lg-4 wow fadeInUp" data-wow-delay={`${0.2 + i * 0.1}s`} key={i}>
                <div className="hm-destination-card">
                  <img src={dest.image} alt={dest.name} />
                  <div className="dest-overlay">
                    <span className="dest-tag">{dest.name}</span>
                    <h4>{dest.title}</h4>
                    <p>{dest.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title"><h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Get Inspired</h6></div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">Your Photos Could Be Here</h2>
              </div>
              <p className="wow fadeInUp mt-3 mb-4" data-wow-delay=".2s" style={{ color: "var(--text-color)" }}>
                Join The Bahamas Wave and create your own unforgettable moments. Tag us with #HustleMentality to be featured.
              </p>
              <a href="/packages" className="theme-btn-main wow fadeInUp" data-wow-delay=".3s">
                <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                <span className="theme-btn">Reserve Your Spot</span>
                <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
