---
sidebar_label: Price Impact Protection
sidebar_position: 4
description: Get notifications on illiquid markets. Don't get rekt.
---

# Price Impact Protection

Topics covered on this page include:

* [What is price impact?](/0x-swap-api/advanced-topics/price-impact-protection#what-is-price-impact-)
* [How is price impact different from slippage?](/0x-swap-api/advanced-topics/price-impact-protection#how-is-price-impact-different-from-slippage-)
* [How is price impact calculated?](/0x-swap-api/advanced-topics/price-impact-protection#how-is-price-impact-calculated-)
* [How does Price Impact Protection work?](/0x-swap-api/advanced-topics/price-impact-protection#how-does-price-impact-protection-work-)
* [How do I setup Price Impact Protection when using the Swap API?](0/0x-swap-api/advanced-topics/price-impact-protection#how-do-i-setup-price-impact-protection-when-using-the-swap-api-)
* [Do you have recommendations for how to display price impact to end-users in a dApp UI?](/0x-swap-api/advanced-topics/price-impact-protection#do-you-have-recommendations-for-how-to-display-price-impact-to-end-users-in-a-dapp-ui)
* [Read More](/0x-swap-api/advanced-topics/price-impact-protection#read-more)



## What is price impact?

Price impact is the influence that a user’s trade has over the market price of an underlying trading pair. It is directly related to the amount of liquidity in the pool. Price impact can be particularly high for illiquid trading pairs and in certain instances can cause significant losses for traders.

## How is price impact different from slippage?

Price impact is different from price slippage, although the terms are often mistakenly used interchangeably. Price slippage refers to the difference between the executed price and the quoted price, caused by external market movements unrelated to your trade.

When a user tries to swap any pair of tokens, two things can impact their final pricing: _slippage_ and _price impact._ _Slippage_ is due to the volatility of the market within the time of the trade, while _price impact_ is due to the user's own trade (typically when trading an illiquid token).

In a recent post, we did a deep dive on the mechanics of [slippage](https://blog.0x.org/measuring-the-impact-of-hidden-dex-costs/) and its effects on DEX performance.

## How is price impact calculated?

Let's assume we are on the Ethereum network for this example. For, token A and token B, the 0x API estimates the price of A by simulating 0.1 ETH swap for A and B. Based on the prices of A and B (denominated in ETH) and the expected output amount, price impact is calculated.

Suppose a user wants to sell 10 token A for token B.

* 0.1 ETH → 1 A (1 ETH → 10 A)
* 0.1 ETH → 10 B (1 ETH → 100 B)
* Price (without price impact) = **10B/A**
* Actual quote
  * 10 A → 99 B (price = **9.9 B/A**)
* Estimated Price Impact
  * 1 - (10/9.9) \~= 0.0101 = **1.01%**

## How does Price Impact Protection work?

We added Price Impact Protection as an optional feature of the Swap API to make  it easier to protect users from getting rekt by illiquid markets. Despite Swap API enabling access to the deepest liquidity from over 70+ exchanges, there are still some long-tailed token pairs that suffer from suboptimal liquidity on decentralized exchanges.

When we are able to calculate price impact estimates, users leveraging the Swap API will be notified when their trade faces a price impact over a certain threshold. The API will return an error of insufficient liquidity due to the price impact being higher than the defined limit. The threshold is easily customizable by setting `priceImpactProtectionPercentage` anywhere from 0-1, so we encourage every Swap API user to customize this parameter based on their needs and tolerance.

:::info
In other words, Price Impact Protection adds the following protection logic:

Given X is set by the `priceImpactProtectionPercentage` parameter, if the price impact for the quoted trade is > X, then we throw an error, effectively blocking the trade protecting a user's tokens.
:::


Price Impact Protection is an optional feature - the default threshold will be set at 1 which means that every transaction is passed without triggering an error. Developers and API users who want to take advantage of it will need to opt-in by adjusting this setting.

Developers can also surface this information in their UI so users can see the potential price impact of a trade prior to submitting an order (example image shown below). Developers can simply ping the Swap API \[[swap/v1/quote](https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote#request)] and use the returned `estimatedPriceImpact` information.

## How do I setup Price Impact Protection when using the Swap API? <a href="#what-is-price-impact" id="what-is-price-impact"></a>

**Price Impact Protection is an opt-in feature 0x API,** it is controlled by the new [`priceImpactProtectionPercentage` parameter](/0x-swap-api/api-references/get-swap-v1-quote#request).


The following section includes a summary of the Request and Response changes related to Price Impact Protection:

### **Changes to `/swap/quote`**

#### **Request Parameter Changes**

The `priceImpactProtectionPercentage` parameter (Optional, defaults to 100%) has been added to the [**`/swap/quote`**](/0x-swap-api/api-references/get-swap-v1-quote)endpoint. This parameter indicates the percentage (between 0 - 1.0) of allowed price impact.&#x20;

This is an **opt-in** feature, the default value of 1.0 will disable the feature. When it is set to 1.0 (100%) it means that every transaction is allowed to pass.

When `priceImpactProtectionPercentage` is set, `estimatedPriceImpact` is returned which estimates the change in the price of the specified asset that would be caused by the executed swap due to price impact.

If the estimated price impact is above the percentage indicated, an error will be returned. **For example,** if `PriceImpactProtectionPercentage=.15` (15%), any quote with a price impact higher than 15% will return an error.

**Note:** When we fail to calculate price impact, we will return `null` and Price Impact Protection will be disabled

#### **Response Changes**

The `estimatedPriceImpact` response field has been added to the [**`/swap/quote`**](../api-references/get-swap-v1-quote.md) endpoint.

When `priceImpactProtectionPercentage` is set, `estimatedPriceImpact` returns the estimated change in the price of the specified asset that would be caused by the executed swap due to price impact.

**Note:** When we fail to calculate price impact, we will return `null` and Price Impact Protection will be disabled

## Do you have recommendations for how to display price impact to end-users in a dApp UI?

First, set `priceImpactProtectionPercentage` to a value less than 1 but greater than or equal to 0, based on needs and tolerance.

It is up to you how to design the user flow, some examples include:

* You can surface this parameter in the settings and allow the user to set their own percentage tolerance (similar to setting slippage tolerance)
* Or you can not allow the user to change it and just put a limit you are comfortable with that will be applied to each request and display the value returned by the `estimatedPriceImpact` parameter to inform users before they submit an order (as shown in the image below)



## Read More

* (Blog) [Price Impact Protection is here. Don't get rekt.](https://blog.0x.org/0x-swap-api-price-impact-protection/)