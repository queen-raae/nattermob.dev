import React, { Fragment } from "react"
import Seo from "./src/components/seo"
import Header from "./src/components/header"

export const wrapPageElement = ({ element }) => {
  return <Seo>{element}</Seo>
}

export const wrapRootElement = ({ element }) => {
  return (
    <Fragment>
      <Header />
      {element}
    </Fragment>
  )
}
