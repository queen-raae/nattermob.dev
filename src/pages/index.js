import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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
            publishedAt(formatString: "DD/MMM/YYYY, h:mm:ss a")
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

  const treasure = data.allYouTube.nodes

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Nattermob.dev</h1>
      <p style={{ color: "red" }}>
        <b>Site last built: </b>
        {data.built.timestamp}
      </p>
      <ul>
        {treasure.map((video, index) => (
          <li key={index}>
            <br />
            {
              <span>
                <b>{`#${treasure.length - index} `}</b>
              </span>
            }
            <br />
            <br />
            <Link to={video.gatsbyPath}>
              <GatsbyImage
                alt={video.snippet.title}
                image={getImage(video.image.url)}
              />
              <br />
              {video.snippet.title}
              <br />
              <br />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default IndexPage
