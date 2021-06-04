import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { orderBy } from "lodash"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      built {
        timestamp(formatString: "DD/MMM/YYYY, h:mm:ss a")
      }
      allYouTube {
        nodes {
          slug
          image {
            url {
              childImageSharp {
                gatsbyImageData(
                  transformOptions: { fit: COVER, cropFocus: CENTER }
                  width: 180
                  height: 100
                )
              }
            }
          }
          gatsbyPath(filePath: "/{youTube.slug}")
          snippet {
            publishedAt
            liveBroadcastContent
            title
            thumbnails {
              default {
                url
                height
                width
              }
            }
          }
        }
      }
    }
  `)

  const treasure = orderBy(
    data.allYouTube.nodes,
    [
      ({ snippet }) => {
        console.log(snippet.liveBroadcastContent)
        switch (snippet.liveBroadcastContent) {
          case "upcoming":
            return 3
          case "live":
            return 2
          default:
            return 1
        }
      },
      "snippet.publishedAt",
    ],
    ["desc", "desc"]
  )

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Gatsby Deep Dives with Queen Raae and the Nattermob Pirates</h1>

      <p>
        To be notified about upcoming streams and other piratical Gatsby
        content, sign up for{" "}
        <a href="https://lillylabs.ck.page/f728bde07b">our newsletter</a>.
      </p>

      <h2>The streams:</h2>

      <ul>
        {treasure.map((video, index) => (
          <li key={index}>
            <Link to={video.gatsbyPath}>
              <h3>
                {`#${treasure.length - index} `}{" "}
                {video.snippet.title
                  .replace(" · #GatsbyJS Deep Dive", "")
                  .replace("🔴🍻", "")
                  .replace("🔴 🍻", "")}
              </h3>

              <GatsbyImage
                alt={video.snippet.title}
                image={getImage(video.image.url)}
              />
              <br />
            </Link>
          </li>
        ))}
      </ul>

      <p style={{ color: "red" }}>
        <b>Site last built: </b>
        {data.built.timestamp}
      </p>
    </main>
  )
}

export default IndexPage
