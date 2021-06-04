import React, { useState, useEffect } from "react"

const LiveNowBadge = () => {
  const [prefersReduceMotion, setPrefersReduceMotion] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      setPrefersReduceMotion(true)
    }
  }, [])

  return (
    <a href="http://youtube.com/raaecodes" target="_blank" rel="noreferrer">
      {prefersReduceMotion ? <span>LIVE</span> : <marquee>LIVE</marquee>}
    </a>
  )
}

export default LiveNowBadge
