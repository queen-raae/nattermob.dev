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
      domain="nattermob.eu.auth0.com"
      clientId="VBIk4TkMp0pFgmAcI1F9ZUcUkIb4lh6V"
      redirectUri={window.location.origin}
    >
      <Header />
      {element}
    </Auth0Provider>
  )
}
