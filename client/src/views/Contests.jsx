import { useState, useContext, useEffect } from 'react';
import Web3Context from '@/store/web3-context';
import ContestCard from '@/components/ContestCard';
import Message from '@/components/Message';
import Loader from '@/components/Loader';
import ContainedLayout from '@/layouts/Contained';
import { getRandomThumbnail } from '@/utils/utils';
import { NavLink } from 'react-router-dom';


const Contests = () => {
	const web3Ctxt = useContext(Web3Context);
	const { web3, factory, accounts } = web3Ctxt;
	const [contests, setContests] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log('Inside useEffect of Contests', web3Ctxt);
		if (web3 && factory) {
			fetchContests();
		}
	}, [web3Ctxt]);

	useEffect(() => {
		if (web3 && factory) {
			setupEventListener();
		}
	}, [web3, factory])

	const setupEventListener = () => {
		factory.events.NewContestCreated({}, function (error, event) {
			console.log('On NewContestCreated`, error, event =>', error, event);
		})
			.on('data', function (e) {
				console.log('On data, e =>', e);
			})
			.on('changed', function (e) {
				console.log('On changed, e =>', e);
			})
			.on('error', function (e) {
				console.log('On error, e =>', e);
			})
	}

	const fetchContests = async () => {
		console.log('Inside fetchContests, factory => ', factory)
		const res = await factory.methods.getContests().call();
		console.log('res =>', res);
		setLoading(false)
		setContests(res);
	}


	return (
		<ContainedLayout>
			<div className="grid mb-12">
				<h1 className="text-[#333] text-4xl font-bold text-center">Contests</h1>
			</div>
			<Loader show={loading} />
			{
				(contests.length > 0)
					?
					<div className="grid md:grid-cols-4 gap-y-16 gap-x-[80px]">
						{
							contests.map((c,index) => {
								return <ContestCard key={c.addr} title={c.title} addr={c.addr} link="/contests/1" thumbnailUrl={getRandomThumbnail(index)} />
							})
						}
					</div>
					:
					<Message type="error">
						There are no contests yet. <NavLink className="text-[#9106cd] hover:text-[#850cb9]" to="/contests/new">Click here</NavLink> to start one.
					</Message>
			}
		</ContainedLayout>
	)
}

export default Contests;