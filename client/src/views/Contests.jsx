import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Web3Context from '../store/web3-context';
import ContestCard from '../components/ContestCard';
import { getRandomThumbnail } from '../utils/utils';


const Contests = () => {
    const web3Ctxt = useContext(Web3Context);
    const { web3, factory, accounts } = web3Ctxt;
    const [contests, setContests] = useState([]);
    useEffect(() => {
        console.log('Inside useEffect of Contests');
        if(web3 && factory) {
            fetchContests();
        }
    }, [web3Ctxt]);

    const fetchContests = async () => {
        console.log('Inside fetchContests, factory => ', factory)
        const res = await factory.methods.getDummy().call();
        console.log('res =>', res);         
        setContests(res);
    }
    const setupEventListener = () => {
        factory.events.SupplyChainEvent().on("data", async function (e) {
            console.log('Event Triggerred 1=> ', e);
        });
        factory.events.SupplyChainEvent({}, async (error, data) => {
            console.log('Event Triggerred 2=> ', error, data);
        });

        factory.events.SupplyChainEvent({}, function (error, event) { console.log('Event Triggerred 3=> ', event); })
            .on('data', function (event) {
                console.log(event); // same results as the optional callback above
            })
            .on('changed', function (event) {
                // remove event from local database
            })
            .on('error', console.error);
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