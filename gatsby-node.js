const path = require("path")
const { google } = require("googleapis")
const slugify = require("@sindresorhus/slugify")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

const YOUTUBE = "youTube"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type youTube implements Node {
      image: youTubeImage
    }
    type youTubeImage @dontInfer {
      url: File @link(by: "url")
    }
  `)
}

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const date = new Date()
  const hours = date.getHours()
  const mins = date.getMinutes()
  const seconds = date.getSeconds()
  const timestamp = `h:${hours} m:${mins} s:${seconds}`

  console.log("///// TIMESTAMPS ////", timestamp)

  createNode({
    timestamp: date,
    id: "timestamp",
    internal: {
      type: "built",
      contentDigest: createContentDigest(timestamp),
    },
  })

  const youtube = google.youtube({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY_CLIENT,
  })

  const playlistItemsResponse = await youtube.playlistItems.list({
    playlistId: "PL9W-8hhRoLoN7axEFJQ17rJvk2KTiM2GP",
    part: "snippet",
    maxResults: 50,
    order: "date",
    type: "video",
  })

  const ids = playlistItemsResponse.data.items.map(
    (video) => video.snippet.resourceId.videoId
  )

  const videosResponse = await youtube.videos.list({
    id: ids.join(","),
    part: "snippet,liveStreamingDetails",
  })

  videosResponse.data.items.forEach((video) => {
    createNode({
      ...video,
      id: video.id,
      slug: `${slugify(video.id)}/`,
      internal: {
        type: YOUTUBE,
        contentDigest: createContentDigest(video),
      },
    })
  })
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  createNodeId,
  cache,
  store,
}) => {
  if (node.internal.type === YOUTUBE) {
    node.image = await createRemoteFileNode({
      url: node.snippet.thumbnails.maxres.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    })
  }
}

exports.createPages = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => {
  const result = await graphql(
    `
      {
        allYouTube {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const youTubePageTemplate = path.resolve(
    `src/templates/youtube-page-template.js`
  )
  result.data.allYouTube.edges.forEach(({ node }, index) => {
    const { id, slug } = node
    createPage({
      path: slug,
      component: youTubePageTemplate,
      context: {
        pagePath: slug,
        id: id,
      },
      // https://v4.gatsbyjs.com/docs/how-to/rendering-options/using-deferred-static-generation/
      // index is zero-based index
      defer: index + 1 > 10,
    })
  })
}
