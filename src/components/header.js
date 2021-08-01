import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const Header = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {isAuthenticated ? (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  )
}

export default Header
