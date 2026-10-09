import Image from "next/image";

const sizes = {
  sm: {
    mark: "h-11 w-11 rounded-xl",
    name: "text-base",
    sub: "text-[9px] tracking-[0.24em]",
    gap: "gap-3",
  },
  lg: {
    mark: "h-16 w-16 rounded-2xl",
    name: "text-2xl sm:text-[1.75rem]",
    sub: "text-[11px] tracking-[0.28em]",
    gap: "gap-3.5",
  },
  xl: {
    mark: "h-20 w-20 rounded-[1.25rem] sm:h-24 sm:w-24",
    name: "text-3xl sm:text-4xl",
    sub: "text-xs tracking-[0.3em]",
    gap: "gap-4",
  },
} as const;

export default function Logo({
  dark = false,
  size = "sm",
  className = "",
}: {
  dark?: boolean;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const s = sizes[size];
  const textColor = dark ? "#f8f7f4" : "#1b211d";
  const secondaryTextColor = dark ? "#b3d4c0" : "#2b654a";

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <span
        className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-white shadow-[0_10px_30px_-12px_rgba(20,55,40,0.55)] ring-1 ring-black/10 ${s.mark}`}
      >
        <Image
          src="/red.png"
          alt="Bawa Smart Care Pharmacy logo"
          width={1254}
          height={1254}
          priority
          sizes={size === "lg" ? "64px" : size === "xl" ? "96px" : "44px"}
          className="h-full w-full object-cover"
        />
      </span>
      <span className="flex min-w-0 flex-col">
        <span
          className={`font-display font-semibold leading-none tracking-tight ${s.name}`}
          style={{ color: textColor }}
        >
          Bawa Smart Care
        </span>
        <span
          className={`mt-1.5 font-bold uppercase ${s.sub}`}
          style={{ color: secondaryTextColor }}
        >
          Pharmacy
        </span>
      </span>
    </span>
  );
}
