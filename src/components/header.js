import React, { Fragment } from "react"
import { useAuth0 } from "@auth0/auth0-react"

import LiveNowBadge from "./live-now-badge"

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0()

  return (
    <header>
      <div
        style={{
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          padding: 8,
          justifyContent: "space-between",
        }}
      >
        <div>Nattermob.dev</div>
        <div>
          {isLoading ? (
            <div>
              Loading...{" "}
              <span role="img" aria-label="parrot">
                🦜
              </span>
            </div>
          ) : (
            <Fragment>
              {isAuthenticated ? (
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Log out
                </button>
              ) : (
                <button onClick={() => loginWithRedirect()}>Log In</button>
              )}
            </Fragment>
          )}
        </div>
      </div>
      <div>{isAuthenticated ? <LiveNowBadge /> : null}</div>
    </header>
  )
}

export default Header
