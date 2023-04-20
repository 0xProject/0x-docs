// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '0x',
  staticDirectories: ['public', 'static'],
  tagline: 'Connecting developers to web3 markets',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://0x.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '0xProject', // Usually your GitHub org/user name.
  projectName: '0x-docs', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },


  plugins: [['docusaurus-node-polyfills', { excludeAliases: ['console']}]],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/0xProject/0x-docs/tree/main/docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */

    ({
      image: 'img/0x-social-card.jpg',
      navbar: {
        title: 'Docs',
        logo: {
          alt: '0x Docs',
          src: '/img/0x-logo.png',
        },
        items: [
          {
            href: "https://dashboard.0x.org/",
            label: 'Dashboard',
            position: "left",
          },
          {
            href: "https://discord.com/invite/official0x",
            className: "header-discord-link",
            position: "right",
          },
          {
            href: "https://twitter.com/0xproject",
            className: "header-twitter-link",
            position: "right",
          },
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      announcementBar: {
        id: 'announcementBar', // Increment on change
        content: `📣 Starting in June 2023, all API requests without an API key will return an error. Visit <a target="_blank" rel="noopener noreferrer" href="https://dashboard.0x.org">0x Dashboard</a> to get your API key.`,
        backgroundColor: '#A2FFC1',
      },        
      footer: {
        style: 'dark',
        links: [
          {
            title: 'APIs',
            items: [
              {
                label: 'Swap API',
                to: '/0x-swap-api',
              },
              {
                label: 'Tx Relay API',
                to: '/tx-relay-api',
              },
              {
                label: 'Orderbook API',
                to: '/0x-orderbook-api',
              },
            ],
          },
          {
            title: 'Developers',
            items: [
              {
                label: 'Login/Sign Up',
                to: 'https://dashboard.0x.org/',
              },
              {
                label: 'Content Hub',
                to: 'https://www.0x.org/content-hub',
              },
              {
                label: 'FAQs & Troubleshooting',
                to: '/developer-resources/faqs-and-troubleshooting',
              },
              {
                label: '0x System Status',
                to: 'https://status.0x.org/',
              },
              {
                label: 'Goerli Faucet',
                to: 'https://goerlifaucet.com/',
              },
              {
                label: 'Gwei Calculator',
                to:  'https://www.alchemy.com/gwei-calculator',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://ethereum.stackexchange.com/questions/tagged/0x',
              },
              {
                label: 'Discord',
                href: 'https://discord.com/invite/official0x',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/0xproject',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

};

module.exports = config;
