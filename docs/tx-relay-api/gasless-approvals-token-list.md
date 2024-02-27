---
sidebar_label: Gasless approvals token list
sidebar_position: 6
description: Gasless Approvals Token List
---

# Gasless Approvals Token List
Use the endpoint below to access the list of tokens that support gasless approvals for each chain. To select a chain, set the `0x-chain-id` in the request header to the corresponding chain ID as listed below.

Gasless Approvals Token List: [https://api.0x.org/tx-relay/v1/swap/gasless-approval-tokens](https://api.0x.org/tx-relay/v1/swap/gasless-approval-tokens)


| Chain                     | Chain ID              |
| --------------------------| ----------------------|
| Ethereum Mainnet          | 1                     |
| Polygon                   | 137                   |
| Arbitrum                  | 42161                 |
| Base                      | 84531                 |
| Optimism                  | 10                    |


You can also examine a token’s eligibility at trade time, by observing the response from requests to 
`/tx-relay/v1/swap/quote`. If the variable `isGaslessAvailable` = `true`, the token the user is selling supports gasless approvals