import { UserContext } from "./UserContext";
import Nft from './Nft';


class BlockChaine {


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

}

export const BlockChain = new BlockChaine();
