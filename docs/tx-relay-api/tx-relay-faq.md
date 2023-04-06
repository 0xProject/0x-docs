---
sidebar_label:  Tx Relay FAQ 
sidebar_position: 4
description:  Tx Relay FAQ
---

# Tx Relay FAQ

<details>

<summary>What chains will Tx Relay be on?</summary>

Through Q2 2023, Mainnet & Polygon….more chains to come

</details>


<details>

<summary>What pairs are supported?</summary>

_Tx Relay aggregates liquidity from 29 sources on Mainnet, and 24 sources on Polygon. A comprehensive set of liquidity sources is available_ [_here_](https://explorer.0x.org/liquiditySources?chains=Polygon\&chains=Ethereum)_. Users will have access to any pair supported by those liquidity sources._

The only trades Tx Relay CANNOT support on those wherein the end-user is trying to sell a native token from their wallet (eg: selling ETH for USDC, on Mainnet). This is because native tokens are typically not ERC-20s, so they do not support the `transferFrom` function, which the metatransaction relay system underlying Tx Relay utilizes.

</details>

<details>

<summary>What if my user wants to sell a native token, eg: swap ETH for USDC, on Mainnet?</summary>

_In this case, we’d recommend using the_ [_0x Labs Swap API_](https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote)_, wherein the user will pay for the gas of the transaction, with the chain’s native token. Otherwise, you can recommend your users to wrap their ETH into WETH (or equivalent, in other chains)._

</details>

<details>

<summary>What tokens work with gasless approvals?</summary>

See the list of tokens in the [gasless approvals token list](/tx-relay-api/gasless-approvals-token-list). 

You can also examine a token’s eligibility at trade time, by observing the response from requests to `/tx-relay/v1/swap/quote`. If the variable `isGaslessAvailable` = `true`, the token the user is selling supports gasless approvals.

</details>

<details>

<summary>What if my user is selling a token that doesn’t support gasless approvals?</summary>

In this case, your user would need to do a standard approval transaction with the 0x Protocol. If you user doesn’t have sufficient native token to pay for the approval transaction, she can use Tx Relay to swap a popular token (eg: USDC) for ETH (or the equivalent native token) on Mainnet, Matic on Polygon, etc. Please note that the approval transaction is a one-time transaction for each new token the user sells. Once the approval transaction is mined, the user can still do gasless swaps with that token.

To perform a standard approval, your user would need to (or your frontend should prompt the user to) submit an approval transaction for the token the user wants to trade ( `approve(address spender, uint256 amount) → bool` [method](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-approve-address-uint256-) defined by ERC20, with `spender` set to the address of 0x Exchange Proxy and `amount` being at least the amount the user wants to trade. Do note that the smaller the `amount` is, the more frequent the user has to perform the standard approval step)

</details>

<details>

<summary>How do I know if an approval is required?</summary>

Tx Relay can check whether an approval transaction is necessary, although the check worsens latency.

To perform the check, please ensure that the parameter `checkApproval` is set to `true`, in requests to `/tx-relay/v1/swap/quote`. Tx Relay will check to see if your user has previously set the allowance for you. If the allowance is non-existent, or too low, we require an approval transaction, and `isRequired` = `true` will be returned in the response.

Please set `checkApproval` to `true` only when necessary.

</details>


<details>

<summary>My user is doing a swap and needs an approval - are these separate transactions? Do I need 2 signatures?</summary>

Gasless approvals and gasless swaps are distinct transactions and they each require a signature. However, you may elect to create a front-end experience wherein it appears to the user that they are signing only 1 transaction.

</details>

<details>

<summary>What does a gasless approve + swap happy path look like, using Tx Relay?</summary>

[![Click here to expand the image:]](/img/tx-relay-api/gasless-approval-tx-relay.png)
[Click here to expand the image:]: /img/tx-relay-api/gasless-approval-tx-relay.png
 <img src="/img/tx-relay-api/gasless-approval-tx-relay.png" alt="" data-size="original"></img>


</details>