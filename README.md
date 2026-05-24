# Cross-Rollup State Bridge

In the fragmented multi-L2 landscape of 2026, relying on slow, third-party bridges for data verification is a major bottleneck. This repository implements a decentralized **State Bridge** that allows an application on Base to instantly verify the state of a contract on Arbitrum or Optimism by verifying Merkle-Patricia storage proofs against L2 state roots.

## Core Features
- **Native Security:** Bypasses asset-wrapping bridges by directly verifying cryptographic storage proofs.
- **Multi-Chain Sync:** Out-of-the-box configurations for Arbitrum, Optimism, Base, and Linea.
- **Gas-Optimized Proofs:** Leverages Solidity precompiles for cheap on-chain cryptographic verification.
- **Flat Layout:** Everything needed to run the off-chain relayer and the on-chain verifier is in the root directory.

## Getting Started
1. Install dependencies: `npm install`
2. Populate `.env` with reliable RPC nodes for each L2.
3. Deploy the verifier: `npx hardhat run deployBridge.js`
