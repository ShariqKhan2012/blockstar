import { NavLink } from 'react-router-dom';

const ContestantCard = ({ name, avatarUrl, link }) => {
    return (
        <div className="shadow-2xl shadow-[#aaa] bg-[#9106cd] rounded-xl border-solid border-1 border-transparent">
            <div className=" px-4 py-8">
                <h1 className="mt-8 mb-4 text-white text-2xl font-extrabold">{name}</h1>
                <h3 className="text-[#ccc] text-md font-regular">Singing Star</h3>
                <h3 className="mb-2 text-[#ccc] text-xs font-regular">Kolkata</h3>
            </div>
            <div className="bg-[#9106cd] p-4 torigin-bottom -skew-y-12"></div>
            {/*<div className="border-b-[#f5f5f5] border-r-transparent border-t-transparent border-l-transparent w-0 h-0 border-solid border-b-[105px] border-l-[20rem] border-t-0 border-r-0"></div>*/}
            <div className="px-4 bg-[#f5f5f5]">
                <img className="object-cover rounded-full w-32 h-32 ring-2 ring-transparent relative -top-16 ml-auto -mr-4 blockz" src={avatarUrl} alt="avatar" />
            </div>
            <div className="px-4 -mt-16 pb-4 bg-[#f5f5f5]">
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