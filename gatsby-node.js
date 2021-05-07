const {google} = require("googleapis");
const slugify = require("@sindresorhus/slugify");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

exports.sourceNodes = async ({actions, createContentDigest}) => {
  const YOUTUBE = "youTube";

  const youtube = google.youtube({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY,
  });

  const response = await youtube.search.list({
    channelId: "UCDlrzlRdM1vGr8nO708KFmQ",
    part: "snippet",
    maxResults: 10,
    order: "date",
    type: "video",
    q: "#Nattermob",
  });

  response.data.items.forEach((video) => {
    actions.createNode({
      ...video,
      id: `${video.id.videoId}`,
      slug: slugify(video.id.videoId),
      internal: {
        type: YOUTUBE,
        contentDigest: createContentDigest(video),
      },
    });
  });
};
