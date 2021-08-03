import React from "react"
import { navigate } from "gatsby"
import { useAuth0 } from "@auth0/auth0-react"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { isAuthenticated } = useAuth0()

  if (!isAuthenticated && location.pathname !== "/app/profile") {
    navigate("/")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
