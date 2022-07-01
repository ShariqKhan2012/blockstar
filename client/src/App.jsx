import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { Home, Contests, NewContest, ContestDetails, Contestants, ContestantDetails, Participate, Profile, Dashboard, SUDashboard } from './views';
import getWeb3 from "./getWeb3";
import Web3Context from './store/web3-context';
import ContestCloneFactory from "../../build/contracts/ContestCloneFactory.json";
//require ('dotenv').config({path: '../.env'});
function App() {
  //let web3 = null;
  const [web3, setWeb3] = useState(undefined);
  //let web3 = null;
  const [factory, setFactory] = useState(undefined);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    initWeb3();
  }, [])

  const initWeb3 = async () => {
    try {
      console.log('Entering initWeb3');
      // Get network provider and web3 instance.
      const web3Instance = await getWeb3();
      console.log('Inside initWeb3 web3Instance =>', web3Instance);
      //console.log('Inside initWeb3 web3  =>', web3);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // setContract(instance);
      setWeb3(web3Instance);


      console.log('Env =>', import.meta.env);
      // Get the contract instance.
      console.log('web3 inside initFactory =>', web3);
      const chainId = await web3Instance.eth.getChainId();
      console.log('chainId =>', chainId);
      //const networkId = await web3Instancewwwwwwwwwwwwwwwww.eth.net.getId();
      const networkId = '5777';
      console.log('networkID =>', networkId);
      const deployedNetwork = ContestCloneFactory.networks[networkId];
      const instance = new web3Instance.eth.Contract(
        ContestCloneFactory.abi,
        deployedNetwork && deployedNetwork.address,
      );
      /*const instance = new web3.eth.Contract(
        ContestCloneFactory.abi,
        '0xbE0eA9D5E21F5a6CF1774D67872b6Ada1120e91B',
      );*/
      setFactory(instance);
      console.log('Inside initFactory, instance =>', instance);

      //setAccounts(_accounts);
      //initFactory(web3Instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  return (
    <>
      <Web3Context.Provider value={{ web3, factory, accounts, setAccounts }}>
        <div className="flex min-h-screen min-w-full flex-col justify-between">
          <Navbar />
          <Routes>
            <Route path="/" exact caseSensitive={false} element={<Home />} />
            <Route path="/contests/new" exact caseSensitive={false} element={<NewContest />} />
            <Route path="/contests/:id" exact caseSensitive={false} element={<ContestDetails />} />
            <Route path="/contests" exact caseSensitive={false} element={<Contests />} />
            <Route path="/contestants/:id" exact caseSensitive={false} element={<ContestantDetails />} />
            <Route path="/contestants" exact caseSensitive={false} element={<Contestants />} />
            <Route path="/participate" exact caseSensitive={false} element={<Participate />} />
            <Route path="/profile" exact caseSensitive={false} element={<Profile />} />
            <Route path="/dashboard" exact caseSensitive={false} element={<Dashboard />} />
            <Route path="/su-dashboard" exact caseSensitive={false} element={<SUDashboard />} />
          </Routes>

          <Footer />
        </div>
      </Web3Context.Provider>
    </>
  )
}

export default App
