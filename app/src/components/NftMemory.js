import { BlockChainMemory } from "./BlockChainMemory";


class NftMemory {


    constructor(tokenId) {
        this.tokenId = tokenId;
    }



    async getData() {
        let data = await BlockChainMemory.contract.getTokenURIS(this.tokenId).catch(
            (error) => {
                console.log(error.message);
            }
        );
        return data;
    }

    async getOwner(contract) {
        if (this.addr) return this.addr;
        const getAddr = async () => {
            var noOwner = false;
            this.addr = await contract.ownerOf(this.tokenId).catch((error) => {
                if (error.data.code == 3) {
                    noOwner = true;
                }
            });
            if (noOwner) return null;
            if (!this.addr) {
                await new Promise(r => setTimeout(r, Math.random() * 1000));
                await getAddr();
            }
        }
        await getAddr();
        return this.addr;
    }

}

export default NftMemory;