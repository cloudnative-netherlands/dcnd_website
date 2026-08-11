// Gatsby has dotenv by default
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

// GitHub Pages serves a project site from https://<org>.github.io/<repo>/ and a
// custom-domain site from /. The deploy workflow passes the base path reported
// by actions/configure-pages, so the same build works in both states. Empty
// (the default) means "served from the domain root", which is what local
// builds, `gatsby develop` and www.dutchcloudnativeday.nl need.
const pathPrefix = (process.env.PATH_PREFIX || '').replace(/\/+$/, '');

// Trailing slashes are stripped as well, because canonical/OG URLs and the
// sitemap are built as `siteUrl + pathname` and the deploy workflow takes this
// value straight from actions/configure-pages.
const siteUrl = (process.env.GATSBY_DEFAULT_SITE_URL || 'http://localhost:8000').replace(
  /\/+$/,
  ''
);

module.exports = {
  pathPrefix,
  flags: { DEV_SSR: process.env.GATSBY_DEV_SSR || false },
  siteMetadata: {
    siteTitle: 'Dutch Cloud Native Day 2026',
    siteDescription:
      'A two-day community-organized cloud native conference in Utrecht on 29–30 October 2026.',
    siteImage: '/images/social-preview-2026.jpg',
    siteLanguage: 'en',
    siteUrl,
    authorName: 'Dutch Cloud Native Day',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'static',
        path: `${__dirname}/content/static-pages`,
      },
    },

    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          quality: 85,
          placeholder: 'none',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Dutch Cloud Native Day',
        short_name: 'DCND',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-svgr-svgo',
      options: {
        inlineSvgOptions: [
          {
            test: /\.inline.svg$/,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
                'prefixIds',
                'removeDimensions',
              ],
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        mdxOptions: {
          remarkPlugins: [
            // Add GitHub Flavored Markdown (GFM) support
            // eslint-disable-next-line global-require
            // require(`remark-gfm`),
          ],
        },
        // gatsbyRemarkPlugins: ['gatsby-remark-copy-linked-files', 'gatsby-remark-responsive-iframe'],
      },
    },
    // TODO: Either uncomment this part of the code if the website is being hosted on Gatsby Cloud and install "gatsby-plugin-gatsby-cloud" or delete it
    // {
    //   resolve: 'gatsby-plugin-gatsby-cloud',
    //   options: {
    //     headers: {
    //       '/fonts/*': ['Cache-Control: public, max-age=31536000, immutable'],
    //     },
    //   },
    // },
    // {
    //  resolve: 'gatsby-plugin-canonical-urls',
    //  options: {
    //    siteUrl: process.env.GATSBY_DEFAULT_SITE_URL,
    //  },
    // },
    'gatsby-alias-imports',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sitemap',
  ],
};
