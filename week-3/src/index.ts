import * as Web3 from '@solana/web3.js';
import * as fs from 'fs';
import dotenv from 'dotenv';
import { airdrop } from './airdrop';
dotenv.config();

// executable code and stateful data are stored separately on Solana!
// ping program address
const PROGRAM_ID = new Web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")

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

export const getbalance = async(connection: Web3.Connection, address: string)=>{
  const balance = await connection.getBalance(new Web3.PublicKey(address));
  console.log('amount in SOL: ', balance / Web3.LAMPORTS_PER_SOL);
  return balance / Web3.LAMPORTS_PER_SOL;
}

async function pingProgram(connection: Web3.Connection, payer: Web3.Keypair) {
  const transaction = new Web3.Transaction()
  const instruction = new Web3.TransactionInstruction({
    // Instructions need 3 things 
    // 1. The public keys of all the accounts the instruction will read/write
    keys: [{
        pubkey: PROGRAM_DATA_PUBLIC_KEY,
        isSigner: false,
        isWritable: true
      }
    ],
    // 2. The ID of the program this instruction will be sent to
    programId: PROGRAM_ID
    // 3. Data - in this case, there's none!
  })

  transaction.add(instruction)
  const transactionSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [payer])

  console.log(
    `Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
    )
}


async function main() {
  let connection = new Web3.Connection(Web3.clusterApiUrl("devnet"), "confirmed");
  const signer = await initilizeKeyPair();
  console.log("Public key:", signer.publicKey.toBase58());
  
  await getbalance(connection, signer.publicKey.toBase58());
  await airdrop(connection, signer.publicKey.toBase58());
  await getbalance(connection, signer.publicKey.toBase58());

  await pingProgram(connection, signer);
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