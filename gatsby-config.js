module.exports = {
  siteMetadata: {
    title: `Vic van Cooten`,
    menus: {
      main: [
        { label: "Blog", to: "/blog" },
        { label: "About us", to: "/about" },
        { label: "Contact", to: "/contact" },
      ],
      footer: [{ label: "AppBox", to: "https://box.vtvc.nl" }],
    },
    footer: { active: true, text: "© 2021 Vic van Cooten" },
  },

  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto Mono`,
            variants: [`400`, `700`],
          },
          {
            family: `Roboto`,
            subsets: [`latin`],
          },
        ],
      },
    },
  ],
}
