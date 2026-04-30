"use client";

import { usePathname } from "next/navigation";

const appRoutes = [
  "/dashboard",
  "/browse",
  "/matches",
  "/chat",
  "/my-trip",
  "/booking",
  "/onboarding",
  "/signup",
  "/login",
];

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const isApp = appRoutes.some((r) => pathname === r || pathname.startsWith(r + "/"));
  const darkAppRoutes = ["/dashboard", "/browse", "/matches", "/chat", "/my-trip", "/booking", "/onboarding"];
  const isDarkApp = darkAppRoutes.some((r) => pathname === r || pathname.startsWith(r + "/"));

  if (isAdmin) {
    return <>{children}</>;
  }

  // Load theme CSS only for non-admin pages (React 19 hoists <link> to <head>)
  const themeStyles = (
    <>
      <link href="/css/bootstrap.min.css" rel="stylesheet" precedence="theme" />
      <link href="/css/style.css" rel="stylesheet" precedence="theme" />
      <link href="/css/dst-custom.css?v=12" rel="stylesheet" precedence="theme" />
    </>
  );

  if (isApp) {
    return <>{themeStyles}<div className={`hm-app-shell${isDarkApp ? " hm-app-shell-dark" : ""}`}>{children}</div></>;
  }

  return (
    <div className="page-wrapper">
      {themeStyles}
      {/* Preloader */}
      <div className="preloader" style={{ backgroundColor: "#ffffff" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}>
          <img
            src="/images/newlogo.png"
            alt="Hustle Mentality"
            className="dst-preloader-logo"
            style={{
              maxWidth: "80vw",
              maxHeight: "80vh",
              objectFit: "contain",
              animation: "dst-float 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Back To Top */}
      <button id="back-top" className="back-to-top">
        <i className="fa-regular fa-arrow-up"></i>
      </button>

      {/* MouseCursor */}
      <div className="mouseCursor cursor-outer" suppressHydrationWarning></div>
      <div className="mouseCursor cursor-inner" suppressHydrationWarning></div>

      {/* Main Header */}
      <header className="main-header header-style-one header-2">
        <div className="header-lower">
          <div className="main-box">
            <div className="logo">
              <a href="/">
                <img src="/images/newlogo.png" alt="Hustle Mentality" className="dst-logo-img" />
              </a>
            </div>
            <div className="nav-outer">
              <nav className="nav main-menu">
                <ul className="navigation">
                  <li className="current"><a href="/">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/trip">The Trip</a></li>
                  <li><a href="/packages">Packages</a></li>
                  <li><a href="/gallery">Gallery</a></li>
                  <li><a href="/faq">FAQ</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/login">Log In</a></li>
                </ul>
              </nav>
              <div className="outer-box">
                <div className="ui-btn-outer">
                  <div className="ui-btn-search">
                    <a href="/signup" className="contact-btn">Get Started</a>
                  </div>
                </div>
                <div className="mobile-nav-toggler">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <nav className="menu-box">
            <div className="upper-box">
              <div className="nav-logo">
                <a href="/">
                  <img src="/images/newlogo.png" alt="Hustle Mentality" className="dst-logo-img" />
                </a>
              </div>
              <div className="close-btn">
                <i className="icon fa fa-times"></i>
              </div>
            </div>
            <ul className="navigation clearfix" suppressHydrationWarning></ul>
            <ul className="contact-list-one">
              <li>
                <div className="contact-info-box">
                  <i className="icon lnr-icon-phone-handset"></i>
                  <span className="title">Call Now</span>
                  <a href="tel:+13055551234">+1 (305) 555-1234</a>
                </div>
              </li>
              <li>
                <div className="contact-info-box">
                  <span className="icon lnr-icon-envelope1"></span>
                  <span className="title">Send Email</span>
                  <a href="mailto:info@hustlementality.com">info@hustlementality.com</a>
                </div>
              </li>
              <li>
                <div className="contact-info-box">
                  <span className="icon lnr-icon-clock"></span>
                  <span className="title">Office Hours</span>
                  Mon - Fri 9:00 AM - 6:00 PM
                </div>
              </li>
            </ul>
            <ul className="social-links">
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i className="fab fa-tiktok"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </nav>
        </div>

        {/* Sticky Header */}
        <div className="sticky-header">
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo">
                <a href="/">
                  <img src="/images/newlogo.png" alt="Hustle Mentality" className="dst-logo-img dst-logo-img-sticky" />
                </a>
              </div>
              <div className="nav-outer">
                <nav className="main-menu">
                  <div className="navbar-collapse show collapse clearfix">
                    <ul className="navigation clearfix" suppressHydrationWarning></ul>
                  </div>
                </nav>
                <div className="mobile-nav-toggler">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          {children}

          {/* Footer */}
          <footer className="footer-section">
            <div className="footer-area">
              <div className="container">
                <div className="footer-widget-wrapper">
                  <div className="row justify-content-between">
                    <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                      <div className="footer-single-widget">
                        <div className="widget-head widget-logo">
                          <a href="/" className="footer-logo">
                            <img src="/images/logo-darktheme.png" alt="Hustle Mentality" className="dst-logo-img dst-logo-img-footer" />
                          </a>
                        </div>
                        <div className="footer-content">
                          <div className="text">
                            Community-driven cruise experiences that connect travelers, create
                            memories, and turn strangers into lifelong friends on the open sea.
                          </div>
                          <a className="theme-btn-main" href="/packages">
                            <span className="theme-btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                            <span className="theme-btn">Reserve Your Spot</span>
                            <span className="theme-btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-delay=".4s">
                      <div className="footer-single-widget">
                        <div className="widget-head"><h4 className="title">Quick Links</h4></div>
                        <ul className="user-links">
                          <li><a href="/about">About Us</a></li>
                          <li><a href="/trip">The Trip</a></li>
                          <li><a href="/packages">Packages</a></li>
                          <li><a href="/gallery">Gallery</a></li>
                          <li><a href="/faq">FAQ</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-1 d-none d-xl-block"></div>
                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-6 wow fadeInUp" data-wow-delay=".6s">
                      <div className="footer-single-widget">
                        <div className="widget-head"><h4 className="title">Experience</h4></div>
                        <ul className="user-links">
                          <li><a href="/trip">Cabin Matching</a></li>
                          <li><a href="/packages">Cruise Packages</a></li>
                          <li><a href="/trip">Excursions</a></li>
                          <li><a href="/trip">Community Events</a></li>
                          <li><a href="/trip">Onboard Activities</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-1 d-none d-xl-block"></div>
                    <div className="col-xl-2 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".8s">
                      <div className="footer-single-widget">
                        <div className="widget-head"><h4 className="title">Contact</h4></div>
                        <div className="footer-contact">
                          <div className="text">Miami, Florida</div>
                          <div className="footer-info">
                            <h5 className="info-title">Phone</h5>
                            <a href="tel:+13055551234" className="number">+1 (305) 555-1234</a>
                            <a href="mailto:info@hustlementality.com" className="email">info@hustlementality.com</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer-middle-wrapper wow fadeInUp" data-wow-delay=".3s">
                  <ul>
                    <li><span className="week-text">Cruise Date: </span><span className="time-text">May 14–17, 2027</span></li>
                    <li><span className="week-text">Duration:</span><span className="time-text">3 Nights</span></li>
                  </ul>
                  <ul className="social-icon-list1">
                    <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fab fa-tiktok"></i></a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                  </ul>
                </div>
              </div>
              <div className="footer-bottom">
                <div className="container">
                  <div className="footer-bottom-wrapper wow fadeInUp" data-wow-delay=".3s">
                    <p>&copy; 2026 Hustle Mentality. Created by Pure Management. All Rights Reserved.</p>
                    <ul className="footer-menu">
                      <li><a href="#">Terms &amp; Conditions</a></li>
                      <li><a href="#">Privacy Policy</a></li>
                      <li><a href="/contact">Contact Us</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
