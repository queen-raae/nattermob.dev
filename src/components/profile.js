import React, { Fragment, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

import { useLocalStorage } from "../hooks"

const Profile = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useLocalStorage(
    "nattermob-stowaway-submitted",
    false
  )

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.GATSBY_AUTH0_AUDIENCE,
        scope: process.env.GATSBY_AUTH0_SCOPE,
      })

      const response = await axios.post(
        "/api/nattermob-auth",
        {
          user: user,
          date: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      console.log({ response })
      setIsSubmitting(false)
      if (process.env.NODE_ENV === "production") {
        setHasSubmitted(true)
      }
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
            <h4>Hoory! You're now a stowaway</h4>
          ) : (
            <Fragment>
              <h4>To become a stowaway submit your details</h4>
              <button disabled={isSubmitting} onClick={handleSubmit}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile
