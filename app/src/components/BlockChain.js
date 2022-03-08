import { UserContext } from "./UserContext";
import Nft from './Nft';

class BlockChaine {

    constructor() {
        this.nfts = Array();
        this.getNfts();
        this.setListener = (listener) => {
            this.listener = listener;
        }
        this.bob = "bob";

    }


    async getNfts() {
        if (!UserContext.count) {
            await UserContext.getCount();
        }
        let count = UserContext.count;
        for (let index = 1; index < count; index++) {
            let nft = new Nft(index);
            this.nfts[index] = nft;
        }
        if (this.listener) {
            this.listener(this.nfts);
        }
    }

    async onlyMyNft() {
        let array = [];
        // this.listener(array);

        if (!UserContext.signerAddress) {
            await UserContext.getSignerAdress();
        }
        for (let index = 1; index < this.nfts.length; index++) {
            const element = this.nfts[index];
            if (await this.ismyNft(element)) {
                array.push(element);
            }
        }
        this.nfts = array;
        this.listener(this.nfts);
    }

    async searchAdress(searchAdress) {
        let array = [];
        for (let index = 1; index < this.nfts.length; index++) {
            const element = this.nfts[index];
            if ((await element.getOwner(UserContext.contract))
                == searchAdress) {
                array.push(element);
            }
        }
        this.nfts = array;
        this.listener(this.nfts);
    }


    async searchId(tokenId) {
        let array = [];
        for (let index = 1; index < this.nfts.length; index++) {
            const element = this.nfts[index];
            if ((await element.tokenId)
                == tokenId) {
                array.push(element);
            }
        }
        this.nfts = array;
        console.log(this.nfts);
        this.listener(this.nfts);
    }

    async ismyNft(nft) {
        let owner = await nft.getOwner(UserContext.contract);
        return owner == UserContext.signerAddress;
    }

}

export const BlockChain = new BlockChaine();
