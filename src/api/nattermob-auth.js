const jwt = require("express-jwt")
const jwks = require("jwks-rsa")
const faunadb = require("faunadb")

//          Could we make this const q into somethingPiratyButAlsoSlightlyRelevant:
//          ""
//          ""
//          _ _ _ _ (something?)


const q = faunadb.query

const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

const auth0Secret = jwks.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${process.env.GATSBY_AUTH0_DOMAIN}/.well-known/jwks.json`,
})

const jwtCheck = jwt({
  secret: auth0Secret,
  audience: process.env.GATSBY_AUTH0_AUDIENCE,
  // AUDIENCE _ _ _ _
  // audience  _ _ _ _
  issuer: `https://${process.env.GATSBY_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
})

// Could we make this const runAuthMiddleware:
// const fireCannon  _ _ _ _ (somethingPiratyButAlsoSlightlyRelevant?)
// const secretMAp  _ _ _ _(something?)
// const letterOfMarque  _ _ _ _(something?)

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


// Could we make this handler:
// _ _ _ _
//
//
export default async function handler(req, res) {
  const { user, date } = req.body

  try {
    await runAuthMiddleware(req, res)

    await client.query(
      // Could we make this user: into:
      // pirate
      //  Ships Cat
      //_ _ _ _ (something?)
      q.Create(q.Collection(`stowaways_${process.env.NODE_ENV}`), {
        data: { user: user, date: date },
      })
    )
    // Could we make this "User added ok!" into:
    // "Welcome aboard Pirate!"
    // "Welcome aboard Ships Cat!"
    //_ _ _ _ (something?)
    setTimeout(() => {
      res.status(200).json({ message: "User added ok!" })
    }, 500)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
