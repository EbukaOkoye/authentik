interface IosSpinnerProps {
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
  label?: string;
}

const SIZE_CLASSES = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-9 w-9",
} as const;

// One spoke per 45°, fading toward the tail like UIActivityIndicatorView.
const SPOKES = [
  { rotate: "rotate-0", opacity: "opacity-100" },
  { rotate: "rotate-45", opacity: "opacity-90" },
  { rotate: "rotate-90", opacity: "opacity-75" },
  { rotate: "rotate-[135deg]", opacity: "opacity-60" },
  { rotate: "rotate-180", opacity: "opacity-45" },
  { rotate: "rotate-[225deg]", opacity: "opacity-35" },
  { rotate: "-rotate-90", opacity: "opacity-25" },
  { rotate: "-rotate-45", opacity: "opacity-20" },
] as const;

export const IosSpinner = ({
  size = "md",
  tone = "dark",
  label = "Loading",
}: IosSpinnerProps) => {
  const color = tone === "dark" ? "bg-[#3c3c43]" : "bg-white";

  return (
    <span
      role="status"
      aria-label={label}
      className={`ios-spinner relative inline-block ${SIZE_CLASSES[size]}`}
    >
      {SPOKES.map((spoke) => (
        <span
          key={spoke.rotate}
          className={`absolute inset-0 ${spoke.rotate}`}
          aria-hidden="true"
        >
          <span
            className={`absolute left-1/2 top-0 h-[30%] w-[11%] -translate-x-1/2 rounded-full ${color} ${spoke.opacity}`}
          />
        </span>
      ))}
    </span>
  );
};

