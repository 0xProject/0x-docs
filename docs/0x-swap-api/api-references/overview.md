---
sidebar_label: Overview
sidebar_position: 1
description: Learn how to use the Swap API, the most efficient liquidity for web3 tokens through a single API.
---

# API References

## Introduction

**The Swap API is the liquidity and data endpoint for DeFi.** It lets you access aggregated liquidity from tens of on-chain and off-chain decentralized exchange networks, across multiple blockchains. It comes with many parameters to customize your requests for your application and your users.

We offer hosted versions for different EVM-compatible networks.

| **Network**         | **Endpoint**                  |
| ------------------- | ----------------------------- |
| Ethereum (Mainnet)  | https://api.0x.org/           |
| Ethereum (Sepolia)  | https://sepolia.api.0x.org/   |
| Polygon             | https://polygon.api.0x.org/   |
| Binance Smart Chain | https://bsc.api.0x.org/       |
| Optimism            | https://optimism.api.0x.org/  |
| Fantom              | https://fantom.api.0x.org/    |
| Celo                | https://celo.api.0x.org/      |
| Avalanche           | https://avalanche.api.0x.org/ |
| Arbitrum            | https://arbitrum.api.0x.org/  |
| Base                | https://base.api.0x.org/      |

## Endpoints

Learn more about the different endpoints of Swap API:

- [GET /swap/v1/quote](/0x-swap-api/api-references/get-swap-v1-quote) - Get an easy-to-consume quote for buying or selling any ERC20 token. Returns a transaction that can be submitted to an Ethereum node.
- [GET /swap/v1/price](/0x-swap-api/api-references/get-swap-v1-price) - `/price` is nearly identical to `/quote,` but with a few key differences. /price does not return a transaction that can be submitted on-chain; it simply provides us the same information. Think of it as the "read-only" version of `/quote`.
- [GET /swap/v1/source](/0x-swap-api/api-references/get-swap-v1-source) - Returns the liquidity sources enabled for a specific chain.

## Authentication

0x authenticates your API requests using your account’s API keys. Once you’re set up, ensure that you specify your key with the `0x-api-key` header parameter in your requests.

You can create, access or revoke your API keys via the **[0x Dashboard](https://dashboard.0x.org)**.

## Versioning

Each 0x HTTP API `path` is versioned independently using URI versioning. The format is: `https://api.0x.org/<path>/<version>/<endpoint>`.

For example, you can request `https://api.0x.org/swap/v1/quote` which represents `v1` of the `quote` endpoint in the `swap` path. URLs not adhering to this format are not supported.

A major version bump occurs whenever a backwards incompatible change occurs to an `endpoint`, in which case every `endpoint` in that `path` will be on the next version. Old versions of the API will be deprecated and new features will be rolled out to them on a best-effort basis.

## Allowance Targets

Some interactions with 0x require or are improved by setting [token allowances](/0x-swap-api/advanced-topics/how-to-set-your-token-allowances), or in other words, giving 0x's smart contracts permission to move certain tokens on your behalf. Some examples include -

- Submitting a 0x API quote selling ERC20 tokens, you will need to give an allowance to the contract address. This address can be found either as the value of `allowanceTarget` returned in the quote response or in the ExchangeProxy Address column in the "Addresses by Network" table below.
- Trading ERC20 tokens using the Exchange contract, you will have to give an allowance to the ERC20Proxy contract.
- **Note:** For swaps with "ETH" as sellToken, wrapping "ETH" to "WETH" or unwrapping "WETH" to "ETH" no allowance is needed, a null address of `0x0000000000000000000000000000000000000000` is then returned instead.

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

See [Error codes](/introduction/error-codes) for a full list of common 0x error codes and how to resolve them.

## Common Objects

This section outlines API JSON objects that are common to many endpoints.

### Signed Order

A [0x Limit Order](https://protocol.0x.org/en/latest/basics/orders.html#limit-orders) with additional fields and ready to be consumed by our tooling and sent to the [0x exchange proxy contract](https://protocol.0x.org/en/latest/architecture/proxy.html).

| Field                 | Description                                                                                                                                                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maker`               | The address of the party that creates the order. The maker is also one of the two parties that will be involved in the trade if the order gets filled.                                                                     |
| `taker`               | The address of the party that is allowed to fill the order. If set to a specific party, the order cannot be filled by anyone else. If left unspecified, anyone can fill the order.                                         |
| `makerToken`          | The address of the ERC20 token the maker is selling to the taker.                                                                                                                                                          |
| `takerToken`          | The address of the ERC20 token the taker is selling to the maker.                                                                                                                                                          |
| `makerAmount`         | The amount of makerToken being sold by the maker                                                                                                                                                                           |
| `takerAmount`         | The amount of takerToken being sold by the taker                                                                                                                                                                           |
| `expiry`              | Timestamp in seconds of when the order expires. Expired orders cannot be filled.                                                                                                                                           |
| `salt`                | A value that can be used to guarantee order uniqueness. Typically it is set to a random number.                                                                                                                            |
| `feeRecipient`        | The address of the entity that will receive any fees stipulated by the order. This is typically used to incentivize off-chain order relay.                                                                                 |
| `pool`                | The staking pool to attribute the 0x protocol fee from this order. Set to zero to attribute to the default pool, not owned by anyone.                                                                                      |
| `takerTokenFeeAmount` | Amount of takerToken paid by the taker to the feeRecipient.                                                                                                                                                                |
| `sender`              | An advanced field that doesn't need to be set. It allows the maker to enforce that the order flow through some additional logic before it can be filled (e.g., a KYC whitelist) -- more on the ability to extend 0x later. |
| `verifyingContract`   | Address of the contract where the transaction should be sent, usually this is the [0x exchange proxy contract](https://protocol.0x.org/en/latest/architecture/proxy.html).                                                 |
| `chainId`             | The ID of the Ethereum chain where the `verifyingContract` is located.                                                                                                                                                     |
| `signature`           | A JSON object with the signature of the fields above using the private key of `maker`. The fields of the signature object are documented in the table below.                                                               |

### Signature

A structured object containing the signature data for the order. For more info see [How to sign](https://protocol.0x.org/en/latest/basics/orders.html#how-to-sign).

| Field           | Description                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| `signatureType` | A number representing the signature method used for signing the order, EIP712 (2) and EthSign (3) are supported. |
| `r`             | A hexadecimal string with signature data.                                                                        |
| `s`             | A hexadecimal string with signature data.                                                                        |
| `v`             | An integer number with signature data.                                                                           |

## Misc.

- All requests and responses should be of "application/json" content type.
- All token amounts are sent in amounts of the smallest level of precision (base units). (e.g if a token has 18 decimal places, selling 1 unit of the token would show up as selling `1000000000000000000` base units by this API).
- All addresses are sent as lower-case (non-checksummed) Ethereum addresses with the `0x` prefix.
- All parameters should use **lowerCamelCase.**
