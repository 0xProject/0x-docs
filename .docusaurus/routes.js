import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/__docusaurus/debug',
    component: ComponentCreator('/docs/__docusaurus/debug', '660'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/config',
    component: ComponentCreator('/docs/__docusaurus/debug/config', '54f'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/content',
    component: ComponentCreator('/docs/__docusaurus/debug/content', '66d'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/docs/__docusaurus/debug/globalData', 'a1c'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/docs/__docusaurus/debug/metadata', '990'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/registry',
    component: ComponentCreator('/docs/__docusaurus/debug/registry', '19a'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/routes',
    component: ComponentCreator('/docs/__docusaurus/debug/routes', '1a0'),
    exact: true
  },
  {
    path: '/docs/markdown-page',
    component: ComponentCreator('/docs/markdown-page', '113'),
    exact: true
  },
  {
    path: '/docs/',
    component: ComponentCreator('/docs/', 'b28'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', 'cf7'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-limit-orders/docs/introduction',
        component: ComponentCreator('/docs/0x-limit-orders/docs/introduction', '5db'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-limit-orders/docs/limit-order-structure',
        component: ComponentCreator('/docs/0x-limit-orders/docs/limit-order-structure', '9ce'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-limit-orders/docs/monitoring-0x-limit-orders',
        component: ComponentCreator('/docs/0x-limit-orders/docs/monitoring-0x-limit-orders', '648'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-limit-orders/guides/cancel-a-limit-order',
        component: ComponentCreator('/docs/0x-limit-orders/guides/cancel-a-limit-order', 'adf'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-limit-orders/guides/create-a-limit-order',
        component: ComponentCreator('/docs/0x-limit-orders/guides/create-a-limit-order', 'e22'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-limit-orders/guides/fill-a-limit-order',
        component: ComponentCreator('/docs/0x-limit-orders/guides/fill-a-limit-order', '6bb'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-limit-orders/guides/limit-order-status',
        component: ComponentCreator('/docs/0x-limit-orders/guides/limit-order-status', '4f5'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-limit-orders/guides/working-in-the-testnet',
        component: ComponentCreator('/docs/0x-limit-orders/guides/working-in-the-testnet', '303'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/api-references/get-orderbook-v1',
        component: ComponentCreator('/docs/0x-orderbook-api/api-references/get-orderbook-v1', '423'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/api-references/get-orderbook-v1-fee_recipients.md',
        component: ComponentCreator('/docs/0x-orderbook-api/api-references/get-orderbook-v1-fee_recipients.md', '71a'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/api-references/get-orderbook-v1-order-orderhash',
        component: ComponentCreator('/docs/0x-orderbook-api/api-references/get-orderbook-v1-order-orderhash', 'c0c'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/api-references/get-orderbook-v1-orders',
        component: ComponentCreator('/docs/0x-orderbook-api/api-references/get-orderbook-v1-orders', '502'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/api-references/overview',
        component: ComponentCreator('/docs/0x-orderbook-api/api-references/overview', '82c'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/api-references/post-orderbook-v1-order',
        component: ComponentCreator('/docs/0x-orderbook-api/api-references/post-orderbook-v1-order', '2b7'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/api-references/post-orderbook-v1-order_config',
        component: ComponentCreator('/docs/0x-orderbook-api/api-references/post-orderbook-v1-order_config', 'b03'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/api-references/post-orderbook-v1-orders',
        component: ComponentCreator('/docs/0x-orderbook-api/api-references/post-orderbook-v1-orders', '945'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/api-references/websocket-api',
        component: ComponentCreator('/docs/0x-orderbook-api/api-references/websocket-api', '8d6'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/connection-limit',
        component: ComponentCreator('/docs/0x-orderbook-api/connection-limit', 'c69'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/introduction',
        component: ComponentCreator('/docs/0x-orderbook-api/introduction', 'df1'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-orderbook-api/rate-limiting',
        component: ComponentCreator('/docs/0x-orderbook-api/rate-limiting', '7a8'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/advanced-topics/how-to-set-your-token-allowances',
        component: ComponentCreator('/docs/0x-swap-api/advanced-topics/how-to-set-your-token-allowances', 'bab'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/advanced-topics/price-impact-protection',
        component: ComponentCreator('/docs/0x-swap-api/advanced-topics/price-impact-protection', 'da0'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/advanced-topics/rate-limiting',
        component: ComponentCreator('/docs/0x-swap-api/advanced-topics/rate-limiting', '72d'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/advanced-topics/slippage-protection',
        component: ComponentCreator('/docs/0x-swap-api/advanced-topics/slippage-protection', '53b'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/api-references/get-swap-v1-price',
        component: ComponentCreator('/docs/0x-swap-api/api-references/get-swap-v1-price', '020'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/api-references/get-swap-v1-quote',
        component: ComponentCreator('/docs/0x-swap-api/api-references/get-swap-v1-quote', 'd92'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/api-references/get-swap-v1-sources',
        component: ComponentCreator('/docs/0x-swap-api/api-references/get-swap-v1-sources', '6dd'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/api-references/overview',
        component: ComponentCreator('/docs/0x-swap-api/api-references/overview', '0f6'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api',
        component: ComponentCreator('/docs/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api', '5b3'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/guides/how-to-build-a-token-swap-dapp-with-0x-api',
        component: ComponentCreator('/docs/0x-swap-api/guides/how-to-build-a-token-swap-dapp-with-0x-api', '0fd'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/guides/swap-tokens-with-0x-swap-api',
        component: ComponentCreator('/docs/0x-swap-api/guides/swap-tokens-with-0x-swap-api', '1db'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/guides/troubleshooting-swap-api',
        component: ComponentCreator('/docs/0x-swap-api/guides/troubleshooting-swap-api', '6c8'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/guides/use-0x-api-liquidity-in-your-smart-contracts',
        component: ComponentCreator('/docs/0x-swap-api/guides/use-0x-api-liquidity-in-your-smart-contracts', '5a5'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/guides/working-in-the-testnet',
        component: ComponentCreator('/docs/0x-swap-api/guides/working-in-the-testnet', '8e6'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/0x-swap-api/introduction',
        component: ComponentCreator('/docs/0x-swap-api/introduction', '2b3'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/category/developer-resources',
        component: ComponentCreator('/docs/category/developer-resources', '45e'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/category/introduction',
        component: ComponentCreator('/docs/category/introduction', '684'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/category/limit-order-advanced-traders',
        component: ComponentCreator('/docs/category/limit-order-advanced-traders', '9c2'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/category/market-makers',
        component: ComponentCreator('/docs/category/market-makers', 'b28'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/category/orderbook-api',
        component: ComponentCreator('/docs/category/orderbook-api', '6cf'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/category/swap-api',
        component: ComponentCreator('/docs/category/swap-api', '32e'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/category/tx-relay-api',
        component: ComponentCreator('/docs/category/tx-relay-api', 'dd9'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/developer-resources/0x-legal-guide',
        component: ComponentCreator('/docs/developer-resources/0x-legal-guide', '05f'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/developer-resources/audits',
        component: ComponentCreator('/docs/developer-resources/audits', 'b13'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/developer-resources/bounties',
        component: ComponentCreator('/docs/developer-resources/bounties', 'cd4'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/developer-resources/contract-addresses',
        component: ComponentCreator('/docs/developer-resources/contract-addresses', 'cd9'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/developer-resources/faqs-and-troubleshooting',
        component: ComponentCreator('/docs/developer-resources/faqs-and-troubleshooting', '3da'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/developer-resources/glossary',
        component: ComponentCreator('/docs/developer-resources/glossary', '82a'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/developer-resources/how-to-get-0x-and-matcha-data',
        component: ComponentCreator('/docs/developer-resources/how-to-get-0x-and-matcha-data', '681'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/developer-resources/white-paper',
        component: ComponentCreator('/docs/developer-resources/white-paper', '729'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/introduction/0x-cheat-sheet',
        component: ComponentCreator('/docs/introduction/0x-cheat-sheet', 'f7e'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/introduction/0x-concept-videos',
        component: ComponentCreator('/docs/introduction/0x-concept-videos', '228'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/introduction/community',
        component: ComponentCreator('/docs/introduction/community', 'fd9'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/introduction/guides',
        component: ComponentCreator('/docs/introduction/guides', 'f49'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/introduction/introduction-to-0x',
        component: ComponentCreator('/docs/introduction/introduction-to-0x', '813'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/market-makers/docs/introduction',
        component: ComponentCreator('/docs/market-makers/docs/introduction', '800'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/market-makers/docs/providing-amm-liquidity-to-swap-api',
        component: ComponentCreator('/docs/market-makers/docs/providing-amm-liquidity-to-swap-api', '6fd'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/market-makers/docs/providing-rfq-liquidity-to-swap-api',
        component: ComponentCreator('/docs/market-makers/docs/providing-rfq-liquidity-to-swap-api', '509'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/market-makers/docs/rfq-order-structure',
        component: ComponentCreator('/docs/market-makers/docs/rfq-order-structure', '09a'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/market-makers/guides/generating-0x-order-hashes',
        component: ComponentCreator('/docs/market-makers/guides/generating-0x-order-hashes', '6e5'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/market-makers/guides/python-rfq-orders-code-examples',
        component: ComponentCreator('/docs/market-makers/guides/python-rfq-orders-code-examples', '1f3'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/market-makers/guides/signing-0x-orders',
        component: ComponentCreator('/docs/market-makers/guides/signing-0x-orders', '492'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/tx-relay-api/api-references/get-tx-relay-v1-swap-price',
        component: ComponentCreator('/docs/tx-relay-api/api-references/get-tx-relay-v1-swap-price', 'a1f'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/tx-relay-api/api-references/get-tx-relay-v1-swap-quote',
        component: ComponentCreator('/docs/tx-relay-api/api-references/get-tx-relay-v1-swap-quote', 'd03'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/tx-relay-api/api-references/get-tx-relay-v1-swap-status-trade-hash.md',
        component: ComponentCreator('/docs/tx-relay-api/api-references/get-tx-relay-v1-swap-status-trade-hash.md', '6b0'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/tx-relay-api/api-references/get-tx-relay-v1-swap-submit',
        component: ComponentCreator('/docs/tx-relay-api/api-references/get-tx-relay-v1-swap-submit', '98a'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/tx-relay-api/api-references/overview',
        component: ComponentCreator('/docs/tx-relay-api/api-references/overview', 'cfc'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/tx-relay-api/development-status',
        component: ComponentCreator('/docs/tx-relay-api/development-status', '785'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/tx-relay-api/gasless-approvals-token-list',
        component: ComponentCreator('/docs/tx-relay-api/gasless-approvals-token-list', '6cc'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/tx-relay-api/introduction',
        component: ComponentCreator('/docs/tx-relay-api/introduction', '6aa'),
        exact: true,
        sidebar: "docSidebar"
      },
      {
        path: '/docs/tx-relay-api/tx-relay-faq',
        component: ComponentCreator('/docs/tx-relay-api/tx-relay-faq', '458'),
        exact: true,
        sidebar: "docSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
