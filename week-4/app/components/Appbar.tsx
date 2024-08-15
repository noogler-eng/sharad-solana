'use client'
import React from "react"
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Appbar(){
    return <div className="p-4 flex items-center justify-between font-mono">
        <div className="text-4xl">
            Ping-Counter
        </div>
        <div className="flex items-center gap-2">
            <WalletMultiButton/>
            <WalletDisconnectButton/>
        </div>
    </div>
}