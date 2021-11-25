import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const IndexPage = ({ location }) => {
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(location.search)
    if (query.get("success")) {
      setMessage("Donation succeded -- thank you 🎉")
    }

    if (query.get("canceled")) {
      setMessage("Donation canceled -- try again when you’re ready.")
    }
  }, [location.search])

  const data = useStaticQuery(graphql`
    {
      built {
        timestamp(formatString: "DD/MMM/YYYY, h:mm:ss a")
      }
      allYouTube(
        sort: { fields: liveStreamingDetails___scheduledStartTime, order: DESC }
      ) {
        nodes {
          slug
          image {
            childImageSharp {
              gatsbyImageData(
                transformOptions: { fit: COVER, cropFocus: CENTER }
                width: 180
                height: 100
              )
            }
          }
          gatsbyPath(filePath: "/{youTube.slug}")
          snippet {
            publishedAt
            title
          }
          liveStreamingDetails {
            scheduledStartTime
          }
        }
      }
    }
  `)

  const treasure = data.allYouTube.nodes

  return (
    <main className="container mx-auto p-6">
      <div className="grid gap-10">
        <div className="grid gap-4">
          <h1 className="text-4xl font-bold text-red-600">
            Gatsby Deep Dives with Queen Raae and the Nattermob Pirates
          </h1>

          <p>
            To be notified about upcoming streams and other piratical Gatsby
            content, sign up for{" "}
            <a
              href="https://lillylabs.ck.page/f728bde07b"
              className="text-purple-800 font-bold"
            >
              our newsletter
            </a>
          </p>
          {message ? (
            message
          ) : (
            <form
              action="/api/@raae/gatsby-plugin-donations/donation"
              method="POST"
            >
              <fieldset>
                <p>
                  <label htmlFor="amount">Amount: </label>
                  <br />
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    defaultValue="10"
                  />
                </p>
                <p>
                  <button>Donate</button>
                </p>
              </fieldset>
            </form>
          )}
        </div>
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold font-mono">The streams:</h2>
          <ul className="grid gap-6 lg:grid-cols-2">
            {treasure.map((video, index) => (
              <li
                key={index}
                className="bg-white shadow-lg rounded overflow-hidden"
              >
                <Link to={video.gatsbyPath} className="grid grid-cols-auto-1fr">
                  <GatsbyImage
                    alt={video.snippet.title}
                    image={getImage(video.image)}
                  />

                  <div className="grid gap-0 items-center p-4">
                    <h3 className="text-1xl font-bold">
                      {`#${treasure.length - index} `} {video.snippet.title}{" "}
                    </h3>

                    <p className="text-sm justify-self-end text-gray-400">
                      @{" "}
                      {new Date(
                        video.liveStreamingDetails.scheduledStartTime
                      ).toLocaleString()}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-red-400">
          <b className="font-bold">Site last built: </b>
          {data.built.timestamp}
        </p>
      </div>
    </main>
  )
}

export default IndexPage
