const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")

// TODO Add custom middleware to handle this

// jwt({
//     secret: jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
//     }),
//     audience: process.env.AUTH0_AUDIENCE,
//     issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//     algorithms: ["RS256"],
//   })

export default async function handler(req, res) {
  try {
    res.status(200).json({ message: "All ok!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
