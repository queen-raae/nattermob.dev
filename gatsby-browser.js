import React, { Fragment } from "react"

import Seo from "./src/components/seo"
import LiveNowMarquee from "./src/components/live-now-marquee"

export const wrapPageElement = ({ element }) => {
  return <Seo>{element}</Seo>
}

// wrapRootElement persits across routes and doesn't unmount,
// we might want this to be in wrapPageElement above
// maybe a good point to discuss the difference
export const wrapRootElement = ({ element }) => {
  return (
    <Fragment>
      <LiveNowMarquee />
      {element}
    </Fragment>
  )
}
