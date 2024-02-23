---
sidebar_label: Development status
sidebar_position: 2
description: Development Status for Tx Relay.
---

# Development Status

## Current Status

Tx Relay API is supported on the following chains available via [https://api.0x.org/](https://api.0x.org/) and providing the corresponding chain id in `0x-chain-id` header.
- Ethereum (Mainnet): `0x-chain-id: 1`
- Arbitrum One: `0x-chain-id: 42161`
- Polygon: `0x-chain-id: 137`

Read more accessing the [API endpoints](https://0x.org/docs/tx-relay-api/api-references/overview).

:::info
To create an account, and get your live API keys to access the Tx Relay, visit the **[0x Dashboard](https://go.0x.org/create-account-txrelay-z)**.
:::

Tx Relay allows you to implement:

- Gasless Approvals
- Gasless Swaps
- Setting & Collecting fees

Integrators are encouraged to experiment with Tx Relay API on Polygon or Arbitrum first where fees are low.
