import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Accordion, Container, Alert, Col, Row, Card, Button, CardGroup, Form, FloatingLabel } from 'react-bootstrap'
import loadingImg from '../../assets/image/loading.gif'
import NftCard from '../components/NftCard';
import { UserContext } from '../components/UserContext'
import Nft from '../components/Nft'
import { BlockChain } from '../components/BlockChain';


function Discover() {

    const [count, setcount] = useState(0);
    const [onlyMynft, setOnlyMyNft] = useState(false);
    const [nftArray, setNftArray] = useState([]);
    const [searchAdress, setSearchAdress] = useState("");
    const [searchId, setSearchId] = useState(null);

    useEffect(() => {
        getCount();
        getnftArray();
    }, [onlyMynft, searchAdress, searchId]);

    const getCount = async () => {
        const count = parseInt(await UserContext.contract.count());
        setcount(count);
    };

    BlockChain.setListener((array) => {
        setNftArray(array);
    });


    const getnftArray = async () => {
        BlockChain.getNfts();
        if (onlyMynft) {
            BlockChain.onlyMyNft();
        }
        if (searchAdress) {
            BlockChain.searchAdress(searchAdress);
        }
        if (searchId) {
            console.log(searchId);
            BlockChain.searchId(searchId);
        }
    }

    function handleChangeAdress(event) {
        setSearchAdress(event.target.value)
    }

    function handleChangeId(event) {
        let value = event.target.value;
        if (value) {
            console.log(value);
            setSearchId(event.target.value);
        } else {
            console.log(value);
            setSearchId(null);
        }
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
                            className='fs-3'
                            onChange={() => setOnlyMyNft(!onlyMynft)} />
                        <FloatingLabel
                            controlId="searchIdtoken"
                            label="recherché par id"
                            className="text-dark mt-4"
                            onChange={handleChangeId}
                        >
                            <Form.Control type="number" placeholder="1" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="searchAdress"
                            label="recherché par adress du propriétaire"
                            className='text-dark mt-4'
                            onChange={handleChangeAdress}
                        >
                            <Form.Control type="text" placeholder="0x" />
                        </FloatingLabel>

                    </Form>
                </Col>
                <Col>
                    <NftList nftArray={nftArray} />
                </Col>
            </Row>


        </Container>

    )

}


function NftList({ nftArray }) {
    return (
        <CardGroup>
            {nftArray.map((nft, i) => (
                <div key={i}>
                    <NftCard
                        style={{ width: '18rem' }}
                        nft={nft}
                        variant="medium" />
                </div>
            ))}
        </CardGroup>
    );
}


export default Discover;