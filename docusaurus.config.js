// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "0x Docs",
  staticDirectories: ["public", "static"],
  tagline: "Connecting developers to web3 markets",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://0x.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/docs/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "0xProject", // Usually your GitHub org/user name.
  projectName: "0x-docs", // Usually your repo name.

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [["docusaurus-node-polyfills", { excludeAliases: ["console"] }]],
  scripts: [
    {
      src: "./docs/scripts/fullstory.js",
      async: true,
      innerHTML: `window['_fs_host'] = 'fullstory.com';
    window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
    window['_fs_org'] = 'o-1RR7B6-na1';
    window['_fs_namespace'] = 'FS';
    !function(m,n,e,t,l,o,g,y){var s,f,a=function(h){
    return!(h in m)||(m.console&&m.console.log&&m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'),!1)}(e)
    ;function j(b){var h,d=[];function k(){h&&(d.forEach((function(b){var d;try{d=b[h[0]]&&b[h[0]](h[1])}catch(h){return void(b[3]&&b[3](h))}
    d&&d.then?d.then(b[2],b[3]):b[2]&&b[2](d)})),d.length=0)}function r(b){return function(d){h||(h=[b,d],k())}}return b(r(0),r(1)),{
    then:function(b,h){return j((function(r,i){d.push([b,h,r,i]),k()}))}}}a&&(g=m[e]=function(){var b=function(b,d,k,r){function i(i,c){
    h(b,d,k,i,c,r)}r=r||2;var c,u=/Async$/;return u.test(b)?(b=b.replace(u,""),"function"==typeof Promise?new Promise(i):j(i)):h(b,d,k,c,c,r)}
    ;function h(h,d,k,r,i,c){return b._api?b._api(h,d,k,r,i,c):(b.q&&b.q.push([h,d,k,r,i,c]),null)}return b.q=[],b}(),y=function(b){function h(h){
    "function"==typeof h[4]&&h[4](new Error(b))}var d=g.q;if(d){for(var k=0;k<d.length;k++)h(d[k]);d.length=0,d.push=h}},function(){
    (o=n.createElement(t)).async=!0,o.crossOrigin="anonymous",o.src="https://"+l,o.onerror=function(){y("Error loading "+l)}
    ;var b=n.getElementsByTagName(t)[0];b.parentNode.insertBefore(o,b)}(),function(){function b(){}function h(b,h,d){g(b,h,d,1)}function d(b,d,k){
    h("setProperties",{type:b,properties:d},k)}function k(b,h){d("user",b,h)}function r(b,h,d){k({uid:b},d),h&&k(h,d)}g.identify=r,g.setUserVars=k,
    g.identifyAccount=b,g.clearUserCookie=b,g.setVars=d,g.event=function(b,d,k){h("trackEvent",{name:b,properties:d},k)},g.anonymize=function(){r(!1)
    },g.shutdown=function(){h("shutdown")},g.restart=function(){h("restart")},g.log=function(b,d){h("log",{level:b,msg:d})},g.consent=function(b){
    h("setIdentity",{consent:!arguments.length||b})}}(),s="fetch",f="XMLHttpRequest",g._w={},g._w[f]=m[f],g._w[s]=m[s],m[s]&&(m[s]=function(){
    return g._w[s].apply(this,arguments)}),g._v="2.0.0")}(window,document,window._fs_namespace,"script",window._fs_script);`,
    },
  ],

  clientModules: [require.resolve("./src/scripts/fullstory.js")],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          // 'https://github.com/0xProject/0x-docs/blob/main/docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-Z369GEYN6J",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/0x-social-card.jpg",
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "Docs",
        logo: {
          alt: "0x Docs",
          src: "/img/0x-logo.png",
        },
        items: [
          {
            href: "https://dashboard.0x.org/",
            label: "Dashboard",
            position: "left",
          },
          {
            href: "https://twitter.com/0xproject",
            className: "header-twitter-link",
            position: "right",
          },
          {
            href: "https://discord.com/invite/official0x",
            className: "header-discord-link",
            position: "right",
          },
          {
            href: "https://github.com/0xProject/0x-examples",
            className: "header-github-link",
            position: "right",
          },
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      /* announcementBar: {
        id: "announcementBar", // Increment on change
        content: `📣 All requests to Swap API now require API keys. Please visit <a target="_blank" rel="noopener noreferrer" href="https://dashboard.0x.org">0x Dashboard</a> to get your API key.`,
        backgroundColor: "#A2FFC1",
      }, */
      footer: {
        style: "dark",
        links: [
          {
            title: "APIs",
            items: [
              {
                label: "Swap API",
                to: "/category/swap-api",
              },
              {
                label: "Tx Relay API",
                to: "/category/tx-relay-api",
              },
              {
                label: "Orderbook API",
                to: "/category/orderbook-api",
              },
            ],
          },
          {
            title: "Developers",
            items: [
              {
                label: "Login/Sign Up",
                to: "https://dashboard.0x.org/",
              },
              {
                label: "Content Hub",
                to: "https://www.0x.org/content-hub",
              },
              {
                label: "FAQs & Troubleshooting",
                to: "/developer-resources/faqs-and-troubleshooting",
              },
              {
                label: "0x System Status",
                to: "https://status.0x.org/",
              },
              {
                label: "Sepolia Faucet",
                to: "https://sepoliafaucet.com/",
              },
              {
                label: "Gwei Calculator",
                to: "https://www.alchemy.com/gwei-calculator",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/0xproject",
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
