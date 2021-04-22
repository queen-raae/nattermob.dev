const { google } = require('googleapis');
const slugify = require('@sindresorhus/slugify');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}) => {
  const YOUTUBE = 'youTube';

  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY
  });

  const response = await youtube.search.list({
    channelId: 'UCDlrzlRdM1vGr8nO708KFmQ',
    part: 'snippet',
    maxResults: 5,
    order: 'date',
    type: 'video'
  });

  response.data.items.forEach((video, index) => {
    actions.createNode({
      ...video,
      id: createNodeId(`${YOUTUBE}-${index}`),
      internal: {
        type: YOUTUBE,
        contentDigest: createContentDigest(video)
      },
      context: {
        prev:
          index < response.data.items.length - 1
            ? slugify(`${response.data.items[index + 1].snippet.title}`)
            : null,
        next:
          index > 0
            ? slugify(`${response.data.items[index - 1].snippet.title}`)
            : null
      }
    });
  });
};
