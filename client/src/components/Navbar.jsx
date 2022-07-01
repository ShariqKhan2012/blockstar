import { NavLink } from 'react-router-dom';
//import Logo from '../logo.png'
import Logo from '../assets/logo.svg'
import ConnnectWalletButton from './ConnectWalletButton';

const NavItem = ({ title, url, classProps }) => {
    return (
        <li className="p-2">
            <NavLink to={url} className={`font-medium text-md ${classProps}`}>{title}</NavLink>
        </li>
    )
}

const Navbar = () => {
    return (
        <nav className="max-w-7xl w-full mx-auto p-4 flex justify-between align-middle list-none">
            <span><img width="120" className="block w-50 h-auto" src={Logo} alt="logo" /></span>
            <ul className="flex">
                <NavItem title="Home" url="/" classProps="" />
                <NavItem title="Contests" url="/contests" classProps="" />
                <NavItem title="Participate" url="/participate" classProps="" />
                <NavItem title="Profile" url="/profile" classProps="" />
                <NavItem title="Super-Admin Dashboard" url="/su-dashboard" classProps="" />
            </ul>
            <ul className="flex">
                <NavItem title="Start A Contest" url="/contests/new" classProps="bgt-[#9106cd] bg-[#00c9b7] hover:bg-[#36b1a0] py-2 px-6  inline-block rounded-lg text-white text-center" />
                <li className="p-2"><ConnnectWalletButton /></li>
            </ul>
        </nav>
    )
}

export default Navbar;