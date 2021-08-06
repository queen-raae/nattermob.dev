const { google } = require("googleapis")
const jwt = require("express-jwt")
const jwks = require("jwks-rsa")

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://nattermob.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: process.env.GATSBY_AUTH0_AUDIENCE,
  issuer: "https://nattermob.eu.auth0.com/",
  algorithms: ["RS256"],
})

const runJwtCheck = async (req, res) => {
  await new Promise((resolve, reject) => {
    jwtCheck(req, res, (result) => {
      if (result instanceof Error) {
        reject(result)
      }
      resolve(result)
    })
  })
}

export default async function handler(req, res) {
  try {
    // throw Error("Do not hit YOUTUBE")

    await runJwtCheck(req, res)

    const youtube = google.youtube({
      version: "v3",
      auth: process.env.GOOGLE_API_KEY_SERVER,
    })

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
    res.status(error.status || 500).json({
      message: error.inner?.message || error.message,
      code: error.code,
    })
  }
}
