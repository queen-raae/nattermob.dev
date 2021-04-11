https://developers.google.com/youtube/v3/getting-started

https://github.com/googleapis/google-api-nodejs-client

https://github.com/googleapis/google-api-nodejs-client/tree/master/samples

https://googleapis.dev/nodejs/googleapis/latest/index.html

https://developers.google.com/youtube/v3/docs/playlists/list

https://developers.google.com/youtube/v3/docs/playlists/list?apix_params=%7B%22channelId%22%3A%22UCDlrzlRdM1vGr8nO708KFmQ%22%7D

https://developers.google.com/youtube/v3/docs/search/list

1.

```shell
yarn add dotenv googleapis
```

2. create `gatsby-config.js`

3.

```shell
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});
```

4.  create `.env.production` - needed when we run `gatsby build`
    create `.env.development` - needed when we run `gatsby develop`

5.  create `gatsby-node.js`

6.  add `exports.sourceNodes` extension point
