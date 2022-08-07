import { NavLink } from 'react-router-dom';
import Button from './Button';

const Contestant = (props) => {
    const handleVote = () => {
        props.onVote(props.address);
    }
    return (
        <div className="bg-[#f9f9f9] border-[1px] border-[#ddd] rounded-lg p-3 md:p-6">
            <h2 className="text-xs md:text-ssm text-[#555] text-center">{props.address}</h2>
            <div className="px-4 mt-8 flex justify-around">
                <NavLink to={`/contests/${props.contest}/${props.address}`} className="px-2 py-1 rounded-md border-2 min-w-[100px] border-[#9106cd] text-[#9106cd] hover:text-[#850cb9] text-sm text-center font-bold">View</NavLink>
                {!props.voteDisabled && <button onClick={handleVote} className="px-2 py-1 rounded-md border-2 min-w-[100px] border-[#00c9b7] text-[#04aa9b] hover:text-[#36b1a0] text-sm text-center font-bold">Vote</button>}
            </div>
        </div>
    )
}

export default Contestant;