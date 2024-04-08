---
sidebar_label: Gasless API FAQ
sidebar_position: 5
description: Gasless API FAQ
---

# Gasless API FAQ

<details>

<summary>What chains does Gasless API support?</summary>

Gasless API is supported on the following chains via https://api.0x.org/. Select the chain in your request by providing the corresponding chain id with the `0x-chain-id` header.

| Chain                     | Chain ID              |
| --------------------------| ----------------------|
| Ethereum (Mainnet)        | 1                     |
| Polygon                   | 137                   |
| Arbitrum                  | 42161                 |
| Base                      | 8453                  |
| Optimism                  | 10                    |

</details>

<details>

<summary>What tokens are supported?</summary>

Gasless API offers gasless approvals and gasless swaps for supported tokens.

For gasless approvals:

- Our list of supported tokens for gasless approvals on each chain is served through the [/tx-relay/v1/swap/gasless-approval-tokens endpoint](https://api.0x.org/tx-relay/v1/swap/gasless-approval-tokens)
- Generally, these are tokens that support [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612). In otherwords, these are ERC-20s with the Permit function
- You can also examine if a token supports gasless approvals at trade time, by observing the response from requests to [/tx-relay/v1/swap/quote](/tx-relay-api/api-references/get-tx-relay-v1-swap-quote#response). If the variable `isGaslessAvailable = true`, the token the user is selling supports gasless approvals.

For gasless swaps, the following **sell** token lists are supported:

- On Ethereum Mainnet, Gasless API supports only selling ERC-20 tokens that are on our supported tokens list [/tx-relay/v1/swap/supported-tokens](https://api.0x.org/tx-relay/v1/swap/supported-tokens). Note, you can **buy** any token on Ethereum, provided the `sellToken` is on the supported Token list
- On all other supported chains (Polygon, Arbitrum, Base and Optimism), Gasless API supports selling all tokens that [Swap API](/0x-swap-api/introduction) supports.

Note, the only trades Gasless API CANNOT support are those where end-user is trying to sell a native token from their wallet (eg: selling ETH on Mainnet, or selling MATIC on Polygon). This is because native tokens are typically not ERC-20s, so they do not support the `transferFrom` function, which the metatransaction relay system underlying Gasless API utilizes. In this case, we’d recommend using the [Swap API](https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote), wherein the user will pay for the gas of the transaction, with the chain’s native token. Otherwise, you can recommend your users to wrap their ETH into WETH (or equivalent, in other chains).

</details>

<details>

<summary>Who pays for the gas fees to allow those swaps to happen?
</summary>

0x covers the gas fee up front. This cost is then wrapped into the trade and paid for in the form of the token the user is trading. 

Applications may choose to sponsor transactions, in which case they will pay 0x directly, and users will not be billed on chain

</details>

<details>

<summary>Why is the support limited to some tokens?</summary>

Since 0x is covering the gas cost via the sell-side token, we are taking exposure on the price movements of the `sellToken`. When gas is high, that risk can be sizable. On highly volatile tokens (long tail), this can also be sizable.

The cost of gas on other chains is much less than on Ethereum Mainnet, thus, we are able to support more tokens on them.

</details>

<details>

<summary>What if my user wants to sell a native token, eg: swap ETH for USDC, on Mainnet?</summary>

In this case, we’d recommend using the [Swap API](https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote), wherein the user will pay for the gas of the transaction, with the chain’s native token. Otherwise, you can recommend your users to wrap their ETH into WETH (or equivalent, in other chains).

</details>

<details>

<summary>What tokens work with gasless approvals?</summary>

Our list of supported tokens for gasless approvals on each chain is served through the [/tx-relay/v1/swap/gasless-approval-tokens endpoint](https://api.0x.org/tx-relay/v1/swap/gasless-approval-tokens). 

You can also examine a token’s eligibility at trade time, by observing the response from requests to `/tx-relay/v1/swap/quote`. If the variable `isGaslessAvailable` = `true`, the token the user is selling supports gasless approvals.

</details>

<details>

<summary>What if my user is selling a token that doesn’t support gasless approvals?</summary>

In this case, your user would need to do a standard approval transaction with the 0x Protocol. If you user doesn’t have sufficient native token to pay for the approval transaction, she can use Gasless API to swap a popular token (eg: USDC) for ETH (or the equivalent native token) on Mainnet, Matic on Polygon, etc. Please note that the approval transaction is a one-time transaction for each new token the user sells. Once the approval transaction is mined, the user can still do gasless swaps with that token.

<br></br>
<br></br>

To perform a standard approval, your user would need to (or your frontend should prompt the user to) submit an approval transaction for the token the user wants to trade ( `approve(address spender, uint256 amount) → bool` [method](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-approve-address-uint256-) defined by ERC20, with `spender` set to the address of 0x Exchange Proxy and `amount` being at least the amount the user wants to trade. Do note that the smaller the `amount` is, the more frequent the user has to perform the standard approval step)

<br></br>
<br></br>

Some UIs may choose not to support tokens that do not support [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612) to be able to guarantee a 100% gasless experience. However, Gasless API does not limit anyone in this manner and is strictly a choice of the developer.

</details>

<details>

<summary>How do I know if an approval is required?</summary>

Gasless API can check whether an approval transaction is necessary, although the check worsens latency.

To perform the check, please ensure that the parameter `checkApproval` is set to `true`, in requests to `/tx-relay/v1/swap/quote`. Gasless API will check to see if your user has previously set the allowance for you. If the allowance is non-existent, or too low, we require an approval transaction, and `isRequired` = `true` will be returned in the response.

Please set `checkApproval` to `true` only when necessary.

</details>

<details>

<summary>My user is doing a swap and needs an approval - are these separate transactions? Do I need 2 signatures?</summary>

Although gasless approvals and gasless swap are bundled in the same transaction, they each require a signature for the corresponding EIP-712 object. However, you may elect to create a front-end experience wherein it appears to the user that they are signing only 1 transaction.

</details>

<details>

<summary>What does a gasless approve + swap happy path look like, using Gasless API?</summary>

See the flow charts [here](/tx-relay-api/guides/understanding-tx-relay-api#technical-flow-charts).

</details>

<details>

<summary>What is the minimum amount users can trade with Gasless API?</summary>

The minimum amount will vary across chains, trade sizes and current gas conditions. When attempting to trade an amount that is too small, the API response will return an error message with the estimated minimum amount for that trade. In general, we recommend setting a minimum of $10 on Mainnet, and $1 on other chains for the best experience.

</details>

<details>

<summary>I received a `No liquidity` error. Help!</summary>

This error is typically triggered when there is no good market for the token pairs selected. 

</details>

<details>

<summary>I received a `Token X is currently unsupported` error. Help!</summary>

This error is triggered when the token does not support gasless swaps.

For gasless swaps, the following **sell** token lists are supported on Gasless API:

- On Ethereum Mainnet, Gasless API supports only selling ERC-20 tokens that are on our supported tokens list [/tx-relay/v1/swap/supported-tokens](https://api.0x.org/tx-relay/v1/swap/supported-tokens). Note, you can **buy** any token on Ethereum, provided the `sellToken` is on [our Supported Tokens List](https://api.0x.org/tx-relay/v1/swap/supported-tokens).
- On all other supported chains (Polygon, Arbitrum, Base and Optimism), Gasless API supports selling all tokens that [Swap API](/0x-swap-api/introduction) supports.

</details>
