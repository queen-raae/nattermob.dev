const { google } = require('googleapis');

// exports.createSchemaCustomization = ({ actions }) => {
//   actions.printTypeDefinitions({ path: './typeDefs.txt' });
// };

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
      maxResults: 50,
      order: 'date',
      type: 'video'
    },
    (error, response) => {
      if (error) {
        console.log(error);
        throw error;
      }

      response.data.items.forEach((video, index) => {
        // console.log(video);
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
