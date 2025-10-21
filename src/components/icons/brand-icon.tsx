export default function BrandIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-label="Custom Logo"
      className={className}
      height={size}
      viewBox="0 0 636.36 318.18"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Custom Logo</title>
      <polygon
        fill="currentColor"
        points="393.05 0 211.23 0 423.8 212.57 514.7 121.66 514.7 121.65 393.05 0"
      />
      <polygon
        fill="currentColor"
        points="514.7 121.66 514.7 318.18 636.36 318.18 636.36 243.31 514.71 121.66 514.7 121.66"
      />
      <polygon
        fill="currentColor"
        points="0 0 318.18 318.18 409.09 227.27 181.82 0 0 0"
      />
    </svg>
  );
}
