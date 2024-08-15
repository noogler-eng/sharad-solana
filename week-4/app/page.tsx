'use client'
import React, { useState } from "react"
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const PROGRAM_ID = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
const PROGRAM_DATA_PUBLIC_KEY = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")

export default function Home() {

  const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
  const [url, setURl] = useState('');

  const handlePing = async()=>{
    if(!connection || !publicKey){
      alert('connect with wallet!');
      return;
    }

    const transaction = new Transaction()
		const instruction = new TransactionInstruction({
			keys: [
				{
					pubkey: PROGRAM_DATA_PUBLIC_KEY,
					isSigner: false,
					isWritable: true
				},
			],
			programId: PROGRAM_ID,
		});

		transaction.add(instruction)
		sendTransaction(transaction, connection).then(sig => {
      setURl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`)
		})
  }

  return <div className="flex flex-col items-center justify-center gap-6 p-20 font-mono">
    <button className="border p-2 font-semibold rounded-lg px-12" onClick={handlePing}>ping</button>
    {url ? <a href={url} className="underline text-sm color-red-600">explorer</a> : null}
  </div>
}