---
sidebar_label: FAQs & Troubleshooting
sidebar_position: 2
description: FAQs & Troubleshooting
---
# 🤔 FAQs & Troubleshooting

**Categories**

* [🧰 Troubleshooting](faqs-and-troubleshooting.md#-troubleshooting)
* [🔄 Swap API](faqs-and-troubleshooting.md#-swap-api)
  * 📜 [About Swap API](faqs-and-troubleshooting.md#-about-swap-api)
  * 💻 [Parmeter Questions](faqs-and-troubleshooting.md#-parameter-questions)
  * 🏆 [Best Practices](faqs-and-troubleshooting.md#-best-practices)
* [🌐 Protocol](faqs-and-troubleshooting.md#-protocol)
* [📬 Contact the 0x Team](faqs-and-troubleshooting.md#-contact-the-0x-team)

## 🧰 **Troubleshooting**

<details>

<summary>Why does my 0x transaction revert?</summary>

If your 0x quote is reverting, besides the standard revert issues related to ETH transactions, we recommend check the following are set correctly:

* Are allowances properly set for the user to trade the `sellToken`?
* Does the user have enough `sellToken` balance to execute the swap?
* Do users have enough to pay the gas?
* The slippage tolerance may be too low if the liquidity is very shallow for the token the user is trying to swap. Read [here](https://docs.0x.org/0x-api-swap/guides/troubleshooting-0x-api-swaps#slippage-tolerance) for how to handle this.
* Fee-on-transfer tokens may wreak havoc on our contracts. Read [here](https://docs.0x.org/0x-api-swap/guides/troubleshooting-0x-api-swaps#fee-on-transfer-tokens) for how to handle this

For more details on addressing common issues, read [Troubleshooting](./0x-swap-api/guides/troubleshooting-swap-).

</details>

<details>

<summary>How does takerAddress help with catching issues?</summary>

By passing a `takerAddress` parameter, 0x API can provide a more bespoke quote and help catch revert issues:

* 0x API will estimate the gas cost for `takerAddress` to execute the provided quote.
* If successfully called, the `gas` parameter in the quote will be an accurate amount of gas needed to execute the swap.
* If unsuccessful for revert reasons suggested above, then 0x API will throw a gas cost estimation error, alluding to an issue with the `takerAddress` executing the quote.

**TLDR** Pass `takerAddress` to get the quote validated before provided to you, assuring that a number of revert cases will not occur.

</details>

<details>

<summary>Why does the value of the to field in the /swap/quote response vary?</summary>

0x API selects the best 0x protocol interface to interact with based on the provided parameters and the smart order routing logic.

There are two main interfaces that 0x API will provide quotes for:

[**Exchange contract**](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#exchange) - the main entry-point of the 0x protocol, all swap quotes are settled by the exchange contract.

[**Forwarder extension contract**](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/forwarder-specification.md) - a payable interface allowing swaps between native ETH (as a `sellToken`) and another ERC20 asset.

Find the currently deployed contracts [here](https://docs.0x.org/introduction/0x-cheat-sheet).

</details>

<details>

<summary>0x orders are reverting but my transaction is fine, what is happening?</summary>

Developers may note when analyzing their transactions that some subset of 0x orders may revert (not filled) but the whole transaction is successful. This is expected behavior as implied earlier, some orders due to timing, and the pricing may be filled or expired before a users attempt to fill the order. This would result in a revert and 0x protocol will utilize fallback orders to compensate for the reverted order. This will result in a successful transaction even though reverts occur within the transactions.

</details>

## 🔄 **Swap API**

<details>

<summary>Where can I get testnet funds? </summary>

- [Goerli Faucet](https://goerlifaucet.com/)
- [Goerli POW Faucet](https://goerli-faucet.pk910.de/)
- [Paradigm MultiFaucet](https://faucet.paradigm.xyz/)
    - Funds a wallet with ETH, WETH, DAI, and NFTS across 4 testnets
- Also see our [Working in Testnet Guide](/0x-limit-orders/guides/working-in-the-testnet)

</details>

### 📜 **About Swap API**

<details>

<summary>Is there a fee to use Swap API?</summary>

No, the Swap API is free to use and is intended for public use. If you are an integrator who needs access higher rate limits, please fill out [Swap API Taker Integration Request Form](https://www.0x.org/#contact) to apply for a custom enterprise API endpoint.

</details>

<details>

<summary>How does Swap API select the best orders for me?</summary>

Beyond simply sampling each liquidity source for their respective prices, Swap API adjusts for the gas consumption of each liquidity source with the specified gas price (if none provided Swap API will use ethGasStation's `fast` amount of gwei) and any associated fees with the specific liquidity source. By sampling through varying compositions of liquidity sources, Swap API selects the best set of orders to give you the best price. Swap API also creates another set of fallback orders to ensure that the quote can be executed by users.
<br/>
Ex: Swap API will adjust the price potentially received from Curve Finance by gas \* gasPrice and its fees. Because of Curve Finance’s costly gas consumption, its nominal price may not be the best price when settled.

</details>

<details>

<summary>How can I find the Swap API liquidity sources for each chain?</summary>

Use the API endpoint [`/swap/v1/sources`](/0x-swap-api/api-references/get-swap-v1-sources) to get the liquidity sources per chain. You will need to specify the root-endpoint for the chain you are interested in, for example, [https://polygon.api.0x.org/swap/v1/sources](https://polygon.api.0x.org/swap/v1/sources) for the Polygon Network or [https://api.0x.org/swap/v1/sources](https://api.0x.org/swap/v1/sources) for Ethereum Mainnet. See the [Swap API References Overview](/0x-swap-api/api-references/overview) for a full list of endpoints we support.

</details>

<details>

<summary>What are the differences when quoting by sellAmount and buyAmount</summary>

* If `sellToken` is utilized, then any unused `sellToken` will be refunded to the user.
* When `buyAmount` is used, the only guarantee is that **at least** the amount specified is bought. 0xAPI will not terminate early in the case where one order fills at a better price, so the user can in effect over buy the specified amount. This is somewhat amplified by usage of `slippagePercentage` which underestimates the on-chain price by a percentage.

Also, some liquidity sources do not enable querying by `buyAmount` (i.e Kyber), these sources are ignored when quoting for `buyAmounts`

**TLDR** Whenever possible, use `sellAmount` over `buyAmount` to get more deterministic behavior.

</details>

<details>

<summary>What is Slippage Protection ?</summary>

Slippage Protection is a feature of the 0x API that finds the best routes for decentralized exchange (DEX) trades while avoiding [slippage](https://help.matcha.xyz/en/articles/6304010-what-is-slippage) and MEV attacks.
<br/>

Slippage Protection incorporates slippage forecasts into 0x API’s smart order routing algorithm to deliver the optimal trade route. With Slippage Protection activated, 0x API will enable developers to surface more reliable quotes and consistently deliver the best executed price to users.
<br/>

Slippage Protection is currently supported on Ethereum for the most active trading pairs (ETH-USDC, ETH-DAI, ETH-USDT, ETH-WBTC, WETH-USDC, WETH-DAI, WETH-USDT, WETH-WBTC)
<br/>

**Slippage Protection is an auto-enabled feature of the Swap API**, and no additional action is required to enable to implement it in your API request.

Read here for the [full details of Slippage Protection](../0x-swap-api/advanced-topics/slippage-protection.md).

</details>

<details>

<summary>What is a trade surplus?</summary>

A trade surplus occurs when the quoted price is more than the executed price due to "positive slippage" as a result of unique market conditions. 
<br/>

Also see ["If the difference between the quoted price and the executed price is positive what happens to the funds?"](faqs-and-troubleshooting.md#if-the-difference-between-the-quoted-price-and-the-executed-price-is-positive-what-happens-to-the-fu)

</details>

<details>

<summary>If the difference between the quoted price and the executed price is positive what happens to the funds?</summary>

The answer to what happens to the [trade surplus](faqs-and-troubleshooting.md#what-is-a-trade-surplus) depends on whether or not you are a meta-aggregator AND whether or not you have an API key. 
<br/>

**If you are **_**not**_** a meta-aggregator and have an API key:** 100% of the trade surplus is returned back to the user. 
<br/>

**If you are a meta-aggregator OR you **_**do not**_** have an API key:** 0x Labs will collect the surplus for trades that meet the following criteria - the trade is performed via Swap API,  goes through the 0x TransformERC20 contract, AND both tokens in the trade are in our allowed list: DAI, ETH, WETH, BUSD, MATIC, WMATIC, WBTC, USDT, USDC, TUSD, PAXG, LINK, UNI, BAT, and COMP.
<br/>

For example:

* APE→USDC (trade surplus not collected)
* USDC→APE (trade surplus not collected)
* ETH→USDC (trade surplus collected)

For context, trades that meet the criteria above are generally source liquidity from 2 or more sources, which is where the Swap API adds the most value.
<br/>

In summary, 0x Labs will only recoup the surplus when our product is able to create additional value through our smart order routing.
<br/>

**Note that for ALL integrators**, we will _not_ be recouping the surplus on orders that are routed through a single source (eg. 100% Uniswap or 100% Sushiswap), so our pricing will remain extremely competitive against AMMs and liquidity aggregators with a broader surplus policy.
<br/>

This model ensures that we can continue to invest into long-term growth of our products and continue to provide our integrators and end users the best experience.
<br/>

**🔑 Interested to get an API key? [Please fill out the request form.](https://www.0x.org/#contact)**

</details>

<details>

<summary>Is it possible to use the Swap API to trade custom ERC20 tokens or altcoins?</summary>

If you would like to trade a custom token, you will need to create the liquidity either by using 0x limit orders or by creating a Liquidity Pool for your token on one of the various AMM sources that the API sources from, such as Uniswap, SushiSwap, or Curve. Learn more about creating limit order: [https://docs.0x.org/protocol/docs/exchange-proxy/features/nativeorders#limit-orders](https://docs.0x.org/protocol/docs/exchange-proxy/features/nativeorders#limit-orders)

</details>


### 💻 **Parameter Questions**

<details>

<summary>Why does the value of the <code>to</code> field in the <code>/swap/quote</code> response vary?</summary>

Swap API selects the best 0x protocol interface to interact with based on the provided parameters and the smart order routing logic.
<br/>

There are two main interfaces that Swap API will provide quotes for:
<br/>

[**Exchange contract**](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#exchange) - the main entry-point of the 0x protocol, all swap quotes are settled by the exchange contract.
<br/>

[**Forwarder extension contract**](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/forwarder-specification.md) - a payable interface allowing swaps between native ETH (as a `sellToken`) and another ERC20 asset.
<br/>

Find the currently deployed contracts [here](https://docs.0x.org/introduction/0x-cheat-sheet).

</details>

<details>

<summary>What is the difference between <code>price</code> and <code>guaranteedPrice</code>?</summary>

The `price` field provides developers a sense of what the BEST price they could receive, denominated in `sellToken` for one `buyToken`. The `gauranteedPrice` is the price that developers can expect in a WORST case scenario where all the fallback orders are utilized over the better priced orders.

Say you found a swap for ETH to DAI at 220 DAI while the market price for ETH is 200 DAI. Obviously this is a great price and will not last forever, a “race” of sorts occurs as users compete to settle the swap of ETH for 220 DAI by selecting a competitive gasPrice that would result in their transaction being mined over others.

When such a race happens, only one user gets to receive the swap of ETH for 220 DAI, the other users will see their transactions revert.

To ensure that users will always have their swap executed within a reasonable price, 0x API quoting logic provides a set of fallback orders, created with on-chain sources (kyber, uniswap, PLP, curve) that will be filled at a slightly worse rate if the more aggressively priced orders expires or are filled by somebody else.

**TLDR** expect the actual settled price of a 0x quote to be somewhere between `price` and `gauranteedPrice`.

</details>

<details>

<summary>What are the differences when quoting by <code>sellAmount</code> <code>buyAmount</code> ?</summary>

**TLDR** Whenever possible, use `sellAmount` over `buyAmount` to get more deterministic behavior.

<br/>

* If `sellToken` is utilized, then any unused `sellToken` will be refunded to the user.
* When `buyAmount` is used, the only guarantee is that **at least** the amount specified is bought. 0xAPI will not terminate early in the case where one order fills at a better price, so the user can in effect over buy the specified amount. This is somewhat amplified by usage of `slippagePercentage` which underestimates the on-chain price by a percentage.

Also, some liquidity sources do not enable querying by `buyAmount` (i.e Kyber), these sources are ignored when quoting for `buyAmounts`


</details>

<details>

<summary>What is <code>slippagePercentage</code> ?</summary>

**TLDR** `slippagePercentage` controls how much worse the price can be for the fallback orders provided in a 0x API quote which influences the `guaranteedPrice`.

Developers can influence how much “worse” the `guaranteedPrice` is through the `slippagePercentage` parameter. With on-chain sources, prices can vary between the quote being made and settlement. The `slippagePercentage` provides a "upper bound" to how much the price provided by these on-chain sources can slip and remain desirable by the developer.



</details>


<details>

<summary>What is price impact? How can <code>PriceImpactProtectionPercentage</code> and <code>estimatedPriceImpact</code> be used to protect users from price impact? </summary>

Read our [full blog post](https://blog.0x.org/0x-swap-api-price-impact-protection/) on Price Impact Protection and how to use it in the Swap API.
<br/>
**What is price impact?**
<br/>
****Price impact is the influence that a user’s trade has over the market price of an underlying trading pair. It is directly related to the amount of liquidity in the pool. Price impact can be particularly high for illiquid trading pairs and in certain instances can cause significant losses for traders.

This is different from price slippage, although the terms are often mistakenly used interchangeably. Price slippage refers to the difference between the executed price and the quoted price, caused by external market movements unrelated to your trade.
<br/>

**What is our solution?** 

We launched Price Impact Protection to make it easier to protect users from getting rekt by illiquid markets. Despite Swap API enabling access to the deepest liquidity from over 70+ exchanges, there are still some long-tailed token pairs that suffer from suboptimal liquidity on decentralized exchanges.
<br/>

When we are able to calculate price impact estimates, users leveraging the Swap API will be notified when their trade faces a price impact over a certain threshold. The API will return an error of insufficient liquidity due to the price impact being higher than the defined limit. The threshold is easily customizable by setting `PriceImpactProtectionPercentage` anywhere from 0-1, so we encourage every Swap API user to customize this parameter based on their needs and tolerance.
<br/>

Price Impact Protection is an optional feature - the default threshold will be set at 1. Developers and API users who want to take advantage of it will need to opt-in by adjusting this setting.
<br/>

Developers can also surface this information in their UI so users can see the potential price impact of a trade prior to submitting an order. Developers can simply ping the Swap API \[[swap/v1/quote](https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote#request)] and use the returned `estimatedPriceImpact` information.

</details>

### 🏆 **Best Practices**

<details>

<summary>What is the best way to query swap prices for many asset pairs without exceeding the rate limit?</summary>

Our rate limits exists because we want to encourage anyone using our infra to actually swap, not just use our API as a price oracle. If you would like to query for token prices, we would recommend either setting up your own 0x API instance via the [repo README](https://github.com/0xProject/0x-api#getting-started) instructions or query a 3rd party service like [coingecko](https://www.coingecko.com/en/coins/usd-coin#markets).

</details>

<details>

<summary>What is the best way to query swap prices for many asset pairs without exceeding the rate limit?</summary>

Our rate limits exists because we want to encourage anyone using our infra to actually swap, not just use our API as a price oracle. If you would like to query for token prices, we would recommend either setting up your own 0x API instance via the [repo README](https://github.com/0xProject/0x-api#getting-started) instructions or query a 3rd party service like [coingecko](https://www.coingecko.com/en/coins/usd-coin#markets).

</details>

<details>

<summary>I am building a DEX app using 0x API. Can I charge my users a trading fee/commission fee/transaction fee when using the 0x API? </summary>

**TL;DR** You have full flexibility on the fees you collect on your trades.
<br/>

Yes, this can be done by setting the `feeRecipient` and `buyTokenPercentageFee` parameters in a [Swap API request](../0x-swap-api/api-references/get-swap-v1-quote.md#request). Set a `buyTokenPercentageFee` on your DEX trades which represents the percentage (between 0 - 1.0) of the `buyAmount` (tokens being received) that should be attributed to `feeRecipient` (your wallet) as an affiliate fee.
<br/>

When the transaction has gone through, the fee amount will be sent to the `feeRecipient` address you've set. The fee is receive in the `buyToken` (the token that the user will receive). If you would like to receive a specific type of token (e.g. USDC), you will need to convert those on your own.
<br/>

Details about these parameters can be found in [GET /swap/v1/quote](/0x-swap-api/api-references/get-swap-v1-quote.md).
<br/>

**How is a fee returned by Swap API - is it part of the quote price or is it a separate parameter?**
<br/>
The fee amount is incorporated as part of the quoted price. If you would like to display the fee separately, just display the amount return by `buyAmount * buyTokenPercentageFee`.

</details>

<details>

<summary> How is a fee returned by Swap API - is it part of the quoted price or is it a separate parameter? </summary>

The fee amount is incorporated as part of the quoted price. If you would like to display the fee separately, just display the amount return by `buyAmount * buyTokenPercentageFee`

</details>

<details>

<summary>How can I find the Swap API liquidity sources for each chain?</summary>

Use the API endpoint `/swap/v1/sources` to get the liquidity sources per chain. You will need to specify the root-endpoint for the chain you are interested in, for example, [https://polygon.api.0x.org/swap/v1/sources](https://polygon.api.0x.org/swap/v1/sources) for the Polygon Network or [https://api.0x.org/swap/v1/sources](https://api.0x.org/swap/v1/sources) for Ethereum Mainnet. See the [Swap API References](/0x-swap-api/api-references/overview)for a full list of endpoints we support.

</details>

<details>

<summary>How do I query what tokens are available to be swapped through the API?</summary>

All ERC20 tokens are supported with the caveat that if the token is fee-on-transfer or has some other special logic there is no way for the API to detect this and their requests may fail/transactions revert/result in some wonky swaps.
<br/>

We recommend referring to [tokenlist.org](https://tokenlists.org/), specifically the [CoinGecko tokenlist ](https://tokenlists.org/token-list?url=https://tokens.coingecko.com/uniswap/all.json)for a list of all available ERC20 tokens.

</details>

## 🌐 **Protocol**

<details>

<summary>What is the <code>protocolFee</code> ?</summary>

The community voted to remove protocol fees in [ZEIP-91](https://www.0x.org/zrx/vote/zeip-91) which decreased the protocol fee multiplier from the current value (70,000) to zero (0) for v3 onward.

<br/>

_**The following is kept for historical reference but no longer applies**_

_TLDR_ 0x API handled the heavy lifting related to protocol fees and provides a `value` field.

A protocol fee was paid by takers and ultimately rebated to market makers when their orders are filled.

Protocol fees were calculated per order using the gas price multiplied by a constant (currently 70,000). 0x API calculated the required protocol fees to be paid and returns this in the `value` field. Since we recommended using a high gas price, in the event where the taker fills at a lower gas price, the excess was returned.

It was possible for the protocol fees to be paid in WETH rather than sent in the transaction as ETH. This could be achieved by the taker having a WETH balance and setting a WETH allowance to the Protocol fee collector address. This [address](https://etherscan.io/address/0xa26e80e7dea86279c6d778d702cc413e6cffa777) can be read on the Exchange contract: `Exchange.protocolFeeCollector`.

</details>

<details>

<summary>Are the smart contracts audited?</summary>

Yes, 0x protocol’s contracts are open source and extensively tested by 0x core team’s internal protocol team and by external auditors (Consensys dilligence, Trail of Bits).

The [**Exchange**](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#exchange) contract, because they are the main entry point of the 0x protocol, is versioned, and governed by ZRX token holders. Because of its critical place in 0x infrastructure, the 0x core team employs a number of external audits to ensure the safe and intended usage of the 0x contract.

The [**Forwarder**](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/forwarder-specification.md) contract is internally audited and constantly improved upon by the 0x core team. Forwarder, an optional extension contract that users can opt in/out of using when swapping, has a minimized attack surface because no approval of user funds is needed.

</details>

<details>

<summary>What is the return of executing the provided calldata? fillResults?</summary>

0x protocol returns a `FillResults` object that returns the result of executing a 0x swap:

```
struct FillResults {
    uint256 makerAssetFilledAmount;  // Total amount of buyToken filled.
    uint256 takerAssetFilledAmount;  // Total amount of sellToken filled.
    uint256 protocolFeePaid;         // Total amount of protocolFee pair in WETH or ETH
    ...
}
```

On-chain, easily decode the result of executing the `calldata` like so:

```
import "@0x/contracts-exchange-libs/contracts/src/LibFillResults.sol";

...

(bool success, bytes memory data) = address(exchange).call.value(quote.protocolFee)(quote.calldataHex);
require(success, "Swap not filled");
 fillResults = abi.decode(data, (LibFillResults.FillResults));
 
```

</details>

## 📬 Contact the 0x Team

<details>

<summary>My project would like to integrate the Swap API. How can I contact the 0x team?</summary>

We appreciate your interest in consuming liquidity from the 0x API. Please fill out [this form](https://www.0x.org/#contact) for us to  to learn more about application and how you use the 0x API. Our team will review and reach out to you.

</details>

<details>

<summary>My project is interested to apply as a liquidity source in 0x ecosystem. How can I contact the 0x team?</summary>

Thank you for your interest in providing liquidity to the 0x ecosystem via our RFQ suite of products. Please fill out [this form](https://docs.google.com/forms/d/e/1FAIpQLSen019JsWFZHluSgqSaPE\_WFVc4YBtNS4EKB8ondJJ40Eh8jw/viewform) to help us learn more about your firm, and determine whether 0x is a good fit for you. Our team will review and reach out to you.


</details>
