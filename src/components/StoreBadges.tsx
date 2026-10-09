export function AppStoreBadge() {
  return (
    <span className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-brand-950 px-4 py-2.5 text-white transition-transform duration-300 hover:scale-[1.03]">
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08ZM12.03 7.25a4.3 4.3 0 0 1-.3-3.25c.2-.52.6-1.22 1.2-1.47.5-.2 1.18-.25 1.69-.05.4.15.6.5.72.85.4 1.23.1 2.27-.56 2.8-.74.62-1.66 1.06-2.75 1.12Z" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wide text-white/70">
          Download on the
        </span>
        <span className="text-base font-semibold">App Store</span>
      </span>
    </span>
  );
}

export function GooglePlayBadge() {
  return (
    <span className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-brand-950 px-4 py-2.5 text-white transition-transform duration-300 hover:scale-[1.03]">
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,10.97 20.75,11.34 20.75,11.75C20.75,12.16 20.5,12.53 20.16,12.69L17.55,14.1L16.28,12.83L17.55,11.56L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
        />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wide text-white/70">
          GET IT ON
        </span>
        <span className="text-base font-semibold">Google Play</span>
      </span>
    </span>
  );
}