import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const IndexPage = () => {
  const videos = useStaticQuery(graphql`
    query {
      allYouTube {
        nodes {
          slug
          snippet {
            title
          }
          gatsbyPath(filePath: "/{youTube.slug}")
        }
      }
    }
  `);

  return (
    <main>
      <h1>Nattermob.dev</h1>
      <ul>
        {videos.allYouTube.nodes.map((video, index) => {
          const { snippet, slug } = video;
          return (
            <li key={index}>
              <Link to={`/${slug}`}>{snippet.title}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default IndexPage;
