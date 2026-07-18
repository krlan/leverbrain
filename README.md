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
       ┌──────────────┐
       │   Developer  │
       └──────────────┘
              │
              ▼ (Publish / Share via CLI)
       ┌──────────────┐         ┌──────────────┐
       │  Leverbrain  │ <─────> │  Capabilities│
       │  Registry    │         │  Storage     │ (Convex backend)
       └──────────────┘         └──────────────┘
              │
              ▼ (Local Sync)
       ┌──────────────┐
       │ Local Agent  │ ──> [Ingests SKILL.md & runs local shims]
       └──────────────┘
```

1. **Sovereign Blueprints (`SKILL.md`)**: Skills are defined in standard markdown files with structured YAML frontmatter. These define execution rules, taglines, categories, and constraints.
2. **Modular Registry**: The system uses a modular backend to serve verified TypeScript modules and markdown files directly to local agent runtimes. The default implementation runs on Convex.
3. **Pluggable Licensing**: Builders can monetize or restrict access to their strategies. The default engine settles licensing receipts in USDC on the Solana mainnet.

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

## Authentication & Verification

Protected actions require signature authentication. The default client uses Solana wallets to verify ownership and sign payloads, attaching verification headers to the request:

```text
X-Wallet-Address: <wallet address>
X-Wallet-Signature: <cryptographic signature>
X-Wallet-Message: leverbrain-auth-<timestamp>
```

The registry verifies the signature before serving the code bundle. This layer is pluggable and adapts to other identity providers.

---

