import React from "react"

import RootElement from "./src/components/root-element"
import LiveNowBadge from "./src/components/live-now-badge"
import Seo from "./src/components/seo"

export const wrapPageElement = ({ element }) => {
  return <Seo>{element}</Seo>
}

export const wrapRootElement = ({ element }) => {
  return (
    <RootElement>
      <LiveNowBadge />
      {element}
    </RootElement>
  )
}
