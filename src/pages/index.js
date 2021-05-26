import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const IndexPage = () => {
  const videos = useStaticQuery(graphql`
    {
      built {
        timestamp
      }
      allYouTube {
        nodes {
          slug
          image {
            url {
              childImageSharp {
                gatsbyImageData(
                  transformOptions: { fit: COVER, cropFocus: CENTER }
                  width: 180
                  height: 100
                )
              }
            }
          }
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
    <main style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Nattermob.dev</h1>
      <p>
        Site last built @{' '}
        <span style={{ color: 'red', fontWeight: 'bold' }}>
          {videos.built.timestamp}
        </span>
      </p>
      <ul>
        {treasure.map((video) => (
          <li key={video.slug}>
            <Link to={video.gatsbyPath}>
              <GatsbyImage
                alt={video.snippet.title}
                image={getImage(video.image.url)}
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
