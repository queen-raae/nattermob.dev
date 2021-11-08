import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Seo from "../components/seo"

const YouTubePage = ({ data: { youTube } }) => {
  const {
    id,
    gatsbyPath,
    snippet: { title, channelTitle },
    liveStreamingDetails: { scheduledStartTime },
    image,
    description: {
      childMarkdownRemark: { html, rawMarkdownBody },
    },
  } = youTube

  return (
    <Seo path={gatsbyPath} pageTitle={title} pageDescription={rawMarkdownBody}>
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "1em" }}>
        <Link to="/">← nattermob.dev</Link>
        <h1>{title}</h1>
        <aside>
          {image ? (
            <a href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer">
              <GatsbyImage alt={title} image={getImage(image)} />
            </a>
          ) : null}

          <p>@ {new Date(scheduledStartTime).toLocaleString("en-GB")}</p>
          <p>
            <a href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer">
              View on YouTube ({channelTitle})
            </a>
          </p>
        </aside>

        <section
          className="markdown"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </Seo>
  )
}

export const query = graphql`
  query ($id: String) {
    youTube(id: { eq: $id }) {
      id
      gatsbyPath(filePath: "/{youTube.slug}")
      image {
        childImageSharp {
          gatsbyImageData(
            transformOptions: { fit: COVER, cropFocus: CENTER }
            width: 1280
            height: 720
          )
        }
      }
      description {
        childMarkdownRemark {
          html
          rawMarkdownBody
        }
      }
      snippet {
        publishedAt(formatString: "DD/MMM/YYYY, h:mm:ss a")
        title
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

export default YouTubePage
