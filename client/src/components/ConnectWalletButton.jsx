import { useContext, useState } from 'react';
import Web3Context from "@/store/web3-context";
import Button from "./Button";
import Toast from './Toast';
import Popper from './Popper';
import { shortenAddress, getAppChainId, getChainConfig, getNetworkName } from '../utils/utils';

const ConnnectWalletButton = () => {
    const web3Ctxt = useContext(Web3Context);
    const { accounts, setAccounts, walletConnected, walletInstalled } = web3Ctxt;
    const [toastVisible, setToastVisible] = useState(false);
    const [notifType, setNotifType] = useState('warning');
    const [msg, setMsg] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const [infoText, setInfoText] = useState('');

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
        setToastVisible(false);
        if (walletConnected && getAppChainId() == web3Ctxt.walletChainId) {
            //do nothing and return
            return;
        }
        try {
            const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccounts(_accounts);

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
                setNotifType('error');
                setToastVisible(true);
            }
            else {
                console.log("Failed to connect to the wallet");
                setMsg("Failed to connect to the wallet");
                setNotifType('error');
                setToastVisible(true);
            }
        }
    }

    const openPopper = () => {
        
        if (!walletInstalled) {
            setInfoText(<small >Please install Metamask to use all the features of the site</small>);
        }
        else if (!walletConnected) {
            setInfoText(<small >Your wallet is not connected to the site</small>)
        }
        else if (walletConnected && getAppChainId() == web3Ctxt.walletChainId) {
            setInfoText(
                <p className='text-left'>
                    <small >A/c: <span className="font-semibold">{shortenAddress(accounts[0])}</span></small><br />
                    <small >N/w: <span className="font-semibold">{getNetworkName(web3Ctxt.walletChainId)}</span></small><br />
                </p>
            )
        }
        else {
            setInfoText(
                <p className='text-left'>
                    <small >A/c: <span className="font-semibold">{shortenAddress(accounts[0])}</span></small><br />
                    <small >N/w: <span className="font-semibold">{getNetworkName(web3Ctxt.walletChainId)}</span></small><br />
                    <small className="text-orange-500">Please switch the MM network to <span className="font-bold">{getNetworkName(getAppChainId())}</span></small>
                </p>
            )
        }
        setShowInfo(true);
    }
    const closePopper = () => {
        setInfoText('')
        setShowInfo(false);
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
            <div className="flex items-center">
                <Button type={btnType} onClick={connectWallet} label={walletConnected ? "Connected" : "Connect Wallet"} />
                <div className="relative ml-4">
                    <button onClick={openPopper}>
                        <svg className="ml-2 shadow-sm" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" id="mainIconPathAttribute" fill="blue"></path> </svg>
                    </button>
                    <Popper show={showInfo} onClose={closePopper}>
                        {infoText}
                    </Popper>
                </div>

            </div>
        </>
    )
}

export default ConnnectWalletButton;