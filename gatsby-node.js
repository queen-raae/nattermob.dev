const {google} = require("googleapis");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

exports.sourceNodes = () => {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY,
  });

  youtube.search.list(
    {
      channelId: "UCDlrzlRdM1vGr8nO708KFmQ",
      part: "snippet",
      maxResults: 2,
      order: "date",
      type: "video",
    },
    (error, response) => {
      if (error) {
        throw error;
      }

      console.log(response.data.items);
    }
  );
};
