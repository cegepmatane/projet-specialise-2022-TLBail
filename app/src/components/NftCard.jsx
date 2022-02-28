import loadingImg from '../../assets/image/loading.gif'
import { useEffect } from "react";
import { useState } from "react";
import { Card, Accordion, ListGroup, ListGroupItem } from "react-bootstrap"
import Nft from "./Nft";
function NftCard({ nft = new Nft(0), animState = "fade-in", variant = "small" }) {
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


    return (
        <Card className={`text-primary ${animState}`} >
            <Card.Img variant="top" src={nft.img} />
            <Card.Header className="text-center">Nft # {nft.tokenId}</Card.Header>
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
        </Card>
    );

}

export default NftCard;