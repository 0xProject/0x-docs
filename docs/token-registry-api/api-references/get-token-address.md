---
sidebar_label: GET /tokens/v1/address
sidebar_position: 1
description: Learn how to use GET /tokens/v1/address
---

# GET /tokens/v1/address

`/tokens/v1/address` can be used to get the token property information through address(es)

It is useful for applications to power search functionality when users search for given token address(es)

### Request

| **Query Param** | **Description**                                                                                                               | **Example** |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------|-------------|
| `address`       | the token address, and it can be multiple addresses                                                                           ||
| `chainId`       | (Optional) this fields indicates the chain filter. if not set, it will search all the chains                                  | chainId = 1

### Response

| Field                | Description                                                                                                                                                                                                                                                                                                                                                                                                             |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `address`            | the ERC20 token address or native token                                                                                                                                                                                                                                                                                                                                                                                 |
| `chainName`          | the name of the chain the token is on                                                                                                                                                                                                                                                                                                                                                                                   |
| `chainId`            | the id of the chain the token is on; we support all the chains on 0x Swap API                                                                                                                                                                                                                                                                                                                                           |
| `type`               | the token type either ERC20 or native                                                                                                                                                                                                                                                                                                                                                                                   |
| `symbol`             | the symbol of the token                                                                                                                                                                                                                                                                                                                                                                                                 |
| `name`               | the name of the token                                                                                                                                                                                                                                                                                                                                                                                                   |
| `decimals`           | the smallest unit of the currency that can be traded or transferred of the token                                                                                                                                                                                                                                                                                                                                        |
| `tokenLists`         | all the trusted token lists we can find. The detailed list can be found here|
| `tokenListsBlock`    | the block list the token is on either it is Blockchain Association (SEC Blocklist) or Uniswap unsupported|
| `feeOnTransfer`      | a boolean field to indicate whether a token is fee on transfer, null results mean that we could not find enough information from that token|
| `logo`               | the logo of the token|
| `prominentColor`     | the main color scheme from the logo|
| `exchangeLists`      | the centralized list the token is on. Right now, we only support Coinbase|

### Example

Get the token information of address 0xe41d2489571d322189246dafa5ebde1f4699f498 and 0x6b175474e89094c44da98b954eedeac495271d0f

**Request**

GET

```http
https://api.0x.org/tokens/v1/address/0xe41d2489571d322189246dafa5ebde1f4699f498,0x6b175474e89094c44da98b954eedeac495271d0f```

#### Response

{
  "data": [
    {
      "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
      "chainName": "Ethereum",
      "chainId": "1",
      "type": "ERC20",
      "symbol": "DAI",
      "name": "Dai Stablecoin",
      "decimals": "18",
      "tokenLists": [
        {
          "name": "Roll Social Money",
          "url": "https://app.tryroll.com/tokens.json",
          "token_name": "Dai Stablecoin"
        },
        {
          "name": "Gemini Token List",
          "url": "https://www.gemini.com/uniswap/manifest.json",
          "token_name": "DaiStablecoin"
        },
        {
          "name": "CoinGecko",
          "url": "https://tokens.coingecko.com/uniswap/all.json",
          "token_name": "Dai"
        },
        {
          "name": "CoinGecko",
          "url": "https://tokens.coingecko.com/ethereum/all.json",
          "token_name": "Dai"
        },
        {
          "name": "Compound",
          "url": "https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json",
          "token_name": "Dai Stablecoin"
        },
        {
          "name": "Kleros Tokens",
          "url": "https://t2crtokens.eth.limo",
          "token_name": "Dai"
        },
        {
          "name": "CMC DeFi",
          "url": "https://defi.cmc.eth.limo",
          "token_name": "Dai"
        },
        {
          "name": "Aave Token List",
          "url": "https://tokenlist.aave.eth.limo",
          "token_name": "Dai Stablecoin"
        },
        {
          "name": "Uniswap Labs Default",
          "url": "https://tokens.uniswap.org",
          "token_name": "Dai Stablecoin"
        },
        {
          "name": "Superchain Token List",
          "url": "https://static.optimism.io/optimism.tokenlist.json",
          "token_name": "Dai Stablecoin"
        }
      ],
      "tokenListsBlock": null,
      "feeOnTransfer": false,
      "logo": "https://token-registry.s3.amazonaws.com/icons/tokens/ethereum/64/0x6b175474e89094c44da98b954eedeac495271d0f.png",
      "prominentColor": "#FEBE44",
      "exchangeLists": [
        {
          "name": "Coinbase",
          "token_name": "Dai"
        }
      ]
    },
    {
      "address": "0xe41d2489571d322189246dafa5ebde1f4699f498",
      "chainName": "Ethereum",
      "chainId": "1",
      "type": "ERC20",
      "symbol": "ZRX",
      "name": "0x Protocol Token",
      "decimals": "18",
      "tokenLists": [
        {
          "name": "CMC DeFi",
          "url": "https://defi.cmc.eth.limo",
          "token_name": "0x"
        },
        {
          "name": "Aave Token List",
          "url": "https://tokenlist.aave.eth.limo",
          "token_name": "0x Protocol Token"
        },
        {
          "name": "CoinGecko",
          "url": "https://tokens.coingecko.com/ethereum/all.json",
          "token_name": "0x"
        },
        {
          "name": "CoinGecko",
          "url": "https://tokens.coingecko.com/uniswap/all.json",
          "token_name": "0x"
        },
        {
          "name": "Compound",
          "url": "https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json",
          "token_name": "0x Protocol Token"
        },
        {
          "name": "Uniswap Labs Default",
          "url": "https://tokens.uniswap.org",
          "token_name": "0x Protocol Token"
        },
        {
          "name": "Kleros Tokens",
          "url": "https://t2crtokens.eth.limo",
          "token_name": "0x"
        },
        {
          "name": "Gemini Token List",
          "url": "https://www.gemini.com/uniswap/manifest.json",
          "token_name": "0xProtocol"
        },
        {
          "name": "Superchain Token List",
          "url": "https://static.optimism.io/optimism.tokenlist.json",
          "token_name": "0x Protocol Token"
        }
      ],
      "tokenListsBlock": null,
      "feeOnTransfer": false,
      "logo": "https://token-registry.s3.amazonaws.com/icons/tokens/ethereum/64/0xe41d2489571d322189246dafa5ebde1f4699f498.png",
      "prominentColor": "#25292E",
      "exchangeLists": [
        {
          "name": "Coinbase",
          "token_name": "0x"
        }
      ]
    }
  ],
  "resultCount": 2
}
```