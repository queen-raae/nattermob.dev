import React, { Fragment, useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"

const CountdownTimer = ({ end }) => {
  const [remaining, setRemaining] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(
        formatDistanceToNow(end, { addSuffix: true, includeSeconds: true })
      )
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="bg-red-600 rounded shadow p-4 flex justify-center">
      {remaining ? (
        <div className="grid grid-cols-auto-auto gap-1 items-center text-white text-center">
          <span>{`We'll be live again ${remaining}`}</span>
          <span role="img" aria-label="Partying Face">
            🥳
          </span>
        </div>
      ) : null}
    </div>
  )
}

export default CountdownTimer
