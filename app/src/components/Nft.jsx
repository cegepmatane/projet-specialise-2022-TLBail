import { Card } from 'react-bootstrap'

class Nft {


    constructor(tokenId) {
        this.tokenId = tokenId;
        this.contentId = 'QmV6aMKL6uWXz266sLFPFDqWgRsFGnEedrmgyxN8Yv1eYo';
        this.img = `assets/pika/${tokenId}.jpg`;
        this.metaDataURI = `assets/pika/${tokenId}.json`;
        this.link = `/nft/${tokenId}`;

    }

    async getImg() {
        const onImageError = (error) => {
            console.log("failed to load image");
            console.log(error);
            error.target.src = this.img + "?t=" + new Date().getTime();
        }
        return <Card.Img variant="top" src={this.img} onError={onImageError} />;
    }

    preloadImage() {
        console.log("preloding..");
        const img = new Image();
        img.src = this.img;
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

}

export default Nft;