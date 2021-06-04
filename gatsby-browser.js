import React from "react"
import { Fragment } from "react"
import LiveNowBadge from "./src/components/live-now-badge"
import Seo from "./src/components/seo"

export const wrapPageElement = ({ element }) => {
  return <Seo>{element}</Seo>
}

export const wrapRootElement = ({ element }) => {
  return (
    <Fragment>
      <LiveNowBadge />
      {element}
    </Fragment>
  )
}
