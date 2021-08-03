import React from "react"
import { Auth0Provider } from "@auth0/auth0-react"

import Header from "../components/header"

const RootElement = ({ children }) => {
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENT_ID}
      redirectUri={
        typeof window !== "undefined"
          ? `${window.location.origin}/app/profile`
          : "http://localhost:8000"
      }
    >
      <Header />
      {children}
    </Auth0Provider>
  )
}

export default RootElement
