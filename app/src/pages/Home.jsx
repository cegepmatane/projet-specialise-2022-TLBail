import { Col, Container, Row, Button } from "react-bootstrap";
import NftCard from "../components/NftCard";
import Nft from "../components/Nft";
import { Link } from "react-router-dom";
function Discover() {


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
                        <div className="d-flex justify-content-center">
                            <Link className='linkNavBar btn-primary btn' to="/discover" >
                                Explorer
                            </Link>
                            <Link className='linkNavBar btn-light btn text-primary' to="/mint" >
                                Créer
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col>
                    <NftCard nft={new Nft(Math.round(Math.random() * 100))} />
                </Col>
            </Row>
            <Row>
                <Col className="col-8">
                    <Link className="ml-2 p-2 linkNavBar btn-danger btn" to="https://portfolio.tlbail.fr">
                        ➡
                        En Apprendre plus sur goldengames.games
                    </Link>
                </Col>
            </Row>
        </Container >
    );

}


export default Discover;