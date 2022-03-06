import loadingImg from '../../assets/image/loading.gif'
import { useEffect } from "react";
import { useState } from "react";
import { Card, Accordion, ListGroup, ListGroupItem, Button } from "react-bootstrap"
import { Link } from 'react-router-dom';
import Nft from "./Nft";
function NftCard({ nft = new Nft(0), animState = "fade-in", variant = "small", style = {} }) {
    const [data, setData] = useState(null);


    if (variant == "full") {

        useEffect(() => {
            getData();
        }, []);
    }

    const getData = async () => {
        let data = await nft.getData();
        console.log(data);
        setData(data);
    }

    const onImageError = (error) => {
        console.log("failed to load image");
        console.log(error);
        error.target.src = nft.img + "?t=" + new Date().getTime();
    }



    return (
        <Card style={style} className={`text-primary ${animState} m-2`} >
            <Card.Img variant="top" src={nft.img} onError={onImageError} />
            <Card.Header className="text-center">Nft # {nft.tokenId}
                <Link className='btn-primary btn m-2' to={`/nft/${nft.tokenId}`} >
                    voir
                </Link>

            </Card.Header>
            {variant == "full" && <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header> Données
                    </Accordion.Header>
                    <Accordion.Body>
                        {
                            data && data.attributes ? data.attributes.map(
                                (item, i) => <p key={i}>{JSON.stringify(item)}</p>
                            )
                                :
                                <div>
                                    <img src={loadingImg} />
                                    Chargement ...
                                </div>
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>}
        </Card >
    );

}



export default NftCard;