import { Container, Row, Alert, Button } from 'react-bootstrap'


function Mint() {

    return (
        <Container className="text-light">
            <Row>
                <h1 className='text-center display-1 '>Mint ton nft ! </h1>
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
                <div className='d-flex justify-content-center'>
                    <Button variant="primary" size="lg" className='fs-'>
                        Mint
                    </Button>
                </div>
            </Row>
        </Container>
    );

}
            
export default Mint;