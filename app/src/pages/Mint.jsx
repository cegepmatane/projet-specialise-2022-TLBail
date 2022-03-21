import { useState } from 'react';
import { Container, Row, Alert, Button, Form } from 'react-bootstrap'
import LoadingGif from '../../assets/image/loading.gif'
import { UserContext } from '../components/UserContext';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import NftCard from '../components/NftCard';
import Nft from '../components/Nft';
import { Link } from 'react-router-dom';
import Confetti from '../components/Confetti';

function Mint() {

    const [transactionState, setTransactionState] = useState("none");
    const [serieToMint, setSerie] = useState("classic");

    const [nft, setNft] = useState(null);
    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const count = parseInt(await UserContext.contract.count());
        setNft(new Nft(count - 1));
    };


    const mintToken = async () => {
        if (serieToMint == "classic") {
            mintClassicToken();
        } else if (serieToMint == "memory") {
            mintMemoryToken();
        }

    };

    const mintMemoryToken = async () => {
        UserContext.setSerie("memory");
        const connection = UserContext.contract.connect(UserContext.signer);
        const addr = await UserContext.signer.getAddress();
        await UserContext.getCount();
        var result = await UserContext.contract.payToMint({
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

    }

    const mintClassicToken = async () => {
        UserContext.setSerie("classic");
        const connection = UserContext.contract.connect(UserContext.signer);
        const addr = await UserContext.signer.getAddress();
        await UserContext.getCount();
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
    }


    if (transactionState === "succes") {
        return (<Succes nft={nft} />);
    } else {
        return (
            <TransactionRule
                transactionState={transactionState}
                buttonAction={mintToken}
                setSerie={setSerie}
            />
        );
    }


}

function TransactionRule({ transactionState, buttonAction, setSerie }) {
    function handleChange() {
        setSerie("classic");
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
            <Row>
                <Form>
                    <Form.Check
                        type="radio"
                        label="Goldengames Classic"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        checked
                        onClick={handleChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Goldengames memory"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        onClick={() => setSerie("memory")}
                    />
                </Form>
            </Row>
            <Row>
                <TransactionBlock transactionState={transactionState} buttonAction={buttonAction} />
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
                        Transaction en cours
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

function Succes({ nft }) {
    return (
        <Container className='text-primary p-2'>
            <Row className='justify-content-md-center'>
                <div style={{ width: "20vh" }}>
                    <NftCard nft={nft} />
                </div>
            </Row>
            <Row className='justify-content-md-center'>
                <h1 className='text-center'>
                    success
                </h1>
            </Row>
            <Row className='justify-content-center'>
                <div className='d-flex justify-content-center'>
                    <Link className='linkNavBar btn btn-primary' to={`/nft/${nft.tokenId}`} >
                        voir mon nft
                    </Link>
                </div >
            </Row>
            <Row>
                <Confetti />
            </Row>
        </Container >
    );
}



export default Mint;