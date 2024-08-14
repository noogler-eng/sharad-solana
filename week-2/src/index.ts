// Secret keys can have a couple of different formats -
// 1. Mnemonic phrase - this is the most common
// 2. A bs58 string - wallets sometimes export this
import * as solanaWeb3 from "@solana/web3.js";
import dotenv from "dotenv";
import bs58 from 'bs58'
dotenv.config();

const fetchPrivateKey = async()=>{
    const secretkeyInString = process.env.SECRET_KEY;
    // bs58 is used to encode uint8array to string and decode string to uint8array
    const keyInArray = bs58.decode(secretkeyInString || "");
    console.log("initial: ",keyInArray);    
    console.log("final: ",new Uint8Array(keyInArray));    


    const walletKeys = await solanaWeb3.Keypair.fromSecretKey(keyInArray);
    return walletKeys;
}

// All modifications to data on the Solana network happen through transactions
// All transactions interact with programs on the network - these can be system programs 
// or user built programs. Transactions tell the program what they want to do with a bunch 
// of instructions, and if they're valid, the program does the things!
const transaction = async(wallet: solanaWeb3.Keypair)=>{
    // we're interacting with the system program, there's helper functions in the web3.js library which make this super easy!
    let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
    let transaction = new solanaWeb3.Transaction();
    transaction.add(
        solanaWeb3.SystemProgram.transfer({
        fromPubkey: new solanaWeb3.PublicKey("GJka613DnHoTgf6P6p2hPvonSQ7U87ktVZtJedaF4BaA"),
        toPubkey: new solanaWeb3.PublicKey("AuPefMfxYmzaXS5Jiv9SBkHWZ9P6gFDb35Y5NcnX9Wwd"),
        // transferring 1 SOL
        lamports: 1 * solanaWeb3.LAMPORTS_PER_SOL,
    })),
    
    await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [wallet]);
}

const main = async()=>{
    const wallet = await fetchPrivateKey();
    console.log(wallet);
    await transaction(wallet);
}
main();