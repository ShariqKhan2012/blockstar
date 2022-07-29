import { useContext, useState } from 'react';
import Web3Context from "../store/web3-context";
import Button from "./Button";
import Dialog from './Dialog';
import Toast from './Toast';
import { shortenAddress, getAppChainId, getChainConfig, getNetworkName } from '../utils/utils';

const ConnnectWalletButton = () => {
    const web3Ctxt = useContext(Web3Context);
    const { accounts, setAccounts, walletConnected } = web3Ctxt;
    const [toastVisible, setToastVisible] = useState(false);
    const [notifType, setNotifType] = useState('warning');
    const [msg, setMsg] = useState('');

    let btnType = 'danger';

    if (walletConnected) {
        if (getAppChainId() == web3Ctxt.walletChainId) {
            btnType = 'secondary';
        }
        else { //Connect, but to the wrong network
            btnType = 'warning';
        }
    }

    const connectWallet = async () => {
        console.log('Inside connectWallet');
        setToastVisible(false);
        if (walletConnected && getAppChainId() == web3Ctxt.walletChainId) {
            //do nothing and return
            console.log('Do nothing');
            return;
        }
        try {
            const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('_accounts', _accounts);
            setAccounts(_accounts);
            console.log('_accounts Done', _accounts);


            try {
                //Connected successfully, now try to switch to the appropriate network
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: getAppChainId() }],
                });
                console.log("Succefully switched to Rinkeby")
            }
            catch (switchError) { //Connected successfully BUT failed switch to the appropriate network
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
                        setMsg(getNetworkName(getAppChainId()) + " network is not available in your metamask, please add it")
                        setNotifType('error');
                        setToastVisible(true);
                    }
                }
                else { // handle other "switch" errors
                    console.log("Failed to switch to the network => ", switchError);
                    setMsg("Failed to switch to the network")
                    setNotifType('error');
                    setToastVisible(true);
                }
            }


        } catch (error) { //Failed to connect
            console.log(error);
            if (error.code === 4001) {
                // User rejected request
                console.log("User rejected the request to connect the wallet");
                setMsg("User rejected the request to connect the wallet");
                console.log(111);
                setNotifType('error');
                console.log(222);
                setToastVisible(true);
                console.log(333);
            }
            else {
                console.log("Failed to connect to the wallet");
                setMsg("Failed to connect to the wallet");
                setNotifType('error');
                setToastVisible(true);
            }
        }
    }

    return (
        <>
            {/*
        <Dialog
          show={false}
          title="Notice"
          msg="This Dapp lives on Rinkeby network. Please switch to Rinkey to be able to create a contest"
          onOk={switchNetwork}
          okLabel="Yes"
          onCancel={() => alert(456)}
          cancelLabel="No"
        />
        */}
            <Toast show={toastVisible} type={notifType} msg={msg} />
            <Button type={btnType} onClick={connectWallet} label={walletConnected ? "Connected" : "Connect Wallet"} />
            {
                walletConnected
                &&
                <small className="block text-xs text-center">{shortenAddress(accounts[0])}</small>
            }
        </>
    )
}

export default ConnnectWalletButton;