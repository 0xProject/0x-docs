---
sidebar_label: Accessing RFQ liquidity on 0x API
sidebar_position: 4
description: This guide discusses what RFQ liquidity is, how it works, and how your project can apply to access it
---

# Accessing RFQ liquidity on 0x API

### RFQ System

_RFQ liquidity is currently available on Mainnet & Polygon._

### An Exclusive Source of Liquidity

In its role as a DEX aggregator, the 0x API integrates both on- and off-chain liquidity. On-chain liquidity is sourced by sampling smart contract liquidity pools, such as Uniswap and Curve. Off-chain liquidity is sourced from professional market makers via the 0x Request-for-Quote (“RFQ”) System.

If integrators request a standard quote from the 0x API, part or all of their quote may be sourced via the **RFQ** system.  In this system, the 0x API aggregates quotes from professional market makers, alongside quotes from AMMs. If the market-maker quotes are more competitive than AMM quotes, they may be included in the final price shown to the end-user. The end-user’s liquidity is ultimately provided by a combination of AMMs and professional market makers. _Everything happens under-the-hood!_


![rfq diagram](/img/0x-swap-api/rfq-diagram.png)


## Trusted Takers

RFQ orders contain a [`takerAddress` query parameter](/developer-resources/faqs-and-troubleshooting.md#how-does-takeraddress-help-with-catching-issues). When an order containing this parameter gets hashed and signed by two counterparties, it is exclusive to those two counterparties.


## Dedicated Makers

In addition to the 0x API configuration identifying trusted takers, it also contains a list of specific market makers that participate in the RFQ system. Each maker is identified by an HTTP endpoint URL, and each endpoint has an associated list of asset pairs for which that endpoint will provide quotes. For the instance at `api.0x.org`, the 0x team is maintaining a list of trusted market makers.

:::info
If you represent a trading firm that would like to add liquidity to the 0x ecosystem via the RFQ system, please get in touch here[: 0x RFQ Interest Form](https://docs.google.com/forms/d/e/1FAIpQLSen019JsWFZHluSgqSaPE\_WFVc4YBtNS4EKB8ondJJ40Eh8jw/viewform?usp=sf\_link)
:::

##

### **Firm Quotes**

The firm quote resource is hosted at [`/swap/v1/quote`](../api-references/get-swap-v1-quote.md) and responds with a full 0x order, which can be submitted to an Ethereum node by the client. Therefore it is expected that the maker has reserved the maker assets required to settle the trade, leaving the order unlikely to revert.\
\
In order to qualify for RFQ liquidity, the request to `/swap/v1/quote` must include the query parameter `intentOnFilling=true` (in addition to the aforementioned `0x-api-key` and non-null `takerAddress`).

### **Indicative Pricing**

The indicative pricing resource is hosted at [`/swap/v1/price`](../api-references/get-swap-v1-price.md) and responds with pricing information, but that response does not contain a full 0x order, so it does not constitute a legitimate transaction that can be submitted to the Ethereum network.  This resource can be used by price feeds and other applications that do not intend to submit an actual transaction.

****

## Quote Validation

Whenever a 0x API client specifies a `takerAddress` in their [`/quote`](../api-references/get-swap-v1-quote.md) request, the API will validate the quote before returning it to the client, avoiding a number of possible causes for transaction reverts. (For more details, see "[How does `takerAddress` help with catching issues?](../../developer-resources/faqs-and-troubleshooting.md#how-does-takeraddress-help-with-catching-issues)")

However, given that a `takerAddress` is required in order to obtain RFQ liquidity, and given that this requirement subverts the optionality of the quote validation feature, the implementation of RFQ introduced a new query parameter to the `/quote` resource: `skipValidation`. When this parameter is set to `true`, quote validation will be skipped. While validating even RFQ quotes is a best-practice recommended default, skipping validation can be useful in certain circumstances, such as when experimenting with a new maker integration deployment.

## Excluding Liquidity Sources

When requesting a quote from the 0x API, clients can choose to have the API exclude specific liquidity sources. (For more details, see [the API specification](../api-references/get-swap-v1-quote.md#excluding-liquidity-sources).)

At this time, RFQ liquidity is considered by the 0x API to be included within the `0x`/`Native` liquidity group. (In the API's interface, it's referred to as `0x`, but in the underlying routing logic it's referred to as `Native`.)

Therefore, if a 0x API client intends to access RFQ liquidity, it's important that they not exclude the `0x` liquidity source.


## Code Examples

Checkout our [Guides](/market-makers/guides/generating-0x-order-hashes) for RFQT and RFQM Market Makers on how to create, hash, sign, fill, get state, and cancel 0x V4 RFQ orders

* [Generating 0x Order Hashes](../../market-makers/guides/generating-0x-order-hashes.md)
* [Signing 0x Orders](../../market-makers/guides/signing-0x-orders.md "mention")
* [Python Code Examples of RFQ Order](../../market-makers/guides/0x-v4-rfq-orders-code-examples-with-python.md "mention")
* [Fill ERC20 RFQ order](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill\_erc20\_rfq\_order.ts)
* [Fill ERC20 RFQ order with maker order signer](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill\_erc20\_rfq\_order\_with\_maker\_order\_signer.ts)
* [Subscribe to RFQ order fill events](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill\_erc20\_limit\_order.ts)
* [Execute Metatransaction](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/execute\_metatransaction\_fill\_rfq\_order.ts) to fill RFQ order&#x20;
* [Fill ERC20 OTC order](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill\_erc20\_otc\_order.ts)
* [(Advanced) Fill an aggregated quote via TransformERC20](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/transform\_erc20.ts)
