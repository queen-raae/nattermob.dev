import React, { useState, useEffect } from "react"
import { Fragment } from "react"

const LiveNowBadge = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const message = "LIVE NOW - youtube.com/raaecodes"

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion:reduce)")
    const handleChange = (event) => {
      setPrefersReducedMotion(!event.matches)
    }
    reduceQuery.addEventListener("change", handleChange)
    return () => {
      reduceQuery.removeEventListener("change", handleChange)
    }
  }, [isMounted])

  return (
    <Fragment>
      {isMounted ? (
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
              {prefersReducedMotion ? (
                <span style={{ paddingLeft: "4px" }}>{message}</span>
              ) : (
                <marquee style={{ paddingTop: "4px" }}>{message}</marquee>
              )}
            </div>
          </div>
        </a>
      ) : null}
    </Fragment>
  )
}

export default LiveNowBadge
