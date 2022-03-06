import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Accordion, Container, Alert, Col, Row, Card, Button, CardGroup, Form, FloatingLabel } from 'react-bootstrap'
import loadingImg from '../../assets/image/loading.gif'
import NftCard from '../components/NftCard';
import { UserContext } from '../components/UserContext'
import Nft from '../components/Nft'


function Discover() {

    const [count, setcount] = useState(0);
    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const count = parseInt(await UserContext.contract.count());
        setcount(count);
    };

    const nftArray = () => {
        let array = Array();
        for (let index = 1; index < count; index++) {
            array[index] = new Nft(index);
        }
        return array;
    }

    return (
        <Container fluid>

            <Row className='justify-content-md-center m-2'>
                <Col xs lg="2">
                    <Alert variant="dark">
                        <Alert.Heading className='text-center'>{count}</Alert.Heading>                        <p className='text-center m-0 p-0'>
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
                <Col lg="3" className='bg-dark text-light'>
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
                    <NftList nftArray={nftArray()} />
                </Col>
            </Row>


        </Container>

    )

}


function NftList({ nftArray }) {
    return (
        <CardGroup>
            {nftArray.map((_, i) => (
                <div key={i}>
                    {
                        i > 0 && <NftCard
                            style={{ width: '18rem' }}
                            nft={new Nft(i)}
                            variant="medium" />
                    }
                </div>
            ))}
        </CardGroup>
    );
}


export default Discover;