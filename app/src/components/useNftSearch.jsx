import { BlockChain } from './BlockChain'
import { useEffect, useState } from 'react'
import Nft from './Nft';

function useNftSearch(pageNumber, onlyMyNft, searchId, searchAdress) {

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
        let data;
        data = await BlockChain.getSpecifiedNfts(pageNumber)
        if (searchId) {
            data = BlockChain.searchId(data, searchId);
        }
        if (onlyMyNft) {
            data = await BlockChain.onlyMyNft(data);
        }

        if (data && data.length > 0) {
            console.log(data);
            setNfts((nfts) => {
                return [...nfts, ...data];
            });
        }
        setLoading(false);
    }

    return { error, loading, nfts, hasMore };

}

export default useNftSearch;

