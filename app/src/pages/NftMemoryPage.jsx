import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Col, Container, Row, Table, CardGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import NftMemory from '../components/NftMemory';
import { UserContext } from '../components/UserContext';
import MemoryGame from '../components/MemoryGame';
import { BlockChainMemory } from '../components/BlockChainMemory';
import NftCard from '../components/NftCard';
import Nft from '../components/Nft';

function NftMemoryPage() {

    let params = useParams();
    let tokenId = params.tokenId;
    let nft = new NftMemory(tokenId);

    const [data, setData] = useState(null);
    const [owner, setOwner] = useState("");
    const [ismyNft, setIsMyNft] = useState(false);

    useEffect(() => {
        getData();
        getOwner();
        getIsMyNft();
    }, [params]);


    const getOwner = async () => {
        let owner = await BlockChainMemory.getOwner(nft);
        setOwner(owner);
    }

    const getData = async () => {
        let data = await nft.getData();
        let array = Array();
        for (const id of data) {
            array.push(parseInt(id));
        }
        console.log(array);
        setData(array);
    }

    const getIsMyNft = async () => {
        let response = await BlockChainMemory.ismyNft(nft);
        console.log(response);
        setIsMyNft(response);
    }


    return (
        <Container className='text-light'>
            <Row>
                <div className='display-1 text-center'>
                    Id #{tokenId}
                </div>
            </Row>
            <Row>
                propriétaire :
            </Row>
            <Row>
                {owner ? owner : "possédé par personne !"}
            </Row>
            <Row>
                {ismyNft && <Alert>
                    tu possède cette nft !
                </Alert>}
            </Row>
            <Row>
                <h3>Nft dans ce memory: </h3>
            </Row>
            <CardGroup>
                {data && data.map((nft, i) => (
                    <div key={i}>
                        <NftCard
                            style={{ width: '8rem' }}
                            nft={new Nft(nft)}
                            variant="small" />
                    </div>
                ))}
            </CardGroup>
            <Row>
                <h1>Memory</h1>
            </Row>
            <Row>
                {
                    (data && ismyNft) ? <MemoryGame tokenIds={data} /> :
                        <Alert variant="danger">
                            ce nft n'a pas encore été débloqué !
                        </Alert>
                }
            </Row>
        </Container>
    );
}

export default NftMemoryPage;