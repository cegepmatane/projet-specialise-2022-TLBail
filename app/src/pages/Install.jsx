import { Container } from "react-bootstrap";
import MetaMaskLogo from "../components/MetaMaskLogo";


class Install extends React.Component {


    render() {
        return (
            <Container className="text-light installContainer">
                <h1>Connection à ton portfeuille</h1>

                <MetaMaskLogo />

                <a className="btn-primary btn" href="https://metamask.io/download.html">Install metamask</a>
            </Container >

        );
    }


}




export default Install;





