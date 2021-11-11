module.exports = {
  siteMetadata: {
    title: "Gatsby Deep Dives with Queen Raae and the Nattermob Pirates",
    domain: "https://nattermob.dev",
    description:
      "A rum fueled treasure hunt in the sharky waters around Gatsby islands.",
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 100,
          formats: ["auto", "webp", "avif"],
          placeholder: "blurred",
        },
      },
    },
  ],
}
