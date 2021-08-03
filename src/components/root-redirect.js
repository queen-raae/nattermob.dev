import { useEffect } from "react"
import { navigate } from "gatsby"

const RootRedirect = () => {
  useEffect(() => {
    navigate("/")
  }, [])

  return null
}

export default RootRedirect
