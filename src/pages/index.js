import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query youTubeQuery {
      allYoutube {
        nodes {
          snippet {
            title
          }
        }
      }
    }
  `);

  console.log(data);

  return (
    <main>
      <h1>Nattermob.dev</h1>
      <ul>
        {data.allYoutube.nodes.map((item, index) => {
          return <li key={index}>{item.snippet.title}</li>;
        })}
      </ul>
    </main>
  );
};

export default IndexPage;
