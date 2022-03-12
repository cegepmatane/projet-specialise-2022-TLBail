import { UserContext } from "./UserContext";
import Nft from './Nft';

class BlockChaine {

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


    searchId(nfts, tokenId) {
        let array = Array();
        nfts.forEach(nft => {
            if (nft.tokenId == tokenId) {
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

}

export const BlockChain = new BlockChaine();
