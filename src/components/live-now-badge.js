import React, { useState, useEffect } from "react"

const LiveNowBadge = () => {
  const [prefersReduceMotion, setPrefersReduceMotion] = useState(false)
  const message = "LIVE NOW - youtube.com/raaecodes"

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      setPrefersReduceMotion(true)
    }
  }, [])

  return (
    <a
      style={{ textDecoration: "none" }}
      href="http://youtube.com/raaecodes"
      target="_blank"
      rel="noreferrer"
    >
      <div
        style={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "auto 1fr",
          backgroundColor: "#ff000090",
          padding: "8px",
          color: "white",
        }}
      >
        <span aria-label="red circle" role="img">
          🔴
        </span>
        <div style={{ background: "#ff0000" }}>
          {prefersReduceMotion ? (
            <span>{message}</span>
          ) : (
            <marquee style={{ paddingTop: "4px" }}>{message}</marquee>
          )}
        </div>
      </div>
    </a>
  )
}

export default LiveNowBadge
