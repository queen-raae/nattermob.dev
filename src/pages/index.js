import React from "react";
import {useStaticQuery, graphql, Link} from "gatsby";

const IndexPage = () => {
  const videos = useStaticQuery(graphql`
    {
      allYouTube {
        nodes {
          slug
          gatsbyPath(filePath: "/{youTube.slug}")
          snippet {
            title
            thumbnails {
              default {
                url
                height
                width
              }
            }
          }
        }
      }
    }
  `);

  const treasure = videos.allYouTube.nodes;

  return (
    <main style={{maxWidth: "800px", margin: "0 auto"}}>
      <h1>Nattermob.dev</h1>
      <ul>
        {treasure.map((video) => (
          <li key={video.slug}>
            <Link to={video.gatsbyPath}>
              <img
                alt={video.snippet.title}
                src={video.snippet.thumbnails.default.url}
              />
              <br />
              {video.snippet.title}
              <br />
              <br />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default IndexPage;
