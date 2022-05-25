import NFT from "./artifacts/contracts/NFT.sol/NFT.json";
import NFTstake from "./artifacts/contracts/NFTstake.sol/NFTstake.json";
import NFTstakecoin from "./artifacts/contracts/NFTstakecoin.sol/NFTstakecoin.json";

import { ethers } from "ethers";
import React, { useState } from "react";
import "./App.css";
import Navbar from "../src/Components/Navbar";

function App() {
  let [qty, setqty] = useState(1);
  let [tokenId, settokenId] = useState(1);
  let [tokenId1, settokenId1] = useState(1);
 


  let NFTaddress = "0x166f6BA9EB8CD1b604eB291fc43e9AFf16358042";
  let NFTstakeaddress = "0xB4ccDCeeE9aD0B2224AE692a3E27eFBAA115B2A4";
  let NFTstakecoinaddress = "0xEDbB8470172D0cB9985d5a0DBE5ccE4186B064e3";
  let account = null;

  ////////////////////////////////

  async function mint() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let accounts = await provider.send("eth_requestAccounts", []);
      let account = accounts[0];
      let signer = provider.getSigner();
      let contract = new ethers.Contract(NFTaddress, NFT.abi, signer);
      let txn = await contract.mint(account, qty);
      await txn.wait();
    }
  }

  async function stake() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let contract = new ethers.Contract(NFTstakeaddress, NFTstake.abi, signer);
      let contract1 = new ethers.Contract(NFTaddress, NFT.abi, signer);
      let contract2 = new ethers.Contract(NFTstakecoinaddress, NFTstakecoin.abi, signer);
     // let txn2 = await contract2.addController(NFTstakeaddress);
      //let txn1 = await contract1.approve(NFTstakeaddress, [Number(tokenId)]);
      let txn = await contract.stake([Number(tokenId)]);
    }
  }

  async function unstake() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let contract = new ethers.Contract(NFTstakeaddress, NFTstake.abi, signer);
      let txn = await contract.unstake([Number(tokenId)]);
    }
  }

  async function claim() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let contract = new ethers.Contract(NFTstakeaddress, NFTstake.abi, signer);
      let txn = await contract.claim([Number(tokenId1)]);
    }
  }

  return (
    <>
      <Navbar />
      <div className="app">
        <div className="minter">
          <h3>Mint Punk</h3>
          <h4>
            Account:<span id="acc"></span>
          </h4>
          <input
            type="text"
            placeholder="enter the qty"
            value={qty}
            onChange={(e) => {
              setqty(e.target.value);
            }}
          />
          <br />
          <span>(Max 1 NFT per transaction)</span>
          <br />
          <br />
          <button onClick={mint}>Mint</button>
          <br />
        </div>
        <div className="staker">
          <h3>Stake/Unstake Punk</h3>
          <br />
          <input
            type="text"
            placeholder="enter the qty"
            value={[tokenId]}
            onChange={(e) => {
              settokenId(e.target.value);
            }}
          />
          <br />
          <span>(Enter NFT token-ID)</span>
          <br />
          <br />
          <button onClick={stake}>Stake</button>
          <button onClick={unstake}>Unstake</button>
        </div>
        <div className="claimer">
        <h3>Claim Reward Token</h3>
          <br />
          <input
            type="text"
            placeholder="enter the qty"
            value={[tokenId1]}
            onChange={(e) => {
              settokenId1(e.target.value);
            }}
          />
          <br />
          <span>(Enter NFT token-ID)</span>
          <br />
          <br />
          <button onClick={claim}>Claim</button>
        </div>
        
      </div>
    </>
  );
}

export default App;
