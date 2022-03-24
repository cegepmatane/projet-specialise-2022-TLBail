import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import Discover from "./pages/Discover";
import Home from './pages/Home'
import Mint from "./pages/Mint";
import NftMemoryPage from "./pages/NftMemoryPage";
import NftPage from "./pages/NftPage";
import NftPoolPage from "./pages/NftPoolPage";


function Routing() {
    return (

        <div>
            <HashRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/discover/:serie" element={<Discover />} />
                    <Route path="/nft/:tokenId" element={<NftPage />} />
                    <Route path="/nftmemory/:tokenId" element={<NftMemoryPage />} />
                    <Route path="/nftpool/:tokenId" element={<NftPoolPage />} />
                    <Route path="/mint" element={<Mint />} />
                </Routes>
            </HashRouter>


        </div>
    );
}

export default Routing;