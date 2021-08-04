import React, { Fragment, useState, useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

const Profile = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0()
  // const [userMetadata, setUserMetadata] = useState(null)

  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     const domain = "nattermob.eu.auth0.com"

  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         audience: `https://${domain}/api/v2/`,
  //         scope: "read:current_user",
  //       })

  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`

  //       const { data } = await axios.get(userDetailsByIdUrl, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       })

  //       // await console.log(user.sub)
  //       // await console.log(accessToken)
  //       // await console.log(data)

  //       setUserMetadata(data)
  //     } catch (e) {
  //       console.log(e.message)
  //     }
  //   }

  //   getUserMetadata()
  // }, [getAccessTokenSilently, user?.sub])

  const handleSubmit = async () => {
    console.log("handleSubmit")
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.GATSBY_AUTH0_AUDIENCE,
        scope: "read:current_user",
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
          {/* <h3>user metadata</h3>
          {userMetadata ? (
            <pre style={{ fontSize: 8 }}>
              {JSON.stringify(userMetadata, null, 2)}
            </pre>
          ) : (
            "No user metadata defined"
          )} */}
          <p>To become a stowaway submit your details</p>
          <button onClick={handleSubmit}>Submit</button>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile
