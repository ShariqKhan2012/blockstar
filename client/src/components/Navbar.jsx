import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
//import Logo from '../logo.png'
import Logo from '../assets/logo.svg'
import ConnnectWalletButton from './ConnectWalletButton';

import Web3Context from '../store/web3-context';
import { useEffect } from 'react';

const NavItem = ({ title, url, classProps }) => {
    return (
        <li className="px-4 py-2 flex itemsz-center">
            <NavLink to={url} className={`font-bold text-md ${classProps}`}>{title}</NavLink>
        </li>
    )
}

const Navbar = () => {
    const web3Ctxt = useContext(Web3Context);

    return (
        <div className="bg-white border-2 border-gray-100 shadow-2xl shadow-gray-200 z-10">
            <nav className="max-w-7xl w-full mx-auto p-1 flex justify-between align-middle items-center list-none">
                <span><img width="120" className="block w-50 h-auto" src={Logo} alt="logo" /></span>
                <ul className="flex">
                    <NavItem title="Home" url="/" classProps="" />
                    <NavItem title="Contests" url="/contests" classProps="" />
                    <NavItem title="About" url="#" classProps="" />
                    <NavItem title="Contact" url="#" classProps="" />
                </ul>
                <ul className="flex items-start">
                    <NavItem title="Start A Contest" url="/contests/new" classProps="bg-[#9106cd] hover:bg-[#850cb9] shadow-lg shadow-gray-400/50 py-2 px-6  inline-block rounded-lg text-white text-center" />
                    <li className="p-2">
                        <ConnnectWalletButton />
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;