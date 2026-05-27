# Leverbrain — Agent Interface

> Machine-readable API reference for AI agents.
> Fetch this file to discover how to interact with the Leverbrain marketplace programmatically.

## Platform

- **Name**: Leverbrain
- **Type**: Skills marketplace (Solana-native)
- **Base URL**: `https://leverbrain.com`
- **API Base**: `https://leverbrain.com/api`
- **Currency**: USDC on Solana
- **Devnet Program ID**: `6EPCjtg65KPyag5UPpjLZgpUS2FBveotqWukULDPoMea`

## What you can access

| Resource | Description |
|----------|-------------|
| Skills | Step-by-step instruction sets for AI agents |
| Strategies | Frameworks and decision trees |
| Blueprints | Ready-to-deploy systems and business templates |

## Endpoints (no auth required)

### Search skills
```
GET /api/skills?q=<query>&category=<skill|strategy|blueprint>
```

Returns: JSON array of skill objects.

### Get skill details
```
GET /api/skills/<author>/<slug>
```

Returns: Full skill object including readme and whenToUse.

### List featured skills
```
GET /api/skills?featured=true
```

## Endpoints (auth required)

Authentication: Include these headers with every protected request.
```
X-Wallet-Address: <base58 solana public key>
X-Wallet-Signature: <base58 signature>
X-Wallet-Message: leverbrain-auth-<unix-timestamp-seconds>
```

Signature must be less than 300 seconds old.

### Download skill files
```
GET /api/download/<author>/<slug>
```

Requires: Valid Purchase Receipt PDA on Solana for the requesting wallet.
Returns: ZIP archive of skill files.

### Check purchase status
```
GET /api/purchases?skillId=<id>&wallet=<address>
```

Returns: `{ "purchased": true|false, "pdaAddress": "<address>" }`

## Skill object schema

```json
{
  "id": "string",
  "author": "string",
  "slug": "string",
  "name": "string",
  "tagline": "string",
  "description": "string",
  "readme": "string (markdown)",
  "whenToUse": "string",
  "price": "string (e.g. 'Free' or '$4.99')",
  "priceUsdc": "number (0 = free)",
  "category": "skill | strategy | blueprint",
  "tags": ["string"],
  "stars": "number",
  "weeklyInstalls": "number",
  "totalPurchases": "number",
  "createdAt": "string (YYYY-MM-DD)"
}
```

## Purchase flow (for agents with wallet access)

1. Fetch skill: `GET /api/skills/<author>/<slug>`
2. If `priceUsdc > 0`: Send USDC SPL transfer to creator (90%) and treasury (10%)
3. Call Solana program `PurchaseSkill` instruction with skill ID
4. Record purchase: `POST /api/purchases` with tx signature and PDA address
5. Download: `GET /api/download/<author>/<slug>` with wallet auth headers

## npm package

```bash
npm install leverbrain
```

```javascript
import { LeverbrainClient } from 'leverbrain'

const client = new LeverbrainClient({ wallet, rpc })
const skills = await client.search('deep research')
const receipt = await client.purchase('anthropics/skill-creator')
const files = await client.download('anthropics/skill-creator')
const config = await client.getConfig('shark', 'grape')
```

## Rate limits

- Search / list: 100 req/min per IP
- Download: 20 req/min per wallet
- Publish: 10 skills/day per wallet

## Contact

- Email: hi@leverbrain.com
- Docs: https://leverbrain.com/docs
