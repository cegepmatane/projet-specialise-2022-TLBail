import { useEffect, useRef, useState } from "react";
import { BlockChainMemory } from "./BlockChainMemory";
import Nft from "./Nft";


class NftMemory {


    constructor(tokenId) {
        this.tokenId = tokenId;
        this.link = `/nftmemory/${tokenId}`;
    }

    async getImg() {
        let data = await this.getData();
        let arr = Array();
        for (const id of data) {
            arr.push(parseInt(id));
        }

        const Canvas = props => {

            const canvasRef = useRef(null)
            const [error, setError] = useState(true);

            const draw = ctx => {
                const canvas = canvasRef.current
                ctx.fillStyle = '#000000'
                ctx.fill()
                let x = 0;
                let y = 0;
                const elementwidth = 5;
                const elementheight = 3;

                for (const id of arr) {
                    let img = new Image(100, 100);
                    img.src = new Nft(id).img;
                    img.onerror = () => {
                        setError(true);
                    };
                    img.onload = () => {
                        ctx.drawImage(img, x, y, canvas.width / elementwidth, canvas.height / elementheight);
                        x += canvas.width / elementwidth;
                        if (x >= canvas.width) {
                            x = 0;
                            y += canvas.height / elementheight;
                        }
                    }
                }
            }

            useEffect(() => {
                if (error) {
                    const canvas = canvasRef.current
                    const context = canvas.getContext('2d')

                    draw(context)
                    setError(false);
                }
            }, [error])



            return <canvas ref={canvasRef} {...props} />
        }
        return <Canvas />;
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