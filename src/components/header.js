import React from "react"
import { Link } from "gatsby"
import { useAuth0 } from "@auth0/auth0-react"
import { Fragment } from "react"

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0()

  return (
    <div
      style={{
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        padding: 8,
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridGap: 8,
        }}
      >
        <Link to="/">nattermob.dev</Link>
        <Link to="/stowaways">stowaways</Link>
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Fragment>
            {isAuthenticated ? (
              <div
                style={{
                  alignItems: "center",
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  gridGap: 8,
                }}
              >
                <Link to="/app/profile">profile</Link>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Log out
                </button>
              </div>
            ) : (
              <button onClick={() => loginWithRedirect()}>Log In</button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default Header
