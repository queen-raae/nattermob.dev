import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const IndexPage = () => {
  const videos = useStaticQuery(graphql`
    query {
      allYouTube {
        nodes {
          youTubeId {
            videoId
          }
          snippet {
            title
          }
          gatsbyPath(filePath: "/{youTube.youTubeId__videoId}")
        }
      }
    }
  `);

  return (
    <main>
      <h1>Nattermob.dev</h1>
      <ul>
        {videos.allYouTube.nodes.map((video, index) => {
          const { snippet, youTubeId } = video;
          return (
            <li key={index}>
              <Link to={`/${youTubeId.videoId}`}>{snippet.title}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default IndexPage;
