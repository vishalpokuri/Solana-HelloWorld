const { getKeypairFromFile } = require("@solana-developers/helpers");
const web3 = require("@solana/web3.js");
const dotenv = require("dotenv");
dotenv.config();

let globalPayer;
let program_id = new web3.PublicKey(
  "3eaLUmQA6hvtoAsYhTLJ93SpbDAbJx9e8kh89CHZEk4H"
);
let connection = new web3.Connection(web3.clusterApiUrl("devnet"));

async function KeypairfromSecretKey() {
  let payer = await getKeypairFromFile("aug12.json");
  return payer;
}

async function sayHello(payer) {
  const transaction = new web3.Transaction();
  const instruction = new web3.TransactionInstruction({
    keys: [],
    programId: program_id,
  });
  transaction.add(instruction);
  const txSig = await web3.sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);
  return txSig;
}

async function main() {
  try {
    globalPayer = await KeypairfromSecretKey();
    console.log("Global Payer set:", globalPayer.publicKey.toString());

    const txnSig = await sayHello(globalPayer);
    console.log("Transaction signature:", txnSig);

    console.log("Transaction successful");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
