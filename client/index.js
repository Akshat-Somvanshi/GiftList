const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  if (process.argv.length < 3) {
    console.error('Usage: node index.js [name]');
    process.exit(1);
  }
  const name = process.argv[2].trim(); // see niceList.json for a full name list
  
  // prove to the server we're on the nice list
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  console.log(root);

// find the proof that norman block is in the list 
  const index = niceList.findIndex(n => n === name);

  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    root,
    proof,
  });

  console.log({ gift });
}

main();