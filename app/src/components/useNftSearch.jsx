import { BlockChain } from './BlockChain'
import { useEffect, useState } from 'react'
import Nft from './Nft';
import { BlockChainMemory } from './BlockChainMemory';

function useNftSearch(pageNumber, setPageNumber, onlyMyNft, searchId, searchAdress, blockChainProvider) {

    const [loading, setLoading] = useState(false);
    const [nfts, setNfts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(false);



    useEffect(() => {
        setHasMore(true);
        setNfts([]);
    }, [onlyMyNft, searchAdress, searchId, blockChainProvider])

    useEffect(() => {
        console.log(pageNumber);
        setHasMore(true);
        setLoading(true);
        setError(false);
        getData();
    }, [pageNumber, onlyMyNft, searchAdress, searchId, blockChainProvider])

    const getData = async () => {
        if (searchId && !searchAdress && !onlyMyNft) {
            console.log("skip");
            setNfts([new Nft(searchId)]);
            setLoading(false);
            return;
        }

        if (!hasMore) {
            return;
        }

        let data;
        data = await blockChainProvider.getSpecifiedNfts(pageNumber)
        if (data.length < 10) {
            setHasMore(false);
            setLoading(false);
        }
        if (onlyMyNft) {
            data = await blockChainProvider.onlyMyNft(data);
        }
        if (searchAdress) {
            data = await blockChainProvider.searchAdress(data, searchAdress);
        }
        if (searchId) {
            data = blockChainProvider.searchId(data, searchId);
        }



        if (data && data.length > 0) {
            console.log(data);
            setNfts((nfts) => {
                return [...nfts, ...data];
            });

            setLoading(false);
        } else if (searchId && nfts.length > 0) {
            setLoading(false);
        } else {
            setTimeout(() => {
                setPageNumber(pageNumber => {
                    return pageNumber + 1;
                })
            }, 100);
        }
    }

    return { error, loading, nfts, hasMore };

}

export default useNftSearch;

