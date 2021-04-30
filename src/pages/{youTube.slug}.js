import React from "react";
import {graphql, Link} from "gatsby";

const YouTubePage = ({data: {youTube}}) => {
  const {
    id,
    snippet: {title, description, thumbnails, channelTitle},
  } = youTube;

  return (
    <main style={{maxWidth: "800px", margin: "0 auto", padding: "1em"}}>
      <Link to="/">← nattermob.dev</Link>
      <h1>{title}</h1>
      <aside>
        <a href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer">
          <img alt={title} src={thumbnails.high.url} />
        </a>
        <p>
          <a href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer">
            View on YouTube
          </a>
        </p>
        <p>{channelTitle}</p>
      </aside>
      <p>{description}</p>
    </main>
  );
};

export const query = graphql`
  query($id: String) {
    youTube(id: {eq: $id}) {
      id
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
