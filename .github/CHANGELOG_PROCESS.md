# Changelog process

How the public API changelog at `fern/docs/changelog/` gets written, and the editorial rules behind it.

Changelogs are read by **external developers** integrating the 0x **Swap**, **Gasless**, and **Cross-Chain** APIs. They are derived from merged PRs in the private `0xProject/0x-labs` monorepo, which means most of the work is deciding what *not* to publish.

## Cadence

One entry per calendar month, named for the last day of the month covered: `fern/docs/changelog/2026-07-31.mdx`.

A cloud routine drafts each month automatically on the 1st at 14:00 UTC for the prior month and opens a **draft PR** with `jlin27` as reviewer. It runs on the 1st rather than month-end because PRs merged on the final day of the month would otherwise be missed — there are typically 20+ of them.

The routine is Claude Code cloud automation owned by `jlin27`, managed via `/schedule` or <https://claude.ai/code/routines>. Its prompt is not version-controlled; this document is the durable copy of the policy it encodes. **If you change the policy here, update the routine prompt too.**

The automation drafts; a human merges. Every run opens a draft PR precisely so the judgment calls get reviewed.

## Collecting PRs

```bash
gh pr list --repo 0xProject/0x-labs --state merged \
  --search "merged:2026-07-01..2026-07-08" \
  --limit 300 --json number,title,body,labels,mergedAt,url
```

**`gh pr list` truncates silently at `--limit`.** 0x-labs merges 300–400 PRs a month. If the result count equals the limit exactly, data was lost and nothing says so. Split the month into weekly windows, merge, and dedupe by PR number. Verify that merge dates span the full range — a result set starting mid-month is the signature of a truncated fetch.

## What to exclude

Only changes an API integrator would notice belong in the changelog.

- Solana — not covered in these changelogs yet
- Internal routing-engine work — solver internals, Plasma, Lightning, Xenon, Krypton, Argon, pool-store plumbing, sampling and gas-budget tuning
- Internal tooling — minisim, comp-analysis, zippo, dev0x-portal, hermes, service-operations, fee-wallets-ops, deployer-canary, rpc-gateway, matcha-\* apps
- CI/CD, dependency bumps, security patches with no API-visible effect
- Metrics, logging, tracing, alerting, Sentry noise filtering
- Test-only changes, integration-test repointing, pinned-block refreshes
- Pure refactors with no behavior change
- **Intents API** — `/intents/*` endpoints, intent quotes, cancellation, trade history, `INTENTS_*` error codes. Not public surface.
- **Meta-aggregation and external quote providers** — `meta-agg-solver` and third-party provider integrations (OKX, 1inch, Bitget, Enso, Bebop, Barter, Nordstern, Rialto, Oogabooga, Tokka, MoonPay, KyberSwap, and any added later). Provider-level meta-aggregation is not described in the public docs.

**Reverts:** if a PR and its revert both land in the month, treat as if neither happened. If a PR was reverted and later re-landed, report it once, dated to the re-land.

The Intents and meta-agg exclusions reflect what is internal *today*, not a permanent ban. If either appears in the public spec — an `/intents` path, or a provider field in a public schema — it has launched, and both this document and the routine prompt are stale.

## Verify before documenting

This is the rule that keeps internal surface out of public docs. Before writing about any endpoint, parameter, or response field, confirm it exists in the published spec:

- `fern/openapi.json` — Swap and Gasless
- `fern/openapi-cross-chain.json` — Cross-Chain

If it shipped in 0x-labs but has no public spec presence, it does not go in the changelog. Raise it separately — it may need docs *pages*, not a changelog line.

Never invent parameter names, bridge provider IDs, or `docs.0x.org` links. An internal identifier in a PR body (e.g. `BridgeId::OftVt`) is not necessarily the public API string. Features described as shadow-launched or flag-gated have not shipped.

To find which chain a new liquidity source belongs to, grep 0x-labs rather than inferring from the PR title — titles like "add morphex to lightning" name no chain:

```bash
grep -rn "Chain::" apps-rs/solver/src/pools/<source>.rs
```

## Sweep for stale docs

Changelog-worthy changes routinely invalidate existing pages. When a chain is removed or an endpoint retired, fix the affected pages in the same PR:

- `fern/docs/pages/introduction/supported-chains.mdx` — Swap/Gasless table, Cross-Chain matrix, Bridge Provider IDs table
- `fern/docs/pages/introduction/faq.mdx`, `core-concepts/contracts.mdx`, `core-concepts/0x-cheat-sheet.mdx` — AllowanceHolder hardfork chain lists (three copies of one list; all three drift)

Removal from one API is not removal everywhere. Confirm scope first:

```bash
grep -rn "Chain::<Name>\|EvmChain::<Name>" crates/ apps-rs/
```

No matches means fully decommissioned. Matches mean it was dropped from one API only.

## Format

Sections, in this order. Omit any section with no entries. No emoji in headers except Announcements.

`#### 📣 Announcements` · `#### New Chains` · `#### New Liquidity Sources` · `#### New Features` · `#### Bug Fixes` · `#### Breaking Changes` · `#### Documentation` · `#### Chores`

Frontmatter is exactly:

```
---
tags: []
---
```

**Liquidity sources** group by chain, chains alphabetical, one bullet each, Oxford comma, trailing period. Note a fork's or hook's parent in parentheses:

```
- **Base:** Added Aerodrome V3, Fluid, Nabla, a Clanker V2 fork (Uniswap V4), and Doppler Rehype (Uniswap V4).
```

**Features** bold the name, backtick code identifiers, name the API inline:

```
- **`slippagePpm` in Swap and Gasless API**: Sub-BPS slippage precision (0–1,000,000). Mutually exclusive with `slippageBps`.
```

**Bug fixes** are one short factual sentence with no internal implementation detail:

```
- Improve gas accuracy for Abstract.
```

Style: 1–2 sentences per entry, always. Lead with impact, not implementation. Active voice. Keep exact identifiers (token symbols, parameter names, EIP-2612, ERC-4337). No PR numbers, no engineer or team names, no Linear ticket IDs, no marketing copy. Only link `docs.0x.org` URLs you have verified.

## Publishing

The changelog directory is auto-indexed by Fern (`changelog: docs/changelog` in `fern/docs.yml`) — no nav edit needed. Do not add non-date-named files to that directory; this document lives in `.github/` for that reason.
