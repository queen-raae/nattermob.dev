import React, { Fragment } from "react"
import { Link } from "gatsby"
import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
  const { user, isAuthenticated } = useAuth0()

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/">← nattermob.dev</Link>
      {isAuthenticated ? (
        <Fragment>
          <h1>{`Ahoy ${user.nickname}`}</h1>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </Fragment>
      ) : (
        <div>You're not logged in</div>
      )}
    </main>
  )
}

export default Profile
