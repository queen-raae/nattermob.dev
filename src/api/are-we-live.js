import createError from "http-errors"
import { google } from "googleapis"
import jwt from "express-jwt"
import jwks from "jwks-rsa"

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.GATSBY_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.GATSBY_AUTH0_AUDIENCE,
  issuer: `https://${process.env.GATSBY_AUTH0_DOMAIN}/`,
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
    await runJwtCheck(req, res)

    if (req.method === "GET") {
      // throw createError(418, `Do not hit the YouTube API`)
      await getAreWeLive(req, res)
    } else {
      throw createError(405, `${req.method} not allowed`)
    }
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    // Something went wrong, log it
    console.error(`${status} -`, message)

    // Respond with error code and message
    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}`,
    })
  }
}

const getAreWeLive = async (req, res) => {
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
    message: areWeLive
      ? "We are probably live 🎉"
      : "We are probably not live 😥",
    areWeLive: areWeLive,
  })
}
