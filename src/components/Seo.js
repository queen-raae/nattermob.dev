import React from "react";
import Helmet from "react-helmet";
import {graphql, useStaticQuery} from "gatsby";

const Seo = ({path = "", pageTitle, pageDescription, children}) => {
  const {
    site: {
      siteMetadata: {title, description, domain},
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          domain
        }
      }
    }
  `);
  const seoTitle = pageTitle ? pageTitle : title;
  const seoDescription = pageDescription ? pageDescription : description;
  const seoUrl = `${domain}${path}`;

  return (
    <>
      <Helmet>
        <html lang="en-gb" />
        <link rel="canonical" href={seoUrl} />

        <title>{seoTitle}</title>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        {/* <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        /> */}

        {/* <meta property="twitter:card" content="summary_large_image" /> */}
        <meta property="twitter:url" content={seoUrl} />
        <meta property="twitter:title" content={seoTitle} />
        <meta property="twitter:description" content={seoDescription} />
        {/* <meta
          property="twitter:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        /> */}
      </Helmet>
      {children}
    </>
  );
};

export default Seo;
