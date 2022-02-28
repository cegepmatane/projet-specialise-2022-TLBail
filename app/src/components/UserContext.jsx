import { ethers } from 'ethers';


import GoldenGames from '../artifacts/contracts/GoldenGames.sol/GoldenGames.json';

const contractAdress = "0xD3b28A7Ef328c1fA33d3aE39bF0A2392108D8573";


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
        this.count = parseInt(await UserContext.contract.count());
        this.metaDataURI = `${contentId}/${this.count}.json`;
    }

}


export const UserContext = new User();