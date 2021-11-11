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
      <main className="py-8 px-4 max-w-3xl mx-auto grid gap-8">
        <Link to="/">← nattermob.dev</Link>

        <h1 className="text-2xl font-bold font-mono">{title}</h1>
        {image ? (
          <a href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer">
            <GatsbyImage alt={title} image={getImage(image)} />
          </a>
        ) : null}

        <aside className="p-4 mb-4 shadow-md">
          <p>@ {new Date(scheduledStartTime).toLocaleString("en-GB")}</p>

          <a
            href={`https://youtu.be/${id}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            <span>View on YouTube ({channelTitle})</span>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </aside>

        <section className="prose" dangerouslySetInnerHTML={{ __html: html }} />
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
