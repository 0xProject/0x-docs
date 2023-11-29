---
sidebar_label: Rate limits
sidebar_position: 3
description: Rate limits
---

# Rate limits

:::info
Want higher rate limits? Check out all our [available options](https://0x.org/pricing)
:::

## Why do we have rate limits?

Rate limiting is used by the API to prevent abuse and ensure a reliable experience for all consumers.

## What are the rate limits for the 0x APIs?

The current limit for the Free Tier of our APIs is approximately 1 Request Per Second (RPS) and 100K API calls per month globally. You can view rate limits for all tiers on the [pricing page](https://0x.org/pricing).

## How are rates calculated?

The following is shared to help your team to maximize your app setup. The example below uses the 1 RPS Free Tier limit; however, the same logic applies to all tiers.

- The 1 RPS is 1 call per chain (aka per [endpoint](introduction/0x-cheat-sheet))
- The 1 RPS is per fixed 1 second window; in other words, the API has fixed 1 second windows and will allow 1 call per chain any where within that 1 second window
- You can view your current usage and limits on the [0x API Dashboard](https://0x.org/zrx/api/dashboard).
