const {google} = require("googleapis");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY,
  });

  const response = await youtube.search.list({
    channelId: "UCDlrzlRdM1vGr8nO708KFmQ",
    part: "snippet",
    maxResults: 2,
    order: "date",
    type: "video",
  });

  response.data.items.forEach((video, index) => {
    actions.createNode({
      ...video,
      id: createNodeId(`yt-${index}`),
      internal: {
        type: "yt",
        contentDigest: createContentDigest(video),
      },
    });
  });
};
