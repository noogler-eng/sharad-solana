When working with non-native programs or programs that aren't built into the web3 library, we need to be very specific about the instructions we're creating. Here's the type that we need to pass into the constructor to create an instruction. Check it out -

``` js
export type TransactionInstructionCtorFields = {
  keys: Array<AccountMeta>;
  programId: PublicKey;
  data?: Buffer;
};
```
In essence, an instruction contains:

An array of keys of type AccountMeta
The public key/address of the program you're calling
Optionally - a Buffer containing data to pass to the program
Starting with keys - each object in this array represents an account that will be read from or written to during a transaction's execution. This way the nodes know which accounts will be involved in the transaction, which speeds things up! This means you need to know the behavior of the program you are calling and ensure that you provide all of the necessary accounts in the array.

Each object in the keys array must include the following:

pubkey - the public key of the account
isSigner - a boolean representing whether or not the account is a signer on the transaction
isWritable - a boolean representing whether or not the account is written to during the transaction's execution
The programId field is fairly self explanatory: it’s the public key associated with the program you want to interact with. Gotta know who you want to talk to!

We’ll be ignoring the data field for now and will revisit it in the future.

Here's an example of what this would look like in action:

``` js
import web3 from "@solana/web3.js";

async function callProgram(
    connection: web3.Connection,
    payer: web3.Keypair,
    programId: web3.PublicKey,
    programDataAccount: web3.PublicKey
) {
    const instruction = new web3.TransactionInstruction({
        keys: [
            {
                pubkey: programDataAccount,
                isSigner: false,
                isWritable: true
            },
        ],
        programId        
    })

    // he main thing to note is that the first signer included in the array of signers on a transaction 
    // is always the one responsible for paying the transaction fee. What happens if you don't have enough SOL
    const sig = await web3.sendAndConfirmTransaction(
        connection,
        new web3.Transaction().add(instruction),
        [payer]
    )

    return sig;
}


const main = async()=>{

    let connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

    const txn = await callProgram(connection, [""], new web3.PublicKey(""), new web3.PublicKey(""));
    console.log(txn);

}

```