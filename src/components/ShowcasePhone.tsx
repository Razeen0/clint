"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function BottomNav({ active }: { active: number }) {
  const items = [
    <svg key="h" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></svg>,
    <svg key="s" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>,
    <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><path d="M6 7h12l1 13H5z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>,
    <svg key="p" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>,
  ];
  return (
    <div className="mx-4 mb-3 flex items-center justify-around rounded-full border border-line bg-white px-2 py-2">
      {items.map((icon, i) => (
        <span key={i} className={`flex h-8 w-8 items-center justify-center rounded-full ${i === active ? "bg-brand-700 text-white" : "text-slate-300"}`}>
          {icon}
        </span>
      ))}
    </div>
  );
}

function HomeScreen() {
  return (
    <div className="flex h-full flex-col bg-[#f6f5f1]">
      <div className="bg-brand-700 px-5 pb-6 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] font-medium uppercase tracking-widest text-white/70">Welcome back</p>
            <p className="text-sm font-bold text-white">Good Morning 👋</p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[10px] font-medium text-slate-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          Search medicines, products...
        </div>
      </div>
      <div className="mx-4 mt-4 flex gap-2 text-[9px] font-semibold">
        {["All", "Medicines", "Vitamins", "Essentials"].map((c, i) => (
          <span key={c} className={`rounded-full px-3 py-1.5 ${i === 0 ? "bg-brand-700 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"}`}>{c}</span>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3 px-4 pb-3 pt-4">
        {[
          ["Paracetamol 500mg", "$4.99", "bg-brand-50", "text-brand-700/70"],
          ["Vitamin C", "$6.49", "bg-accent-50", "text-amber-500"],
          ["First Aid Kit", "$18.99", "bg-brand-100", "text-brand-800/70"],
          ["Multivitamin", "$9.50", "bg-accent-100", "text-amber-600"],
          ["Omega-3 60ct", "$11.20", "bg-emerald-50", "text-emerald-600/70"],
          ["Hand Sanitizer", "$2.75", "bg-slate-100", "text-slate-500"],
        ].map(([name, price, tint, iconColor]) => (
          <div key={name as string} className="flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-2.5">
            <div className={`relative flex h-12 items-end justify-center overflow-hidden rounded-lg ${tint as string}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className={`absolute bottom-1.5 h-6 w-4 ${iconColor as string}`}>
                <ellipse cx="12" cy="14" rx="6" ry="8" />
                <path d="M7 9h10v10H7z" opacity={0.35} />
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="truncate text-[9px] font-bold text-slate-800">{name as string}</p>
                <p className="text-[9px] font-bold text-brand-700">{price as string}</p>
              </div>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3"><path d="M12 5v14M5 12h14" /></svg>
              </span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active={0} />
    </div>
  );
}

function BrowseScreen() {
  return (
    <div className="flex h-full flex-col bg-[#f6f5f1]">
      <div className="flex items-center gap-3 px-5 pt-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-4 w-4"><path d="M15 18l-6-6 6-6" /></svg>
        </span>
        <div>
          <p className="text-xs font-bold text-slate-900">Medicine &amp; Products</p>
          <p className="text-[8px] text-slate-400">Browse the store</p>
        </div>
      </div>
      <div className="mx-4 mt-3 flex items-center gap-2 rounded-2xl bg-brand-700 p-3.5 text-white">
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" /><path d="m9 12 2 2 4-4" /></svg>
        </span>
        <div className="flex-1">
          <p className="text-[8px] uppercase tracking-wider text-white/70">Verified by Bawa Smart Care</p>
          <p className="text-[11px] font-bold">100% Genuine Medicines</p>
        </div>
      </div>
      <div className="flex-1 space-y-3 overflow-hidden px-4 pb-3 pt-4">
        <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-accent-50">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-6 text-amber-500"><ellipse cx="12" cy="14" rx="7" ry="9" /><path d="M6 10h12" opacity={0.4} /></svg>
          </div>
          <div className="flex flex-1 flex-col">
            <p className="text-[8px] font-semibold uppercase tracking-wide text-brand-600">Bestseller</p>
            <p className="text-[11px] font-bold text-slate-900">Vitamin C + Zinc 60 tabs</p>
            <p className="text-[9px] text-slate-400">Immunity support</p>
            <div className="mt-auto flex items-center justify-between">
              <p className="text-xs font-bold text-brand-700">$6.49</p>
              <span className="rounded-full bg-brand-700 px-3 py-1 text-[9px] font-bold text-white">Add +</span>
            </div>
          </div>
        </div>
        {[
          ["Paracetamol 500mg", "$4.99", "bg-brand-50"],
          ["Omega-3 Fish Oil", "$11.20", "bg-accent-50"],
          ["Digital Thermometer", "$8.90", "bg-emerald-50"],
        ].map(([name, price, tint]) => (
          <div key={name as string} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${tint as string}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-4 text-brand-600/70">
                <ellipse cx="12" cy="14" rx="6" ry="8" />
                <path d="M7 9h10v10H7z" opacity={0.35} />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-800">{name as string}</p>
              <p className="text-[10px] font-bold text-brand-700">{price as string}</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100">−</span>
              <span>1</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-white">+</span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active={1} />
    </div>
  );
}

function TrackScreen() {
  const steps = ["Ordered", "Packed", "Shipped", "Delivered"];
  return (
    <div className="flex h-full flex-col bg-[#f6f5f1]">
      <div className="flex items-center gap-3 px-5 pt-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-4 w-4"><path d="M15 18l-6-6 6-6" /></svg>
        </span>
        <div>
          <p className="text-xs font-bold text-slate-900">Track Order</p>
          <p className="text-[8px] text-slate-400">#MDC-48291</p>
        </div>
      </div>
      <div className="mx-4 mt-4 rounded-2xl bg-brand-700 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] text-white/70">Out for delivery</p>
            <p className="text-sm font-bold">Arriving today by 6 PM</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M1 8h13v10H5a4 4 0 0 1-4-4z" /><path d="M14 11h4l3 3v4h-7z" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></svg>
          </span>
        </div>
      </div>
      <div className="mx-4 mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div className={`h-1 flex-1 rounded-full ${i >= 3 ? "bg-transparent" : i < 3 ? "bg-brand-200" : ""}`} />
                <span className={`relative flex h-5 w-5 items-center justify-center rounded-full ${i <= 2 ? "bg-brand-700 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {i <= 2 ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-2.5 w-2.5"><path d="m5 12 4 4L19 6" /></svg>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  )}
                </span>
                <div className="h-1 flex-1 rounded-full bg-slate-100" />
              </div>
              <p className={`mt-2 text-[8px] font-semibold ${i <= 2 ? "text-brand-700" : "text-slate-400"}`}>{s}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-4 mt-4 h-28 overflow-hidden rounded-2xl bg-brand-800">
        <svg viewBox="0 0 280 110" fill="none" className="absolute inset-0 h-full w-full">
          <path d="M20 90 C 60 30, 120 20, 160 55 S 240 80, 262 40" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeDasharray="5 5" />
          <circle cx="20" cy="90" r="4" fill="#b3d4c0" />
          <circle cx="262" cy="40" r="4" fill="#fff" />
        </svg>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[9px] font-bold text-brand-800 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
          </span>
          Live tracking
        </div>
      </div>
      <div className="mx-4 mt-4 flex items-center justify-between rounded-2xl bg-white p-3.5 ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-4 w-4"><path d="m5 13 4 4L19 7" /></svg>
          </span>
          <div>
            <p className="text-[10px] font-bold text-slate-900">Order confirmed</p>
            <p className="text-[8px] text-slate-400">Payment received · $26.47</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-bold text-emerald-600">PAID</span>
      </div>
      <div className="flex-1" />
      <BottomNav active={2} />
    </div>
  );
}

const SCREENS = { home: HomeScreen, browse: BrowseScreen, track: TrackScreen };

export default function ShowcasePhone({
  title,
  screen,
  index,
}: {
  title: string;
  screen?: keyof typeof SCREENS;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : index % 2 === 0 ? 2 : -2, 0]);
  const Screen = SCREENS[screen ?? (["home", "browse", "track"] as const)[index % 3]];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative mx-auto flex flex-col items-center rounded-[2.5rem] p-3 transition-colors duration-500 hover:bg-white/5"
    >
      <div className="pointer-events-none absolute -inset-5 rounded-[3rem] bg-brand-600/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute -left-1 top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-brand-800 text-xs font-bold text-brand-100 shadow-lg">0{index + 1}</span>
      <motion.div style={{ y, rotate }} className="relative">
        <div className="relative h-[540px] w-[270px] overflow-hidden rounded-[2.8rem] bg-slate-950 p-[7px] shadow-[0_40px_90px_-35px_rgba(8,24,17,0.65)] ring-1 ring-white/10 sm:h-[580px] sm:w-[290px]">
          <div className="absolute inset-x-0 top-0 z-20 flex justify-center">
            <div className="h-[22px] w-32 rounded-b-2xl bg-slate-950" />
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-[2.35rem] bg-[#f6f5f1]">
            <Screen />
          </div>
        </div>
      </motion.div>
      <div className="mt-4 flex flex-col items-center gap-1">
        <p className="text-sm font-semibold text-white">{title}</p>
        <span className="h-0.5 w-8 rounded-full bg-brand-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}