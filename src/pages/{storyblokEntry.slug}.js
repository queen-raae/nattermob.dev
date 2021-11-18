import React from "react"
import { graphql } from "gatsby"
import SbEditable from "storyblok-react"

import useStoryblok from "../lib/storyblok"
import DynamicComponent from "../components/storyblok-dynamic"

const StoryblokPage = ({ data, location }) => {
  let story = data.storyblokEntry
  story = useStoryblok(story, location)

  const components = story.content.body.map((blok) => {
    return <DynamicComponent blok={blok} key={blok._uid} />
  })

  return (
    <main className="p-6">
      <SbEditable content={story.content}>
        <header className="container max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold">{story.content.title}</h1>
        </header>
        {components}
      </SbEditable>
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
