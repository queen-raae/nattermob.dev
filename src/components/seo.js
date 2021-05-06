import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

const Seo = ({ children }) => {
  const {
    site: {
      siteMetadata: { url, title, image, description, language }
    }
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          url
          title
          image
          description
          language
        }
      }
    }
  `);

  return (
    <>
      <Helmet>
        {/* <!-- Default / HTML --> */}
        <html lang={language} />
        <link rel="canonical" href={url} />

        {/* <!-- Primary Meta Tags --> */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${url}/${image}`} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={`${url}/${image}`} />
      </Helmet>
      {children}
    </>
  );
};

export default Seo;
