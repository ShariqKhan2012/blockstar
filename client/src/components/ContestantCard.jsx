import { NavLink } from 'react-router-dom';

const ContestantCard = ({ name, avatarUrl, link }) => {
    return (
        <div className="shadow-2xl shadow-[#aaa] bg-[#9106cd] rounded-xl border-solid border-1 border-transparent">
            <div className=" px-4 py-8">
                <h1 className="mt-8 mb-4 text-white text-2xl font-extrabold">{name}</h1>
                <h3 className="text-[#ccc] text-md font-regular">Singing Star</h3>
                <h3 className="mb-8 text-[#ccc] text-xs font-regular">Kolkata</h3>
            </div>
            <div className="px-4 py-8 bg-[#f5f5f5]">
                <h2 className="relative text-sm font-bold">About me</h2>
                <p className="relative mt-2 text-[#444] text-sm font-regular">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam.
                </p>
            </div>
            <div className="px-4 tpy-4 bg-[#f5f5f5] flex justify-center">
                <NavLink to={link} className="bg-[#00c9b7] hover:bg-[#36b1a0] py-2 px-6  inline-block mx-auto my-4  rounded-lg text-white text-center">View Profile</NavLink>
            </div>
        </div>
    )
}

export default ContestantCard;