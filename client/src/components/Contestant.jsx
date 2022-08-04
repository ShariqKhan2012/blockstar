import { NavLink } from 'react-router-dom';
import Button from './Button';

const Contestant = (props) => {
    const handleVote = () => {
        props.onVote(props.address);
    }
    return (
        <div className="bg-[#f9f9f9] border-[1px] border-[#ddd] rounded-lg p-4">
            <h2 className="text-sm font-medisum italic text-[#555] text-center">{props.address}</h2>
            <div className="px-4 mt-6 flex justify-around">
                <NavLink to={`/contests/${props.contest}/${props.address}`} className="text-[#9106cd] hover:text-[#850cb9]">View Profile</NavLink>
                {!props.voteDisabled && <button onClick={handleVote} className="text-[#00c9b7] hover:text-[#36b1a0]">Vote</button>}
            </div>
        </div>
    )
}

export default Contestant;