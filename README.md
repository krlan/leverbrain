# Leverbrain
**The expertise registry for the agentic era.**

```text
┌────────────────────────────────────────────────────────────────────────┐
│  $ npm install -g leverbrain                                           │
│  $ leverbrain search deep-research                                     │
│  $ leverbrain get leverbrain/leverbrain                                │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## The Prompt Wrapper Fallacy

When you watch people build AI agents today, you notice a recurring pattern. Most builders are setting up wrappers around generic prompts. An agent is instructed: *"You are a world-class copywriter. Write a viral launch campaign."* 

The model does its best, but its best is a collection of commonplaces. It has never actually launched a product. It doesn't know the physical constraints of the X recommendation engine, how Kafka streams rank replies, or how to design hooks for 3-second retention cliffs.

An agent shouldn't have to guess how to perform a task. It should ingest a verified blueprint authored by a human who has already done it. 

Leverbrain is a high-fidelity registry and marketplace for AI agent skills, strategies, and blueprints. Instead of telling your agent *what to be*, you tell it *what to load*.

---

## How it Works

The architecture is simple and local-first:

```text
       ┌──────────────┐         ┌──────────────┐
       │   Developer  │ ──────> │  Solana (L1) │ (Verified Receipts)
       └──────────────┘         └──────────────┘
              │
              ▼ (Publish / Buy via CLI)
       ┌──────────────┐         ┌──────────────┐
       │  Leverbrain  │ <─────> │   Convex DB  │ (Real-Time Registry)
       │  Marketplace │         └──────────────┘
       └──────────────┘
              │
              ▼ (Local Sync)
       ┌──────────────┐
       │ Local Agent  │ ──> [Ingests SKILL.md & runs local shims]
       └──────────────┘
```

1. **Sovereign BLUEPRINTS (`SKILL.md`)**: Skills are defined in standard markdown files with structured YAML frontmatter (defining constraints, taglines, categories, and execution rules). 
2. **On-Chain Licensing (Solana)**: Purchases are recorded as on-chain receipts (PDAs) on the Solana Mainnet. Devs monetize their execution files, and buyers have cryptographically verified ownership.
3. **Low-Latency Sync (Convex)**: The Convex database acts as the high-speed registry, serving verified TypeScript modules and markdown guides directly to local terminal agent runtimes (like Claude Code, Cursor, or custom frameworks).

---

## Developer Quickstart

Skip the web browser. Keep your hands on the keyboard.

### 1. Install CLI
Run directly without installing:
```bash
npx --yes leverbrain@latest --help
```

### 2. Search & Get Skills
Browse the registry and download a package directly into your workspace:
```bash
leverbrain search x-algo
leverbrain get santa/x-algo
```

### 3. Deploy Configuration
Load a unified agent workspace setup:
```bash
leverbrain cfg name/cfg
```

---

## CLI Command Reference

```bash
leverbrain search <query>           # Search the marketplace
leverbrain get <author/slug>        # Download a purchased skill package
leverbrain cfg <name/cfg>        # Download a saved configuration
leverbrain purchases --wallet <pk>  # List receipts for a Solana wallet
leverbrain publish ./my-skill \
  --wallet <KEYPAIR_PATH> \
  --author <HANDLE>                 # Sign & publish a new SKILL.md
```

---

## Authentication

Protected actions (downloads and publishing) require Solana signature authentication. The CLI automatically signs a short-lived message payload and attaches the following headers:

```text
X-Wallet-Address: <base58 public key>
X-Wallet-Signature: <base58 signature of message>
X-Wallet-Message: leverbrain-auth-<timestamp>
```

The Convex backend verifies the signature on-chain against ownership of the skill receipt before serving the code bundle. Everything is verified, localized, and secure.

---

