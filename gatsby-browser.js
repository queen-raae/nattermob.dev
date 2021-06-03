import React from 'react';
import Seo from './src/components/seo';

export const wrapPageElement = ({ element }) => {
  return <Seo>{element}</Seo>;
};
