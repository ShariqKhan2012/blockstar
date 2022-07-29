import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import Web3Context from '../store/web3-context';
import { getAppChainId, getNetworkName } from '../utils/utils';

const NewContest = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
    const web3Ctxt = useContext(Web3Context);
    console.log('web3Ctxt =>', web3Ctxt)

    const registerOptions = {
        title: { required: "This field is required" },
        fee: { required: "This field is required" },
    };

    const [toastVisible, setToastVisible] = useState(false);
    const [notifType, setNotifType] = useState('warning');
    const [msg, setMsg] = useState('');

    const onFormSubmit = async (data) => {
        console.log('onFormSubmit, web3Ctxt => ', web3Ctxt.accounts[0], web3Ctxt);
        let fee = web3Ctxt.web3.utils.toWei(data.fee, 'ether');

        setToastVisible(false);
        setLoading(true);
        try {
            await web3Ctxt.factory.methods.createClone(data.title, fee).send({ from: web3Ctxt.accounts[0] })
            //setError(false);
            console.log('success');
            setNotifType('success');
            setMsg('Success!!');
            setToastVisible(true);
        }
        catch (e) {
            console.log('Creation error 1=>', e)
            console.log('Creation error 2=>', e.code)
            //setError(true);
            setNotifType('error');
            if (e.code === 4001) {
                setMsg('Error: User rejected the request');
            }
            else {
                setMsg('There was an error');
            }
            setToastVisible(true);
        }
        console.log('Outside try-catch')
        setLoading(false);

        /*const formData = new FormData();
        formData.append("workshop", data.workshop);
        formData.append("participants", data.participants);
        formData.append("startdate", data.startdate);
        formData.append("selectedfile", data.selectedfile[0]);
        formData.append("establishmentdate", data.establishmentdate);
        console.log(data.selectedfile[0]);

        

        reset();
        const requestOptions = {
            method: "POST",
            // headers: { 'Content-Type': 'application/json' },
            body: formData
        };

        const response = await fetch(
            "http://localhost:3001/workshop",
            requestOptions
        );
        try {
            if (response.status == 200) {
                toast.success("Successfully added");
            }
        } catch {
            toast.error("Invalid");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        */
    }

    const onError = (err) => {
        console.log(err);
    }

    if (!web3Ctxt.walletInstalled) {
        return (
            <div className="max-w-7xl mx-auto p-4">
                <Message type="error">
                    You need to have MetaMask installed and activated on your browser to be able to continue.
                </Message>
            </div>
        )
    }

    if (!web3Ctxt.walletConnected) {
        return (
            <div className="max-w-7xl mx-auto p-4">
                <Message type="error">
                    Metamask not connected to the site. Click on the 'Connect' button to continue
                </Message>
            </div>
        )
    }
    console.log('web3Ctxt.currentChainId =>', web3Ctxt.currentChainId);
    console.log('getAppChainId =>', getAppChainId());

    //if (web3Ctxt.currentChainId != getAppChainId()) {
    if (getAppChainId() != web3Ctxt.walletChainId) {
        const appNetwokName = getNetworkName(getAppChainId());
        return (
            <div className="max-w-7xl mx-auto p-4">
                <Message type="error">
                    This Dapp lives on the {appNetwokName} chain. Click on the 'Switch' button to change to the {appNetwokName} network.
                </Message>
            </div>
        )
    }

    return (
        <div className="max-w-lg mx-auto py-16">
            <div className="p-8 bg-white rounded-lg">
                <Loader show={loading} />
                <Toast show={toastVisible} type={notifType} msg={msg} />
                <h1 className="text-teal text-3xl font-bold mb-4">Fill the contest details</h1>
                <form onSubmit={handleSubmit(onFormSubmit, onError)} className="mt-2">
                    <div className="mb-6">
                        <input name="title" {...register('title', registerOptions.title)} className="p-3 w-full border border-slate-300 rounded-md focus:outline-none" type="text" placeholder="Title of the contest " />
                        <small className="text-[#f00]">
                            {errors?.title && errors.title.message}
                        </small>
                    </div>
                    <div className="mb-6">
                        <input name="fee" {...register('fee', registerOptions.fee)} className="p-3 w-full  border border-slate-300 rounded-md focus:outline-none" type="number" min="0.00001" step="0.00001" placeholder="Participating fee (in Ethers)" />
                        <small className="text-[#f00]">
                            {errors?.fee && errors.fee.message}
                        </small>
                    </div>
                    <div className="sm:col-span-2">
                        <Button type="secondary" label="Submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewContest;