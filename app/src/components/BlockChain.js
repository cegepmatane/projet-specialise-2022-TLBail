import { UserContext } from "./UserContext";
import Nft from './Nft';
import GoldenGames from '../artifacts/contracts/GoldenGames.sol/GoldenGames.json';
import { ethers } from 'ethers';

const contractAdress = "0xD3b28A7Ef328c1fA33d3aE39bF0A2392108D8573";

const contentId = 'QmV6aMKL6uWXz266sLFPFDqWgRsFGnEedrmgyxN8Yv1eYo';


class BlockChaine {


    constructor() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.contract = new ethers.Contract(contractAdress, GoldenGames.abi, this.signer);
        this.contentId = contentId;
        this.contractAdress = contractAdress;
    }


    async getCount() {
        const count = parseInt(await UserContext.contract.count());
        return count;
    }

    async getSpecifiedNfts(pageNumber) {
        let array = Array();
        for (let index = (pageNumber - 1) * 10 + 1; index <= pageNumber * 10; index++) {
            let nft = new Nft(index);
            array.push(nft);
        }
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
            let owner = await nft.getOwner(this.contract);
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
        let owner = await nft.getOwner(this.contract).catch(

        );
        if (owner) {
            let userAdress = await UserContext.getSignerAdress();
            return owner == userAdress;
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

export const BlockChain = new BlockChaine();
