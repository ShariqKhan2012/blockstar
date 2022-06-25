import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Web3Context from '../store/web3-context';

const ContestCard = ({ name, avatarUrl, link }) => {
    const web3Ctxt = useContext(Web3Context);
    const {web3, factory, accounts} = web3Ctxt;

    useEffect(() => {
        fetchContests();
    })

    const fetchContests = async() => {
        const res = await factory.methods.getContests().call();
        console.log('contests =>', res);
    }

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

const Contests = () => {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-teal text-3xl font-bold mb-4">Contests</h1>
            <div className="grid grid-cols-4 gap-y-16 gap-x-[80px]">
                <ContestCard name="Corey Anderson" link="/contests/1" avatarUrl="/src/images/1.jpg" />
                <ContestCard name="Corey Anderson" link="/contests/2" avatarUrl="/src/images/2.jpg" />
                <ContestCard name="Corey Anderson" link="/contests/3" avatarUrl="/src/images/3.jpg" />
                <ContestCard name="Corey Anderson" link="/contests/4" avatarUrl="/src/images/4.jpg" />
                <ContestCard name="Corey Anderson" link="/contests/5" avatarUrl="/src/images/5.jpg" />
                <ContestCard name="Corey Anderson" link="/contests/6" avatarUrl="/src/images/6.jpg" />
                <ContestCard name="Corey Anderson" link="/contests/7" avatarUrl="/src/images/7.jpg" />
                <ContestCard name="Corey Anderson" link="/contests/8" avatarUrl="/src/images/1.jpg" />
            </div>
        </div>
    )
}

export default Contests;