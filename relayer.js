const { ethers } = require("ethers");
require("dotenv").config();

// Initialize provider connections for source and destination chains
const sourceProvider = new ethers.JsonRpcProvider(process.env.SOURCE_L2_RPC);
const destProvider = new ethers.JsonRpcProvider(process.env.DEST_L2_RPC);
const wallet = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY, destProvider);

async function relayStateProof(targetContract, storageSlot, verifierAddress) {
    console.log(`[Relayer] Fetching proof for contract ${targetContract} at slot ${storageSlot}...`);

    try {
        // Request the storage proof from the source rollup node via eth_getProof
        const rawProof = await sourceProvider.send("eth_getProof", [
            targetContract,
            [storageSlot],
            "latest"
        ]);

        console.log("[Relayer] Proof successfully generated from source L2.");

        // Format proof components for the StateVerifier contract
        const formattedProof = rawProof.storageProof[0].proof.map(p => ethers.getBytes(p));
        const value = rawProof.storageProof[0].value;

        console.log(`[Relayer] Relaying proof to StateVerifier at: ${verifierAddress}`);
        // Connect to verifier contract and submit transaction to finalize the cross-chain state read
        
    } catch (error) {
        console.error("[Relayer Error] Failed to generate or relay state proof:", error.message);
    }
}

// Example Execution
// relayStateProof("0x1111111111111111111111111111111111111111", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x2222222222222222222222222222222222222222");
