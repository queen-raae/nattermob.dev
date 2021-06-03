import React from "react"

const LiveNowMarquee = () => {
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
          placeItems: "center",
          gridTemplateColumns: "auto 1fr",
          backgroundColor: "#ff000090",
          padding: "8px",
          color: "white",
        }}
      >
        <span aria-label="Red Circle" role="img">
          🔴
        </span>

        <marquee
          style={{
            backgroundColor: "#ff0000",
          }}
        >
          Live Now | https://www.youtube.com/raaecodes
        </marquee>
      </div>
    </a>
  )
}

export default LiveNowMarquee
