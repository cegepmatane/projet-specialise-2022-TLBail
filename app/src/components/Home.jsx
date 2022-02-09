import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import GoldenGames from '../artifacts/contracts/GoldenGames.sol/GoldenGames.json';
import { Container, Alert, Col, Row, Card, Button, CardGroup } from 'react-bootstrap'

const contractAdress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAdress, GoldenGames.abi, signer);
const contentId = 'QmV6aMKL6uWXz266sLFPFDqWgRsFGnEedrmgyxN8Yv1eYo';



function Home() {
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
    const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.jpg`;
    const metaDataURI = `${contentId}/${tokenId}.json`;




    return (

        <Card style={{ width: '18rem' }} className="m-2">
            <Card.Img variant="top" src={imageURI} />
            <Card.Body>
                <Card.Title>nft #{tokenId}</Card.Title>
                <Card.Text>
                    incroyable nft
                </Card.Text>
                <Button variant="danger" onClick={() => alert(imageURI)}>
                    voir le lien vers l'image
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Home;