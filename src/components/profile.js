import React, { Fragment, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

const Profile = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0()
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSubmit = async () => {
    try {
      // @TODO accessToken should be stored in local storage and collected silently on app load
      // this would mean it can be used on any api request

      const accessToken = await getAccessTokenSilently({
        audience: process.env.GATSBY_AUTH0_AUDIENCE,
        scope: process.env.GATSBY_AUTH0_SCOPE,
      })

      const response = await axios.post(
        "/api/nattermob-auth",
        {
          user: user,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      console.log({ response })
      // @TODO we need to verify against the db if a user has previously added themselves as a stowaway
      setHasSubmitted(true)
    } catch (error) {
      console.error({ error })
    }
  }

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <Fragment>
          <h1>Profile</h1>
          <h2>{`Ahoy ${user.nickname}`}</h2>
          <h3>user</h3>
          <pre style={{ fontSize: 12 }}>{JSON.stringify(user, null, 2)}</pre>
          {hasSubmitted ? (
            <p>Hoory! You're now a stowaway</p>
          ) : (
            <Fragment>
              <p>To become a stowaway submit your details</p>
              <button onClick={handleSubmit}>Submit</button>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile
