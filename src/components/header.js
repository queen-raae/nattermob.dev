import React from "react"
import { Link } from "gatsby"
import { useAuth0 } from "@auth0/auth0-react"

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {isAuthenticated ? (
        <div
          style={{
            alignItems: "center",
            display: "grid",
            gridTemplateColumns: "auto auto",
            gridGap: 8,
          }}
        >
          <Link to="/profile">profile</Link>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  )
}

export default Header
