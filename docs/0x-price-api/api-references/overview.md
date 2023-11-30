---
sidebar_label: Overview
sidebar_position: 1
description: Learn how to use the Price API, the most efficient liquidity for web3 tokens through a single API.
---

# API References

## Introduction

**The Price API provides access to real-time DEX prices for token pairs.** It lets you access aggregated liquidity from tens of on-chain and off-chain decentralized exchange networks, across multiple blockchains. It comes with many parameters to customize your requests.

:::info
Price API is in beta. Its recommended use is for checking prices, not be be used for trading purposes. For example, if you plan to use this in a trading workflow that is triggered by price changes of USDC, be aware this is subject to the risk that the stablecoin may depeg.
:::

We offer hosted versions for different EVM-compatible networks.

| **Network**         | **Endpoint**                  |
| ------------------- | ----------------------------- |
| Ethereum (Mainnet)  | https://api.0x.org/           |
| Ethereum (Sepolia)  | https://sepolia.api.0x.org/   |
| Polygon             | https://polygon.api.0x.org/   |
| Polygon (Mumbai)    | https://mumbai.api.0x.org/    |
| Binance Smart Chain | https://bsc.api.0x.org/       |
| Optimism            | https://optimism.api.0x.org/  |
| Fantom              | https://fantom.api.0x.org/    |
| Celo                | https://celo.api.0x.org/      |
| Avalanche           | https://avalanche.api.0x.org/ |
| Arbitrum            | https://arbitrum.api.0x.org/  |
| Base                | https://base.api.0x.org/      |

## Endpoints

Learn more about the different endpoints of Swap API:

- [GET /swap/v1/price](/0x-price-api/api-references/get-swap-v1-price) - Used to acquire real-time DEX prices for token pairs.
- [GET /swap/v1/source](/0x-price-api/api-references/get-swap-v1-source) - Returns the liquidity sources enabled for a specified chain.

## Authentication

0x authenticates your API requests using your account’s API keys. Once you’re set up, ensure that you specify your key with the `0x-api-key` header parameter in your requests.

You can create, access or revoke your API keys via the **[0x Dashboard](https://dashboard.0x.org)**.

## Versioning

Each 0x HTTP API `path` is versioned independently using URI versioning. The format is: `https://api.0x.org/<path>/<version>/<endpoint>`.

For example, you can request `https://api.0x.org/swap/v1/price` which represents `v1` of the `price` endpoint in the `swap` path. URLs not adhering to this format are not supported.

A major version bump occurs whenever a backwards incompatible change occurs to an `endpoint`, in which case every `endpoint` in that `path` will be on the next version. Old versions of the API will be deprecated and new features will be rolled out to them on a best-effort basis.

## Pagination

Requests that return potentially large collections are paginated and respond to the `page` and `perPage` parameters. For example:

```
https://api.0x.org/sra/v4/orders?page=3&perPage=20
```

Any endpoint that follows this convention will display the following:

`This endpoint is paginated.`

And will only document the objects in the `records` field.

#### Request

| Query Param | Description                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------- |
| `page`      | (Optional, defaults to "1") The page index (1-indexed) requested in the collection.           |
| `perPage`   | (Optional, defaults to "20") The amount of records to return per page. The maximum is "1000". |

#### Response

| Field     | Description                                                                           |
| --------- | ------------------------------------------------------------------------------------- |
| `page`    | The page index (1-indexed) of returned in the response (same as request if provided). |
| `perPage` | The amount of `records` requested in the pagination, but not necessarily returned.    |
| `total`   | The total amount of `records` in the collection (across all pages).                   |
| `records` | The actual `records` returned for this page of the collection.                        |

If a query provides an unreasonable (ie. too high) `perPage` value, the response can return a validation error as specified in the errors section. If the query specifies a `page` that does not exist (ie. there are not enough `records`), the response will return an empty `records` array.

### Addresses by Network

The following table includes commonly used contract addresses. For a full list of our smart contract deployments address, see the [0x Cheat Sheet](/introduction/0x-cheat-sheet).

| Network             | ExchangeProxy Address                        | ERC20Proxy Address                           | StakingProxy Address                         |
| ------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| Ethereum (mainnet)  | `0xdef1c0ded9bec7f1a1670819833240f027b25eff` | `0x95e6f48254609a6ee006f7d493c8e5fb97094cef` | `0xa26e80e7dea86279c6d778d702cc413e6cffa777` |
| Ethereum (sepolia)  | `0xdef1c0ded9bec7f1a1670819833240f027b25eff` | `0xf1ec7d0ba42f15fb5c9e3adbe86431973e44764c` | `0x6acab4c9c4e3a0c78435fdb5ad1719c95460a668` |
| Polygon             | `0xdef1c0ded9bec7f1a1670819833240f027b25eff` | `0x0000000000000000000000000000000000000000` | `0x0000000000000000000000000000000000000000` |
| Binance Smart Chain | `0xdef1c0ded9bec7f1a1670819833240f027b25eff` | `0x0000000000000000000000000000000000000000` | `0x0000000000000000000000000000000000000000` |
| Optimism            | `0xdef1abe32c034e558cdd535791643c58a13acc10` | `0x0000000000000000000000000000000000000000` | `0x0000000000000000000000000000000000000000` |
| Fantom              | `0xdef189deaef76e379df891899eb5a00a94cbc250` | `0x0000000000000000000000000000000000000000` | `0x0000000000000000000000000000000000000000` |
| Celo                | `0xdef1c0ded9bec7f1a1670819833240f027b25eff` | `0x0000000000000000000000000000000000000000` | `0x0000000000000000000000000000000000000000` |
| Avalanche           | `0xdef1c0ded9bec7f1a1670819833240f027b25eff` | `0x0000000000000000000000000000000000000000` | `0x0000000000000000000000000000000000000000` |
| Arbitrum            | `0xdef1c0ded9bec7f1a1670819833240f027b25eff` | `0x0000000000000000000000000000000000000000` | `0x0000000000000000000000000000000000000000` |
| Base                | `0xdef1c0ded9bec7f1a1670819833240f027b25eff` | `0x0000000000000000000000000000000000000000` | `0x0000000000000000000000000000000000000000` |

## Errors

Unless the spec defines otherwise, errors to bad requests should respond with HTTP 4xx or status codes.

### Common Error Codes

| Code | Reason                                   |
| ---- | ---------------------------------------- |
| 400  | Bad Request – Invalid request format     |
| 404  | Not found                                |
| 429  | Too many requests - Rate limit exceeded  |
| 500  | Internal Server Error                    |
| 501  | Not Implemented                          |
| 503  | Server Error - Too many open connections |

### Error reporting format

For all 400 responses, see the [error response schema](https://github.com/0xProject/0x-monorepo/blob/development/packages/json-schemas/schemas/relayer_api_error_response_schema.json#L1).

```json
{
  "code": 101,
  "reason": "Validation failed",
  "validationErrors": [
    {
      "field": "maker",
      "code": 1002,
      "reason": "Invalid address"
    }
  ]
}
```

#### General error codes

| Code | Reason                              |
| ---- | ----------------------------------- |
| 100  | Validation Failed                   |
| 101  | Malformed JSON                      |
| 102  | Order submission disabled           |
| 103  | Throttled                           |
| 104  | Not Implemented                     |
| 105  | Transaction Invalid                 |
| 106  | Unable to Submit on Behalf Of Taker |
| 107  | Invalid API Key                     |
| 108  | Service Disabled                    |
| 109  | Insufficient funds for transaction  |
| 110  | ETH selling is not supported        |
| 111  | Gas estimation failed               |

#### Validation error codes

| Code | Reason                    |
| ---- | ------------------------- |
| 1000 | Required field            |
| 1001 | Incorrect format          |
| 1002 | Invalid address           |
| 1003 | Address not supported     |
| 1004 | Value out of range        |
| 1005 | Invalid signature or hash |
| 1006 | Unsupported option        |
| 1007 | Invalid 0x order          |
| 1008 | Internal error            |
| 1009 | Token is not supported    |
| 1010 | Field is invalid          |

## Common Objects

This section outlines API JSON objects that are common to many endpoints.

## Misc.

- All requests and responses should be of "application/json" content type.
- All token amounts are sent in amounts of the smallest level of precision (base units). (e.g if a token has 18 decimal places, selling 1 unit of the token would show up as selling `1000000000000000000` base units by this API).
- All addresses are sent as lower-case (non-checksummed) Ethereum addresses with the `0x` prefix.
- All parameters should use **lowerCamelCase.**
