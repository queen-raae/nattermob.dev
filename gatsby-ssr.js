import React from "react";
import Seo from "./src/components/Seo";

export const wrapPageElement = ({element}) => {
  return <Seo>{element}</Seo>;
};
