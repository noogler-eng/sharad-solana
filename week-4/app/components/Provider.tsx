'use client'
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
require('@solana/wallet-adapter-react-ui/styles.css');



export default function Provider({children}: any){

    // useMemo() is a hook that loads stuff only if one of the dependencies changes. 
    // In our case, the value of clusterApiUrl will only change if the network that the user 
    // is connected to, changes
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(()=>[new UnsafeBurnerWalletAdapter()], []);



    return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                { children }
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
)}