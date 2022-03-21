import { UserContext } from "./UserContext";
import Nft from './Nft';

import { ethers } from 'ethers';
import GoldenGamesMemory from '../artifacts/contracts/GoldenGamesMemory.sol/GoldenGamesMemory.json';
const contractMemoryAdress = "0xDB12c2E686e13bD8fCFCCd7aEAFB44cf8A8a495a";

class BlockChainMemoryImpl {

    constructor() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.contract = new ethers.Contract(contractMemoryAdress, GoldenGamesMemory.abi, this.signer);
        this.contractAdress = contractMemoryAdress;
    }

    async getCount() {
        let count = parseInt(await this.contract.count());
        return count;
    }

    async getSpecifiedNfts(pageNumber) {
        let array = Array();
        array.push(new Nft(1));
        console.log(array);
        return array;

    }

    async onlyMyNft(nfts) {
        if (!UserContext.signerAddress) {
            await UserContext.getSignerAdress();
        }
        let array = Array();
        for (const nft of nfts) {
            if (await this.ismyNft(nft)) {
                array.push(nft);
            }
        }
        console.log(array);
        return array;
    }

    async searchAdress(nfts, searchAdress) {
        let array = Array();
        for (const nft of nfts) {
            let owner = await nft.getOwner(UserContext.contract);
            if (owner == searchAdress) {
                console.log(owner + " | " + searchAdress);
                array.push(nft);
            }
        }
        return array;
    }


    searchId(nfts, tokenId) {
        let array = Array();
        nfts.forEach(nft => {
            if (nft.tokenId == tokenId) {
                console.log(nft.tokenId + " | " + tokenId);
                array.push(nft);
            }
        });
        return array;
    }

    async ismyNft(nft) {
        let owner = await nft.getOwner(UserContext.contract).catch(

        );
        if (owner) {
            return owner == UserContext.signerAddress;
        } else {
            return null;
        }
    }

    async getOwner(nft) {
        var addr;
        const getAddr = async () => {
            var noOwner = false;
            addr = await this.contract.ownerOf(nft.tokenId).catch((error) => {
                if (error.data.code == 3) {
                    noOwner = true;
                }
            });
            if (noOwner) return null;
            if (!addr) {
                await new Promise(r => setTimeout(r, Math.random() * 1000));
                await getAddr();
            }
        }
        await getAddr();
        return addr;
    }

}

export const BlockChainMemory = new BlockChainMemoryImpl();
