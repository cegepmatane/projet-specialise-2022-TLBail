import { useEffect, useState } from "react";
import { Card, CardGroup, Container, Col, Row, Button } from "react-bootstrap";
import Nft from "./Nft";
import Confetti from "../components/Confetti"
function MemoryGame({ tokenIds }) {


    const generateCards = () => {
        let array = Array();
        let nbTotalCard = 28;
        let uniqueCard = nbTotalCard / 2;
        // for (let i = tokenId; i < parseInt(tokenId) + uniqueCard; i++) {
        //     array.push(card(i));
        // }
        for (const id of tokenIds) {
            array.push(card(parseInt(id)));
        }
        let uniqueNft = [...array];
        for (const nft of uniqueNft) {
            array.splice(parseInt(Math.random % nbTotalCard), 0, nft);
        }
        array = array.sort(() => Math.random() - 0.5);
        array = array.map((element, index) => {
            return { ...element, id: index };
        })
        return array;
    }


    const card = (id) => {
        let nft = new Nft(id);
        nft.preloadImage();
        return { nft: nft, unlocked: false, state: false };
    }

    const [cards, setCards] = useState(generateCards());
    const [cardChoix1, setCardChoix1] = useState(null);
    const [cardChoix2, setCardChoix2] = useState(null);
    const [needToReset, setNeedToReset] = useState(false);


    useEffect(() => {
        if (cardChoix1 && cardChoix2) {
            if (cardChoix1.nft.tokenId == cardChoix2.nft.tokenId) {
                cardChoix1.unlocked = true;
                cardChoix2.unlocked = true;
                setCards((cards) => {
                    let array = Array();
                    for (const card of cards) {
                        var updateCard = card;
                        if (updateCard.id == cardChoix1.id) {
                            updateCard = cardChoix1;
                        }
                        if (updateCard.id == cardChoix2.id) {
                            updateCard = cardChoix2;
                        }
                        array.push(updateCard);
                    }
                    return array;
                });
                setCardChoix1(null);
                setCardChoix2(null);
            } else {
                setNeedToReset(true);
            }
        }
    }, [cardChoix1, cardChoix2]);



    function onCardClick(idCard) {
        console.log("click");
        if (needToReset) {
            reset();
        }
        let card = cards.find((card) => card.id == idCard);
        if (card.unlocked == true || (cardChoix1 && idCard == cardChoix1.id) ||
            (cardChoix2 && idCard == cardChoix2.id)) {
            return;
        }
        if (!cardChoix1) {
            setCardChoix1(card);
        } else if (!cardChoix2) {
            setCardChoix2(card);
        } else {
            setCardChoix1(card);
        }

        setCards((cards) => {
            let array = Array();
            for (const card of cards) {
                let updatedCard = card;
                if (card.id == idCard) {
                    updatedCard = {
                        ...card,
                        state: true
                    };
                }
                array.push(updatedCard);
            }
            return array;
        })
    }

    function reset() {
        cardChoix1.state = false;
        cardChoix2.state = false;
        setCards((cards) => {
            let array = Array();
            for (const card of cards) {
                var updateCard = card;
                if (updateCard.id == cardChoix1.id) {
                    updateCard = cardChoix1;
                }
                if (updateCard.id == cardChoix2.id) {
                    updateCard = cardChoix2;
                }
                array.push(updateCard);
            }
            return array;
        });
        setCardChoix1(null);
        setCardChoix2(null);
        setNeedToReset(false);
    }

    const nbCardDiscover = () => {
        let total = 0;
        for (const card of cards) {
            if (card.unlocked) total++;
        }
        return parseInt(total);
    }

    return (
        <>
            <div className="text-primary flex-wrap d-flex justify-content-center"
                style={{ height: "80vh" }}
            >
                {cards.map((element) => {
                    return (<MemoryCard key={element.id} card={element} handleClick={onCardClick} />);
                }
                )}
            </div>
            {nbCardDiscover() == cards.length && <Confetti />}
        </>
    );

}

function MemoryCard({ card, handleClick }) {

    const picsum = "https://picsum.photos/500";

    var show;
    if (card.state == true || card.unlocked == true) {
        show = "";
    } else {
        show = "active";
    }

    const onImageError = (error) => {
        console.log("failed to load image");
        console.log(error);
        error.target.src = card.nft.img + "?t=" + new Date().getTime();
    }


    return (
        <div className={`memoryCard flip-card ${show}`} onClick={() => handleClick(card.id)}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <Card>
                        <img src={card.nft.img} onError={onImageError} />
                    </Card>
                </div>
                <div className="flip-card-back">
                    <Card>
                        <Card.Img variant="top" src={picsum} />
                    </Card>
                </div>
            </div>
        </div >

    );

}

export default MemoryGame;