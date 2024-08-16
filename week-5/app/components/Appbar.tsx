'use client'
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';


export default function Appbar(){
    return <div className='flex items-center justify-between p-4 shadow-lg shadow-indigo-500/50'>
        <div className='text-3xl font-extrabold'>
            Review System
        </div>
        <div className='flex items-center justify-between gap-3'>
            <WalletMultiButton/>
            <WalletDisconnectButton/>
        </div>
    </div>
}