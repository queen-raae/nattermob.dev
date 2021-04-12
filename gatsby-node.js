const { google } = require('googleapis');

exports.createSchemaCustomization = ({ actions }) => {
  const typeDefs = `

  type youtube implements Node @dontInfer {
    kind: String,
    etag: String,
    id: Id
    snippet: Snippet
  }

  type Id @dontInfer {
    king: String
    videoId: String
  }

  type Snippet @dontInfer {
    publishedAt: String
    channelId: String
    title: String
    description: String
    thumbnails: Thumbnails
    channelTitle: String
    liveBroadcastContent: String
    publishTime: String
  }

  type Thumbnails @dontInfer {
    default: ThumbnailsImage
    medium: ThumbnailsImage
    high: ThumbnailsImage
  }

  type ThumbnailsImage @dontInfer {
    url: String
    width: Int
    height: Int
  }
  `;

  actions.createTypes(typeDefs);

  actions.printTypeDefinitions({ path: './typeDefs.txt' });
};

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}) => {
  const BENEDICTE = 'UCDlrzlRdM1vGr8nO708KFmQ';
  const NODE_TYPE = 'youtube';

  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY
  });

  await youtube.search.list(
    {
      channelId: BENEDICTE,
      part: 'snippet',
      maxResults: 2,
      order: 'date',
      type: 'video'
    },
    (error, response) => {
      if (error) {
        console.log(error);
        throw error;
      }

      response.data.items.forEach((video, index) => {
        // console.log(JSON.stringify(video, null, 2));

        actions.createNode({
          ...video,
          id: createNodeId(`${NODE_TYPE}-${index}`),
          internal: {
            type: NODE_TYPE,
            contentDigest: createContentDigest(video)
          }
        });
      });
    }
  );
};
