import React from "react"

import RootElement from "./src/components/root-element"
import Seo from "./src/components/seo"

export const wrapPageElement = ({ element }) => {
  return <Seo>{element}</Seo>
}

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>
}
