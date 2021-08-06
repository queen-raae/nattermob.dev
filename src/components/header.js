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
      <div>
        <Link to="/">nattermob.dev</Link>
      </div>
      <div>
        {isLoading ? (
          /*
             Could we make this "Loading..." into:
             "Boarding"
             ""
             _ _ _ _ (something?)
          */
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
              /*
                 Could we make this >Log In< into:
                 "Come aboard!"
                 ""
                _ _ _ _ (something?)
              */
              <button onClick={() => loginWithRedirect()}>Log In</button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default Header
