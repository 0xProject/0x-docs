---
sidebar_label: Rate limits
sidebar_position: 1
description: Rate limits
---

# Rate limits

:::info
Want higher rate limits? Check out our [available options](https://0x.org/pricing)
:::

## Why do we have rate limits?

Rate limiting is used by the API to prevent abuse and ensure a reliable experience for all consumers.

## What are the rate limits for the 0x APIs?

The current limit for the Free Tier of our APIs is approximately 10 Requests Per Second (RPS). If you need higher rate limits, contact us on our [pricing page](https://0x.org/pricing) to learn about our custom plans.

## How are rates calculated?

The following is shared to help your team to maximize your app setup. The example below uses the 10 RPS Free Tier limit; however, the same logic applies to all tiers.

- The 10 RPS is 10 calls per chain (aka per [endpoint](/introduction/0x-cheat-sheet#swap-api-endpoints))
- The 10 RPS is per fixed 1 second window; in other words, the API has fixed 1 second windows and will allow 10 calls per chain any where within that 1 second window
- You can view your current usage and limits on the [0x API Dashboard](https://dashboard.0x.org/login).
