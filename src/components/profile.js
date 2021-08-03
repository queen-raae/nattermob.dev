import React, { Fragment } from "react"

import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
  const { user } = useAuth0()

  return (
    <Fragment>
      <h1>Profile</h1>
      <h2>{`Ahoy ${user.nickname}`}</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>To become a stowaway submit your details</p>
      <button
        onClick={() =>
          console.log("TODO: submit details to Fauna using Gatsby Funciton")
        }
      >
        Submit
      </button>
    </Fragment>
  )
}

export default Profile
