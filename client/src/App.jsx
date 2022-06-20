import {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { Home, Contests, NewContest, ContestDetails, Contestants, ContestantDetails, Participate, Profile, Dashboard, SUDashboard } from './views';
import getWeb3 from "./getWeb3";
//require ('dotenv').config({path: '../.env'});
function App() {
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const setUp = async () => {
      try {
        // Get network provider and web3 instance.
        const web3Instance = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const _accounts = await web3.eth.getAccounts();
  
        console.log('Accounts =>', _accounts);
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3Instance);
        setAccounts(_accounts);
        setContract(instance);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };

    //setUp();
  })
  

  return (
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
  )
}

export default App
