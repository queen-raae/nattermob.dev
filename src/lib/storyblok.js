import { useEffect, useState } from "react"

export default function useStoryblok(originalStory, location) {
  let [story, setStory] = useState(originalStory)

  if (story && typeof story.content === "string") {
    story.content = JSON.parse(story.content)
  }

  // see https://www.storyblok.com/docs/Guides/storyblok-latest-js
  function initEventListeners() {
    const { StoryblokBridge } = window

    if (typeof StoryblokBridge !== "undefined") {
      const storyblokInstance = new StoryblokBridge()

      storyblokInstance.on(["published", "change"], (event) => {
        // reloade project on save an publish
        window.location.reload(true)
      })

      storyblokInstance.on(["input"], (event) => {
        // live updates when editing
        if (event.story._uid === story._uid) {
          setStory(event.story)
        }
      })

      storyblokInstance.on(["enterEditmode"], (event) => {
        // loading the story with the client
      })
    }
  }

  function addBridge(callback) {
    // check if the script is already present
    const existingScript = document.getElementById("storyblokBridge")
    if (!existingScript) {
      const script = document.createElement("script")
      script.src = `//app.storyblok.com/f/storyblok-v2-latest.js`
      script.id = "storyblokBridge"
      document.body.appendChild(script)
      script.onload = () => {
        // call a function once the bridge is loaded
        callback()
      }
    } else {
      callback()
    }
  }

  useEffect(() => {
    // load bridge only inside the storyblok editor
    if (location.search.includes("_storyblok")) {
      // first load the bridge and then attach the events
      addBridge(initEventListeners)
    }
  }, []) // it's important to run the effect only once to avoid multiple event attachment

  return story
}
