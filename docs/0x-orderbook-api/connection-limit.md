---
sidebar_label: Connection Limit
sidebar_position: 4
description: Connection Limit
---

# Connection Limit

Connections are also rate limited in order to prevent abuse of the API. If you are receiving a `503: Server Error` you may have too many open connections.

The limit of open connections at any given time is not fixed, but generally it is \~20 concurrent open connections per IP address. Since this limit can vary from day to day depending on our traffic, we recommend opening a maximum of 10-15 connections per IP address.&#x20;

The 0x API uses persistent connections via http keep-alive.


