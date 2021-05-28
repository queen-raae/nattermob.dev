const { google } = require('googleapis');
const slugify = require('@sindresorhus/slugify');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

const YOUTUBE = 'youTube';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

exports.createSchemaCustomization = ({
  actions: { createTypes, printTypeDefinitions }
}) => {
  createTypes(`
    type youTube implements Node {
      image: youTubeImage
    }
    type youTubeImage @dontInfer {
      url: File @link(by: "url")
    }
  `);

  // printTypeDefinitions({
  //   path: "./types.txt",
  // });
};

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY
  });

  const response = await youtube.search.list({
    channelId: 'UCDlrzlRdM1vGr8nO708KFmQ',
    part: 'snippet',
    maxResults: 10,
    order: 'date',
    type: 'video',
    q: '#Nattermob'
  });

  response.data.items.forEach((video) => {
    actions.createNode({
      ...video,
      id: video.id.videoId,
      slug: slugify(video.id.videoId),
      internal: {
        type: YOUTUBE,
        contentDigest: createContentDigest(video)
      }
    });
  });
};

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  createNodeId,
  cache,
  store
}) => {
  if (node.internal.type === YOUTUBE) {
    node.image = await createRemoteFileNode({
      url: node.snippet.thumbnails.high.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store
    });
  }
};
