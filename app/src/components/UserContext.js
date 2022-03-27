import { ethers } from 'ethers';


import GoldenGames from '../artifacts/contracts/GoldenGames.sol/GoldenGames.json';
import GoldenGamesMemory from '../artifacts/contracts/GoldenGamesMemory.sol/GoldenGamesMemory.json';
import GoldenGamesPool from '../artifacts/contracts/GoldenGamesPool.sol/GoldenGamesPool.json';

const contractAdress = "0xD3b28A7Ef328c1fA33d3aE39bF0A2392108D8573";
const contractMemoryAdress = "0xDB12c2E686e13bD8fCFCCd7aEAFB44cf8A8a495a";
const contractPoolAdress = "0xc00F3Ed6b72491300AA175d24B4678B092A72c6B";

const contentId = 'QmV6aMKL6uWXz266sLFPFDqWgRsFGnEedrmgyxN8Yv1eYo';


class User {

    connectUser() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.contract = new ethers.Contract(contractAdress, GoldenGames.abi, this.signer);
        this.contentId = contentId;
        this.contractAdress = contractAdress;
    }

    async getCount() {
        if (!this.contract) {
            this.count = 0;
            return;
        }
        this.count = parseInt(await this.contract.count());
        this.metaDataURI = `${contentId}/${this.count}.json`;
    }

    async getSignerAdress() {
        this.signerAddress = await this.signer.getAddress();
        return this.signerAddress;
    }

    setSerie(serie) {
        this.serie = serie;
        if (serie == "classic") {
            this.contract = new ethers.Contract(contractAdress, GoldenGames.abi, this.signer);
            this.contentId = contentId;
            this.contractAdress = contractAdress;
        } else if (serie == "memory") {
            console.log(serie);
            this.contractAdress = contractMemoryAdress;
            this.contract = new ethers.Contract(contractMemoryAdress, GoldenGamesMemory.abi, this.signer);
        } else if (serie == "pool") {
            this.contractAdress = contractPoolAdress;
            this.contract = new ethers.Contract(contractPoolAdress, GoldenGamesPool.abi, this.signer);
        }
    }

}


export const UserContext = new User();