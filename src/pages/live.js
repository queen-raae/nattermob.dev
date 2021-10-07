import React from "react"
import axios from "axios"

const LivePage = ({ serverData }) => {
  const { error, liveVideo } = serverData
  return (
    <main>
      {liveVideo ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${liveVideo.snippet.resourceId.videoId}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      ) : (
        <>
          <h1>Not live</h1>
          <p>{error ? error.message : ""}</p>
        </>
      )}
      {/* <pre>{JSON.stringify(serverData)}</pre> */}
    </main>
  )
}

export default LivePage

export async function getServerData({ query }) {
  try {
    const { data } = await axios.get("http://localhost:8000/api/are-we-live", {
      headers: {
        Authorization: `Bearer ${query.accessToken}`,
      },
    })

    return {
      props: {
        ...data,
      },
    }
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    return {
      headers: {
        status: status,
      },
      props: {
        error: {
          status: status,
          message: message,
        },
      },
    }
  }
}
