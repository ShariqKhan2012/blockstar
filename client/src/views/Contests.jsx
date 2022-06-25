import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Web3Context from '../store/web3-context';
import ContestCard from '../components/ContestCard';
import { getRandomThumbnail } from '../utils/utils';


const Contests = () => {
    const web3Ctxt = useContext(Web3Context);
    const {web3, factory, accounts} = web3Ctxt;
    const [contests, setContests] = useState([]);
    useEffect(() => {
        fetchContests();
    },[web3, factory, accounts]);

    const fetchContests = async() => {
        const res = await factory.methods.getContests().call();
        setContests(res);
        console.log('contests =>', res);
    }
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-teal text-3xl font-bold mb-4">Contests</h1>
            <div className="grid grid-cols-4 gap-y-16 gap-x-[80px]">
                {
                    contests.map((c) => {
                        return <ContestCard key={c.addr} title={c.title} addr={c.addr} link="/contests/1" thumbnailUrl={getRandomThumbnail(1, 6)} />
                    })
                }
            </div>
        </div>
    )
}

export default Contests;