---
sidebar_label: How to set your token allowances
sidebar_position: 2
description: Learn how to set your token allowances
---

# How to set your token allowances

A [token allowance](https://tokenallowance.io/) is required if you want a third-party to move funds on your behalf. In short, you are allowing them to move your tokens.

In our case, we would like the 0x Exchange Proxy smart contract to trade our ERC20 tokens for us, so we need to write to the ERC20 contract of that token, and approve an allowance for 0x Exchange Proxy (i.e. allow it to move a certain amount of tokens on our behalf us).

To do so, we will need to give an allowance to the `allowanceTarget` parameter that's returned by the [`/quote`](0x-swap-api/api-references/get-swap-v1-quote) and [`/price`](0x-swap-api/api-references/get-swap-v1-price) Swap API endpoints. The `allowanceTarget` is the the target contract address, in our case the 0x Exchange Proxy smart contract address on the relevant network (see full list of address [here](/introduction/0x-cheat-sheet#exchange-proxy-addresses)). Read more about `allowanceTarget` [here](/0x-swap-api/api-references/get-swap-v1-quote). Note that `allowanceTarget` is only relevant when selling an ERC20 token.

:::info
For swaps with "ETH" as sellToken, wrapping "ETH" to "WETH" or unwrapping "WETH" to "ETH" no allowance is needed, a null address of `0x0000000000000000000000000000000000000000` is then returned instead.
:::

## Setting Allowances for 0x API quotes

There are several ways to set a token allowance, both programmatically and through a UI. We will cover options for both methods below.

### Using wagmi

wagmi has a number of hooks that can help us read and write to contracts.

- Call [`useContractRead`](https://wagmi.sh/react/hooks/useContractRead) to check if the ERC20 token we are interested in has approved an allowance to 0x Exchange Proxy.
- Call [`usePrepareContractWrite`](https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite) and [`useContractWrite`](https://wagmi.sh/react/hooks/useContractWrite) to write the approval to the token contract.

See the full code implementation [here](https://github.com/0xProject/0x-nextjs-demo-app/blob/main/pages/Price/index.tsx) from our [Next.js 0x demo app](https://github.com/0xProject/0x-nextjs-demo-app/tree/main).

```javascript
// fetch quote
...

function ApproveButton({
  takerAddress,
  onClick,
  sellTokenAddress,
}: {
  takerAddress: Address;
  onClick: () => void;
  sellTokenAddress: Address;
}) {
  // 1. Read from ERC20 contract. Does spender (0x Exchange Proxy) have an allowance?
  const { data: allowance, refetch } = useContractRead({
    address: sellTokenAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [takerAddress, exchangeProxy],
  });

  // 2. (Only if no allowance): Write to ERC20, approve 0x Exchange Proxy to spend max integer
  const { config } = usePrepareContractWrite({
    address: sellTokenAddress,
    abi: erc20ABI,
    functionName: "approve",
    args: [exchangeProxy, MAX_ALLOWANCE],
  });

  const {
    data: writeContractResult,
    writeAsync: approveAsync,
    error,
  } = useContractWrite(config);

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: writeContractResult ? writeContractResult.hash : undefined,
    onSuccess(data) {
      refetch();
    },
  });
...
```

### Using web3.js

```javascript
import { ERC20TokenContract } from "@0x/contract-wrappers";
import { BigNumber } from "@0x/utils";

(async () => {
  const web3 = window.web3;

  // Get a quote from 0x API which contains `allowanceTarget`
  // `allowanceTarget` is the contract that the user needs to set an ERC20 allowance for
  const res = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
  );
  const quote = await res.json();

  // Set up approval
  const USDCaddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
  const USDCcontract = new ERC20TokenContract(
    USDCaddress,
    web3.eth.currentProvider
  );
  const maxApproval = new BigNumber(2).pow(256).minus(1); // This example sets the allowance amount to a large number, but you can adjust it to only the amount required for trading

  // Write to the ERC20 token contract address and approve the allowanceTarget to spend maxApproval
  const chainId = 1;
  const approvalTxData = USDCcontract.approve(
    quote.allowanceTarget,
    maxApproval
  ).getABIEncodedTransactionData();
  await web3.eth.sendTransaction(approvalTxData);
})();
```

### Using Etherscan

There are a lot of app that let you set your allowances in Metamask, but for this example we will be using [Etherscan](http://etherscan.io/). To set your WETH allowance for the ERC20Proxy contract you can navigate to the WETH ERC20 Contract > Contracts > Write Contract tab > approve method [here](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#writeContract).

![Etherscan approve method](/img/0x-swap-api/etherscan-token-allowance.png)

From here, you can call the `approve` method to approve the [ERC20Proxy Address](http://localhost:3000/docs/introduction/0x-cheat-sheet#exchange-proxy-addresses) for the max uint256 amount which is `115792089237316195423570985008687907853269984665640564039457584007913129639935`. You can find a full list of all the ERC20Proxy addresses for different networks in the [0x cheat sheet](http://localhost:3000/docs/introduction/0x-cheat-sheet#exchange-proxy-addresses).

You can give a WETH allowance to any smart contract this way. To set your allowance for a different token, you'll have to navigate to the smart contract interface for that token.

## Revoking Allowances

To revoke an allowance, you can set the allowance to 0. This can be done programmatically or through a UI such as https://revoke.cash/ .

## Common Issues

When setting the token allowance, make sure to provide enough allowance for the buy or sell amount _as well as the gas;_ otherwise, you may receive a 'Gas estimation failed' error.
