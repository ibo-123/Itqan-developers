import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0C2A23",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: 118,
            height: 118,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #D5B66A",
            transform: "rotate(45deg)",
          }}
        >
          <div
            style={{
              width: 74,
              height: 74,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #D5B66A",
              background: "#123C32",
            }}
          >
            <div
              style={{
                transform: "rotate(-45deg)",
                color: "#D5B66A",
                fontSize: 54,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              إ
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
