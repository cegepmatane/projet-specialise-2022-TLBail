import { Container, Row } from "react-bootstrap";
import MetaMaskLogo from "../components/MetaMaskLogo";


class Install extends React.Component {


    render() {
        return (
            <Container className="text-light installContainer">
                <Row>
                    <h1>Connection à ton portfeuille</h1>
                </Row>
                <Row>
                    <MetaMaskLogo />
                </Row>
                <Row>
                    <a className="btn-primary btn" href="https://metamask.io/download.html">Install metamask</a>
                </Row>

                <Row className="m-2 text-light">

                    <p>
                        l'application  est toujours en test mais tu peut l'utiliser en te connectant sur le réseau suivant :
                    </p>

                    <ul>
                        <li>
                            URL de RPC - https://polygon-mumbai.g.alchemy.com/v2/KBBUDl6m0-m8bWd3GGWU-eniZKy1elh4
                        </li>
                        <li>
                            ID de chaîne - 80001
                        </li>
                    </ul>

                    <a className="text-light" href="https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC">
                        comment ajouter un réseau sur metamask ici
                    </a>
                </Row>

            </Container >

        );
    }


}




export default Install;





