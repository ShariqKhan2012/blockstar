import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
//import Logo from '../logo.png'
import Logo from '@/assets/logo.png'
import ConnnectWalletButton from './ConnectWalletButton';

import Web3Context from '@/store/web3-context';

const NavItem = ({ title, url, classProps }) => {
    return (
        <li className="mr-8 py-2 flex itemsz-center">
            <NavLink to={url} className={`font-bold text-md ${classProps}`}>{title}</NavLink>
        </li>
    )
}

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const web3Ctxt = useContext(Web3Context);

    const handleNav = () => {
        setShowNav(!showNav);
    }

    return (
        <>

            <nav className="bg-white border-2 border-gray-100 shadow-2xl shadow-gray-200 z-10">
                <div className="max-w-7xl w-full container flex flex-wrap justify-between items-center mx-auto p-1">
                    <NavItem url="/" classProps="flex items-center" title={
                        <>
                            <img src={Logo} className="mr-3 h-6 sm:h-12" alt="Dappstar Logo" />
                            <span className="self-center text-2xl font-bold whitespace-nowrap bg-gradient-to-r from-[#00c9b7] to-[#9106cd] text-transparent bg-clip-text">DappStar</span>
                        </>
                    }/>
                    <button onClick={handleNav} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-[#9106cd] rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className={`${showNav ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="flex flex-col pl-2 py-2 mt-4 rounded-lg border border-gray-100 md:flex-row msd:space-x-8 md:mt-0 msd:text-sm msd:font-medium md:border-0 bg-white shadow-2xl md:shadow-none justify-between align-middle md:items-center">
                            
                            <li className="mr-8 py-2 flex items-center">
                                <a className="font-bold text-md" href="https://shariqkhan.in">
                                    <div className="text-4xl text-[#9106cd]">
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" height="0.8em" width="0.8em" id="Layer_1"  version="1.1" viewBox="0 0 20 20" space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M15.45,7L14,5.551V2c0-0.55-0.45-1-1-1h-1c-0.55,0-1,0.45-1,1v0.553L9,0.555C8.727,0.297,8.477,0,8,0S7.273,0.297,7,0.555  L0.55,7C0.238,7.325,0,7.562,0,8c0,0.563,0.432,1,1,1h1v6c0,0.55,0.45,1,1,1h3v-5c0-0.55,0.45-1,1-1h2c0.55,0,1,0.45,1,1v5h3  c0.55,0,1-0.45,1-1V9h1c0.568,0,1-0.437,1-1C16,7.562,15.762,7.325,15.45,7z"/></svg>
                                    </div>
                                </a>
                            </li>
                            <NavItem title="Contests" url="/contests" classProps="" />
                            <NavItem title="Credits" url="/credits" classProps="" />

                            <NavItem title="Start A Contest" url="/contests/new" classProps="bg-[#9106cd] hover:bg-[#850cb9] shadow-lg shadow-gray-400/50  py-2 px-6  items-start inline-block rounded-lg text-white text-center" />
                            <li className="py-2">
                                <ConnnectWalletButton />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;