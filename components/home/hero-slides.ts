import type { HeroSlide } from "@/components/home/hero-slider";

// Slides backed by the local images in /public/slider.
export const heroSlides: HeroSlide[] = [
  {
    id: "crafted",
    badge: "Freshly Roasted",
    heading: "Crafted For Coffee Lovers",
    text: "Every cup begins with carefully sourced beans, roasted in small batches for a rich, full-bodied flavor.",
    button: { label: "Shop Coffee", href: "/shop" },
    image: "/slider/banner-3.png",
  },
  {
    id: "morning",
    badge: "Morning Ritual",
    heading: "Start Your Day The Right Way",
    text: "Smooth, aromatic blends to brighten your mornings and fuel everything that comes next.",
    button: { label: "Browse Blends", href: "/shop" },
    image: "/slider/coffee-banner.png",
  },
  {
    id: "coldbrew",
    badge: "New Arrival",
    heading: "Smooth Cold Brew, Bold Flavor",
    text: "Slow-steeped for 18 hours to deliver a naturally sweet, low-acidity refresher in every can.",
    button: { label: "Shop Cold Brew", href: "/shop" },
    image: "/slider/Banner_img_1.webp",
  },
  {
    id: "artisan",
    badge: "Small Batch",
    heading: "Artisan Blends, Brewed With Care",
    text: "From bean to cup, our signature roasts are crafted to turn an everyday coffee into a moment to savor.",
    button: { label: "Explore the Menu", href: "/shop" },
    image: "/slider/banner-2.png",
  },
];
