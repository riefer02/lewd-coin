import Block from './block.js';

export default class BlockChain {
  constructor() {
    // Create our genesis block
    this.chain = [new Block(Date.now().toString())];
    this.difficulty = 1;
    this.blockTime = 30000;
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block) {
    // Since we are adding a new block, prevHash will be the hash of the old latest block
    block.prevHash = this.getLastBlock().hash;
    // Since now prevHash has a value, we must reset the block's hash
    block.hash = block.getHash();

    // Proof of Work, note that most modern blockchains use a way better system called proof-of-stake (or many of its upgraded variations).
    block.mine(this.difficulty);

    // Object.freeze ensures immutability in our code
    this.chain.push(Object.freeze(block));

    // the difficulty will be incremented by 1 if block time is less than the actual time the block's mined, it will be decremented otherwise
    this.difficulty +=
      Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime
        ? 1
        : -1;
  }

  isValid(blockchain = this) {
    // Iterate over the chain, we need to set i to 1 because there are nothing before the genesis block, so we start at the second block.
    for (let i = 1; i < blockchain.chain.length; i++) {
      const currentBlock = blockchain.chain[i];
      const prevBlock = blockchain.chain[i - 1];

      // Check validation
      if (
        currentBlock.hash !== currentBlock.getHash() ||
        prevBlock.hash !== currentBlock.prevHash
      ) {
        return false;
      }
    }

    return true;
  }
}
