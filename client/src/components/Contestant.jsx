import { NavLink } from 'react-router-dom';
import Button from './Button';
import Ribbon from './Ribbon';

const Contestant = (props) => {
    const handleVote = () => {
        props.onVote(props.address);
    }
    return (
        <div className="relative overflows-hidden bg-[#f9f9f9] border-[1px] border-[#ddd] rounded-lg p-3 md:p-6">
            <h2 className="text-xs md:text-ssm text-[#555] text-center">{props.address}</h2>
            <div className="px-4 mt-8 flex justify-around">
                <NavLink to={`/contests/${props.contest}/${props.address}`} className="px-2 py-1 rounded-md border-2 min-w-[100px] border-[#9106cd] text-[#9106cd] hover:text-[#850cb9] text-sm text-center font-bold">View</NavLink>
                {!props.voteDisabled && <button onClick={handleVote} className="px-2 py-1 rounded-md border-2 min-w-[100px] border-[#00c9b7] text-[#04aa9b] hover:text-[#36b1a0] text-sm text-center font-bold">Vote</button>}
            </div>
            {/*<div className="bg-[#9106cd] absolute -top-3 left-2 px-6 py-1 rounded-sm shadow-xl w-[150px] text-white text-sm text-center">Winner</div>
            <div className=" bg-[#9106cd] origin-top float-right  mr-0 shadow-xl text-white text-xs2 absolute top-5 right-5 w-72 text-center translate-x-[50%] rotate-[45deg]" >
                <div className="">WINNER</div>
    </div>*/}

            {/*}
            <div className="absolute -top-[5px] -right-[5px] z-[1] overflow-hidden w-[75px] h-[75px] text-right">
                <span className="absolute top-[19px] -right-[21px] text-xs font-bold text-white text-center rotate-[45deg] w-[100px] block bg-[#9106cd] before:content-[''] before:absolute before:left-0 before:top-[100%] before:-z-[1] before:border-[3px] before:border-l-[#591477] before:border-t-[#591477] before:border-r-transparent before:border-b-transparent      leading-5 shadow-[0_3px_10px_-5px_rgba(0,0,0,1)]   bg-gradient-to-b from-[#9106cd] to-[#591477]    after:content-[''] after:absolute after:right-0 after:top-[100%] after:-z-[1] after:border-[3px] after:border-r-[#591477] after:border-t-[#591477] after:border-l-transparent after:border-b-transparent">WINNER</span>
            </div>
            */}

            {props.isWinner && <Ribbon label="WINNER" />}


        </div>
    )
}

export default Contestant;