## interact with system programs in solana (ping counter) 
we make a transaction
we make an instruction
we add the instruction to the transaction
we send the transaction to the network!

## txn hashe
1. https://explorer.solana.com/tx/4bL5YtS1TunqHNigCSaP6muedXv3aCZCjeWoJmsymQRAbXok96T3HgdyAwPV82UW1x4CpspQ8a7yDHzGDVkgzgwT?cluster=devnet
2. https://explorer.solana.com/tx/2AZdKTtDiqFkbnx1nGYGWauXoJPTW894wSNTervharHymjwXLeDTDdxUCauP3QYA3h6qndFJTActfGxv3VJeurze?cluster=devnet

### keys value - 
it's an array of account metadata for each account that this instruction will read from or write to.
By telling the network which accounts we need to interact with and if we're writing to them, the Solana runtime knows which transactions it can run in parallel. This is part of why Solana is so fast!