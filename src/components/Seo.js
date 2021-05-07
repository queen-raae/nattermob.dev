import React from "react";
import Helmet from "react-helmet";

const Seo = ({children}) => {
  const title = "Gatsby Deep Dives with Queen Raae and the Nattermob Pirates";
  return (
    <>
      <Helmet>
        <html lang="en-gb" />
        <link rel="canonical" href="https://nattermob.dev" />
        <title>{title}</title>
        <meta name="title" content={title} />
      </Helmet>
      {children}
    </>
  );
};

export default Seo;
