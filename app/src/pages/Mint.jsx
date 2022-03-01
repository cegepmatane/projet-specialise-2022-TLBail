import { useState } from 'react';
import { Container, Row, Alert, Button } from 'react-bootstrap'
import LoadingGif from '../../assets/image/loading.gif'
import { UserContext } from '../components/UserContext';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import NftCard from '../components/NftCard';
import Nft from '../components/Nft';
import { Link } from 'react-router-dom';

function Mint() {

    const [transactionState, setTransactionState] = useState("none");


    const [totalMinted, setTotalMinted] = useState(0);
    const [count, setCount] = useState(0);
    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const count = parseInt(await UserContext.contract.count());
        setTotalMinted(count);
        setCount(count);
    };


    const mintToken = async () => {
        const connection = UserContext.contract.connect(UserContext.signer);
        const addr = await UserContext.signer.getAddress();
        if (!UserContext.metaDataURI) await UserContext.getCount();
        var result = await UserContext.contract.payToMint(addr, UserContext.metaDataURI, {
            value: ethers.utils.parseEther('0.05'),
        }).catch(error => {
            console.log(error);
        });
        setTransactionState("inProgress");
        await result.wait();
        console.log("transaction result : ");
        console.log(result);
        setTransactionState("succes");
        getCount();
    };


    if (transactionState === "succes") {
        return (
            <Container className='text-primary p-2'>
                <Row className='justify-content-md-center'>
                    <div style={{ width: "20vh" }}>
                        <NftCard nft={new Nft(count)} />
                    </div>
                </Row>
                <Row className='justify-content-md-center'>
                    <h1 className='text-center'>
                        success
                    </h1>
                </Row>
                <Row className='justify-content-center'>
                    <div className='d-flex justify-content-center'>
                        <Link className='linkNavBar btn btn-primary' to={`/nft/${count}`} >
                            voir mon nft
                        </Link>
                    </div >
                </Row>
            </Container >
        );
    }
    return (
        <Container className="text-light">
            <Row>
                <div className='text-center display-1 m-4'>Mint ton nft ! </div>
            </Row>
            <Row>
                <p>
                    Mint un nft en cliquant sur le bouton Mint.
                    Les frais de création sont de 0.05 eth,
                    une fois la transaction effectuée,
                    un nft est ajouté à ta collection de manières aléatoires.
                    Personne ne sait qu’elle est le prochain nft créer !
                    Tu peux déjà voir les nft mint sur la page explorer.
                    Actuellement les nft des séries suivantes sont obtenables :
                </p>
            </Row>
            <Row className='p-3'>
                <ul>
                    <li>
                        Goldengames 1
                    </li>
                    <li>
                        Goldengames 2
                    </li>
                </ul>
            </Row>
            <Row>
                <TransactionBlock transactionState={transactionState} buttonAction={mintToken} />
            </Row>
        </Container>
    );

}


function TransactionBlock({ transactionState, buttonAction }) {


    switch (transactionState) {
        case "none":
            return (
                <div className='d-flex justify-content-center'>
                    <Button variant="primary" size="lg" className='fs-2' onClick={
                        () => buttonAction()
                    }>
                        Mint
                    </Button>
                </div >
            );
        case "inProgress":
            return (
                <Container fluid>
                    <Row className='justify-content-md-center m-2'>
                        <img src={LoadingGif} alt=""
                            id='imgLoading'
                        />
                    </Row>
                    <Row className='justify-content-md-center m-2 display-3'>
                        Transaction en cour
                    </Row>
                </Container>
            );
        default:
            return (
                <div>
                    une erreur est survenue
                </div>
            );
    }

}

export default Mint;