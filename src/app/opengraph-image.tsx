import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vyan Insya Nur Muhammad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    // biome-ignore lint/a11y/useAltText: og image, not rendered as <img>
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0E1200",
      }}
    >
      <svg
        height="240"
        viewBox="0 0 636.36 318.18"
        width="480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Custom Logo</title>
        <polygon
          fill="#fff"
          points="393.05 0 211.23 0 423.8 212.57 514.7 121.66 514.7 121.65 393.05 0"
        />
        <polygon
          fill="#fff"
          points="514.7 121.66 514.7 318.18 636.36 318.18 636.36 243.31 514.71 121.66 514.7 121.66"
        />
        <polygon
          fill="#fff"
          points="0 0 318.18 318.18 409.09 227.27 181.82 0 0 0"
        />
      </svg>
    </div>,
    { ...size }
  );
}
