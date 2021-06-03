import React, { useEffect, useState } from "react"

const LiveNowMarquee = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    console.log(window.matchMedia("(prefers-reduced-motion: reduce)"))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPrefersReducedMotion(true)
    }
  }, [])

  const message = "Live Now | https://www.youtube.com/raaecodes"

  return (
    <a
      href="https://www.youtube.com/raaecodes"
      rel="noreferrer"
      target="_blank"
      style={{
        textDecoration: "none",
      }}
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
        <span aria-label="Red Circle" role="img">
          🔴
        </span>
        <div
          style={{
            backgroundColor: "#ff0000",
          }}
        >
          {prefersReducedMotion ? (
            <div>{message}</div>
          ) : (
            <marquee>{message}</marquee>
          )}
        </div>
      </div>
    </a>
  )
}

export default LiveNowMarquee
