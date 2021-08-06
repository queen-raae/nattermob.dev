import React from "react"
import { Auth0Provider } from "@auth0/auth0-react"
import Seo from "./src/components/seo"
import Header from "./src/components/header"

export const wrapPageElement = ({ element }) => {
  return <Seo>{element}</Seo>
}

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.GATSBY_AUTH0_AUDIENCE}
    >
      <Header />
      {element}
    </Auth0Provider>
  )
}
