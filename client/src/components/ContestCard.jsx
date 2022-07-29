import { NavLink } from 'react-router-dom';
import { shortenAddress } from '../utils/utils';

const ContestCard = ({ title, addr, thumbnailUrl }) => {
    return (
        <div className="bg-[#f5f5f5] shadow-2xl shadow-[#aaa] rounded-xl border-solid border-1 border-transparent">
            <img className="object-cover rounded-sm w-[100%] h-32" src={thumbnailUrl} alt="thumbnail" />

            <div className="px-4 py-4 bg-[#f5f5f5] flex flex-col content-center">
                <h2 className="my-2 text-xl font-extrabold text-center">{title}</h2>
                <h3 className="text-[#333] text-xs font-regular text-center">{shortenAddress(addr)}</h3>
                <NavLink to={`/contests/${addr}`} className="bg-[#9106cd] hover:bg-[#36b1a0] py-2 px-4 inline-block mx-auto mt-4  rounded-lg text-white text-center text-sm">View Details</NavLink>
            </div>
        </div>
    )
}

export default ContestCard;