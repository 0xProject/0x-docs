---
sidebar_label: GET /swap/v1/sources
sidebar_position: 3
description: Learn how to use GET /swap/v1/sources
---

# GET /swap/v1/sources

Returns the liquidity sources enabled for the chain.

### Request

No request parameters.

### Response

An array of liquidity sources.

### Example

#### Get a list of liquidity sources on Ethereum Mainnet

**Request**

```http
curl https://api.0x.org/swap/v1/sources --header '0x-api-key: <API_KEY>'
```

**Response**

```json
{
  "records": [
    "0x",
    "Aave_V2",
    "Balancer",
    "Balancer_V2",
    "BancorV3",
    "Compound",
    "CryptoCom",
    "Curve",
    "Curve_V2",
    "DODO",
    "DODO_V2",
    "KyberDMM",
    "KyberElastic",
    "Lido",
    "MakerPsm",
    "Maverick_V1",
    "MultiHop",
    "ShibaSwap",
    "SushiSwap",
    "Synapse",
    "Synthetix",
    "Uniswap",
    "Uniswap_V2",
    "Uniswap_V3"
  ]
}
```
