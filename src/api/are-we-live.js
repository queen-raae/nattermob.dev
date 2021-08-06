const { google } = require("googleapis")

export default async function handler(req, res) {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY_SERVER,
  })

  try {
    // throw Error("Do not hit YOUTUBE")

    const playlistItemsResponse = await youtube.playlistItems.list({
      playlistId: "PL9W-8hhRoLoN7axEFJQ17rJvk2KTiM2GP",
      part: "snippet",
      maxResults: 50,
      order: "date",
      type: "video",
    })

    const ids = playlistItemsResponse.data.items.map(
      (video) => video.snippet.resourceId.videoId
    )

    const videosResponse = await youtube.videos.list({
      id: ids.join(","),
      part: "snippet",
    })

    const areWeLive = videosResponse.data.items.some(
      (video) => video.snippet.liveBroadcastContent === "live"
    )

    res.status(200).json({
      messsage: areWeLive
        ? "We are probably live 🎉"
        : "We are probably not live 😥",
      areWeLive,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
