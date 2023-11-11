---
sidebar_label: Get started with Swap API
sidebar_position: 1
description: Learn how to use the Swap API to access the most efficient liquidity for ERC20 tokens through a single API.
---

# Get started with Swap API

_Learn how to send your first [Swap API](/0x-swap-api/introduction) request._

:::tip
Looking for code samples and tutorials?

- [Next.js 0x Demo App (TypeScript)](https://www.youtube.com/watch?v=P1ECx9zKQiU&t=1s)
- [How to Build a Token Swap DApp (HTML, CSS, Javscript)](/0x-swap-api/guides/how-to-build-a-token-swap-dapp-with-0x-api)
- [CodePen sandbox](https://codepen.io/0xProject/pen/abVJYra)

:::

## About Swap API

[Swap API](/0x-swap-api/introduction) is the recommended way of interacting with 0x protocol for retail trade. Under the hood, the API performs three tasks:

- Queries prices of ERC20 assets from multiple decentralized exchanges and market makers
- Aggregates the liquidity from the queried sources to provide the best price possible
- Returns the trade in a format that can be easily executed using the Web3 library of your choice

## Swap Tokens in 4 Simple Steps

0. Get a 0x API key
1. (If needed) Set token allowance
2. Get an indicative price
3. Fetch a firm quote
4. Send the transaction to the network

## 0. Get a 0x API key

Every call to a 0x API must include a 0x API secret key. [Create a 0x account](https://dashboard.0x.org/) and get a live API key. See the [guide here](/introduction/getting-started) to get setup.

## 1. Set a Token Allowance

A [token allowance ](https://tokenallowance.io/)is required if you want a third-party to move funds on your behalf. In short, you are _allowing_ them to move your tokens.

In our case, we would like the [0x Exchange Proxy smart contract](https://docs.0x.org/introduction/0x-cheat-sheet#exchange-proxy-addresses) to trade our ERC20 tokens for us, so we will need to _approve_ an _allowance_ (a certain amount) for _this contract to move a certain amount of our ERC20 tokens on our behalf_.

When setting the token allowance, make sure to provide enough allowance for the buy or sell amount as well as the gas.

For implementation details, see [How to set your token allowances](/0x-swap-api/advanced-topics/how-to-set-your-token-allowances).

:::tip
When setting the token allowance, make sure to provide enough allowance for the buy or sell amount _as well as the gas;_ otherwise, you may receive a 'Gas estimation failed' error.
:::

## 2. Get an Indicative Price

Now, let's find the best price!

The next step is to learn how to get an indiciative price which is used when a [taker](https://0x.org/docs/developer-resources/glossary#taker)(aka the user) is just _browsing_ for the price they could receive on the specified asset pair.

Use the [`/swap/v1/price`](/0x-swap-api/api-references/get-swap-v1-price) endpoint to get the indicative price. This endpoint responds with pricing information, but the response does not contain a full 0x order, so it does not constitute a full transaction that can be submitted to the Ethereum network (you must use [`/quote`](/0x-swap-api/guides/swap-tokens-with-0x-swap-api#3-fetch-a-firm-quote) for this). Think of [`/price`](/0x-swap-api/api-references/get-swap-v1-price) as the the "read-only" version of [`/quote`](0x-swap-api/api-references/get-swap-v1-quote).

### Example request

Here is an example indicative price request to sell 100 DAI for WETH using [`/price`](/0x-swap-api/api-references/get-swap-v1-price):

```javascript
const qs = require('qs');

const params = {
    // Not all token symbols are supported. The address of the token should be used instead.
    sellToken: '0x6B175474E89094C44Da98b954EedeAC495271d0F', //DAI
    buyToken: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', //WETH
    sellAmount: '100000000000000000000', // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
    takerAddress: '$USER_TAKER_ADDRESS', //Address that will make the trade
};

const headers = {'0x-api-key: [api-key]'}; // This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)

const response = await fetch(
    `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`, { headers }
); // The example is for Ethereum mainnet https://api.0x.org. Refer to the 0x Cheat Sheet for all supported endpoints: https://0x.org/docs/introduction/0x-cheat-sheet

console.log(await response.json());
```

### Example response

The API response will look like the following (some fields omitted):

```
    "price": "0.002663907000981641",
    "gasPrice": "56000000000",
    "gas": "111000",
    "sellAmount": "100000000000000000000",
    "buyAmount": "2663907000981641103",
    "buyTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "sellTokenAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
```

## 3. Fetch a Firm Quote

When a taker has found a price they are happy with and are ready to fill a quote, they should request a firm quote from Swap API using the [`/swap/v1/quote`](/0x-swap-api/api-references/get-swap-v1-quote) endpoint. At this point, the taker is making a soft commitment to fill the suggested orders, and understands they may be penalized by the [Market Maker](https://0x.org/docs/developer-resources/glossary#maker) if they do not.

[`/swap/v1/quote`](/0x-swap-api/api-references/get-swap-v1-quote) responds with a full 0x order, which can be submitted to an Ethereum node by the client. Therefore it is expected that the maker has reserved the maker assets required to settle the trade, leaving the order unlikely to revert.

:::warning
Make sure you are using `/quote` only when the taker is ready to fill the returned response; otherwise, the taker may be added to the Market Maker's ban list if they are making too many `/quote` requests without filling them. This is because `/quote` indicates a soft commitment to fill the order, so Market Makers will commit their assets when returning this response. If the taker is just browsing for a price, and not ready to fill the order, use `/price` instead.
:::

### Example request

Here is an example to fetch a firm quote to sell 100 DAI for WETH using [`/quote`](/0x-swap-api/api-references/get-swap-v1-quote):

```javascript
const qs = require('qs');

const params = {
    // Not all token symbols are supported. The address of the token should be used instead.
    sellToken: '0x6B175474E89094C44Da98b954EedeAC495271d0F', //DAI
    buyToken: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', //WETH
    sellAmount: '100000000000000000000', // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
    takerAddress: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', //Including takerAddress is required to help with gas estimation, catch revert issues, and provide the best price
};

const headers = {'0x-api-key: [api-key]'}; // This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)

const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`, { headers }
); // The example is for Ethereum mainnet https://api.0x.org. Refer to the 0x Cheat Sheet for all supported endpoints: https://0x.org/docs/introduction/0x-cheat-sheet

console.log(await response.json());
```

### Example response

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

The `takerAddress` field is the address that will be performing the trade. This parameter is required so the API can more accurately estimate the gas required for the swap transaction. Note that this currently only works with non-contract addresses. Read more on how [adding the `takerAddress` helps catch issues](/developer-resources/faqs-and-troubleshooting#-troubleshooting).

```javascript
https://api.0x.org/swap/v1/quote             // Request a firm quote
?sellToken=DAI                               // Sell DAI
&sellAmount=4000000000000000000000           // Sell amount: 4000 (18 decimal)
&buyToken=ETH                                // Buy ETH
&takerAddress=$USER_TAKER_ADDRESS            // Address that will make the trade
--header '0x-api-key: [API_KEY]'             // Replace with your own API key
```

Under the hood, 0x API performs an [`eth_estimateGas`](https://eth.wiki/json-rpc/API#eth_estimategas) using the `takerAddress` if one is provided. This serves two purposes:

- to more accurately estimate the gas required for the transaction,
- to provide the best pricing that includes [enabling RFQ liquidity](/0x-swap-api/guides/accessing-rfq-liquidity/how-to-integrate-rfq-liquidity), and
- to catch any reverts that would occur if the `takerAddress` attempts to swap the tokens.

An HTTP response with [status 400](/0x-swap-api/api-references/overview#common-error-codes) will be returned if the `eth_estimateGas` results in a revert (i.e. the swap would fail), along with reasons for the revert. In particular,

- the `takerAddress` needs to have a sufficient balance of the `sellToken`, and
- if the `sellToken` is not ETH, the `takerAddress` needs to have approved the 0x Exchange Proxy (`0xdef1c0ded9bec7f1a1670819833240f027b25eff` on mainnet) to transfer their tokens. See below for an example of setting a token approval before sending the API request.

## 4. Send the Transaction to the Network

Once you've received the API response, in order to submit the transaction to the network you will need to sign the transaction with your preferred web3 library (web3.js, ethers.js, wagmi, etc).

### wagmi

If you are using React, we recommend using [wagmi](https://wagmi.sh/). You can use a React hooks library like wagmi and use their [sendTransaction API](https://wagmi.sh/examples/send-transaction). See it implemented in our [Next.js 0x Demo App](https://github.com/0xProject/0x-nextjs-demo-app/blob/main/pages/Quote/index.tsx).

If you are using vanilla Javascript, we recommend either web3.js or ether.js.

### web3.js

The fields returned by Swap API's [`/quote`](https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote#response) endpoint are designed to overlap with the raw transaction object accepted by [`web3.js`’s `sendTransaction()`](https://web3js.readthedocs.io/en/v1.7.5/web3-eth.html#sendtransaction) function. What this means is that if you are using web3.js, you can directly pass the entire response from `/quote` because it contains all the necessary parameters for [`web3.eth.setTransaction()`](https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#id84) - \_from, to, value, gas, data.

Both options work, up to use case and developer preference.

#### Option 1 - Submit the entire quote response to web3.eth.sendTransction

```js
// Fetch the swap quote.
const response = await fetch(
  `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
  { headers },
);
quote = await response.json();

//Fill the quote by submitting the entire response to web3
const receipt = await web3.eth.sendTransaction(quote);
```

#### Option 2 - Submit only the required parameters to web3.eth.sendTransaction

```js
// Fetch the swap quote.
const response = await fetch(
  `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
  { headers },
);
quote = await response.json();

// Fill the quote.
const receipt = await waitForTxSuccess(
  web3.eth.sendTransaction({
    from: taker,
    to: quote.to,
    data: quote.data,
    value: quote.value,
    gasPrice: quote.gasPrice,
  }),
);
```

### ethers.js

[ethers.js](https://docs.ethers.io/v5/) is more explicit and requires you to pull out and submit _only_ the required parameters (whereas web3.js allows you to just submit the entire json response or submit only require parameters). So if you use ethers.js, make sure you submit only the required parameters similar to the example below.

Also note that ethers.js separates the concept of Wallet, Providers, and Signers. You can use a [Wallet](https://docs.ethers.org/v5/api/signer/#Wallet--properties) and connect it to a [provider](https://docs.ethers.org/v5/api/providers/) to [send transactions](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction). If you are using a Wallet such as MetaMask, review the ethers.js documentation on how to access these fields - [Connecting to Ethereum: MetaMask](https://docs.ethers.org/v5/getting-started/#getting-started--connecting).

```js
// get signer from a wallet such as MetaMask

const signer = provider.getSigner();

await signer.sendTransaction({
  gasLimit: quote.gas,
  gasPrice: quote.gasPrice,
  to: quote.to,
  data: quote.data,
  value: quote.value,
  chainId: quote.chainId,
});
```

## Examples

These examples illustrate how the response payload from 0x API’s `swap` endpoint can be passed directly into `web3.eth.sendTransaction`. Note that in a production implementation, there would be some error handling for the API response.

### Sell 100 DAI for ETH

This is the most common use pattern for swapping tokens –– selling a fixed amount of an ERC20 token. Because ERC20 tokens cannot be attached to contract calls the way ETH can, the taker must approve the 0x Exchange Proxy (`0xdef1c0ded9bec7f1a1670819833240f027b25eff`) to transfer their DAI prior to executing the swap.

```javascript
const ZERO_EX_ADDRESS = '0xdef1c0ded9bec7f1a1670819833240f027b25eff';
const DAI_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

// Selling 100 DAI for ETH.
const params = {
    sellToken: '0x6B175474E89094C44Da98b954EedeAC495271d0F', //DAI
    buyToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', //ETH
    // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
    sellAmount: '100000000000000000000',
    takerAddress: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
}

const headers = {'0x-api-key: [api-key]'}; // This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)

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
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`, { headers }
);


// Perform the swap.
await web3.eth.sendTransaction(await response.json());
```

### Sell 1 ETH for DAI

This swaps a fixed quantity of ETH for DAI. Unlike ERC20 tokens, ETH can be “attached” to the swap transaction so the taker does not need to set an allowance like in the previous example. The taker must have enough ETH balance to cover both the `sellAmount` _and_ the gas cost of the transaction.

```javascript
// Selling 100 ETH for DAI.
const params = {
    sellToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', //ETH
    buyToken: '0x6B175474E89094C44Da98b954EedeAC495271d0F', //DAI
    sellAmount: '1000000000000000000', // 1 ETH = 10^18 wei
    takerAddress: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
}

const headers = {'0x-api-key: [api-key]'}; // This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)

// Fetch the swap quote.
const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`, { headers }
);

// Perform the swap.
await web3.eth.sendTransaction(await response.json());

```

### Buy 100 DAI with ETH <a href="#buy-100-dai-with-eth" id="buy-100-dai-with-eth"></a>

This is similar to the previous example, but instead specifies the amount of DAI to buy, rather than the amount of ETH to sell. Instead of specifying `sellAmount` in the API request parameters, we provide `buyAmount`. Note that due to slippage, you may end up with slightly more than the requested `buyAmount`.

```javascript
const params = {
    buyToken: '0x6B175474E89094C44Da98b954EedeAC495271d0F', //DAI
    sellToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', //ETH
    // Note that the DAI token uses 18 decimal places, so `buyAmount` is `100 * 10^18`.
    buyAmount: '100000000000000000000',
    takerAddress: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
}

const headers = {'0x-api-key: [api-key]'}; // This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)

// Fetch the swap quote.
const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`, { headers }
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

- [(Code) Next.js 0x Demo App](https://github.com/0xProject/0x-nextjs-demo-app) - A demo ERC20 swapping app made with 0x Swap API, Next.js, and ConnectKit
- [(Video) Build a Token Swap dApp with 0x Swap API, ConnectKit, and Next.js](https://www.youtube.com/watch?v=P1ECx9zKQiU&t=1s) - A video tutorial convering the core concepts when building any token swapping dApp.
