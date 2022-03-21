import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import NftMemory from '../components/NftMemory';
import { UserContext } from '../components/UserContext';
import MemoryGame from '../components/MemoryGame';
import { BlockChainMemory } from '../components/BlockChainMemory';

function NftMemoryPage() {

    let params = useParams();
    let tokenId = params.tokenId;
    let nft = new NftMemory(tokenId);

    const [data, setData] = useState(null);
    const [owner, setOwner] = useState("");

    useEffect(() => {
        getData();
        getOwner();
    }, [params]);


    const getOwner = async () => {
        let owner = await BlockChainMemory.getOwner(nft);
        setOwner(owner);
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
        <Container className='text-light'>
            <Row>
                <div className='display-1 text-center'>
                    Id #{tokenId}
                </div>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <img src={nft.img} alt="" onError={onImageError} />
                </Col>
                <Col>
                    <Container className='fs-3'>
                        <Row>
                            propriétaire :
                        </Row>
                        <Row>
                            {owner ? owner : "possédé par personne !"}
                        </Row>
                        <Row>
                            série :
                        </Row>
                        <Row>
                            {data && data.name}
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row>
                <MemoryGame tokenId={tokenId} />
            </Row>
        </Container>
    );
}

export default NftMemoryPage;