---
sidebar_label: How to Set Your Token Allowances
sidebar_position: 2
description: Learn how to set your token allowances
---


# How to Set Your Token Allowances

Some interactions with 0x require or are improved by setting [token allowances](https://tokenallowance.io/), or in other words, giving 0x's smart contracts permission to move certain tokens on your behalf. Some situations of when you would need to set a token allowance include:&#x20;

* When submitting a 0x API quote selling ERC20 tokens, you will need to give an allowance to the `allowanceTarget` specified in the quote response
* When trading ERC20 tokens using the Exchange contract, you will have to give an allowance to the ERC20Proxy contract

## Setting Allowances for 0x API quotes

0x API uses an advanced architecture to minimize the transaction costs for its users, as a result of this the target for allowances has changed for the `v1` endpoints. For users of the `swap/v1/*` swap endpoints the ERC20 allowance target has changed and a new field `allowanceTarget` is introduced in the `/price` and `/quote` responses. The `allowanceTarget` field is the contract address that the user needs to set an ERC20 allowance for in order to be able to perform the trade. Note that `allowanceTarget` is only relevant when selling an ERC20 token.

:::tip
When setting the token allowance, make sure to provide enough allowance for the buy or sell amount _as well as the gas;_ otherwise, you may receive a 'Gas estimation failed' error.
:::

### Setting Allowances for a quote with Web3.js

All code snippets provided are designed to work in a browser environment with an injected web3 instance (like [Metamask](https://metamask.io/)). You can use the [npm web3 module](https://www.npmjs.com/package/web3) and modify these snippets to run them in a node environment.

```javascript
import { ERC20TokenContract } from '@0x/contract-wrappers';
import { BigNumber } from '@0x/utils';

(async () => {
    const web3 = window.web3;

    // Get a quote from 0x API which contains `allowanceTarget`
    // This is the contract that the user needs to set an ERC20 allowance for
    const res = await fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);
    const quote = await res.json();

    // Set up approval
    const USDCaddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    const USDCcontract = new ERC20TokenContract(USDCaddress, web3.eth.currentProvider);
    const maxApproval = new BigNumber(2).pow(256).minus(1);

    // Send the approval to the allowance target smart contract
    const chainId = 1;
    const approvalTxData = USDCcontract
        .approve(quote.allowanceTarget, maxApproval)
        .getABIEncodedTransactionData();
    await web3.eth.sendTransaction(approvalTxData);
})();
```

## Setting Allowances on Etherscan

There are a lot of dApps that let you set your allowances in Metamask (including [RadarRelay](https://app.radarrelay.com/)), but for this example we will be using [Etherscan](http://etherscan.io/). To set your WETH allowance for the ERC20Proxy contract you can navigate to the [Dapp view for the WETH ERC20](https://etherscan.io/dapp/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#writeContract) contract. Here you can use Metamask to call the `approve` method to approve the ERC20Proxy for the max uint256 amount which is `115792089237316195423570985008687907853269984665640564039457584007913129639935`. Again, you can find the address of the ERC20Proxy in the 0x cheat sheet.

You can give a WETH allowance to any smart contract this way. To set your allowance for a different token, you'll have to navigate to the smart contract interface for that token.