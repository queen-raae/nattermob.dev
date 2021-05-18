const { google } = require('googleapis');
const slugify = require('@sindresorhus/slugify');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const YOUTUBE = 'youTube';

exports.createSchemaCustomization = ({
  actions: { createTypes, printTypeDefinitions }
}) => {
  createTypes(`
  type youTube implements Node  {
    image: youTubeImage
  }
  type youTubeImage @dontInfer {
    url: File @link(by: "url")
  }
  `);

  // printTypeDefinitions({ path: './typeDefs.txt' });
};

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest
}) => {
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
    createNode({
      ...video,
      id: `${video.id.videoId}`,
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
  cache
}) => {
  if (node.internal.type === YOUTUBE) {
    node.image = await createRemoteFileNode({
      url: `${node.snippet.thumbnails.high.url}`,
      parentNodeId: `${node.id.videoId}`,
      createNode,
      createNodeId,
      cache
    });
  }
};
