---
sidebar_label: Working in the testnet
sidebar_position: 4
description: Learn about working in the testnet
---

# Working in the Testnet

## Available Testnets

0x Swap API testnets can be accessed from:

- Ethereum (Goerli): https://goerli.api.0x.org/
- Polygon (Mumbai): https://mumbai.api.0x.org

These testnets offers a subset of DEX sources available on Ethereum mainnet.
To view the currently supported sources on each network, you can use the [/sources](/0x-swap-api/api-references/get-swap-v1-sources) endpoint.

Altneratively, you can also fork Ethereum mainnet into your own testnet.

## Available Token Pairs

Because testnet liquidity is more limited than on mainnet, we recommend finding available testnet tokens is using pairs found in "Tokens Transferred" for the transactions that have gone through the [0x Exchange Proxy](/developer-resources/contract-addresses#0x-v4) contract for your desired network.

Note that liquidity sources are also different between mainnets and testnets. Be aware that token you want to use for testing _must_ have liquidity on at least one of these sources; otherwise, you will receive an error.

In addition, only certain pairs are deployed on testnests and available for testing.

To view the currently supported sources on each network, you can use the [/sources](/0x-swap-api/api-references/get-swap-v1-sources) endpoint.

### Goerli

At the time of writing this guide the following liquidity sources are supported on Goerli: `0x`, `MultiHop`, `SushiSwap`, `Uniswap`, `Uniswap_V2` and `Uniswap_V3.`

In addition, only certain pairs are deployed on testnests and available for testing. At the time of writing, the recommended testing pair is `WETH <> UNI` deployed by Uniswap on Goerli.

To find additional example pairs for each network, you can try using pairs found in "Tokens Transferred" for the transactions that have gone through the [0x Exchange Proxy](/developer-resources/contract-addresses#0x-v4) contract on Goerli, [0xF91bB752490473B8342a3E964E855b9f9a2A668e](https://goerli.etherscan.io/address/0xf91bb752490473b8342a3e964e855b9f9a2a668e).

![Goerli tokens example](/img/0x-swap-api/goerli-tokens.png)

#### Example tokens available on Goerli

| Symbol | Address                                                                                                                    |
| ------ | -------------------------------------------------------------------------------------------------------------------------- |
| UNI    | [0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984](https://etherscan.io/token/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984)        |
| WETH   | [0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6](https://goerli.etherscan.io/token/0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6) |
| DAI    | [0xE68104D83e647b7c1C15a91a8D8aAD21a51B3B3E](https://goerli.etherscan.io/token/0xe68104d83e647b7c1c15a91a8d8aad21a51b3b3e) |
| USDC   | [0x07865c6E87B9F70255377e024ace6630C1Eaa37F](https://goerli.etherscan.io/token/0x07865c6e87b9f70255377e024ace6630c1eaa37f) |

### Mumbai

To find example pairs for each network, you can try using pairs found in "Tokens Transferred" for the transactions that have gone through the [0x Exchange Proxy](http://localhost:3000/docs/developer-resources/contract-addresses#0x-v4) contract on Mumbai, [0xf471d32cb40837bf24529fcf17418fc1a4807626](https://mumbai.polygonscan.com/address/0xf471d32cb40837bf24529fcf17418fc1a4807626).

![Mumbai tokens example](/img/0x-swap-api/mumbai-tokens.png)

#### Example tokens available on Mumbai

| Symbol | Address                                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| WETH   | [0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa](https://mumbai.polygonscan.com/address/0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa) |
| USDC   | [0x2058a9d7613eee744279e3856ef0eada5fcbaa7e](https://mumbai.polygonscan.com/address/0x2058a9d7613eee744279e3856ef0eada5fcbaa7e) |

## Getting Testnet Funds

- [Goerli Faucet](https://goerlifaucet.com/)
- [Goerli POW Faucet](https://goerli-faucet.pk910.de/)
- [Paradigm MultiFaucet](https://faucet.paradigm.xyz/) - Funds a wallet with ETH, WETH, DAI, and NFTS across 4 testnets

## Code Example: Performing a Swap on Goerli

For general information about the /swap endpoints see [Swap API](/0x-swap-api/introduction).

The following is example code for swapping 0.1 ETH for DAI on Goerli using Metamask.

_Instructions to use the CodePen:_

- Click "TypeScript" to see the code. Click "Run Pen" to run the code demo.
- You can either edit the code directly in the window below, or you can [edit it on CodePen](https://codepen.io/0xProject/pen/abVJYra).

<div>
<iframe height="300"
  width="100%;"
  scrolling="no" title="Example 0x API swap on the Goerli testnet" src="https://codepen.io/0xProject/embed/preview/abVJYra?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/0xProject/pen/abVJYra">
  Example 0x API swap on the Goerli testnet</a> by 0xProject (<a href="https://codepen.io/0xProject">@0xProject</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
</div>

## Interacting with Limit Orders on Goerli

Refer to [@0x/contract-addresses](https://github.com/0xProject/protocol/blob/development/packages/contract-addresses/addresses.json#L44-L85) to find the addresses of the latest deployment on Goerli and then follow our limit order related guides below, using the Goerli contract addresses, and chain id 5.

- [Create a Limit Order](/0x-limit-orders/guides/create-a-limit-order)
- [Cancel a Limit Order](/0x-limit-orders/guidescancel-a-limit-order)
- [Fill a Limit Order](/0x-limit-orders/guidesfill-a-limit-order)
- [Limit Order Status](/0x-limit-orders/guideslimit-order-status)

## Forking mainnet Ethereum

If you need to test composability between multiple protocols, or the liquidity source/token that you want to test is not available on Goerli then using a tool like [Ganache](https://trufflesuite.com/ganache/) or [Hardhat](https://hardhat.org/) to create your own private fork of the Ethereum mainnet can be helpful.

When forking Ethereum mainnet all current Ethereum state as of the block that you fork will also be available in your private fork, all contracts addresses, and balances tokens will be exactly like the Ethereum mainnet. The main advantage with this is that you can test quotes from our hosted Ethereum mainnet 0x API on your private forked network without having to run any additional infrastructure or spend any real funds on test transactions.

### Forking Ethereum mainnet with Hardhat

This guide assumes that you already have a working Hardhat project, if not please refer to the official [Hardhat Getting Started Guide](https://hardhat.org/getting-started/).

#### Configuring Hardhat to create a private fork

First, you need to add a `hardhat` network in your Hardhat config file.

```typescript
// hardhat.config.ts
// ...
const config = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      forking: {
        url: RPC_URL, // This should be your Alchemy/Infura RPC URL
      },
    },
  },
};
// ...
```

Now, for your tests, you can find an account on Ethereum mainnet with the appropriate balances required for the swaps that you want to test locally, then using the [hardhat_impersonateAccount](https://hardhat.org/hardhat-network/reference/#hardhat-impersonateaccount) you can act as that account on your private fork. You can then request a valid quote for that account from Ethereum mainnet 0x API and submit the transaction on your private fork. Keep in mind that you may need to set allowances if you are trading with other tokens than Ethereum.

#### Example test swapping 1 ETH for DAI using an Ethereum mainnet 0x API quote

```typescript
import { expect } from "chai";
import { ethers, network } from "hardhat";
// node-fetch version 2 needs to be added to your project
import fetch from "node-fetch";

const ONE_ETHER_BASE_UNITS = "1000000000000000000"; // 1 ETH
const MINIMAL_ERC20_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
];

describe("0x API integration", function () {
  it("it should be able to use a 0x API mainnet quote", async function () {
    // Quote parameters
    const sellToken = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"; // ETH
    const buyToken = "0x6b175474e89094c44da98b954eedeac495271d0f"; // DAI
    const sellAmount = ONE_ETHER_BASE_UNITS;
    const takerAddress = "0xab5801a7d398351b8be11c439e05c5b3259aec9b"; // An account with sufficient balance on mainnet

    const quoteResponse = await fetch(
      `https://api.0x.org/swap/v1/quote?buyToken=${buyToken}&sellAmount=${sellAmount}&sellToken=${sellToken}&takerAddress=${takerAddress}`
    );
    // Check for error from 0x API
    if (quoteResponse.status !== 200) {
      const body = await quoteResponse.text();
      throw new Error(body);
    }

    const quote = await quoteResponse.json();

    // Impersonate the taker account so that we can submit the quote transaction
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [takerAddress],
    });

    // Get a signer for the account we are impersonating
    const signer = await ethers.getSigner(takerAddress);
    const dai = new ethers.Contract(buyToken, MINIMAL_ERC20_ABI, signer);

    // Get pre-swap balances for comparison
    const etherBalanceBefore = await signer.getBalance();
    const daiBalalanceBefore = await dai.balanceOf(takerAddress);

    // Send the transaction
    const txResponse = await signer.sendTransaction({
      from: quote.from,
      to: quote.to,
      data: quote.data,
      value: ethers.BigNumber.from(quote.value || 0),
      gasPrice: ethers.BigNumber.from(quote.gasPrice),
      gasLimit: ethers.BigNumber.from(quote.gas),
    });
    // Wait for transaction to confirm
    const txReceipt = await txResponse.wait();

    // Verify that the transaction was successful
    expect(txReceipt.status).to.equal(1, "successful swap transaction");

    // Get post-swap balances
    const etherBalanceAfter = await signer.getBalance();
    const daiBalanceAfter = await dai.balanceOf(takerAddress);

    console.log(
      `ETH: ${etherBalanceBefore.toString()} -> ${etherBalanceAfter.toString()}`
    );
    console.log(
      `DAI: ${daiBalalanceBefore.toString()} -> ${daiBalanceAfter.toString()}`
    );
  });
});
```

### Hardhat Example Project

For more detailed information please refer to our [mainnet fork example project](https://github.com/0xProject/0x-api-forked-testnet-example)
