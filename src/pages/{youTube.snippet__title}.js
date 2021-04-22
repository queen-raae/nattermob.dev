import React from 'react';
import { graphql, Link } from 'gatsby';

const YouTubePage = ({
  data: {
    youTube: {
      snippet: { title, description },
      context: { next, prev }
    }
  }
}) => {
  return (
    <main>
      <h1>{title}</h1>
      <p>{description}</p>
      <ul>
        {prev ? (
          <li>
            <Link to={`/${prev}`}>prev</Link>
          </li>
        ) : null}
        {next ? (
          <li>
            <Link to={`/${next}`}>next</Link>
          </li>
        ) : null}
      </ul>
    </main>
  );
};

export const query = graphql`
  query($id: String) {
    youTube(id: { eq: $id }) {
      snippet {
        title
        description
      }
      context {
        prev
        next
      }
    }
  }
`;

export default YouTubePage;
