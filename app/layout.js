import "./globals.css";
import Script from "next/script";
import LayoutShell from "./components/LayoutShell";

export const metadata = {
  title: "Hustle Mentality - Set Sail With Your Tribe",
  description:
    "Hustle Mentality - Community-driven cruise experiences. Join the Bahamas Wave 3-night cruise from Miami to the Bahamas, May 2027. Match with cabin partners and set sail with your tribe.",
  icons: {
    shortcut: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "Hustle Mentality - Set Sail With Your Tribe",
    description:
      "Join the Bahamas Wave — a 3-night community cruise from Miami to Great Stirrup Cay & Nassau. Match with cabin partners, connect with travelers, and create unforgettable memories. May 2027.",
    images: [
      {
        url: "/images/turnups/04.jpeg",
        width: 1200,
        height: 630,
      },
    ],
    url: "https://hustlementality.com",
    siteName: "Hustle Mentality",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hustle Mentality - Set Sail With Your Tribe",
    description:
      "Join the Bahamas Wave — a 3-night community cruise from Miami. Match with cabin partners and set sail with your tribe. May 2027.",
    images: [
      "/images/turnups/04.jpeg",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body suppressHydrationWarning>
        <LayoutShell>{children}</LayoutShell>

        <Script src="/js/jquery.js" strategy="beforeInteractive" />
        <Script src="/js/popper.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="beforeInteractive" />
        <Script src="/js/jquery.fancybox.js" strategy="afterInteractive" />
        <Script src="/js/jquery-ui.js" strategy="afterInteractive" />
        <Script src="/js/gsap.js" strategy="afterInteractive" />
        <Script src="/js/three.js" strategy="afterInteractive" />
        <Script src="/js/hover-effect.umd.js" strategy="afterInteractive" />
        <Script src="/js/gsap-scroll-to-plugin.js" strategy="afterInteractive" />
        <Script src="/js/gsap-scroll-smoother.js" strategy="afterInteractive" />
        <Script src="/js/gsap-scroll-trigger.js" strategy="afterInteractive" />
        <Script src="/js/gsap-split-text.js" strategy="afterInteractive" />
        <Script src="/js/split-type.min.js" strategy="afterInteractive" />
        <Script src="/js/parallaxie.js" strategy="afterInteractive" />
        <Script src="/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/js/wow.js" strategy="afterInteractive" />
        <Script src="/js/bxslider.js" strategy="afterInteractive" />
        <Script src="/js/nice-select.min.js" strategy="afterInteractive" />
        <Script src="/js/knob.js" strategy="afterInteractive" />
        <Script src="/js/appear.js" strategy="afterInteractive" />
        <Script src="/js/slick.js" strategy="afterInteractive" />
        <Script src="/js/swiper.min.js" strategy="afterInteractive" />
        <Script src="/js/mixitup.js" strategy="afterInteractive" />
        <Script src="/js/script.js" strategy="afterInteractive" />
        <Script src="/js/script-gsap.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
