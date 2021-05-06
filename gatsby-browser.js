import React from 'react';
import PageElement from './src/components/page-element';

export const wrapPageElement = ({ element }) => {
  return <PageElement>{element}</PageElement>;
};
