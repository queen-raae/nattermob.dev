const { google } = require("googleapis")
const slugify = require("@sindresorhus/slugify")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

const YOUTUBE = "youTube"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.createSchemaCustomization = ({
  actions: { createTypes, printTypeDefinitions },
}) => {
  createTypes(`
    type youTube implements Node {
      image: youTubeImage
    }
    type youTubeImage @dontInfer {
      url: File @link(by: "url")
    }
  `)

  // printTypeDefinitions({
  //   path: "./types.txt",
  // });
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
    auth: process.env.GOOGLE_API_KEY,
  })

  const response = await youtube.search.list({
    channelId: "UCDlrzlRdM1vGr8nO708KFmQ",
    part: "snippet",
    maxResults: 50,
    order: "date",
    type: "video",
    q: `" · #GatsbyJS Deep Dive"`,
  })

  response.data.items.forEach((video) => {
    createNode({
      ...video,
      id: video.id.videoId,
      slug: slugify(video.id.videoId),
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
      url: node.snippet.thumbnails.high.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    })
  }
}
