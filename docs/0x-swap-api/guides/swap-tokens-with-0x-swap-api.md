---
sidebar_label: Swap Tokens with Swap API
sidebar_position: 1
description: This article will guide you through plugging into Swap API and programmatically executing a trade.
---

# Swap Tokens with 0x Swap API

The examples in this article are for Ethereum mainnet. Refer to the [0x Cheat Sheet](/introduction/0x-cheat-sheet) for endpoints and addresses appropriate for other blockchains.

[Swap API](/0x-swap-api/introduction) is the recommended way of interacting with 0x protocol for retail trade. Under the hood, the API performs three tasks:

* Queries prices of ERC20 assets from multiple decentralized exchanges and market makers
* Aggregates the liquidity from the queried sources to provide the best price possible
* Returns the trade in a format that can be easily executed using the Web3 library of your choice

### Swap Tokens in 3 simple steps

1. (If needed) Set token allowance
2. Fetch a swap quote
3. Send the transaction to the network

## 1. Set a Token Allowance

A [token allowance ](https://tokenallowance.io/)is required if you want a third-party to move funds on your behalf. In short, you are _allowing_ them to move your tokens.

In our case, we would like the [0x Exchange Proxy smart contract](https://docs.0x.org/introduction/0x-cheat-sheet#exchange-proxy-addresses) to trade our ERC20 tokens for us, so we will need to _approve_ an _allowance_ (a certain amount) for _this contract to move a certain amount of our ERC20 tokens on our behalf_.

When setting the token allowance, make sure to provide enough allowance for the buy or sell amount as well as the gas.

:::tip
When setting the token allowance, make sure to provide enough allowance for the buy or sell amount _as well as the gas;_ otherwise, you may receive a 'Gas estimation failed' error.
:::

For implementation details, see [How to Set Your Token Allowances](/0x-swap-api/advanced-topics/how-to-set-your-token-allowances)

## 2. Fetch a Swap Quote

Once the token allowance has been set, say you would like to sell 100 DAI for WETH. We encode the trade parameters and fetch the swap quote as follows:

```javascript
const qs = require('qs');

const params = {
    // Not all token symbols are supported. The address of the token can be used instead.
    sellToken: 'DAI',
    buyToken: 'WETH',
    // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
    sellAmount: '100000000000000000000',
}

const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
);

console.log(await response.json());
```

The API response will look like the following (some fields omitted):

```javascript
{
    "sellAmount": "100000000000000000000",
    "buyAmount": "2663907000981641103",
    "price": "0.002663907000981641",
    "guaranteedPrice": "0.002637267930971825",
    "to": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    "data": "0xd9627aa40000000000000000000...",
    "value": "0",
    "gas": "111000",
    "gasPrice": "56000000000",
    "buyTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "sellTokenAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
}
```

A full list of the description of each field is outlined in the [Swap API reference](/0x-swap-api/api-references/get-swap-v1-quote).

:::tip
Note the `to` field is the contract address to send call `data` to. This is the [0x Exchange Proxy address](https://docs.0x.org/developer-resources/contract-addresses) corresponding to the network the request was made on. For production-level code, make sure to add verification that checks that the `to` field returned is actually the 0x Exchange Proxy address as demonstrated in this code example ([constructor](https://github.com/0xProject/0x-api-starter-guide-code/blob/e02eb1c47feb229a6a37e2cb47a76df73d3fe09e/contracts/SimpleTokenSwap.sol#L26-L32), [swapTarget check](https://github.com/0xProject/0x-api-starter-guide-code/blob/e02eb1c47feb229a6a37e2cb47a76df73d3fe09e/contracts/SimpleTokenSwap.sol#L85-L86)).
:::

### Specify a Taker Address for Your Swaps

The `takerAddress` field is the address that will be performing the trade. While technically optional, we recommend providing this parameter if possible so that the API can more accurately estimate the gas required for the swap transaction. Note that this currently only works with non-contract addresses. Read more on how [adding the `takerAddress` helps catch issues](developer-resources/faqs-and-troubleshooting#-troubleshooting).

```javascript
const params = {
    sellToken: 'DAI',
    buyToken: 'WETH',
    sellAmount: '100000000000000000000',
    takerAddress: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
};

// The response will now include a more accurate `gas` field.
const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
);
```

Under the hood, 0x API performs an [`eth_estimateGas`](https://eth.wiki/json-rpc/API#eth\_estimategas) using the `takerAddress` if one is provided. This serves two purposes:

* to more accurately estimate the gas required for the transaction, and
* to catch any reverts that would occur if the `takerAddress` attempts to swap the tokens.

An HTTP response with status 400 will be returned if the `eth_estimateGas` results in a revert (i.e. the swap would fail), along with reasons for the revert. In particular,

* the `takerAddress` needs to have a sufficient balance of the `sellToken`, and
* if the `sellToken` is not ETH, the `takerAddress` needs to have approved the 0x Exchange Proxy (`0xdef1c0ded9bec7f1a1670819833240f027b25eff` on mainnet) to transfer their tokens. See below for an example of setting a token approval before sending the API request.

## 3. Send the Transaction to the Network

Once you've received the API response, in order to submit the transaction to the network you will need to sign the transaction with your preferred web3 library (web3.js, ethers.js, etc). 

Below are some implementation differences when using web3.js vs ethers.js:

#### web3.js

The fields returned in a swap [`/quote`](https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote#response) are designed to overlap with the raw transaction object accepted by [`web3.js`’s `sendTransaction()`](https://web3js.readthedocs.io/en/v1.7.5/web3-eth.html#sendtransaction) function. What this means is that if you are using web3.js, you can directly pass the response from [`/quote`](https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote#response)  because it contains all the necessary parameters for `web3.eth.setTransaction()` - _from, to, value, gas, data, etc_.

#### ethers.js

[ethers.js](https://docs.ethers.io/v5/) is more explicit and requires you to pull out and submit _only_ the required parameters. web3.js allows you to just submit the entire json response or submit only require parameters, so if you use ethers, make sure you submit only the required parameters similar to this [code example](https://github.com/0xProject/0x-api-starter-guide-code/blob/master/src/direct-swap.js#L105-L113).

###

## Examples

These examples illustrate how the response payload from 0x API’s `swap` endpoint can be passed directly into `web3.eth.sendTransaction`. Note that in a production implementation, there would be some error handling for the API response.

### Sell 100 DAI for ETH

This is the most common use pattern for swapping tokens –– selling a fixed amount of an ERC20 token. Because ERC20 tokens cannot be attached to contract calls the way ETH can, the taker must approve the 0x Exchange Proxy (`0xdef1c0ded9bec7f1a1670819833240f027b25eff`) to transfer their DAI prior to executing the swap.

```java
const ZERO_EX_ADDRESS = '0xdef1c0ded9bec7f1a1670819833240f027b25eff';
const DAI_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

// Selling 100 DAI for ETH.
const params = {
    sellToken: 'DAI',
    buyToken: 'ETH',
    // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.    
    sellAmount: '100000000000000000000',
    takerAddress: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
}

// Set up a DAI allowance on the 0x contract if needed.
const dai = new web3.eth.Contract(ERC20_ABI, DAI_ADDRESS);
const currentAllowance = new BigNumber(
    dai.allowance(params.takerAddress, ZERO_EX_ADDRESS).call()
);
if (currentAllowance.isLessThan(params.sellAmount)) {
    await dai
        .approve(ZERO_EX_ADDRESS, params.sellAmount)
        .send({ from: params.takerAddress });
}

// Fetch the swap quote.
const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
);

// Perform the swap.
await web3.eth.sendTransaction(await response.json());
```

### Sell 1 ETH for DAI

This swaps a fixed quantity of ETH for DAI. Unlike ERC20 tokens, ETH can be “attached” to the swap transaction so the taker does not need to set an allowance like in the previous example. The taker must have enough ETH balance to cover both the `sellAmount` _and_ the gas cost of the transaction.

```javascript
// Selling 100 ETH for DAI.
const params = {
    sellToken: 'ETH',    
    buyToken: 'DAI',
    sellAmount: '1000000000000000000', // 1 ETH = 10^18 wei
    takerAddress: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
}

// Fetch the swap quote.
const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
);

// Perform the swap.
await web3.eth.sendTransaction(await response.json());

```

### Buy 100 DAI with ETH <a href="#buy-100-dai-with-eth" id="buy-100-dai-with-eth"></a>

This is similar to the previous example, but instead specifies the amount of DAI to buy, rather than the amount of ETH to sell. Instead of specifying `sellAmount` in the API request parameters, we provide `buyAmount`. Note that due to slippage, you may end up with slightly more than the requested `buyAmount`.

```javascript
const params = {
    buyToken: 'DAI',
    sellToken: 'ETH',
    // Note that the DAI token uses 18 decimal places, so `buyAmount` is `100 * 10^18`.    
    buyAmount: '100000000000000000000',
    takerAddress: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
}

// Fetch the swap quote.
const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
);

// Perform the swap.
await web3.eth.sendTransaction(await response.json());
```

## Advanced Options

### Gas Price

By default, 0x API will choose the median “fast” (<30s) gas price (as reported by various sources, such as [ETH Gas Station](https://ethgasstation.info/)) and compute the quote based around that. However, you can explicitly provide a gas price with the `gasPrice` query parameter. Just like with other quantities, values for this parameter are in wei (e.g. `9 gwei = 9 * 10^9 wei = 9000000000`).

### Max Slippage

0x API aggregates liquidity from various sources, including on-chain AMMs. Whereas the price of 0x orders are “locked in” when they are signed, AMM prices can fluctuate between the time of the API request and the time the swap transaction gets mined (this is known as slippage). If, at the time the swap is executed, the price is below the `guaranteedPrice` returned in the API response, the transaction will revert.

The `slippagePercentage` parameter determines the difference between the `price` returned in the API response and the `guaranteedPrice`, i.e. the maximum acceptable slippage. It defaults to 1% but this value may not be appropriate. For example one might expect very low slippage for certain stablecoin pairs like USDC-USDT. On the other hand, one might expect (and deem acceptable) relatively high slippage for newly launched tokens with shallow liquidity.

## Starter projects

* The [0x API starter project](https://github.com/0xProject/0x-api-starter-guide-code) has a direct swap example that you can play around with at no cost by using a Ganache instance forked from Ethereum mainnet.[\
  ](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill\_0x\_api\_swap.ts)
* [Fill a 0x API quote](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill\_0x\_api\_swap.ts) - A runnable example of how to fill a 0x quote that can be run on Ropsten or Ganache.
* [How to Build a Token Swap Dapp With 0x API](https://docs.alchemy.com/alchemy/road-to-web3/weekly-learning-challenges/9.-how-to-build-a-token-swap-dapp-with-0x-api) - A full end-to-end guide on how to build a token swapping dapp (a simple [Matcha.xyz](https://matcha.xyz/)) using the 0x /swap API endpoint. This DEX aggregates liquidity across the greater DEX ecosystem surfaces the best price to the user.

