import { Canvas } from 'react-three-fiber';

import PoolGame from '../components/Pool/PoolGame';
import Controls from '../components/Pool/OrbitControls';
import { Container, Row, CardGroup, Alert } from 'react-bootstrap';
import Lights from '../components/Pool/Lights';
import Nft from '../components/Nft';

import NftMemory from '../components/NftMemory';

import { BlockChainMemory } from '../components/BlockChainMemory';

import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';

import NftCard from '../components/NftCard';
function NftPoolPage() {

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
            array.push(new Nft(parseInt(id)));
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
                            nft={nft}
                            variant="small" />
                    </div>
                ))}
            </CardGroup>
            <Row>
                <h1>Memory</h1>
            </Row>
            <Row>
                {
                    (data && data.length > 0 && ismyNft) ?
                        <Canvas style={{ with: "100%", height: "80vh" }}>
                            <PoolGame nfts={data} />
                            <Controls />
                            <Lights />
                        </Canvas>
                        :
                        (!data || data.length == 0) ?
                            <Alert variant="danger">
                                ce nft n'a pas encore été débloqué !
                            </Alert>
                            :
                            <Alert variant="danger">
                                tu doit possédé ce nft pour joué
                            </Alert>

                }
            </Row>
        </Container>


    );
}

export default NftPoolPage;
