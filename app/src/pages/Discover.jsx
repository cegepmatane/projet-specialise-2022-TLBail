import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Accordion, Container, Alert, Col, Row, Card, Button, CardGroup, Form, FloatingLabel } from 'react-bootstrap'
import loadingImg from '../../assets/image/loading.gif'
import { UserContext } from '../components/UserContext'
const contentId = 'QmV6aMKL6uWXz266sLFPFDqWgRsFGnEedrmgyxN8Yv1eYo';


function Discover() {

    const [count, setcount] = useState(0);
    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const count = parseInt(await UserContext.contract.count());
        setcount(count);
        setMetaDataURI(`${contentId}/${count}.json`);
        console.log("count" + count);
    };



    return (
        <Container fluid>

            <Row className='justify-content-md-center m-2'>
                <Col xs lg="2">
                    <Alert variant="dark">
                        <Alert.Heading className='text-center'>234</Alert.Heading>
                        <p className='text-center m-0 p-0'>
                            nombre de nft mint
                        </p>
                    </Alert>
                </Col>
                <Col xs lg="2">
                    <Alert variant="dark">
                        <Alert.Heading className='text-center'>134</Alert.Heading>
                        <p className='text-center m-0 p-0'>
                            nombre de propriétaire
                        </p>
                    </Alert>
                </Col>

            </Row>



            <Row >

                <Col lg="3" className='bg-dark text-light sticky-form'>
                    <h3>Filtre</h3>
                    <Form
                        className='d-flex justify-content-center flex-column'>
                        <Form.Switch label="voir mes nft"
                            className='fs-3' />
                        <FloatingLabel
                            controlId="searchIdtoken"
                            label="recherché par id"
                            className="text-dark mt-4"
                        >
                            <Form.Control type="number" placeholder="1" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="searchAdress"
                            label="recherché par adress du propriétaire"
                            className='text-dark mt-4'
                        >
                            <Form.Control type="text" placeholder="0x" />
                        </FloatingLabel>

                    </Form>
                </Col>
                <Col>
                    <CardGroup>

                        {Array(count).fill(0).map((_, i) => (
                            <div key={i}>
                                <NftImage tokenId={i} count={count} />
                            </div>
                        ))}
                    </CardGroup>
                </Col>
            </Row>


        </Container>

    )

}

function NftImage({ tokenId, count }) {
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
            </Accordion>


        </div>

    );
}
export default Discover;