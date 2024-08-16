'use client'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useState } from "react"

import * as web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Movie } from "@/app/movie"


const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

export default function Form(){

    const { toast } = useToast()
    const connection = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);


    const handelSubmit = async(event: any)=>{
        event.preventDefault();
        const movie = new Movie(title, rating, review);
        handelTransaction(movie);        
    }

    const handelTransaction = async(movie: Movie)=>{

        if(!publicKey){
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
            return;
        }

        const buffer = movie.serialize();
        const transaction = new web3.Transaction()
        
        const [pda] = await web3.PublicKey.findProgramAddress(
            [publicKey.toBuffer(), new TextEncoder().encode(movie.title)],
            new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        )

        const instruction = new web3.TransactionInstruction({
            keys: [
                {
                    // Your account will pay the fees, so it's writing to the network
                    pubkey: publicKey,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    // The PDA will store the movie review 
                    pubkey: pda,
                    isSigner: false,
                    isWritable: true
                },
                {
                    // The system program will be used for creating the PDA
                    pubkey: web3.SystemProgram.programId,
                    isSigner: false,
                    isWritable: false
                }
            ],
            data: buffer,
            programId: new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        })

        transaction.add(instruction);
        try {
            let txid = await sendTransaction(transaction, connection.connection)
            console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
            toast({
                title: "please connect to wallet",
                description: <a href={`https://explorer.solana.com/tx/${txid}?cluster=devnet`}>go to explorer</a>,
            })
            return;
        } catch (e) {
            alert(JSON.stringify(e))
        }
    }

    return <form className="flex flex-col items-center justify-center gap-3" onSubmit={handelSubmit}>
        <Input placeholder="movie title" className="w-1/2" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <Textarea placeholder="about movie" className="w-1/2" value={review} onChange={(e)=>setReview(e.target.value)}/>
        <Input type="number" className="w-1/2" value={rating} onChange={(e)=>setRating(Number(e.target.value))}/>
        <Button type="submit" className="hover:bg-white hover:text-black border rounded-lg w-1/2">submit review</Button>
    </form>
}