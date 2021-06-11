import React, { useState, useEffect } from "react"
import { Fragment } from "react"

const LiveNowContent = ({
  prefersReducedMotion,
  bgColor,
  color = "#ffffff",
  message,
  ariaLabel,
  emoji,
}) => {
  return (
    <Fragment>
      <span aria-label={ariaLabel} role="img">
        {emoji}
      </span>
      <div style={{ color: color, background: bgColor }}>
        {prefersReducedMotion ? (
          <span style={{ paddingLeft: "4px" }}>{message}</span>
        ) : (
          <marquee style={{ paddingTop: "4px" }}>{message}</marquee>
        )}
      </div>
    </Fragment>
  )
}

const LiveNowBadge = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [areWeLive, setAreWeLive] = useState(false)
  const [hasError, setHasError] = useState(false)

  const liveMessage = "LIVE NOW - youtube.com/raaecodes"
  const notLiveMessage = "NOT LIVE - youtube.com/raaecodes"
  const errorMessage = "Blast! There's been an error"
  const loadingMessage = "Loading..."

  useEffect(() => {
    fetch("/api/are-we-live")
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json()
        } else {
          throw Error(response.message)
        }
      })
      .then((response) => {
        console.log("then.response: ", response)
        setAreWeLive(response.areWeLive)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("catch.error: ", error)
        setHasError(true)
        setIsLoading(false)
      })
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

  console.log("areWeLive: ", areWeLive)
  console.log("hasError: ", hasError)

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
              padding: "8px",
              color: "white",
            }}
          >
            {isLoading ? (
              <LiveNowContent
                prefersReducedMotion={prefersReducedMotion}
                color="#000000"
                bgColor="#999999"
                message={loadingMessage}
                ariaLabel="anchor"
                emoji="⚓"
              />
            ) : (
              <Fragment>
                {hasError ? (
                  <LiveNowContent
                    prefersReducedMotion={prefersReducedMotion}
                    color="#000000"
                    bgColor="#ffff00"
                    message={errorMessage}
                    ariaLabel="warning"
                    emoji="⚠️"
                  />
                ) : (
                  <Fragment>
                    {areWeLive ? (
                      <LiveNowContent
                        prefersReducedMotion={prefersReducedMotion}
                        bgColor="#ff0000"
                        message={liveMessage}
                        ariaLabel="red circle"
                        emoji="🔴"
                      />
                    ) : (
                      <LiveNowContent
                        prefersReducedMotion={prefersReducedMotion}
                        bgColor="#0000ff"
                        message={notLiveMessage}
                        ariaLabel={`three 0'clock`}
                        emoji="🕒"
                      />
                    )}
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </a>
      ) : null}
    </Fragment>
  )
}

export default LiveNowBadge
