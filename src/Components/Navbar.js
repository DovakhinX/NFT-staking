import React from "react";
import { ethers } from "ethers";
import "./Navbar.css";
function Navbar() {


  async function connect() {
    if (window.ethereum) {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let accounts = await provider.send("eth_requestAccounts", []);
      let account = accounts[0];
      document.getElementById("acc").textContent = account;
    }
  }


 
  
  return (
    <div className="navbar">
      <h2>Punked Collection</h2>
      <button onClick={connect}>Connect</button>
    </div>
  );
}
export default Navbar;
