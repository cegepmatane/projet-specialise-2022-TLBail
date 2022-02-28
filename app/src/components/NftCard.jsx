import { Card, ListGroup, ListGroupItem } from "react-bootstrap"

function NftCard({ nft, state }) {

    return (
        <Card className={`text-primary ${state}`} >
            <Card.Img variant="top" src={nft.img} />
            <Card.Header className="text-center">Nft # {nft.tokenId}</Card.Header>
        </Card>
    );

}

export default NftCard;