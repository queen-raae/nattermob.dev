import React, { Fragment, useState, useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

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

  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    ;(async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.GATSBY_AUTH0_AUDIENCE,
        scope: process.env.GATSBY_AUTH0_SCOPE,
      })

      try {
        const response = await axios.post("/api/are-we-live", null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(response.data)
        setAreWeLive(response.data.areWeLive)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setHasError(true)
        setIsLoading(false)
      }
    })()

    setIsMounted(true)
  }, [getAccessTokenSilently])

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion:reduce)")
    setPrefersReducedMotion(reduceQuery.matches)

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches)
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
