import { Col, Container, Row, Button } from "react-bootstrap";
import NftCard from "../components/NftCard";
import Nft from "../components/Nft";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext"
import { useState } from "react";
import { useEffect } from "react";

function Home() {

    const [nft, setNftToDisplay] = useState(new Nft(1));
    const [animState, setNftState] = useState("fade-in");

    useEffect(() => {
        createNftToDisplay();
    }, []);

    const createNftToDisplay = async () => {
        if (!UserContext.count) {
            await UserContext.getCount();
        }
        setNftToDisplay(new Nft(Math.floor(Math.random() * (UserContext.count - 1)) + 1));
        setNftState("fade-in");
        setTimeout(chaoNft, 4000);
    };

    const chaoNft = () => {
        setNftState("fade-out");
        setTimeout(createNftToDisplay, 1100);
    }

    return (
        <Container className="mt-5 text-light">
            <Row>
                <Col className="col-8">
                    <div className="d-flex flex-column h-100">
                        <h1 className="megaTextHome p-1 flex-grow-1">
                            Découvre, collectionne, et échange d’incroyable NFT
                        </h1>
                        <h2 className="align-self-end font-weight-light">
                            goldengames.games est le meilleur endroit pour gérer ces NFT
                        </h2>
                        <div className="d-flex">
                            <Link className='flex-grow-1 linkNavBar btn-primary btn' to="/discover" >
                                <h1 className="m-2 fw-bold">
                                    Explorer
                                </h1>
                            </Link>
                            <Link className='flex-grow-1 linkNavBar btn-light btn text-primary' to="/mint" >
                                <h1 className="m-2 fw-bold">
                                    Créer
                                </h1>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col>
                    <NftCard animState={animState} nft={nft} />
                </Col>
            </Row>
            <Row>
                <Col className="col-8">
                    <a className="ml-2 p-2 linkNavBar btn-danger btn" href="https://github.com/cegepmatane/projet-specialise-2022-TLBail">
                        ➡
                        En Apprendre plus sur goldengames.games
                    </a>
                </Col >
            </Row >
            <Row>
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
                <NftCard nft={new Nft(3)} variant="full" />
            </Row>
        </Container >
    );

}


export default Home;