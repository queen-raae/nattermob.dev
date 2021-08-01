import React from "react"

import RootElement from "./src/components/root-element"
import Seo from "./src/components/seo"

export const wrapPageElement = ({ element }) => {
  return (
    <RootElement>
      <Seo>{element}</Seo>
    </RootElement>
  )
}
