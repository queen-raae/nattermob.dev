import React from "react"
import { Router } from "@reach/router"

import { useAuth0 } from "@auth0/auth0-react"

import PrivateRoute from "../components/private-route"

import Profile from "../components/profile"
import RootRedirect from "../components/root-redirect"

const App = ({ location }) => {
  const { isLoading } = useAuth0()

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto" }}>
      {isLoading ? null : (
        <Router>
          <PrivateRoute path="/app" component={RootRedirect} />
          <PrivateRoute path="/app/profile" component={Profile} />
        </Router>
      )}
    </main>
  )
}
export default App
