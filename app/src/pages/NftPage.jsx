import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row, Table, Alert } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Nft from '../components/Nft';
import loadingImg from '../../assets/image/loading.gif'
import { UserContext } from '../components/UserContext';
import { BlockChain } from '../components/BlockChain';
function NftPage() {

    let params = useParams();
    let tokenId = params.tokenId;
    let nft = new Nft(tokenId);

    const [data, setData] = useState(null);
    const [owner, setOwner] = useState("");
    const [ismyNft, setIsMyNft] = useState(false);

    useEffect(() => {
        getData();
        getOwner();
        getIsMyNft();
    }, [params]);

    const getOwner = async () => {
        let owner = await BlockChain.getOwner(nft);
        setOwner(owner);
    }

    const getIsMyNft = async () => {
        let response = await BlockChain.ismyNft(nft);
        console.log(response);
        setIsMyNft(response);
    }

    const getData = async () => {
        let data = await nft.getData();
        console.log(data);
        setData(data);
    }

    const dateConverter = (date) => {

        date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = year + "/" + month + "/" + day + "     " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }

    const onImageError = (error) => {
        console.log("failed to load image");
        console.log(error);
        error.target.src = nft.img + "?t=" + new Date().getTime();
    }


    return (
        <Container className='text-light'>
            <Row>
                <div className='display-1 text-center'>
                    Id #{tokenId}
                </div>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <img src={nft.img} alt="" onError={onImageError} />
                </Col>
                <Col>
                    <Container className='fs-3'>
                        <Row>
                            propriétaire :
                        </Row>
                        <Row>
                            {owner ? owner : "possédé par personne !"}
                            {ismyNft && <Alert>
                                tu possède cette nft !
                            </Alert>}
                        </Row>
                        <Row>
                            série :
                        </Row>
                        <Row>
                            {data && data.name}
                        </Row>
                        <Row>
                            date de création :
                        </Row>
                        <Row>
                            {data && dateConverter(data.date)}
                        </Row>
                        <Row className='fs-5 mt-2'>
                            <Table striped bordered responsive hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>attribut</th>
                                        <th>valeur</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data ? data.attributes.map(
                                            (item, i) =>
                                                <tr key={i}>
                                                    <td>
                                                        {item.trait_type}
                                                    </td>
                                                    <td>
                                                        {item.value}
                                                    </td>
                                                </tr>
                                        )
                                            :
                                            <div>
                                                <img src={loadingImg} />
                                                Chargement ...
                                            </div>
                                    }
                                </tbody>
                            </Table>


                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default NftPage;