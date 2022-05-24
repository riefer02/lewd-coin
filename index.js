import Block from './lib/block.js';
import BlockChain  from './lib/blockchain.js';

const lewdCoin = new BlockChain();

lewdCoin.addBlock(
  new Block(Date.now().toString(), {
    from: 'The Lewd Dudes',
    to: 'The Lewd Dudes',
    amount: 420,
  })
);

console.log(lewdCoin.chain);
