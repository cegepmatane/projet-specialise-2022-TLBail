import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Discover from "./pages/Discover";
import Home from './pages/Home'
import Mint from "./pages/Mint";
import Nft from "./pages/Nft";


function Routing() {
    return (

        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/nft/:tokenId" element={<Nft />} />
                    <Route path="/mint" element={<Mint />} />
                </Routes>
            </BrowserRouter>


        </div>
    );
}

export default Routing;