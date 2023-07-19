/* eslint-disable no-undef */

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const recipe = await hre.ethers.deployContract("Recipe");

    await recipe.waitForDeployment();

    const recipient = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const metadataURI = "cid/test.png";

    let balance = await recipe.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await recipe.payToMint(recipient, metadataURI, {
      value: ethers.parseEther("0.05"),
    });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await recipe.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await recipe.isContentOwned(metadataURI)).to.equal(true);
  });
});
