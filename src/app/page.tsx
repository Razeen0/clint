"use client";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import CountUp from "@/components/CountUp";
import Logo from "@/components/Logo";
import ShowcasePhone from "@/components/ShowcasePhone";
import { AppStoreBadge, GooglePlayBadge } from "@/components/StoreBadges";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const contactStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const contactCard: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: easeOut } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardPop: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: easeOut } },
};

function ParallaxY({ children, amount = 80 }: { children: React.ReactNode; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return <motion.div ref={ref} style={{ y }}>{children}</motion.div>;
}

function ZoomOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  return (
    <motion.div ref={ref} className="absolute inset-0" style={{ scale }}>
      {children}
    </motion.div>
  );
}

const marqueeItems = ["Medicines", "Wellness Products", "Pharmacy", "Fast Delivery", "Everyday Care"];

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <section aria-hidden="true" className="overflow-hidden border-y border-line bg-paper py-6">
      <div className="flex w-max animate-marquee gap-16 pr-16">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-16 whitespace-nowrap font-display text-2xl font-medium italic tracking-tight text-slate-500">
            {t}
            <span className="text-base text-brand-600">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-brand-700"
    />
  );
}

const featureIcons = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
  ),
  order: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><path d="M10 20a4 4 0 0 0 4 0" /><path d="M6 10V6a4 4 0 0 1 8 0v4" /><rect x="3" y="10" width="14" height="10" rx="2" /></svg>
  ),
  products: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v8" /></svg>
  ),
  track: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><path d="M1 8h13v10H5a4 4 0 0 1-4-4z" /><path d="M14 11h4l3 3v4h-7z" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></svg>
  ),
  secure: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /><circle cx="12" cy="16" r="1.4" fill="currentColor" stroke="none" /></svg>
  ),
  personal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><path d="M19 14c1.5 1.4 3 2.7 3 4.5A2.5 2.5 0 0 1 19.5 21 2.5 2.5 0 0 1 17 18.5c0-1.8 1.5-3.1 3-4.5" /><path d="M9 5a3 3 0 0 1 6 0v2a3 3 0 0 1-6 0z" opacity={0} /><path d="M11 19H4a8 8 0 0 1 8-8h0" /></svg>
  ),
};

const features = [
  { title: "Search & Discover", desc: "Find exactly what you need fast with smart search.", icon: featureIcons.search, tile: "bg-brand-700" },
  { title: "Medicine Ordering", desc: "Order prescription medicines and essentials easily.", icon: featureIcons.order, tile: "bg-brand-600" },
  { title: "Healthcare Products", desc: "Everyday care and wellness products, one tap away.", icon: featureIcons.products, tile: "bg-brand-700" },
  { title: "Order Tracking", desc: "Live updates from order placement to delivery.", icon: featureIcons.track, tile: "bg-brand-600" },
  { title: "Secure Payments", desc: "Encrypted, protected and trusted transactions.", icon: featureIcons.secure, tile: "bg-brand-700" },
  { title: "Personalized Experience", desc: "Care recommendations tailored to you.", icon: featureIcons.personal, tile: "bg-brand-600" },
];

const featureCardStyles = [
  "bg-brand-700 text-white sm:col-span-2",
  "bg-accent-100 text-ink",
  "bg-white text-ink",
  "bg-brand-950 text-white",
  "bg-white text-ink",
  "bg-accent-400 text-ink",
];

const products = [
  { name: "Medicine Boxes", tag: "Pharmacy", img: "/images/products/product_box.jpg" },
  { name: "Tablets & Capsules", tag: "Meds", img: "/images/products/product_caps.jpg" },
  { name: "First-Aid Products", tag: "Safety", img: "/images/products/product_firstaid.jpg" },
  { name: "Personal Healthcare", tag: "Care", img: "/images/products/product_pack.jpg" },
  { name: "Vitamins & Wellness", tag: "Wellness", img: "/images/products/product_vitamins.jpg" },
  { name: "Pills & Essentials", tag: "Daily", img: "/images/products/product_pills.jpg" },
];

const statCards = [
  { value: 250, suffix: "K+", label: "App Downloads", decimals: 0, card: "bg-brand-700", valueClass: "text-white", labelClass: "text-brand-100", accent: "bg-accent-300" },
  { value: 1200, suffix: "+", label: "Partner Pharmacies", decimals: 0, card: "bg-white/10", valueClass: "text-white", labelClass: "text-brand-200/80", accent: "bg-brand-300" },
  { value: 350, suffix: "+", label: "Cities Served", decimals: 0, card: "bg-accent-400", valueClass: "text-brand-950", labelClass: "text-brand-900/70", accent: "bg-brand-800" },
  { value: 4.9, suffix: "", label: "Average App Rating", decimals: 1, card: "bg-brand-800", valueClass: "text-white", labelClass: "text-brand-200/80", accent: "bg-accent-300" },
];

const productCardStyles = [
  "bg-white text-ink",
  "bg-brand-700 text-white",
  "bg-accent-100 text-ink",
  "bg-brand-950 text-white",
  "bg-white text-ink",
  "bg-accent-400 text-ink",
];


function HeroPhone() {
  return (
    <div className="relative h-[560px] w-[280px] overflow-hidden rounded-[2.8rem] bg-slate-950 p-[7px] shadow-[0_50px_100px_-40px_rgba(16,44,32,0.5)] ring-1 ring-white/10 sm:h-[640px] sm:w-[320px]">
      <div className="absolute inset-x-0 top-0 z-20 flex justify-center">
        <div className="h-[22px] w-32 rounded-b-2xl bg-slate-950" />
      </div>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.4rem] bg-[#f6f5f1]">
        <div className="bg-brand-700 px-5 pb-5 pt-2">
          <div className="flex items-center justify-between text-[10px] font-semibold text-white/90">
            <span>9:41</span>
            <span className="flex items-center gap-1 text-[8px]">
              <span className="rounded bg-white/20 px-1 py-0.5">5G</span>
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-display text-sm font-semibold tracking-tight text-white">BAWA SMART CARE</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-widest text-white">Healthcare</span>
          </div>
        </div>
        <div className="flex-1 space-y-3 overflow-hidden px-4 py-4">
          <div className="flex items-center gap-2 rounded-lg bg-white px-3.5 py-2.5 text-[10px] font-medium text-slate-400 ring-1 ring-line">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-brand-600"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            Search medicines, products...
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex h-16 items-end justify-center rounded-lg bg-brand-50">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-5 text-brand-700/70"><ellipse cx="12" cy="14" rx="6.5" ry="8.5" /><path d="M7 9h10v10H7z" opacity={0.35} /></svg>
              </div>
              <p className="text-[10px] font-bold text-slate-900">Paracetamol</p>
              <p className="text-[10px] font-bold text-brand-700">$4.99</p>
            </div>
            <div className="flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex h-16 items-end justify-center rounded-lg bg-accent-50">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-5 text-amber-500"><ellipse cx="12" cy="14" rx="6.5" ry="8.5" /><path d="M7 9h10v10H7z" opacity={0.35} /></svg>
              </div>
              <p className="text-[10px] font-bold text-slate-900">Vitamin C</p>
              <p className="text-[10px] font-bold text-brand-700">$6.49</p>
            </div>
            <div className="col-span-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-brand-700"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-900">First Aid Kit</p>
                <p className="text-[9px] font-bold text-brand-700">$18.99 <span className="font-medium text-slate-400 line-through">$22.00</span></p>
              </div>
            </div>
          </div>
          <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-900">Order Status</p>
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[8px] font-bold text-brand-700">LIVE</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[
                { done: true }, { done: true }, { done: false }, { done: false },
              ].map((s, i) => (
                <div key={i} className={`h-1.5 rounded-full ${s.done ? "bg-brand-600" : "bg-slate-100"}`} />
              ))}
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-500">
              <span className="font-semibold text-brand-600">Out for delivery</span>
              <span>ETA 6:00 PM</span>
            </div>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-3 py-2.5 text-[10px] font-bold text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3"><path d="M6 7h12l1 13H5z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const heroToasts = [
  {
    title: "Order Delivered",
    sub: "#MDC-20841 · Today",
    tint: "bg-emerald-50 text-emerald-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-4 w-4"><path d="m5 13 4 4L19 7" /></svg>
    ),
  },
  {
    title: "100% Secure",
    sub: "Encrypted payments",
    tint: "bg-brand-50 text-brand-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-4 w-4"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    ),
  },
  {
    title: "Genuine Products",
    sub: "Verified suppliers",
    tint: "bg-accent-50 text-accent-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-4 w-4"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" /><path d="m9 12 2 2 4-4" /></svg>
    ),
  },
];

function OrderConfirmedPhone() {
  return (
    <div className="relative h-[540px] w-[270px] overflow-hidden rounded-[2.8rem] bg-slate-950 p-[7px] shadow-[0_50px_100px_-40px_rgba(8,24,17,0.6)] ring-1 ring-white/10 sm:h-[600px] sm:w-[300px]">
      <div className="absolute inset-x-0 top-0 z-20 flex justify-center">
        <div className="h-[22px] w-32 rounded-b-2xl bg-slate-950" />
      </div>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.4rem] bg-[#f6f5f1]">
        <div className="bg-brand-700 px-5 pb-4 pt-2">
          <div className="flex items-center justify-between text-[10px] font-semibold text-white/90">
            <span>9:41</span>
            <span className="text-[8px]">5G ▮▮▮</span>
          </div>
          <p className="mt-3 text-center font-display text-sm font-medium text-white">Checkout</p>
        </div>
        <div className="flex flex-1 flex-col items-center px-5 pt-8">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse-ring" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="relative h-8 w-8"><path d="m5 13 4 4L19 7" /></svg>
          </div>
          <p className="mt-4 font-display text-base font-medium text-slate-900">Order Confirmed!</p>
          <p className="mt-1 text-center text-[10px] leading-relaxed text-slate-400">
            Order #MDC-48291 placed successfully.<br />Delivery arrives today by 6 PM.
          </p>
          <div className="mt-5 w-full space-y-2 rounded-xl border border-slate-200 bg-white p-4">
            {[
              ["Paracetamol 500mg", "x2", "$9.98"],
              ["Vitamin C + Zinc", "x1", "$6.49"],
              ["First Aid Kit", "x1", "$18.99"],
            ].map(([n, q, p]) => (
              <div key={n as string} className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-slate-700">{n as string}</span>
                <span className="text-slate-400">{q as string}</span>
                <span className="font-bold text-slate-800">{p as string}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-2 text-[11px]">
              <span className="font-semibold text-slate-500">Total</span>
              <span className="font-bold text-brand-700">$35.46</span>
            </div>
          </div>
          <button className="mt-4 w-full rounded-lg bg-brand-700 py-2.5 text-[11px] font-bold text-white">
            Track Order
          </button>
          <p className="mt-3 flex items-center gap-1 text-[9px] font-medium text-slate-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 text-emerald-500"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            Secured by Bawa Smart Care Pharmacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const reduce = useReducedMotion();

  return (
    <main id="top" className="flex min-h-screen flex-col">
      <ScrollProgress />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-100/80 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent-100/70 blur-3xl" />
        <motion.div
          aria-hidden="true"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute right-[8%] top-20 hidden h-40 w-40 rounded-full border border-brand-200/50 lg:block"
        >
          <div className="absolute inset-5 rounded-full border border-dashed border-brand-300/50" />
          <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400" />
        </motion.div>
        <header className="border-b border-line/80">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
            <a href="#top" className="shrink-0 transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-paper">
              <Logo size="lg" />
            </a>
            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex"
            >
              <a href="#about" className="transition hover:text-brand-700">About</a>
              <a href="#features" className="transition hover:text-brand-700">Services</a>
              <a href="#contact" className="transition hover:text-brand-700">Contact</a>
            </nav>
            <a
              href="#download"
              className="hidden rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 sm:inline-flex"
            >
              Order medicines
            </a>
          </div>
        </header>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:px-8">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }} className="flex flex-col">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
                </span>
                Trusted by 250K+ users
              </span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8">
              <Logo size="xl" />
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-8 font-display text-5xl font-medium tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Bawa Smart Care
              <br />
              <span className="italic text-brand-700">Pharmacy.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              Everything you need for your healthcare journey, right in your pocket. Browse, order, and manage medicines and healthcare products with Bawa Smart Care Pharmacy.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <a href="#download" className="group inline-flex items-center gap-2 rounded-lg bg-brand-700 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-paper sm:text-base">
                Download the App
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
              </a>
              <a href="#features" className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-brand-300 hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-paper sm:text-base">
                Explore Bawa Smart Care
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-slate-600 sm:text-base">
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-600" />Trusted Healthcare Platform</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent-500" />Secure &amp; Convenient</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" />Easy Online Ordering</div>
            </motion.div>
          </motion.div>

          <ParallaxY amount={70}>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
            className="relative mx-auto flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.55, ease: easeOut }}
              className="absolute -top-5 right-2 z-20 hidden items-center gap-2 rounded-2xl border border-white/80 bg-white/90 px-3 py-2 shadow-xl backdrop-blur sm:flex"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><path d="M12 5v14M5 12h14" /></svg>
              </span>
              <span className="pr-2 text-xs font-semibold text-slate-700">Bawa care, close to home</span>
            </motion.div>
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <HeroPhone />
              {[
                { toast: heroToasts[0], pos: "left-3 md:left-0 translate-x-0 md:-translate-x-1/2 top-[24%]", float: 3.6 },
                { toast: heroToasts[1], pos: "right-3 md:right-0 translate-x-0 md:translate-x-1/2 top-[46%]", float: 4.4 },
                { toast: heroToasts[2], pos: "right-3 md:right-0 translate-x-0 md:translate-x-1/2 bottom-[16%]", float: 3.2 },
              ].map(({ toast: t, pos, float }, i) => (
                <div key={t!.title} className={`pointer-events-none absolute z-10 ${pos}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.6, duration: 0.45, ease: easeOut }}
                  >
                    <motion.div
                      animate={reduce ? undefined : { y: [0, -6, 0] }}
                      transition={{ duration: float, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                      className="flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-xl ring-1 ring-line"
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${t!.tint}`}>{t!.icon}</span>
                      <div>
                        <p className="text-[10px] font-bold text-slate-900">{t!.title}</p>
                        <p className="text-[9px] text-slate-400">{t!.sub}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          </ParallaxY>
        </div>
      </section>

      {/* Marquee strip */}
      <Marquee />

      {/* Stats band */}
      <section className="relative overflow-hidden bg-brand-950 py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(134,184,154,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(134,184,154,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Bawa Smart Care</span>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">Care that keeps moving.</h2>
            </div>
            <span className="text-sm text-brand-200/60">Thoughtful healthcare, wherever you are.</span>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {statCards.map((s, i) => (
              <motion.div
                key={s.label}
                variants={cardPop}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? -1 : 1 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-[0_22px_50px_-30px_rgba(0,0,0,0.8)] ${s.card}`}
              >
                <span className={`absolute right-5 top-5 h-2.5 w-2.5 rounded-full ${s.accent} transition-transform duration-300 group-hover:scale-150`} />
                <span className={`text-xs font-semibold tracking-[0.18em] ${s.labelClass}`}>0{i + 1}</span>
                <p className={`mt-10 font-display text-4xl font-medium tracking-tight sm:text-5xl ${s.valueClass}`}>
                  <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} className="tabular-nums" />
                </p>
                <p className={`mt-2 text-sm font-semibold ${s.labelClass}`}>{s.label}</p>
                <span className="mt-6 block h-1 w-10 rounded-full bg-white/20 transition-all duration-300 group-hover:w-16" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What is Bawa Smart Care Pharmacy */}
      <section id="about" className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative order-last lg:order-first"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-line shadow-[0_30px_70px_-40px_rgba(20,55,40,0.4)]">
              <ZoomOnScroll>
                <Image
                  src="/images/why/about.jpg"
                  alt="Friendly healthcare professional"
                  fill
                  quality={90}
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </ZoomOnScroll>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg ring-1 ring-line">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3"><path d="m5 13 4 4L19 7" /></svg>
                </span>
                <span className="text-xs font-semibold text-slate-800">Verified &amp; Licensed</span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.25, duration: 0.6, ease: easeOut }}
              className="absolute -bottom-7 right-2 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur sm:right-[-1rem]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>
              </span>
              <span className="pr-2 text-xs font-semibold leading-relaxed text-slate-700">Care, made<br />personal</span>
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Why Bawa Smart Care</span>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">Healthcare Made Simple</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">Bawa Smart Care Pharmacy brings essential healthcare services and products together in one convenient mobile application.</p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {[
                { t: "Medicines", d: "Browse and order medicines easily.", icon: featureIcons.order, tone: "border-t-brand-600" },
                { t: "Healthcare Products", d: "Find everyday care and wellness items.", icon: featureIcons.products, tone: "border-t-accent-400" },
                { t: "Easy Ordering", d: "Simple and convenient checkout.", icon: featureIcons.search, tone: "border-t-emerald-500" },
                { t: "Secure & Safe", d: "Your data and payments stay protected.", icon: featureIcons.secure, tone: "border-t-slate-400" },
              ].map((f, i) => (
                <motion.div
                  key={f.t}
                  variants={cardPop}
                  whileHover={{ y: -6, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
                  className={`group relative overflow-hidden rounded-2xl border border-line border-t-4 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_35px_-24px_rgba(20,55,40,0.45)] ${f.tone}`}
                >
                  <span className="absolute right-4 top-4 font-display text-2xl font-medium text-slate-200 transition-colors group-hover:text-brand-200">0{i + 1}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:rotate-6 group-hover:bg-brand-700 group-hover:text-white">
                    {f.icon}
                  </span>
                  <div className="relative">
                    <h3 className="text-base font-semibold text-slate-900">{f.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{f.d}</p>
                  </div>
                  <span className="mt-5 block h-1 w-8 rounded-full bg-brand-100 transition-all duration-300 group-hover:w-14 group-hover:bg-brand-600" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Features</span>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">Everything You Need. One App.</h2>
            <p className="mt-4 text-lg text-slate-500">Powerful, thoughtfully built tools for every step of your healthcare journey.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={cardPop}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? -1 : 1 }}
                className={`group relative min-h-[220px] overflow-hidden rounded-3xl border border-transparent p-7 shadow-[0_18px_40px_-28px_rgba(20,55,40,0.5)] transition-shadow duration-300 hover:shadow-[0_26px_50px_-24px_rgba(20,55,40,0.55)] ${featureCardStyles[i]}`}
              >
                <span className="absolute -right-3 -top-5 font-display text-8xl font-medium opacity-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1">0{i + 1}</span>
                <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 ${i === 0 || i === 3 ? "bg-white/15 text-white" : "bg-white text-brand-700"}`}>
                  {f.icon}
                </span>
                <h3 className={`relative mt-7 text-lg font-semibold ${i === 0 || i === 3 ? "text-white" : "text-ink"}`}>{f.title}</h3>
                <p className={`relative mt-2 max-w-sm text-sm leading-relaxed ${i === 0 || i === 3 ? "text-brand-100/80" : "text-slate-600"}`}>{f.desc}</p>
                <span className={`absolute bottom-6 right-7 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1 ${i === 0 || i === 3 ? "bg-white/15 text-white" : "bg-brand-50 text-brand-700"}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-4 w-4"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="relative overflow-hidden bg-brand-950 py-16 sm:py-24">
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl" />
        <motion.div
          aria-hidden="true"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -right-20 top-16 hidden h-64 w-64 rounded-full border border-white/10 lg:block"
        >
          <div className="absolute inset-8 rounded-full border border-dashed border-brand-200/15" />
          <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400" />
        </motion.div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">App Preview</span>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">Your Healthcare. In Your Hands.</h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-200/80">See Bawa Smart Care Pharmacy in action across key screens.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                "Smart search",
                "Live tracking",
                "Secure checkout",
              ].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-brand-100/75">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <ShowcasePhone title="Home Page" screen="home" index={0} />
            <ShowcasePhone title="Product Browsing" screen="browse" index={1} />
            <ShowcasePhone title="Order Tracking" screen="track" index={2} />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">How It Works</span>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">Three Simple Steps</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative mt-14 grid gap-5 sm:grid-cols-3"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: easeOut, delay: 0.2 }}
              className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-px origin-left bg-brand-200 sm:block"
            />
            {[
              { n: "01", t: "Download", d: "Get the Bawa Smart Care Pharmacy app on iOS or Android.", icon: featureIcons.search, tone: "bg-brand-700 text-white" },
              { n: "02", t: "Discover", d: "Find medicines and healthcare products easily.", icon: featureIcons.products, tone: "bg-accent-100 text-ink" },
              { n: "03", t: "Order", d: "Place your order and track it live.", icon: featureIcons.track, tone: "bg-brand-950 text-white" },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                variants={cardPop}
                whileHover={{ y: -8, rotate: i === 1 ? 1 : -1 }}
                className={`group relative flex min-h-[230px] flex-col items-start overflow-hidden rounded-3xl border border-transparent p-7 shadow-[0_18px_40px_-28px_rgba(20,55,40,0.5)] transition-shadow duration-300 hover:shadow-[0_26px_50px_-24px_rgba(20,55,40,0.55)] ${s.tone}`}
              >
                <span className="absolute -right-2 -top-4 font-display text-8xl font-medium opacity-10 transition-transform duration-500 group-hover:translate-x-1">0{i + 1}</span>
                <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${i === 0 || i === 2 ? "bg-white/15 text-white" : "bg-white text-brand-700"}`}>
                  {s.icon}
                </span>
                <h3 className={`relative mt-7 text-lg font-semibold ${i === 0 || i === 2 ? "text-white" : "text-ink"}`}>{s.t}</h3>
                <p className={`relative mt-2 text-sm leading-relaxed ${i === 0 || i === 2 ? "text-brand-100/80" : "text-slate-600"}`}>{s.d}</p>
                <span className={`relative mt-auto pt-6 text-xs font-bold uppercase tracking-[0.18em] ${i === 0 || i === 2 ? "text-brand-200/70" : "text-brand-700"}`}>Step {s.n}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="flex flex-col items-center text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Catalog</span>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">Discover Healthcare Products</h2>
            <a href="#download" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-paper">
              Explore in App
            </a>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                variants={cardPop}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? -1 : 1 }}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-transparent shadow-[0_18px_40px_-28px_rgba(20,55,40,0.5)] transition-shadow duration-300 hover:shadow-[0_26px_50px_-24px_rgba(20,55,40,0.55)] ${productCardStyles[i]}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/90">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    quality={90}
                    className="object-cover p-4 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-brand-700 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">{p.tag}</span>
                  <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-brand-700 text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-4 w-4"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </span>
                  <span className="absolute bottom-4 left-4 font-display text-5xl font-medium opacity-10">0{i + 1}</span>
                </div>
                <div className="flex items-center justify-between p-5">
                  <h3 className="text-base font-semibold">{p.name}</h3>
                  <span className="text-xs font-semibold opacity-60 transition-opacity group-hover:opacity-100">In App ✓</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Bawa Smart Care Pharmacy */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="relative order-last lg:order-first"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-line shadow-[0_30px_70px_-40px_rgba(20,55,40,0.4)]">
              <ZoomOnScroll>
                <Image
                  src="/images/why/why.jpg"
                  alt="Caring doctor with patient"
                  fill
                  quality={90}
                  className="object-cover"
                  sizes="(max-width:1024px)100vw,50vw"
                />
              </ZoomOnScroll>
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 shadow-lg ring-1 ring-line">
                <span className="text-amber-500">★★★★★</span>
                <span className="text-xs font-semibold text-slate-800">4.9</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Commitment</span>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">Care You Can Count On</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">From medicines to everyday wellness, Bawa Smart Care Pharmacy connects you to everything your health needs — securely and conveniently.</p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1"
            >
              {[
                { value: 10, suffix: "K+", label: "Healthcare Products", icon: featureIcons.products, tone: "bg-brand-700 text-white" },
                { value: 24, suffix: "/7", label: "Digital Access", icon: featureIcons.personal, tone: "bg-accent-100 text-ink" },
                { value: 100, suffix: "%", label: "Secure Experience", icon: featureIcons.secure, tone: "bg-brand-950 text-white" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={cardPop}
                  whileHover={{ y: -6, rotate: i === 1 ? 1 : -1 }}
                  className={`group relative overflow-hidden rounded-3xl p-5 shadow-[0_16px_35px_-28px_rgba(20,55,40,0.55)] transition-shadow duration-300 hover:shadow-[0_24px_45px_-25px_rgba(20,55,40,0.5)] ${s.tone}`}
                >
                  <span className="absolute -right-1 -top-3 font-display text-7xl font-medium opacity-10 transition-transform duration-500 group-hover:translate-x-1">0{i + 1}</span>
                  <div className="relative flex items-start justify-between">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 ${i === 0 || i === 2 ? "bg-white/15 text-white" : "bg-white text-brand-700"}`}>
                      {s.icon}
                    </span>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${i === 0 || i === 2 ? "bg-white/15 text-white" : "bg-white text-brand-700"}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-4 w-4"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                  <p className="relative mt-7 font-display text-3xl font-medium">
                    <CountUp value={s.value} suffix={s.suffix} className="tabular-nums" />
                  </p>
                  <p className={`relative mt-1 text-sm font-semibold ${i === 0 || i === 2 ? "text-brand-100/75" : "text-slate-600"}`}>{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Download */}
      <section id="download" className="relative overflow-hidden bg-brand-900 py-16 sm:py-24">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
        <motion.div
          aria-hidden="true"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -right-8 top-12 hidden h-52 w-52 rounded-full border border-white/10 lg:block"
        >
          <div className="absolute inset-7 rounded-full border border-dashed border-brand-200/15" />
          <div className="absolute bottom-2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent-400" />
        </motion.div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="flex flex-col text-center lg:text-left">
            <span className="mx-auto rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 lg:mx-0">
              Get started in minutes
            </span>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">Better Healthcare Starts Here.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-200/80">Download Bawa Smart Care Pharmacy and experience a simpler way to manage your healthcare needs.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <a href="#" aria-label="Download on App Store" className="transition-transform duration-300 hover:scale-[1.03]">
                <AppStoreBadge />
              </a>
              <a href="#" aria-label="Get it on Google Play" className="transition-transform duration-300 hover:scale-[1.03]">
                <GooglePlayBadge />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-200/80 lg:justify-start">
              <span className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3"><path d="m5 13 4 4L19 7" /></svg></span>Free to download</span>
              <span className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3"><path d="m5 13 4 4L19 7" /></svg></span>No hidden fees</span>
              <span className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3"><path d="m5 13 4 4L19 7" /></svg></span>24/7 support</span>
            </div>
          </motion.div>
          <ParallaxY amount={50}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: easeOut }}
            className="relative mx-auto flex justify-center lg:justify-end"
          >
            <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="relative">
              <motion.div
                initial={{ opacity: 0, x: -18, y: 12 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.35, duration: 0.6, ease: easeOut }}
                className="absolute -left-8 top-12 z-20 hidden w-40 rounded-2xl border border-white/15 bg-white/10 p-3 text-left shadow-xl backdrop-blur sm:block"
              >
                <div className="flex items-center gap-2 text-accent-300">
                  <span className="text-sm">★★★★★</span>
                  <span className="text-xs font-bold text-white">4.9</span>
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-brand-100/75">A smoother way to care for your everyday health.</p>
              </motion.div>
              <OrderConfirmedPhone />
            </motion.div>
          </motion.div>
          </ParallaxY>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-brand-950 py-16 text-white sm:py-24">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
        <motion.div
          aria-hidden="true"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -right-20 top-16 hidden h-64 w-64 rounded-full border border-white/10 sm:block"
        >
          <div className="absolute inset-8 rounded-full border border-dashed border-brand-200/15" />
          <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400" />
        </motion.div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="flex flex-col items-start"
            >
              <Logo dark />
              <div className="mt-12 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200/70">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-brand-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><path d="M12 5v14M5 12h14" /></svg>
                </span>
                Your neighborhood pharmacy
              </div>
              <h2 className="mt-5 max-w-lg font-display text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-6xl">
                Care is closer
                <br />
                <span className="italic text-brand-300">than you think.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-brand-200/75">
                Visit us in Mayiladuthurai for medicines, everyday wellness products, and thoughtful healthcare support.
              </p>
              <motion.a
                href="tel:+919894010497"
                whileHover={{ x: 6 }}
                className="group mt-10 inline-flex w-full max-w-sm items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur transition-colors hover:bg-white/15 sm:w-auto"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-400 text-brand-950">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" /></svg>
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-200/70">Call us</span>
                  <span className="mt-1 block font-display text-xl font-medium text-white">098940 10497</span>
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="ml-auto h-5 w-5 text-brand-200 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </motion.a>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={contactStagger}
              className="grid gap-4 sm:grid-cols-2"
            >
              <motion.div
                variants={contactCard}
                whileHover={{ y: -8, rotate: -1 }}
                className="relative overflow-hidden rounded-[1.75rem] bg-white p-6 text-ink sm:col-span-2 sm:p-8"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[18px] border-brand-50" />
                <div className="absolute bottom-0 right-12 h-28 w-px bg-brand-100" />
                <div className="relative flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-[0_12px_30px_-12px_rgba(36,82,62,0.8)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-7 w-7"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Find us</p>
                    <address className="mt-2 text-lg not-italic leading-relaxed text-slate-800 sm:text-xl">
                      Periyakannara St, near Sub Jail,<br />
                      Pasupathi Street, Koranad,<br />
                      Mayiladuthurai, Tamil Nadu 609001
                    </address>
                  </div>
                </div>
                <div className="relative mt-8 flex items-center gap-2 border-t border-line pt-4 text-sm font-semibold text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-accent-400" />
                  Easy to reach in Koranad
                </div>
              </motion.div>
              <motion.a
                href="tel:+919894010497"
                aria-label="Call Bawa Smart Care Pharmacy at 098940 10497"
                variants={contactCard}
                whileHover={{ y: -8, rotate: 1 }}
                className="group relative overflow-hidden rounded-[1.75rem] bg-brand-700 p-6 text-white sm:p-7"
              >
                <div className="absolute -bottom-14 -right-8 h-40 w-40 rounded-full border-[18px] border-white/10" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" /></svg>
                </span>
                <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-200/70">Call the pharmacy</p>
                <p className="relative mt-2 font-display text-2xl font-medium">098940 10497</p>
                <p className="relative mt-3 flex items-center gap-2 text-sm font-semibold text-brand-100">
                  Tap to call
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </p>
              </motion.a>
              <motion.div
                variants={contactCard}
                whileHover={{ y: -8 }}
                className="relative overflow-hidden rounded-[1.75rem] bg-accent-100 p-6 text-ink sm:p-7"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-200/70" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/70 text-brand-800">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                </span>
                <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-700">Opening hours</p>
                <p className="relative mt-2 flex items-center gap-2 font-display text-2xl font-medium text-ink">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
                  Open
                </p>
                <p className="relative mt-1 text-sm font-semibold text-slate-600">Closes 11 pm</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-brand-950 py-14 text-brand-200">
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-700/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr_1fr]"
          >
            <motion.div variants={cardPop} className="flex flex-col items-start rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <Logo dark />
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-brand-200/70">Your neighborhood destination for medicines, wellness, and everyday healthcare support.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Medicines", "Wellness", "Everyday care"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-brand-100/70">{item}</span>
                ))}
              </div>
            </motion.div>
            <motion.a
              href="tel:+919894010497"
              variants={cardPop}
              whileHover={{ y: -6, rotate: -1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-brand-700 p-6 sm:p-7"
            >
              <div className="absolute -bottom-12 -right-8 h-36 w-36 rounded-full border-[16px] border-white/10" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" /></svg>
              </span>
              <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-200/70">Need a quick answer?</p>
              <p className="relative mt-2 font-display text-2xl font-medium text-white">Call the pharmacy</p>
              <p className="relative mt-4 flex items-center gap-2 text-sm font-semibold text-brand-100">098940 10497 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 5l7 7-7 7" /></svg></p>
            </motion.a>
            <motion.div variants={cardPop} className="rounded-3xl border border-white/10 bg-brand-800/70 p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-200/70">Visit us</p>
              <address className="mt-5 text-sm not-italic leading-relaxed text-brand-100/85">
                Periyakannara St, near Sub Jail,<br />
                Pasupathi Street, Koranad,<br />
                Mayiladuthurai, Tamil Nadu 609001
              </address>
              <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-white"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />Open · Closes 11 pm</p>
            </motion.div>
          </motion.div>
          <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-7 text-sm sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
              <a href="#" className="transition hover:text-white">Home</a>
              <a href="#about" className="transition hover:text-white">About</a>
              <a href="#features" className="transition hover:text-white">Features</a>
              <a href="#download" className="transition hover:text-white">App</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
            </nav>
            <p className="text-xs text-brand-200/50">© {new Date().getFullYear()} Bawa Smart Care Pharmacy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}