import { Component, useCallback, useEffect, useRef, useState } from 'react';
import { Accordion, Nav, Container, Alert, Col, Row, Card, Button, CardGroup, Form, FloatingLabel } from 'react-bootstrap'
import NftCard from '../components/NftCard';
import useNftSearch from '../components/useNftSearch';
import LoadingImg from '../../assets/image/loading.gif';
import { Link, useParams } from 'react-router-dom';
import React, { } from 'react';
import { BlockChain } from '../components/BlockChain';
import { BlockChainMemory } from '../components/BlockChainMemory';
import { BlockchainPool } from '../components/BlockChainPool';

class Discover extends Component {



    componentDidUpdate() {
        let params = useParams();
        let serie = params.serie;
        console.log(serie);
    }

    render() {
        return (<DiscoverNft />);
    }
}

function DiscoverNft() {


    const [count, setcount] = useState(0);
    const [onlyMyNft, setOnlyMyNft] = useState(false);
    const [searchAdress, setSearchAdress] = useState("");
    const [searchId, setSearchId] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [blockChainProvider, setBlockchainProvider] = useState(BlockChain);

    const { nfts, hasMore, error, loading }
        = useNftSearch(pageNumber, setPageNumber, onlyMyNft, searchId, searchAdress, blockChainProvider);


    const observer = useRef(null);
    const lastNft = useCallback((node) => {
        if (loading) return;
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPageNumber((pageNumber) => {
                    return pageNumber + 1;
                });
            }
        })
        if (node) {
            observer.current.observe(node);
        }
    }, [loading, hasMore]);

    useEffect(() => {
        getCount();
    }, [blockChainProvider]);

    const getCount = async () => {
        let count = await blockChainProvider.getCount();
        setcount(count);
    };

    function handleChangeAdress(event) {
        setSearchAdress(event.target.value);
        setPageNumber(1);
    }

    function handleChangeId(event) {
        setPageNumber(1);
        let value = event.target.value;
        if (value) {
            setSearchId(event.target.value);
        } else {
            setSearchId(null);
        }
    }

    function handleOnlyMyNft(event) {
        setOnlyMyNft((onlyMyNft) => !onlyMyNft);
        setPageNumber(1);
    }

    function switchSeries(newSerie) {
        if (newSerie == "classic") {
            setBlockchainProvider(BlockChain);
        } else if (newSerie == "memory") {
            setBlockchainProvider(BlockChainMemory);
        } else {
            setBlockchainProvider(BlockchainPool);
        }
        setPageNumber(1);
    }

    return (
        <Container fluid>

            <Row className='justify-content-md-center m-2'>
                <Col xs lg="2">
                    <Alert variant="dark">
                        <Alert.Heading className='text-center'>{count - 1}</Alert.Heading>
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
            <Row>
                <Nav fill variant="tabs" className='bg-dark' defaultActiveKey="classic">
                    <Nav.Item>
                        <Nav.Link eventKey="classic" onClick={() => switchSeries("classic")}>
                            Golden Games classic
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="memory" onClick={() => switchSeries("memory")}>
                            GoldenGames memory pack
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="soon" onClick={() => switchSeries("pool")}>
                            GoldenGames pool
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
            <Row >
                <Col lg="3" className='bg-dark text-light'>
                    <h3>Filtre</h3>
                    <Form
                        className='d-flex justify-content-center flex-column'>
                        <Form.Switch label="voir mes nft"
                            className='fs-3'
                            onChange={handleOnlyMyNft} />
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
                    <NftList nftArray={nfts} lastNft={lastNft} />
                    {loading && <LoadingBox />}
                </Col>
            </Row>


        </Container>

    )

}

function LoadingBox() {
    return (
        <div className='d-flex justify-content-center'>
            <img src={LoadingImg} alt="" />
        </div>

    );
}

function NftList({ nftArray, lastNft }) {

    return (
        <CardGroup>
            {nftArray.map((nft, i) => (
                i != nftArray.length - 1 ?
                    <div key={i}>
                        <NftCard
                            style={{ width: '18rem' }}
                            nft={nft}
                            variant="medium" />
                    </div>
                    :
                    <div ref={lastNft} key={i}>
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