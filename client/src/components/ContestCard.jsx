import { NavLink } from 'react-router-dom';
import { shortenAddress } from '../utils/utils';

const ContestCard = ({ title, addr, thumbnailUrl }) => {
    return (
        <div className="rounded-lg p-6 bg-[#fafafa] border-[1px] border-[#ddd] shadow-sm">
            <img className="object-cover rounded-sm w-[100%] h-32" src={thumbnailUrl} alt="thumbnail" />

            <div className="px-4 pt-4 flex flex-col content-center">
                <h2 className="my-2 text-xl font-extrabold text-center">{title}</h2>
                <h3 className="text-[#333] text-xs font-regular text-center">{shortenAddress(addr)}</h3>
                <NavLink to={`/contests/${addr}`} className="bg-[#9106cd] hover:bg-[#850cb9] py-2 px-4 inline-block mx-auto mt-4 rounded-lg text-white text-center text-sm shadow-md shadow-gray-400/50">View Details</NavLink>
            </div>
        </div>
    )
}

export default ContestCard;