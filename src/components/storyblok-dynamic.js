import React from "react"
import SbEditable from "storyblok-react"

import Teaser from "./storyblok-teaser"

const Components = {
  teaser: Teaser,
}

const DynamicComponent = ({ blok }) => {
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component]
    return (
      <SbEditable content={blok}>
        <Component blok={blok} />
      </SbEditable>
    )
  }
  return (
    <section className="container max-w-3xl m-auto py-8">
      <p>
        The component <strong>{blok.component}</strong> has not been created
        yet.
      </p>
      <pre className="whitespace-pre-wrap">{JSON.stringify(blok, null, 2)}</pre>
    </section>
  )
}

export default DynamicComponent
