import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import GoldenGames from '../artifacts/contracts/GoldenGames.sol/GoldenGames.json';

const contractAdress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAdress, GoldenGames.abi, signer);


const contentId = 'QmV6aMKL6uWXz266sLFPFDqWgRsFGnEedrmgyxN8Yv1eYo';

function Home() {
    const [totalMinted, setTotalMinted] = useState(0);
    const [met, setMetaDataURI] = useState(0);
    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const count = await contract.count();
        setTotalMinted(parseInt(count));
        setMetaDataURI(`${contentId}/${count}.json`);
    };

    const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${getCount()}.jpg`;

    const mintToken = async () => {
        const connection = contract.connect(signer);
        const addr = await signer.getAddress();
        console.log(addr);
        console.log(met);
        contract.payToMint(addr, met, {
            value: ethers.utils.parseEther('0.05'),
        }).then(result => {
            getCount();
            console.log("transaction result : ");
            console.log(result);
        }).catch(error => {
            console.log(error);
        }
        );

        await result.wait();
        console.log("tutut");
        console.log(result);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h3>Home</h3>

                <button onClick={mintToken}>
                    mintToken !
                </button>
            </header>
        </div>
    )

}

export default Home;