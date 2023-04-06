---
sidebar_label: GET /tx-relay/v1/swap/submit
sidebar_position: 3
description: Learn how to use GET /tx-relay/v1/swap/submit
---

# GET /tx-relay/v1/swap/submit

If your user accepts the quote and wants to trade, you do a `POST` to `/tx-relay/v1/swap/submit`.

### Gasless Approvals

If a token supports gasless approvals, a meta-transaction may be submitted along with an approval object. You will be able to tell if the sell token is supported by gasless approvals by checking the response of `/quote` and looking for

```tsx
const { approval } = response;
approval.isRequired // whether an approval is required for the trade
approval.isGaslessAvailable // whether gasless approval is available for the sell token
```

To take advantage of gasless approvals, you must also have your user sign the `approval.eip712`

object returned at the time of the `/quote`. You can pass the `approval.eip712` object to `eth_signTypedData_v4` (see [MetaMask docs](https://docs.metamask.io/guide/signing-data.html#sign-typed-data-v4)) or function of your choice as the “params” .

Keep in mind that the `domain` field of this object must follow a strict ordering as specified in EIP-712:

* `name` , `version`, `chainId`, `verifyingContract`, `salt`
  * Contracts may not utilize all of these fields (i.e. one or more may be missing), but if they are present, they must be in this order
* Any other field must follow in alphabetical order

The `approval.eip712` object will present the correct ordering, but make sure that this ordering is preserved when obtaining the signature.

If you choose to compute the approval hash from `approval.eip712`, it should match `approval.hash` field.

### Meta-transaction Liquidity

Similar to gasless approval, to submit an meta-transaction trade, you must have your user sign `trade.eip712` object returned at the time of the `/quote`. All the instructions & caveats are the same as previous section.

#### **Example Request**

```bash
curl -X POST '<https://api.0x.org/tx-relay/v1/swap/submit>' --header '0x-api-key: <API_KEY>' --header '0x-chain-id: 137' --data '{
 "trade": {
   "type": "metatransaction_v2", // this is trade.type from the /quote endpoint
   "eip712": { /* this is trade.eip712 from the /quote endpoint */ },
   "signature": {
     "v": 27,
     "r": "0xeaac9ddbbf9b251a384eb4a545a2800a6d7aca4ceb5e5a3154ddd0d2923533d2",
     "s": "0x601deadfd33bd8b0ad35468613eabcac0a250a7a32035e261a13e2dcbc462e49",
     "signatureType": 2
    }
  },
 "approval":{
     "type": "permit", // this is approval.type from the /quote endpoint
     "eip712": {/* this is approval.eip712 from the /quote endpoint */},
     "signature": {
       "v": 28,
       "r": "0x55c26901285d5cb4d9d1ebb2828122fd6c334b343901944d34a810b3d2d79773",
       "s": "0x20854d829e3118c3f780228ca83fac6154060328a90d2a21267c9f7d1ae9e53b",
       "signatureType": 2
    }
  }
}'
```

#### **Example Response**

```json
{
  "type": "metatransaction_v2",
  "tradeHash": "0xde5a11983edd012047dd3107532f007a73ae488bfb354f35b8a40580e2a775a1",
}
```

More information on signing 0x orders is available [here](https://docs.0x.org/market-makers/guides/signing-0x-orders).
