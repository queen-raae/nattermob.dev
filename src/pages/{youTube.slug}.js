import React from "react";
import {graphql, Link} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image";

import Seo from "../components/Seo";

const YouTubePage = ({data: {youTube}}) => {
  const {
    id,
    gatsbyPath,
    snippet: {title, description, channelTitle},
    image,
  } = youTube;

  return (
    <Seo path={gatsbyPath} pageTitle={title} pageDescription={description}>
      <main style={{maxWidth: "800px", margin: "0 auto", padding: "1em"}}>
        <Link to="/">← nattermob.dev</Link>
        <h1>{title}</h1>
        <aside>
          <a href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer">
            <GatsbyImage alt={title} image={getImage(image.url)} />
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
    </Seo>
  );
};

export const query = graphql`
  query($id: String) {
    youTube(id: {eq: $id}) {
      id
      gatsbyPath(filePath: "/{youTube.slug}")
      image {
        url {
          childImageSharp {
            gatsbyImageData(
              transformOptions: {fit: COVER, cropFocus: CENTER}
              width: 1280
              height: 720
            )
          }
        }
      }
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
