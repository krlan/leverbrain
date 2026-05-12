# leverbrain

TypeScript SDK + CLI for the Leverbrain marketplace.

## Install

```bash
npm install leverbrain
```

## SDK

```ts
import { LeverbrainClient } from 'leverbrain'

const client = new LeverbrainClient({
  convexUrl: process.env.LEVERBRAIN_CONVEX_URL,
})

const skills = await client.search('research')
const listing = await client.getSkill('leverbrain', 'agency-in-a-box')
```

## CLI

```bash
npx --yes leverbrain@latest --help
leverbrain search research
leverbrain get leverbrain/agency-in-a-box
leverbrain purchases --wallet <BUYER_WALLET>
leverbrain publish ./my-skill --wallet <PUBLISHER_WALLET> --author <HANDLE>
```

Set `LEVERBRAIN_CONVEX_URL` or pass `--convex-url` to target a different deployment.
