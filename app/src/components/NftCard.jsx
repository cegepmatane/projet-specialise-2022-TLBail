import loadingImg from '../../assets/image/loading.gif'
import { useEffect } from "react";
import { useState } from "react";
import { Card, Accordion, ListGroup, ListGroupItem, Button } from "react-bootstrap"
import { Link } from 'react-router-dom';
import Nft from "./Nft";
function NftCard({ nft = new Nft(0), animState = "fade-in", variant = "small", style = {} }) {
    const [data, setData] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        getImage();
    }, []);

    const getImage = async () => {
        let response = await nft.getImg();
        setImage(response);
    }

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


    return (
        <Card style={style} className={`text-primary ${animState} m-2`} >
            {image}
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