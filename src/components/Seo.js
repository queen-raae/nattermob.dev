import React from "react";
import Helmet from "react-helmet";

const Seo = ({children}) => {
  const title = "Gatsby Deep Dives with Queen Raae and the Nattermob Pirates";
  const domain = "https://nattermob.dev";
  const description =
    "A rum fueled treasure hunt in the sharky waters around Gatsby islands.";
  return (
    <>
      <Helmet>
        <html lang="en-gb" />
        <link rel="canonical" href={domain} />

        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={domain} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        /> */}

        {/* <meta property="twitter:card" content="summary_large_image" /> */}
        <meta property="twitter:url" content={domain} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
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
