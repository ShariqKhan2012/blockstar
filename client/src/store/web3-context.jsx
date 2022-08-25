import { createContext, useEffect, useState } from 'react';
import getWeb3 from "@/getWeb3";
import ContestCloneFactory from "@/../../build/contracts/ContestCloneFactory.json";

const Web3Context = createContext({
  /*web3: undefined,
  factory: undefined,
  accounts: [],
  setAccounts: {},
  connectedToNetwork: false,
  setConnectedToNetwork: {},
  metamaskInstalled: false,
  setMetamaskInstalled: {},
  walletConnected: false,
  setWalletConnected: {}*/
});

export const Web3ContextProvider = (props) => {
  const [web3, setWeb3] = useState(undefined);
  //let web3 = null;
  const [factory, setFactory] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [connectedToNetwork, setConnectedToNetwork] = useState(false);
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    if (web3 === undefined) {
      initWeb3();
    }

    /*if (factory === undefined) {
      initFactory();
    }*/

    if(!accounts.length) {
      //connectWallet();
    }

    return () => {
      cleanup();
    }
  }, [/*web3, factory*/ /*, accounts*/]);

  useEffect(() => {
    if(web3 != undefined) {
      initFactory();
    }
  },[web3])

  const cleanup = () => {
    //Remove listeners
    //ethereum.removeListener('accountsChanged', handleAccountsChanged);
    //ethereum.removeListener('chainChanged', handleChainChanged);
  }

  const initWeb3 = () => {
    try {
      // Get network provider and web3 instance.
      const web3Instance = getWeb3();
      setWeb3(web3Instance);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // setContract(instance);
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

  const initFactory = async () => {
    console.log('Env =>', import.meta.env);
    // Get the contract instance.
    const chainId = await web3.eth.getChainId();
    console.log('chainId =>', chainId);
    //const networkId = await web3.eth.net.getId();
    const networkId = '5777';
    const deployedNetwork = ContestCloneFactory.networks[networkId];
    const instance = new web3.eth.Contract(
      ContestCloneFactory.abi,
      deployedNetwork && deployedNetwork.address,
    );
    /*const instance = new web3.eth.Contract(
      ContestCloneFactory.abi,
      '0xbE0eA9D5E21F5a6CF1774D67872b6Ada1120e91B',
    );*/
    setFactory(instance);
    console.log('Inside initFactory, instance =>', instance);
    console.log('Inside initFactory, factory =>', factory);
  }

  const connectWallet = async () => {
    console.log('Inside connectWallet');
    const res = await window.ethereum.request({ method: "eth_requestAccounts" });

    try {
      const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('_accounts', _accounts);
      setAccounts(_accounts);
    } catch (error) {
      if (error.code === 4001) {
        // User rejected request
      }

      setError(error);
    }
  }

  const handleAccountsChanged = (newAccounts) => {
    // Time to reload your interface with accounts[0]!
    console.log('Inside accountsChanged, newAccounts', newAccounts);
    setPlayerAddress(newAccounts.length ? newAccounts[0] : '');
  }
  //window.ethereum.on('accountsChanged', handleAccountsChanged);

  const handleChainChanged = (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
  }
  //ethereum.on('chainChanged', handleChainChanged);


  /*interface ProviderMessage {
    type: string;
    data: unknown;
  }
  ethereum.on('message', handler: (message: ProviderMessage) => void)
  */
  const handleProviderMessage = (ProviderMessage) => {
    console.log('ProviderMessage type', ProviderMessage.type);
    console.log('ProviderMessage data', ProviderMessage.data);
  }
  //ethereum.on('message', handleProviderMessage);

  const contextValue = {
    web3: web3,
    factory: factory,
    accounts: accounts,
    setAccounts: setAccounts,
    connectedToNetwork: connectedToNetwork,
    setConnectedToNetwork: setConnectedToNetwork,
    metamaskInstalled: metamaskInstalled,
    setMetamaskInstalled: setMetamaskInstalled,
    walletConnected: walletConnected,
    setWalletConnected: setWalletConnected,
  }

  console.log('contextValue inweb3-context.jsx', contextValue)

  return (
    <Web3Context.Provider value={contextValue}>
      {props.children}
    </Web3Context.Provider>
  )
}

export default Web3Context;