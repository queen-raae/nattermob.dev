import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Seo from "../components/seo"

const YouTubePageTemplate = ({ data: { youTube } }) => {
  const {
    id,
    slug,
    snippet: { title, description, channelTitle },
    liveStreamingDetails: { scheduledStartTime },
    image,
  } = youTube

  return (
    <Seo path={slug} pageTitle={title} pageDescription={description}>
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "1em" }}>
        <Link to="/">← nattermob.dev</Link>
        <h1>{title}</h1>
        <aside>
          {image ? (
            <a href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer">
              <GatsbyImage alt={title} image={getImage(image.url)} />
            </a>
          ) : null}

          <p>@ {new Date(scheduledStartTime).toLocaleString("en-GB")}</p>
          <p>
            <a href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer">
              View on YouTube ({channelTitle})
            </a>
          </p>
        </aside>
        <pre style={{ whiteSpace: "pre-wrap" }}>{description}</pre>
      </main>
    </Seo>
  )
}

export const query = graphql`
  query ($id: String) {
    youTube(id: { eq: $id }) {
      id
      slug
      image {
        url {
          childImageSharp {
            gatsbyImageData(
              transformOptions: { fit: COVER, cropFocus: CENTER }
              width: 1280
              height: 720
            )
          }
        }
      }
      snippet {
        publishedAt(formatString: "DD/MMM/YYYY, h:mm:ss a")
        title
        description
        thumbnails {
          high {
            height
            url
            width
          }
        }
        channelTitle
      }
      liveStreamingDetails {
        scheduledStartTime
      }
    }
  }
`

export default YouTubePageTemplate
