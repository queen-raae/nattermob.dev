const { google } = require("googleapis")
const slugify = require("@sindresorhus/slugify")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

const YOUTUBE = "youTube"
const MAX_RESULTS = process.env !== "production" ? 5 : 50

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type youTube implements Node {
      image: File @link(from: "fields.image")
      description: youTubeDescription @link(from: "fields.description")
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
    maxResults: MAX_RESULTS,
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
      slug: slugify(video.id),
      internal: {
        type: YOUTUBE,
        contentDigest: createContentDigest(video),
      },
    })
  })
}

exports.onCreateNode = async ({
  node,
  actions: { createNodeField, createNode, createParentChildLink },
  createContentDigest,
  createNodeId,
  cache,
  store,
  reporter,
}) => {
  if (node.internal.type === YOUTUBE) {
    const imageNode = await createRemoteFileNode({
      url: node.snippet.thumbnails.maxres.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
      reporter,
    })

    const descriptionNode = {
      id: createNodeId(`${node.id} >>> markdown`),
      parent: node.id,
      internal: {
        mediaType: "text/markdown",
        type: `${YOUTUBE}Description`,
        content: node.snippet.description,
        contentDigest: createContentDigest(node.snippet.description),
        description: `YouTube description for ${node.slug}`,
      },
    }

    createNode(descriptionNode)

    if (imageNode) {
      createNodeField({ node, name: "image", value: imageNode.id })
    }

    if (descriptionNode) {
      createNodeField({ node, name: "description", value: descriptionNode.id })
    }
  }
}
