import * as solanaWeb3 from "@solana/web3.js";

// generate keypair 
const generateKeyPair = ()=>{
    const keypair = solanaWeb3.Keypair.generate();
    // We're setting the address with key.toBase58. This is the encoding of Solana addresses as strings.
    const publicKey = keypair.publicKey.toBase58();    // toBase58
    const privateKey = keypair.secretKey.toString();   // uint8array to string
    return {publicKey, privateKey};
}


// getting balance of devnet chain of any account using solanaweb3js
const getBalanceUsingJSONRPC = async(address: string)=>{
    const connection = await new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));

    console.log("address: ",address);
    console.log("new public key: ",new solanaWeb3.PublicKey(address));

    const balance = await connection.getBalance(new solanaWeb3.PublicKey(address));
    return balance / solanaWeb3.LAMPORTS_PER_SOL;
}

const getAccountInfo = async(address: string)=>{
    const connection = await new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
    const accountInfo = await connection.getAccountInfo(new solanaWeb3.PublicKey(address));
    return accountInfo;
}

const keys = generateKeyPair();
console.log('public key: ', generateKeyPair().publicKey);
console.log('private key: ', generateKeyPair().privateKey);

const main = async()=>{
    const balance = await getBalanceUsingJSONRPC("GJka613DnHoTgf6P6p2hPvonSQ7U87ktVZtJedaF4BaA");
    console.log("balance: SOL ",balance);
    
    const accInfo = await getAccountInfo("GJka613DnHoTgf6P6p2hPvonSQ7U87ktVZtJedaF4BaA");
    console.log("account info: ", accInfo);  // this account is not executable
}

main();