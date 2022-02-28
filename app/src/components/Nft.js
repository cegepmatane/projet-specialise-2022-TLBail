

class Nft {


    constructor(tokenId) {
        this.tokenId = tokenId;
        this.contentId = 'QmV6aMKL6uWXz266sLFPFDqWgRsFGnEedrmgyxN8Yv1eYo';
        this.img = `https://gateway.pinata.cloud/ipfs/${this.contentId}/${tokenId}.jpg`;
    }

}

export default Nft;