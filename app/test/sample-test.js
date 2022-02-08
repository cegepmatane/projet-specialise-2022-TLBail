const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GoldenGames", function () {
  it("should mint new nft and transfer an Nft to someone", async function () {
    const GoldenGames = await ethers.getContractFactory("GoldenGames");
    const goldenGames = await GoldenGames.deploy();
    await goldenGames.deployed();

    const recipient = '0x2546bcd3c84621e976d8185a91a922ae77ecec30';
    const metadataURI = 'cid/test.png';

    let balance = await goldenGames.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await goldenGames.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });

    await newlyMintedToken.wait();

    balance = await goldenGames.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await goldenGames.isContentOwned(metadataURI)).to.equal(true);


  });
});
