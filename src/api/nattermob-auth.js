const jwt = require("express-jwt")
const jwks = require("jwks-rsa")

const auth0Secret = jwks.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${process.env.GATSBY_AUTH0_DOMAIN}/.well-known/jwks.json`,
})

const jwtCheck = jwt({
  secret: auth0Secret,
  audience: process.env.GATSBY_AUTH0_AUDIENCE,
  issuer: `https://${process.env.GATSBY_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
})

const runAuthMiddleware = async (req, res) => {
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
  const { user } = req.body

  try {
    await runAuthMiddleware(req, res)

    console.log("Do something with the user details")
    console.log(JSON.stringify(user, null, 2))

    res.status(200).json({ message: "All ok!" })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
