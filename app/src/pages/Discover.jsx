import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import GoldenGames from '../artifacts/contracts/GoldenGames.sol/GoldenGames.json';
import { Accordion, Container, Alert, Col, Row, Card, Button, CardGroup } from 'react-bootstrap'
import loadingImg from '../../assets/image/loading.gif'

const contractAdress = "0xD3b28A7Ef328c1fA33d3aE39bF0A2392108D8573";

const contentId = 'QmV6aMKL6uWXz266sLFPFDqWgRsFGnEedrmgyxN8Yv1eYo';

var provider;
var signer;
var contract;

function Discover() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAdress, GoldenGames.abi, signer);

    const [totalMinted, setTotalMinted] = useState(0);
    const [met, setMetaDataURI] = useState(0);
    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const count = parseInt(await contract.count());
        setTotalMinted(count);
        setMetaDataURI(`${contentId}/${count}.json`);
        console.log("count" + count);
    };


    const mintToken = async () => {
        const connection = contract.connect(signer);
        const addr = await signer.getAddress();
        console.log(addr);
        console.log(met);
        contract.payToMint(addr, met, {
            value: ethers.utils.parseEther('0.05'),
        }).then(result => {
            getCount();
            console.log("transaction result : ");
            console.log(result);
        }).catch(error => {
            console.log(error);
        }
        );

        await result.wait();
        console.log("tutut");
        console.log(result);
    };

    return (
        <Container>

            <Row className='m-2'>
                <Alert variant="dark">
                    <Alert.Heading className='text-center'>Home</Alert.Heading>
                </Alert>
            </Row>

            <Row className='m-2'>

                <Button variant="primary" className='fit' onClick={mintToken}>
                    mintToken !
                </Button>
            </Row>


            <Row className='m-2 p-2'>
                <CardGroup>

                    {Array(totalMinted).fill(0).map((_, i) => (
                        <div key={i}>
                            <NftImage tokenId={i} totalMinted={totalMinted} />
                        </div>
                    ))}
                </CardGroup>
            </Row>


        </Container>

    )

}

function NftImage({ tokenId, totalMinted }) {
    if (tokenId == 0) return (<div></div>);
    const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.jpg`;

    const onImageError = (error) => {
        console.log("failed to load image");
        console.log(error);
        error.target.src = imageURI + "?t=" + new Date().getTime();
    }


    return (

        <Card style={{ width: '18rem' }} className="m-2">
            <Card.Img variant="top" src={imageURI} onError={onImageError} />
            <Card.Body>
                <Card.Title>nft #{tokenId}</Card.Title>
                <Card.Text>
                    incroyable nft
                </Card.Text>
                <Button variant="danger" onClick={() => alert(imageURI)}>
                    voir le lien vers l'image
                </Button>
                <NftData tokenId={tokenId} />

            </Card.Body>
        </Card>
    );
}



function NftData({ tokenId }) {
    console.log("salut " + tokenId);
    const metaDataURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.json`;
    const [data, setData] = useState([]);
    const getData = () => {
        fetch(metaDataURI
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        ).then(function (response) {
            console.log(response)
            return response.json();
        }).then(function (myJson) {
            console.log(myJson);
            setData(myJson);
        }).catch((error) => {
            console.log("error fetching data");
            setTimeout(getData, 300);
        });
    }
    useEffect(() => {
        getData()
    }, []);


    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header> Données
                    </Accordion.Header>
                    <Accordion.Body>
                        {
                            data && data.attributes ? data.attributes.map(
                                (item) => <p>{JSON.stringify(item)}</p>
                            )
                                :
                                <div>
                                    <img src={loadingImg} />
                                    Chargement ...
                                </div>
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


        </div>

    );
}
export default Discover;