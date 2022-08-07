import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import ContainedLayout from '../layouts/Contained';
import Web3Context from '../store/web3-context';
import { getAppChainId, getNetworkName } from '../utils/utils';

const NewContest = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
    const web3Ctxt = useContext(Web3Context);
    console.log('web3Ctxt =>', web3Ctxt)

    const registerOptions = {
        title: { required: "This field is required" },
        description: { required: "This field is required" },
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
            await web3Ctxt.factory.methods.createClone(data.title, data.description, fee).send({ from: web3Ctxt.accounts[0] })
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
            <ContainedLayout>
                <div className="grid mb-12">
                    <h1 className="text-#333 text-4xl font-bold text-center mb-2">New Contest</h1>
                </div>
                <Message type="error">
                    You need to have MetaMask installed and activated on your browser to be able to continue.
                </Message>
            </ContainedLayout>
        )
    }

    if (!web3Ctxt.walletConnected) {
        return (
            <ContainedLayout>
                <div className="grid mb-12">
                    <h1 className="text-#333 text-4xl font-bold text-center mb-2">New Contest</h1>
                </div>
                <Message type="error">
                    Metamask not connected to the site. Click on the 'Connect' button to continue
                </Message>
            </ContainedLayout>
        )
    }
    console.log('web3Ctxt.currentChainId =>', web3Ctxt.currentChainId);
    console.log('getAppChainId =>', getAppChainId());

    //if (web3Ctxt.currentChainId != getAppChainId()) {
    if (getAppChainId() != web3Ctxt.walletChainId) {
        const appNetwokName = getNetworkName(getAppChainId());
        return (
            <ContainedLayout>
                <div className="grid mb-12">
                    <h1 className="text-#333 text-4xl font-bold text-center mb-2">New Contest</h1>
                </div>
                <Message type="error">
                    This Dapp lives on the {appNetwokName} chain. Click on the 'Switch' button to change to the {appNetwokName} network.
                </Message>
            </ContainedLayout>
        )
    }

    return (
        <ContainedLayout>
            <div className="grid mb-12">
                <h1 className="text-#333 text-4xl font-bold text-center mb-2">Create A New Contest</h1>
            </div>
            <Loader show={loading} />
            <Toast show={toastVisible} type={notifType} msg={msg} />
            <div className="max-w-lg mx-auto rounded-lg p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                <form onSubmit={handleSubmit(onFormSubmit, onError)} className="mt-2">
                    <div className="mb-6">
                        <input name="title" {...register('title', registerOptions.title)} className="p-3 w-full border border-slate-300 rounded-md focus:outline-none" type="text" placeholder="Title of the contest " />
                        <small className="text-[#f00]">
                            {errors?.title && errors.title.message}
                        </small>
                    </div>
                    <div className="mb-6">
                        <textarea name="description" maxLength="100" {...register('description', registerOptions.bio)} className="p-3 w-full border border-slate-300 rounded-md focus:outline-none" placeholder="Describe the contest"></textarea>
                        <small className="text-[#f00]">
                            {errors?.description && errors.description.message}
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
        </ContainedLayout>
    )
}

export default NewContest;