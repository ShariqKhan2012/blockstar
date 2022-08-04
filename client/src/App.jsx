import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Footer } from './components';
import Dialog from './components/Dialog';
import { Home, Contests, NewContest, ContestDetails, Contestants, ContestantDetails, NotFound  } from './views';
import getWeb3 from "./getWeb3";
import Web3Context from './store/web3-context';
import ContestCloneFactory from "../../build/contracts/ContestCloneFactory.json";
//require ('dotenv').config({path: '../.env'});
import './App.css';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [walletChainId, setWalletChainId] = useState('0x0');
  const [factory, setFactory] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [walletInstalled, setWalletInstalled] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    initWeb3();
  }, [])

  const initWeb3 = async () => {
    try {
      console.log('Entering initWeb3');
      const _web3 = getWeb3();
      console.log('Env =>', import.meta.env);

      //const chainId = await _web3.eth.getChainId();
      console.log('_web3 =>', _web3);
      console.log('walletChainId =>', walletChainId);

      //const networkId = await web3Instancewwwwwwwwwwwwwwwww.eth.net.getId();
      const networkId = '5777';
      console.log('networkID =>', networkId);
      const deployedNetwork = ContestCloneFactory.networks[networkId];
      const _factory = new _web3.eth.Contract(
        ContestCloneFactory.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const _accounts = await _web3.eth.getAccounts();
      console.log('Accounts => ', _accounts);

      const _walletInstalled = Boolean(!!window.ethereum);

      const isUnlocked = await window?.ethereum?._metamask.isUnlocked();
      console.log('isUnlocked =>', { isUnlocked });
      const _walletConnected = Boolean(_walletInstalled && isUnlocked && _accounts.length);

      console.log('_walletInstalled => ', _walletInstalled);
      console.log('_walletConnected => ', _walletConnected);

      setWeb3(_web3);

      if (window.ethereum) {
        setWalletChainId(window.ethereum.chainId);
      }
      else if (window.web3) {
        setWalletChainId(window.web3.currentProvider.chainId);
      }

      setFactory(_factory);
      setAccounts(_accounts);
      setWalletInstalled(_walletInstalled);
      setWalletConnected(_walletConnected);

      if (window.ethereum) {
        setupWeb3Listeners();
      }

      //Other potentially useful variables
      /*const isListening = await _web3.eth.net.isListening();
      console.log('isListening => ', isListening);
      const isUnlocked = await window?.ethereum?._metamask.isUnlocked();
      console.log('isUnlocked =>', { isUnlocked });*/

    } catch (error) {
      // Catch any errors for any of the above operations.
      /*alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );*/
      setShowDialog(true);
      console.error('Error in initWeb3 =>', error);
    }
  };

  const setupBlockchainListeners = () => {
    //myContract.events.NewContestCreated() will only return NewContestCreated events from the 
    //specific contract address that you used to create the web3 contract myContract

    //web3.eth.subscribe('logs', ...) will subscribe to all 
    //blockchain events by default.

    //Subscribes to an event and unsubscribes immediately after the 
    //first event or error. Will only fire for a single event.
    /*factory.once('NewContestCreated', {
      filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0
    }, function (error, event) { console.log(event); });

    //Same as events but receives all events from this smart contract. 
    //Optionally the filter property can filter those events.
    factory.getPastEvents('NewContestCreated', {
      filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: 'latest'
    }, function (error, events) { console.log(events); })
      .then(function (events) {
        console.log(events) // same results as the optional callback above
      });


    factory.events.NewContestCreated().on("data", async function (e) {
      console.log('Event Triggerred 1=> ', e);
    });
    factory.events.NewContestCreated({}, async (error, data) => {
      console.log('Event Triggerred 2=> ', error, data);
    });

    factory.events.NewContestCreated({}, function (error, event) { console.log('Event Triggerred 3=> ', event); })
      .on('data', function (event) {
        console.log(event); // same results as the optional callback above
      })
      .on('changed', function (event) {
        // remove event from local database
      })
      .on('error', console.error);
  }


  //Past Events for this contract.
  factory.getPastEvents('NewContestCreated', { //use "allEvents" to gt all the past events
    filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0,
    toBlock: 'latest'
  }, function (error, events) { console.log(events); })
    .then(function (events) {
      console.log(events) // same results as the optional callback above
    });
  //There is a similar function for getPastLogs


  //web3.eth.clearSubscriptions()
  var subscription = web3.eth.subscribe('logs', {
    address: '0x123456..',
    topics: ['0x12345...']
  }, function (error, result) {
    if (!error)
      console.log(result);
  })
    .on("connected", function (subscriptionId) {
      console.log(subscriptionId);
    })
    .on("data", function (log) {
      console.log(log);
    })
    .on("changed", function (log) {
    });

  // unsubscribes the subscription
  subscription.unsubscribe(function (error, success) {
    if (success)
      console.log('Successfully unsubscribed!');
  });*/


    /*
    web3.eth.sendTransaction({from: '0x123...', data: '0x432...'})
  .once('sending', function(payload){ ... })
  .once('sent', function(payload){ ... })
  .once('transactionHash', function(hash){ ... })
  .once('receipt', function(receipt){ ... })
  .on('confirmation', function(confNumber, receipt, latestBlockHash){ ... })
  .on('error', function(error){ ... })
  .then(function(receipt){
      // will be fired once the receipt is mined
  // });
  */
  }

  const setupWeb3Listeners = () => {
    console.log('Inside setupWeb3Listeners')

    const handleChainChanged = (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      console.log('Chain changed. chainId => ' + chainId + ' and walletChainId => ' + walletChainId);
      if (chainId != walletChainId) {
        initWeb3();
      }
      //setWalletChainId(chainId);
      //window.location.reload();
    }
    ethereum.on('chainChanged', handleChainChanged);

    const handleWalletConnected = (chainId) => {
      //May be test if the wallet is able to send RPC calls to chainID here?
      //ethereum.isConnected():
      console.log('Wallet Connected ', chainId);
      //setWalletConnected(true);
    }
    window.ethereum.on('connect', handleWalletConnected);

    const handleWalletDisconnected = (ProviderRpcError) => {
      //May be test if the wallet is able to send RPC calls to chainID here?
      //ethereum.isConnected():
      console.log('Wallet disconnected ', ProviderRpcError);
      //setWalletConnected(false);
    }
    window.ethereum.on('disconnect', handleWalletDisconnected);

    const handleAccountsChanged = (newAccounts) => {
      // Time to reload your interface with accounts[0]!
      let isConnected = newAccounts.length ? true : false;
      console.log('Inside accountsChanged, isConnected', isConnected);
      console.log('Inside accountsChanged, newAccounts', newAccounts);

      setAccounts(newAccounts);
      setWalletConnected(isConnected);
    }
    window.ethereum.on('accountsChanged', handleAccountsChanged);
  }

  const hideDialog = () => {
    setShowDialog(false);
  }

  const switchNetwork = async () => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: getAppChainId() }],
      });
      console.log("You have succefully switched to Rinkeby")
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      console.log("switchError", switchError);
      if (switchError.code === 4902) {
        console.log("This network is not available in your metamask, please add it")
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [getChainConfig(getAppChainId())],
          });
        } catch (addError) {
          // handle "add" error
          console.log("Failed to add the network =>", addError)
        }
      }
      // handle other "switch" errors
      console.log("Failed to switch to the network => ", switchError)
    }
  }



  return (
    <Web3Context.Provider
      value={{
        web3, factory, accounts, setAccounts,
        walletInstalled, setWalletInstalled,
        walletConnected, setWalletConnected,
        walletChainId, setWalletChainId
      }}>
      <div className="flex min-h-screen min-w-full flex-col justify-between">
        <Navbar />
        <Dialog
          show={showDialog}
          title="Error"
          msg="Failed to load web3, accounts, or contract. Check console for details"
          onOk={hideDialog}
          okLabel="OK"
        //onCancel={() => alert(456)}
        //cancelLabel="No"
        />
          <Routes>
            <Route path="/" exact caseSensitive={false} element={<Home />} />
            <Route path="/contests/new" exact caseSensitive={false} element={<NewContest />} />
            <Route path="/contests/:id/:cId" exact caseSensitive={false} element={<ContestantDetails />} />
            <Route path="/contests/:id" exact caseSensitive={false} element={<ContestDetails />} />
            <Route path="/contests" exact caseSensitive={false} element={<Contests />} />
            <Route path="/contestants" exact caseSensitive={false} element={<Contestants />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        <Footer />
      </div>
    </Web3Context.Provider>
  )
}

export default App
