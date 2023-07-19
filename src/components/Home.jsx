/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import WalletBalance from './WalletBalance';
import { Web3Provider } from '@ethersproject/providers';

import { ethers } from 'ethers';
import Recipe from '../artifacts/contracts/Recipe.sol/Recipe.json';

const contractAddress = '0xe819A451158cc50d40D7D5Eb56113A99446030c2';

const provider = new Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, Recipe.abi, signer);
// const countFunction = contract.getFunction('count');
// const isContentOwnedFunction = contract.getFunction('isContentOwned');
// const payToMintFunction = contract.getFunction('payToMint');
// const tokenURI = contract.getFunction('tokenURI');

function Home() {

  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.getCounter();
    setTotalMinted(parseInt(count)); 
  };

  return (
    <div>
      <WalletBalance />

      {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <NFTImage tokenId={i} getCount={getCount} />
          </div>
        ))}
    </div>
  );
}
function NFTImage({ tokenId, getCount }) {
  const contentId = 'QmZBpiMMZwAVzZvc9LsfB35scXLBeUrWJp8Y2wHG9s6YbJ';
  const metadataURI = `${contentId}/${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log("meta " + metadataURI);
    console.log(result)
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    console.log(connection, connection.getAddress())
    const addr = connection.getAddress();
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.parseEther('0.0001'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    <div>
      <img src={imageURI}></img>
      <h5>ID #{tokenId}</h5>
      {!isMinted ? (
        <button onClick={mintToken}>
          Mint
        </button>
      ) : (
        <button onClick={getURI}>
          Taken! Show URI
        </button>
      )}
    </div>
  );
}

export default Home;