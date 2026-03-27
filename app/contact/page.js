export const metadata = {
  title: "Contact Us - Hustle Mentality",
  description: "Get in touch with the Hustle Mentality team. Book your cruise, ask questions, or learn more about our community travel experiences.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page Banner */}
      <section
        className="hm-page-banner bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1920&q=80')",
        }}
      >
        <div className="container">
          <h1 className="wow fadeInUp">Contact Us</h1>
          <div className="hm-breadcrumb wow fadeInUp" data-wow-delay=".2s">
            <a href="/">Home</a>
            <span className="separator">/</span>
            <span>Contact</span>
          </div>
          <p className="subtitle wow fadeInUp" data-wow-delay=".3s">
            Have a question or ready to book? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding fix">
        <div className="container">
          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-lg-7 wow fadeInUp">
              <div className="sec-title mb-4">
                <div className="sec-sub-title">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Get In Touch</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  Send Us a Message
                </h2>
              </div>
              <div className="hm-contact-form">
                <form id="contact_form" action="#" method="post">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" placeholder="Your first name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" placeholder="Your last name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" placeholder="(555) 000-0000" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <select id="subject" name="subject">
                          <option value="">Select a topic...</option>
                          <option value="booking">Booking Inquiry</option>
                          <option value="packages">Package Information</option>
                          <option value="cabin-matching">Cabin Matching</option>
                          <option value="payment">Payment Plans</option>
                          <option value="group">Group Booking</option>
                          <option value="general">General Question</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="Tell us what&apos;s on your mind..."></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button type="submit" className="theme-btn-main" style={{ width: "100%", justifyContent: "center" }}>
                        <span className="theme-btn-arrow-left">
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                        <span className="theme-btn">Send Message</span>
                        <span className="theme-btn-arrow-right">
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-5 wow fadeInUp" data-wow-delay=".3s">
              <div className="hm-contact-info-card">
                <h3>Contact Information</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "30px", lineHeight: 1.7 }}>
                  Reach out to us directly or fill out the form. Our team responds
                  within 24 hours.
                </p>

                <div className="hm-contact-info-item">
                  <div className="icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="info">
                    <h5>Phone</h5>
                    <a href="tel:+13055551234">+1 (305) 555-1234</a>
                  </div>
                </div>

                <div className="hm-contact-info-item">
                  <div className="icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="info">
                    <h5>Email</h5>
                    <a href="mailto:info@hustlementality.com">info@hustlementality.com</a>
                  </div>
                </div>

                <div className="hm-contact-info-item">
                  <div className="icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="info">
                    <h5>Location</h5>
                    <p>Miami, Florida</p>
                  </div>
                </div>

                <div className="hm-contact-info-item">
                  <div className="icon">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div className="info">
                    <h5>Office Hours</h5>
                    <p>Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                <div className="hm-contact-social">
                  <a href="#" aria-label="Twitter">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                  <a href="#" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" aria-label="TikTok">
                    <i className="fab fa-tiktok"></i>
                  </a>
                  <a href="#" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Quick Summary */}
      <section className="section-padding fix section-bg">
        <div className="container">
          <div className="row g-4 justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="sec-title mb-0">
                <div className="sec-sub-title bg-white">
                  <h6 className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle">Ready to Book?</h6>
                </div>
                <h2 className="title tx-title sec_title tz-itm-title tz-itm-anim">
                  How to Reserve Your Spot
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".2s">
              <div className="dst-step-card">
                <div className="dst-step-number">01</div>
                <div className="dst-step-icon">
                  <i className="fa-solid fa-comment-dots fa-3x"></i>
                </div>
                <h4 className="dst-step-title">Reach Out</h4>
                <p className="dst-step-text">
                  Send us a message with your preferred package and any questions.
                  We&apos;ll respond within 24 hours.
                </p>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".3s">
              <div className="dst-step-card">
                <div className="dst-step-number">02</div>
                <div className="dst-step-icon">
                  <i className="fa-solid fa-credit-card fa-3x"></i>
                </div>
                <h4 className="dst-step-title">Secure Your Spot</h4>
                <p className="dst-step-text">
                  Lock in your cabin with a $250 deposit and choose your
                  payment plan. It&apos;s that simple.
                </p>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".4s">
              <div className="dst-step-card">
                <div className="dst-step-number">03</div>
                <div className="dst-step-icon">
                  <i className="fa-solid fa-ship fa-3x"></i>
                </div>
                <h4 className="dst-step-title">Set Sail</h4>
                <p className="dst-step-text">
                  Complete your profile, match with a cabin buddy,
                  and get ready for March 2027!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="fix">
        <div style={{
          width: "100%",
          height: "400px",
          background: "var(--theme-color2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "15px",
        }}>
          <i className="fa-solid fa-map-location-dot fa-4x" style={{ color: "var(--theme-color1)" }}></i>
          <h4 style={{ color: "#fff", fontSize: "24px" }}>Miami, Florida</h4>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
            Home port for The Bahamas Wave
          </p>
        </div>
      </section>
    </>
  );
}
