import Web3 from "web3";
import { MAINNET, RINKEBY, GANACHE_UI, getAppChainId } from "./utils/utils";

const fetchWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      console.log('0000');
      if (window.ethereum) {
        console.log(1111);
        const web3 = new Web3(window.ethereum);
        try {
          console.log("Modern web3 detected.");

          // Request account access if needed
          //await window.ethereum.enable();
          // Accounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        console.log(2222);
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        console.log(3333);
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:7545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });
}

const getWeb3 = () => {
  /*const provider = new Web3.providers.HttpProvider(
    "http://127.0.0.1:7545"
    //"https://rinkeby.infura.io/v3/d5a59a5f9b804981a1547791c8abb69a"
  );
  const web3 = new Web3(provider);
  console.log("No web3 instance injected, using Local web3.");
  return web3;*/

  const appChainId = getAppChainId();
  console.log('appChainId => ', appChainId)

  if (window.ethereum && window.ethereum.chainId == appChainId) {
    const web3 = new Web3(window.ethereum);
    try {
      console.log("Modern web3 detected.");

      // Request account access if needed
      //await window.ethereum.enable();
      // Accounts now exposed
      return web3;
    } catch (error) {
      reject(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3 && window.web3.currentProvider.chainId == appChainId) {
    // Use Mist/MetaMask's provider.
    //const web3 = window.web3;
    
    const web3 = new Web3(window.web3.currentProvider);
    
    console.log("Injected web3 detected. =>", web3);
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    let chainUrl = 'https://rinkeby.infura.io/v3/d5a59a5f9b804981a1547791c8abb69a';

    if(appChainId == GANACHE_UI) {
      chainUrl = "http://127.0.0.1:7545";
    }
    else if(appChainId == MAINNET) {
      chainUrl = 'https://rinkeby.infura.io/v3/d5a59a5f9b804981a1547791c8abb69a';
    }
    const provider = new Web3.providers.HttpProvider(
      chainUrl
    );
    const web3 = new Web3(provider);
    console.log("No web3 instance injected, using Local web3 with chainUrl", chainUrl, appChainId);
    return web3;
  }
}
export default getWeb3;

