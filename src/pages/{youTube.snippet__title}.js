import React from "react";
import {graphql} from "gatsby";

const YouTubePage = ({data: {youTube}}) => {
  const {
    snippet: {title, description, thumbnails, channelTitle},
  } = youTube;

  return (
    <main style={{maxWidth: "800px", margin: "0 auto"}}>
      <h1>{title}</h1>
      <aside>
        <img alt={title} src={thumbnails.high.url} />
        <p>{channelTitle}</p>
      </aside>
      <p>{description}</p>
    </main>
  );
};

export const query = graphql`
  query($id: String) {
    youTube(id: {eq: $id}) {
      snippet {
        title
        description
        thumbnails {
          high {
            height
            url
            width
          }
        }
        channelTitle
      }
    }
  }
`;

export default YouTubePage;
