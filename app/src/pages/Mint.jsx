import { useState } from 'react';
import { Container, Row, Alert, Button } from 'react-bootstrap'
import LoadingGif from '../../assets/image/loading.gif'



function Mint() {

    const [transactionState, setTransactionState] = useState("none");


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
                <TransactionBlock transactionState={transactionState} setTransactionState={setTransactionState} />
            </Row>
        </Container>
    );

}


function TransactionBlock({ transactionState, setTransactionState }) {


    switch (transactionState) {
        case "none":
            return (
                <div className='d-flex justify-content-center'>
                    <Button variant="primary" size="lg" className='fs-2' onClick={
                        () => setTransactionState("inProgress")
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