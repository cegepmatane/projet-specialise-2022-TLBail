

class Nft {


    constructor(tokenId) {
        this.tokenId = tokenId;
        this.contentId = 'QmV6aMKL6uWXz266sLFPFDqWgRsFGnEedrmgyxN8Yv1eYo';
        this.img = `https://gateway.pinata.cloud/ipfs/${this.contentId}/${tokenId}.jpg`;
        this.metaDataURI = `https://gateway.pinata.cloud/ipfs/${this.contentId}/${tokenId}.json`;

    }


    async getData() {
        if (this.data) return data;
        let problem = false;
        var response;
        const fetchas = async () => {
            response = await fetch(this.metaDataURI
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }
            ).catch((error) => {
                console.log("error fetching data");
            });

            if (!response) {
                await new Promise(r => setTimeout(r, Math.random() * 5000));
                await fetchas();
            };
        }
        await fetchas();
        let data = await response.json();
        return data;
    }

    async getOwner(contract) {
        if (this.addr) return this.addr;
        const getAddr = async () => {
            var noOwner = false;
            this.addr = await contract.ownerOf(this.tokenId).catch((error) => {
                if (error.data.code == 3) {
                    console.log("no owner");
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

export default Nft;