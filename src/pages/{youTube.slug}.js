import React from 'react';
import { graphql, Link } from 'gatsby';
import Seo from '../components/Seo';

const YouTubePage = ({ data: { youTube } }) => {
  const {
    id,
    slug,
    snippet: { title, description, thumbnails, channelTitle }
  } = youTube;

  return (
    <Seo pageTitle={title} pageDescription={description} slug={slug}>
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '1em' }}>
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
    </Seo>
  );
};

export const query = graphql`
  query($id: String) {
    youTube(id: { eq: $id }) {
      id
      slug
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
