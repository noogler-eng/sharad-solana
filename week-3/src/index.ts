import * as Web3 from '@solana/web3.js';
import * as fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const initilizeKeyPair = async()=>{
    if(!process.env.PRIVATE_KEY){
        console.log("generating the keypair ....");
        const keypair = await Web3.Keypair.generate();
        
        console.log('Creating .env file');
        fs.writeFileSync(".env", `PRIVATE_KEY=[${keypair.secretKey.toString()}]`);
        return keypair;
    }

    const privateKey = JSON.parse(process.env.PRIVATE_KEY);
    const secretKey = Uint8Array.from(privateKey);
    const keypair = await Web3.Keypair.fromSecretKey(secretKey);
    return keypair;
}


async function main() {
    let connection = new Web3.Connection(Web3.clusterApiUrl("devnet"), "confirmed");
    const signer = await initilizeKeyPair();
    console.log("Public key:", signer.publicKey.toBase58());
}

main()
  .then(() => {
    console.log('Finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });