// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

contract GoldenGamesMemory is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(string => uint8) existingsURIs;

    mapping(uint256 => uint[]) tokenURIS;

    constructor() ERC721("GoldenGamesMemory", "GGM") {
        _tokenIdCounter.increment();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _tokenIdCounter.increment();

    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingsURIs[uri] == 1;
    }

    function getTokenURIS(uint256 itemId) public view returns (uint[] memory){
        return tokenURIS[itemId];
    }

    function payToMint()
        public
        payable
        returns (uint256)
    {
        require(msg.value >= 0.05 ether, "Need to pay up ! ");

        address recipient = msg.sender;
        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(recipient, newItemId);
        uint[] memory uristoken = new uint[](14);
        uint256 index = 0;
        string memory metadataURI = '[';
        for(uint i = (newItemId - 1) * 14 + 1;i <= ((newItemId - 1) * 14) + 14;i++){
            console.log(i);
            uristoken[index] = i;
            string memory istring = Strings.toString(i);
            metadataURI = string(abi.encodePacked(metadataURI, istring));
            if(i < ((newItemId - 1) * 14) + 14){
                metadataURI = string(abi.encodePacked(metadataURI, ","));
            } else{
                metadataURI = string(abi.encodePacked(metadataURI, "]"));
            }
            index++;
        }
        tokenURIS[newItemId]  = uristoken;


        require(existingsURIs[metadataURI] != 1, "NFT already minted");
        existingsURIs[metadataURI] = 1;
        _setTokenURI(newItemId, metadataURI);
              

        return newItemId;
    }

    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

  
}
