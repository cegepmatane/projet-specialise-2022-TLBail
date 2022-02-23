import { Card, ListGroup, ListGroupItem } from "react-bootstrap"

function NftCard({ nft }) {

    return (
        <Card className="text-primary" >
            <Card.Img variant="top" src={nft.img} />
            <Card.Header className="text-center">Nft # {nft.tokenId}</Card.Header>
        </Card>
    );

}

export default NftCard;