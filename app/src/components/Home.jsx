import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import GoldenGames from '../artifacts/contracts/GoldenGames.sol/GoldenGames.json';
import { Container, Alert, Col, Row, Card, Button } from 'react-bootstrap'

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
        const count = await contract.count();
        setTotalMinted(parseInt(count));
        setMetaDataURI(`${contentId}/${count}.json`);
    };

    const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${getCount()}.jpg`;

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
                <NftImage />
            </Row>
        </Container>

    )

}

function NftImage() {


    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://placeimg.com/300/120/any" />
            <Card.Header>Header</Card.Header>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle>Card Subtitle</Card.Subtitle>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default Home;