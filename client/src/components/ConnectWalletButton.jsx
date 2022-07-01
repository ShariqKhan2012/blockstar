import {useContext} from 'react';
import Web3Context from "../store/web3-context";
import Button from "./Button";

const ConnnectWalletButton = () => {
    const web3Ctxt = useContext(Web3Context);
    const { web3, factory, accounts, setAccounts } = web3Ctxt;

    const connectWallet = async () => {
        console.log('Inside connectWallet');
        const res = await window.ethereum.request({ method: "eth_requestAccounts" });

        try {
            const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('_accounts', _accounts);
            setAccounts(_accounts);
            console.log('_accounts Done', _accounts);
        } catch (error) {
            if (error.code === 4001) {
                // User rejected request
            }
            console.log(error);

            setError(error);
        }
    }

    return (
        <Button
            onClick={connectWallet}
            label="Connect Wallet"
        />
    )
}

export default ConnnectWalletButton;