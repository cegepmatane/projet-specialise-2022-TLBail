import { BlockChain } from './BlockChain'
import { useEffect, useState } from 'react'
import Nft from './Nft';

function useNftSearch(pageNumber, setPageNumber, onlyMyNft, searchId, searchAdress) {

    const [loading, setLoading] = useState(false);
    const [nfts, setNfts] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setNfts([]);
    }, [onlyMyNft, searchAdress, searchId])

    useEffect(() => {
        console.log(pageNumber);
        setLoading(true);
        setError(false);
        getData();
    }, [pageNumber, onlyMyNft, searchAdress, searchId])

    const getData = async () => {
        if (searchId && !searchAdress && !onlyMyNft) {
            console.log("skip");
            setNfts([new Nft(searchId)]);
            setLoading(false);
            return;
        }

        let data;
        data = await BlockChain.getSpecifiedNfts(pageNumber)
        if (onlyMyNft) {
            data = await BlockChain.onlyMyNft(data);
        }
        if (searchAdress) {
            data = await BlockChain.searchAdress(data, searchAdress);
        }
        if (searchId) {
            data = BlockChain.searchId(data, searchId);
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

