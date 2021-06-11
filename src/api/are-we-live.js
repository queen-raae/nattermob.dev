const { google } = require("googleapis")

export default async function handler(req, res) {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY_CLIENT,
  })

  try {
    const response = await youtube.search.list({
      channelId: "UCDlrzlRdM1vGr8nO708KFmQ",
      part: "snippet",
      maxResults: 50,
      order: "date",
      type: "video",
      q: `" · #GatsbyJS Deep Dive"`,
    })

    const areWeLive = response.data.items.some(
      (video) => video.snippet.liveBroadcastContent === "live"
    )

    res.status(200).json({
      message: areWeLive ? "We're probably live" : "We're probably not live",
      areWeLive,
    })
  } catch (error) {
    res.status(500).json({
      error: "Probably a YouTube API rate limit error",
    })
  }
}
