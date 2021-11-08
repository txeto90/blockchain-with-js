const qrgenerator = require ('./qrgenerator');
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, data, previousHash= ''){
        this.index = index;
        this.date = new Date();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.createHash();
        this.nonce = 0;
    }

    createHash(){
        return SHA256(this.index + this.date + this.previousHash + this.data + this.nonce).toString();
    }

    mine(difficulty){
        while(!this.hash.startsWith(difficulty)){
            console.log(this.nonce, this.hash);
            this.nonce++;
            this.hash = this.createHash();
        }
    }

}


class BlockChain{
    constructor(genesis, difficulty = '00'){
        this.chain = [this.createFirstBlock(genesis)];
        this.difficulty = difficulty
    }

    createFirstBlock(genesis){
        return new Block(0, genesis);
    }

    getLastBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(data){
        let prevBlock = this.getLastBlock();
        let block = new Block(prevBlock.index + 1, data, prevBlock.hash);
        block.mine(this.difficulty);
        console.log('Minado!!' + block.hash +  'con nonce' + block.nonce);
        this.chain.push(block);
    }

    isValid(){
        for (let i = 0; i < this.chain.length; i++) {
            let prevBlock = this.chain[i-1];
            let currentBlock = this.chain[i];
        
            if(currentBlock.previousHash != prevBlock.hash){return false; }
            if(currentBlock.createHash() != currentBlock.hash){return false;}
            return true;
        }
    }

}

console.log('comença')
let origenAlimento = new BlockChain('Spain', '00');
origenAlimento.addBlock('France');
origenAlimento.addBlock('Italy');
console.log(JSON.stringify(origenAlimento, null, 2))

qrgenerator.createQr(JSON.stringify(origenAlimento, null, 2))