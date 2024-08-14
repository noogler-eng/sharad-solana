import * as Web3 from '@solana/web3.js';
import { getbalance } from '.';

export const airdrop = async(connection: Web3.Connection, address: string)=>{
    if (await getbalance(connection, address) <= 1 ){
        const signature = await connection.requestAirdrop(new Web3.PublicKey(address), 2 * Web3.LAMPORTS_PER_SOL);
        const latestBlockhash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
        });
    }
}