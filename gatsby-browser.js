import React from "react"
import { Auth0Provider } from "@auth0/auth0-react"

import Seo from "./src/components/seo"

import Header from "./src/components/header"
import LiveNowBadge from "./src/components/live-now-badge"

export const wrapPageElement = ({ element }) => {
  return <Seo>{element}</Seo>
}

export const wrapRootElement = ({ element }) => {
  return (
    <div>
      <Auth0Provider
        domain={process.env.GATSBY_AUTH0_DOMAIN}
        clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
        redirectUri={`${window.location.origin}/app/profile`}
        audience={process.env.GATSBY_AUTH0_AUDIENCE}
        scope={process.env.GATSBY_AUTH0_SCOPE}
      >
        <Header />
        <LiveNowBadge />
        {element}
      </Auth0Provider>
    </div>
  )
}
