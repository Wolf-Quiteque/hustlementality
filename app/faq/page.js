import { getSiteContent, parseJson, text } from "../lib/api";

export const metadata = {
  title: "FAQ - Hustle Mentality",
  description: "Frequently asked questions about Hustle Mentality cruise experiences, cabin matching, packages, and booking.",
};

function FaqSection({ subtitle, title, description, items, bgClass, subtitleBg }) {
  return (
    <section className={`faq-section section-padding fix ${bgClass || ""}`}>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5 wow fadeInUp">
            <div className="sec-title mb-0">
              <div className={`sec-sub-title ${subtitleBg || ""}`}>
                <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">{subtitle}</h6>
              </div>
              <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">{title}</h2>
            </div>
            <p className="mt-3" style={{ color: "var(--text-color)", lineHeight: 1.7 }}>{description}</p>
          </div>
          <div className="col-lg-7">
            <div className="faq-content-1">
              <ul className="accordion-box">
                {items.map((item, i) => (
                  <li className={`accordion block${i === 0 ? " active-block" : ""} wow fadeInUp`} data-wow-delay={`${0.1 * i}s`} key={i}>
                    <div className={`acc-btn${i === 0 ? " active" : ""}`}>
                      {item.q}<div className="icon fa-regular fa-plus"></div>
                    </div>
                    <div className={`acc-content${i === 0 ? " current" : ""}`}>
                      <div className="content"><div className="text">{item.a}</div></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function FaqPage() {
  const c = await getSiteContent("faq");

  const bannerImage = text(c, "faq_banner_image", "/images/turnups/03.jpeg");

  const general = parseJson(c, "faq_general", [
    { q: "What is Hustle Mentality?", a: "Hustle Mentality is a community-driven cruise experience platform. We organize group cruise trips where travelers can connect before boarding, match with compatible cabin partners, and enjoy curated social activities throughout the voyage." },
    { q: "When does the first cruise depart?", a: "The Bahamas Wave, our inaugural cruise, sets sail May 14, 2027 aboard the Norwegian Getaway. The 3-night voyage departs from the Port of Miami and visits Great Stirrup Cay and Nassau, Bahamas." },
    { q: "Who is Hustle Mentality for?", a: "Hustle Mentality is for anyone who loves travel and community. Whether you're a solo traveler looking for cabin partners, a group of friends wanting a curated experience, or someone who just wants to meet new people on a cruise." },
  ]);

  const booking = parseJson(c, "faq_booking", [
    { q: "How do I book my spot?", a: "You can reserve your spot by visiting our Packages page and selecting your preferred cabin type. A 10% deposit of your total fare secures your cabin." },
    { q: "What payment plans are available?", a: "We offer a structured payment plan: 10% deposit to reserve, then 25% due 6 months before sailing, another 25% at 4 months, and the final balance due 2 months before departure. Full payment up front is also accepted." },
    { q: "What's included in the cruise package?", a: "All packages include 3-night cabin accommodation on the Norwegian Getaway, all meals, community events and deck parties, cabin buddy matching, and a Hustle Mentality welcome kit." },
    { q: "What is the cancellation policy?", a: "Cancellations 120+ days before sailing receive a full refund minus a $50/person admin fee. 119–91 days: 25% penalty. 90–61 days: 50% penalty. 60–31 days: 75% penalty. 30 days or less: no refund. Travel insurance is available for added protection." },
  ]);

  const matching = parseJson(c, "faq_matching", [
    { q: "How does cabin matching work?", a: "After creating your traveler profile, our platform uses your preferences, interests, and travel style to suggest compatible cabin partners." },
    { q: "Can I go solo or do I need a cabin partner?", a: "You can absolutely join solo! Many of our travelers come alone and find their cabin buddy through our matching system." },
    { q: "Can I bring my own cabin partner?", a: "Of course! If you already have someone you want to share a cabin with, you can book together and skip the matching process." },
    { q: "What if my cabin match doesn't work out?", a: "We encourage travelers to chat before the trip to make sure the match is a good fit. If issues arise, we can rematch you." },
  ]);

  const onboard = parseJson(c, "faq_onboard", [
    { q: "What events are planned onboard?", a: "We plan a full schedule including welcome mixers, themed deck parties with live DJs, networking brunches, group fitness, karaoke nights, and a grand farewell all-white party." },
    { q: "Do I have to participate in group activities?", a: "Not at all! All community events are optional. You're free to enjoy the cruise at your own pace." },
    { q: "What about shore excursions?", a: "We organize group excursions at each port — snorkeling, cultural tours, beach parties, and more at Great Stirrup Cay and Nassau. These are optional add-ons." },
  ]);

  return (
    <>
      {/* Page Banner */}
      <section className="hm-page-banner bg-cover" style={{ backgroundImage: `url('${bannerImage}')` }}>
        <div className="container">
          <h1 className="wow fadeInUp">Frequently Asked Questions</h1>
          <div className="hm-breadcrumb wow fadeInUp" data-wow-delay=".2s">
            <a href="/">Home</a><span className="separator">/</span><span>FAQ</span>
          </div>
          <p className="subtitle wow fadeInUp" data-wow-delay=".3s">Everything you need to know about the Hustle Mentality cruise experience.</p>
        </div>
      </section>

      <FaqSection subtitle="General" title="About Hustle Mentality" description="New to Hustle Mentality? Here are the most common questions we get about who we are and what we do." items={general} />
      <FaqSection subtitle="Booking" title="Reservations &amp; Payments" description="Questions about booking your spot, payment plans, and what's included in each package." items={booking} bgClass="section-bg" subtitleBg="bg-white" />
      <FaqSection subtitle="Cabin Matching" title="Finding Your Travel Partner" description="Our cabin matching system is designed to pair you with compatible travelers. Here's how it works." items={matching} />
      <FaqSection subtitle="Onboard" title="The Cruise Experience" description="What to expect once you're on the ship and enjoying the Hustle Mentality experience." items={onboard} bgClass="section-bg" subtitleBg="bg-white" />

      {/* Still Have Questions CTA */}
      <section className="cta-banner-section bg-cover" style={{ backgroundImage: "url('images/icons/line-1-1.png')" }}>
        <div className="container">
          <div className="cta-banner-wrapper">
            <div className="content">
              <h3 className="title char-animation">Still Have Questions?</h3>
              <div className="text wow fadeInUp" data-wow-delay=".3s">Our team is here to help. Reach out and we&apos;ll get back to you within 24 hours.</div>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".5s">
              <a href="/contact" className="theme-btn-main">
                <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                <span className="theme-btn">Contact Us</span>
                <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
