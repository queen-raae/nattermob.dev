import React from 'react';
import Seo from './seo';

const PageElement = ({ children }) => {
  return <Seo>{children}</Seo>;
};

export default PageElement;
