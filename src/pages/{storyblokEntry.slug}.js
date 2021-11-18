import React, { Fragment } from "react"
import { graphql } from "gatsby"

const getBlok = (blok) => {
  const { component } = blok

  console.log(component)
  console.log(blok)

  switch (component) {
    case "teaser":
      return (
        <Fragment>
          <h2>{blok.headline}</h2>
          <pre>{JSON.stringify(blok, null, 2)}</pre>
        </Fragment>
      )

    case "grid":
      return (
        <Fragment>
          {blok.columns.map((column, index) => {
            return <pre key={index}>{JSON.stringify(column, null, 2)}</pre>
          })}
        </Fragment>
      )

    case "feature":
      return (
        <Fragment>
          <h2>{blok.name}</h2>
          <pre>{JSON.stringify(blok, null, 2)}</pre>
        </Fragment>
      )

    default:
      return null
  }
}

const StoryblokPage = ({ data }) => {
  const story = data.storyblokEntry
  const raw = JSON.parse(story.content)

  const { title, body } = JSON.parse(story.content)

  return (
    <main>
      <h1>{title}</h1>
      {body.map((blok, index) => {
        return <Fragment key={index}>{getBlok(blok)}</Fragment>
      })}
    </main>
  )
}

export const query = graphql`
  query ($slug: String!) {
    storyblokEntry(slug: { eq: $slug }) {
      id
      name
      full_slug
      content
    }
  }
`

export default StoryblokPage
