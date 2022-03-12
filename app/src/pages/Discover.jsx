import { ethers } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Accordion, Container, Alert, Col, Row, Card, Button, CardGroup, Form, FloatingLabel } from 'react-bootstrap'
import NftCard from '../components/NftCard';
import { UserContext } from '../components/UserContext'
import useNftSearch from '../components/useNftSearch';
import LoadingImg from '../../assets/image/loading.gif';

function Discover() {

    const [count, setcount] = useState(0);
    const [onlyMyNft, setOnlyMyNft] = useState(false);
    const [searchAdress, setSearchAdress] = useState("");
    const [searchId, setSearchId] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const { nfts, hasMore, error, loading }
        = useNftSearch(pageNumber, setPageNumber, onlyMyNft, searchId, searchAdress);


    const observer = useRef(null);
    const lastNft = useCallback((node) => {
        if (loading) return;
        if (observer.current) {
            console.log(observer.current);
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log("visible");
                setPageNumber((pageNumber) => {
                    console.log("pageNumber" + pageNumber + " + 1");
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
    }, []);

    const getCount = async () => {
        const count = parseInt(await UserContext.contract.count());
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

    return (
        <Container fluid>

            <Row className='justify-content-md-center m-2'>
                <Col xs lg="2">
                    <Alert variant="dark">
                        <Alert.Heading className='text-center'>{count}</Alert.Heading>
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