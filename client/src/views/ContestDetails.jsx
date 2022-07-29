import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3Context from '../store/web3-context';
import ContestContract from "../../../build/contracts/Contest.json";
import Loader from "../components/Loader";
import Message from '../components/Message';
import Switch from '../components/Switch';
import ParticipateForm from '../components/ParticipateForm';
import { getAppChainId } from '../utils/utils';
import Button from '../components/Button';
//import img from '../src/1.jpg'

const STATUS_RUNNING = 0;
const STATUS_PAUSED = 1;
const STATUS_FINISHED = 2;

const ContestDetails = () => {
    const params = useParams();
    const address = params.id;
    const { web3, factory, accounts, walletConnected, walletChainId } = useContext(Web3Context);
    const [contest, setContest] = useState(undefined);
    const [details, setDetails] = useState(undefined);
    const [fetchDetails, setFetchDetails] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (web3 != undefined && factory != undefined) {
            const _contest = new web3.eth.Contract(ContestContract.abi, address);
            setContest(_contest);
        }
    }, [web3, accounts, factory])

    useEffect(() => {
        if (web3 != undefined && factory != undefined && contest != undefined && fetchDetails) {
            fetchContestDetails();
        }
    }, [contest, fetchDetails])

    const fetchContestDetails = async () => {
        setFetchDetails(false);
        setLoading(true);
        console.log('Contest => ', contest);
        try {
            const _details = await contest.methods.getContestDetails().call();
            console.log('Contest details => ', _details);
            setDetails(_details);
            /*const [
                _owner, _title, _winner, _max_contestants, _contestingFee, _votingFee, 
                _crrentRound, _participationOpen, _votingOpen, _roundWinners
            ] = [..._details];
            setOwner(_owner);
            setOwner(_title);
            setOwner(_winner);
            setOwner(_owner);
            setOwner(_owner);
            setOwner(_owner);
            setOwner(_participationOpen);
            setOwner(_owner);*/

        }
        catch {
            console.log('Error in fetcing the contest details');
            setError(true);
        }
        setLoading(false);
    }

    const toggleStatus = async () => {
        console.log('in toggleStatus')
        setLoading(true);
        try {
            if (details[9] == STATUS_RUNNING) { //Already running. So, pause now
                await contest.methods.pauseContest().send({
                    from: accounts[0]
                });
            }
            else { //Paused. So, resume now
                await contest.methods.resumeContest().send({
                    from: accounts[0]
                });
            }
            const _details = { ...details };
            _details[6] = !_details[6];
            //setDetails(_details);
            setFetchDetails(true);
        }
        catch (error) {
            console.log('Error => ', error);
        }
        setLoading(false);
    }

    const toggleParticipation = async () => {
        console.log('in toggleParticipation')
        setLoading(true);
        try {
            if (details[6]) { //Already enabled. So, disable now
                await contest.methods.disableParticipation().send({
                    from: accounts[0]
                });
            }
            else {
                await contest.methods.enableParticipation().send({
                    from: accounts[0]
                });
            }
            const _details = { ...details };
            _details[6] = !_details[6];
            //setDetails(_details);
            setFetchDetails(true);
        }
        catch (error) {
            console.log('Error => ', error);
        }
        setLoading(false);
    }

    const toggleVoting = async () => {
        console.log('in toggleVoting')
        setLoading(true);
        try {
            if (details[7]) { //Already enabled. So, disable now
                await contest.methods.closeVoting().send({
                    from: accounts[0]
                });
            }
            else {
                await contest.methods.openVoting().send({
                    from: accounts[0]
                });
            }
            const _details = { ...details };
            _details[7] = !_details[7];
            //setDetails(_details);
            setFetchDetails(true);
        }
        catch (error) {
            console.log('Error => ', error);
        }
        setLoading(false);
    }

    const participate = async (data) => {
        setLoading(false);
        let nickname = web3.utils.asciiToHex(data.nickname);
        console.log('participate data 0 => ', nickname, nickname.length);
        nickname = web3.utils.padRight(nickname, 32);
        const performanceLink = data.performanceLink;
        console.log('participate data => ', nickname, nickname.length);
        //return;
        try {
            await contest.methods.participate("0x636f726c656f6e650000000000000000", performanceLink, data.bio).send({
                from: accounts[0],
                value: details[4]
            })
        }
        catch (error) {
            console.log('Error => ', error);
        }
        setLoading(false);
    }

    const vote = async () => {

    }

    const isAdmin = () => {
        return details[0] == accounts[0];
    }

    const isContestant = () => {
        const  allContestants =  details[8][0];
        return allContestants.includes(accounts[0]);
    }

    /*if (loading) {
        return (
            <Loader show={true} />
        )
    }*/
    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-4">
                <Message type="error">
                    There was an error fetching contest details. Please check the contest id
                </Message>
            </div>
        )
    }

    let statusControl = '';
    let participationControl = '';
    let votingControl = '';


    if (details != undefined) {
        if (walletConnected && (getAppChainId() == walletChainId) && (parseInt(details[9]) != STATUS_FINISHED) && isAdmin()) {
            //Status Button
            /*let statusControlValue = false;
            let statusControlOnLabel = 'Running';
            let statusControlOffLabel = 'Paused';

            if(parseInt(details[9]) == STATUS_CREATED) {
                statusControlOnLabel = 'Started';
                statusControlOffLabel = 'Not Started';
            }
            else if(parseInt(details[9]) == STATUS_PAUSED) {
                statusControlOnLabel = 'Paused';
            }*/

            statusControl = <Switch value={parseInt(details[9]) == STATUS_RUNNING} onToggle={toggleStatus} onLabel="Running" offLabel="Paused" />;
            //Participation Button
            participationControl = <Switch value={details[6]} onToggle={toggleParticipation} disabled={parseInt(details[9]) != STATUS_RUNNING} onLabel="Open" offLabel="Closed" />;
            //Voting Button. Disable ,if contest is paused. Or if Participation is still On
            votingControl = <Switch value={details[7]} onToggle={toggleVoting} disabled={(parseInt(details[9]) != STATUS_RUNNING) || details[6]} onLabel="Open" offLabel="Closed" />;
        }
        else {
            if (details[9] == STATUS_RUNNING) {
                statusControl = 'Running';
            }
            else if (details[9] == STATUS_PAUSED) {
                statusControl = 'Paused';
            }
            else {
                statusControl = 'Finished';
            }

            participationControl = details[6] ? 'Open' : 'Closed';
            votingControl = details[7] ? 'Open' : 'Closed';
        }
    }

    const Widget = () => {
        if(isAdmin()) {
            return '';
        }
        //If contest is not running, then dont show anything
        if(details[9] != STATUS_RUNNING) {
            return '';
        }

        // If existing contestant 
            //If round = 0, then "'You have already paticipated. Please wait for the results of the voting for this round.'""
            //else 
                //if already submitted performance lnk, "'You have already paticipated. Please wait for the results of the voting for this round.'""
                //else show PerformanceForm
        // else
            //if currentround = 0, then show ParticipationForm
            // else, show Voting Form
        const currentRound = details[5];

        if(currentRound == 0)
        if(isContestant()) {
            return 'You have already paticipated. Please wait for the results of the voting for this round.'
        }

        return <ParticipateForm onSubmit={participate} />
    }

    return (
        <>
            <Loader show={loading} />
            {
                (details != undefined)
                &&
                <div className="max-w-7xl mx-auto p-4">
                    <div className="grid mt-16">
                        <h1 className="text-#333 text-4xl font-bold text-center mb-2">{details[1]}</h1>
                        <span className="font-regular text-sm block text-center"><strong>Address: </strong>{address}</span>
                    </div>

                    <div className="grid sm:grid-rows md:grid-cols-3 mt-8 gap-y-16 gap-x-[80px]">
                        <div className="sm:col-span-2 sm:order-2 md:order-1 bg-white rounded-xl p-6 shadow-lg">
                            <div>
                                <h1 className="text-teal text-2xl font-bold mb-4">Contest Details</h1>
                                <div className="grid sm:grid-rows md:grid-cols-2 mt-8 gap-y-4 gap-x-3">
                                    <div className="rounded-lg p-4 bg-[#f7f7f7] tmb-6 shadow-md">
                                        <h2 className="text-2xl font-bold text-green-500">Contest Address</h2>
                                        <p className="mt-2 text-[#444] text-sm font-regular leading-7">{address}</p>
                                    </div>
                                    <div className="rounded-lg p-4 bg-[#f7f7f7] tmb-6 shadow-md">
                                        <h2 className="text-2xl font-bold text-blue-500">Owner</h2>
                                        <p className="mt-2 text-[#444] text-sm font-regular leading-7">{details[0]}</p>
                                    </div>
                                    <div className="rounded-lg p-4 bg-[#f7f7f7] tmb-6 shadow-md">
                                        <h2 className="text-2xl font-bold text-red-500">Participation Fee</h2>
                                        <p className="mt-2 text-[#444] text-sm font-regular leading-7">{web3.utils.fromWei(details[4], 'ether')} <strong>Ether</strong></p>
                                    </div>
                                    <div className="rounded-lg p-4 bg-[#f7f7f7] tmb-6 shadow-md">
                                        <h2 className="text-2xl font-bold text-yellow-500">Current Round</h2>
                                        <p className="mt-2 text-[#444] text-sm font-regular leading-7">{details[5]}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-[#333] text-md mt-8">
                                <p className="mt-2">
                                    <span className="font-bold">Participants: </span>
                                    <span className="font-regular">{details[3]}</span>
                                </p>

                            </div>

                            <div className="mt-8">
                                <h2 className="text-2xl font-bold">Votes received</h2>
                                <div className="text-[#333] text-md">
                                    <p className="mt-2">
                                        <span className="font-bold">Round 1: </span>
                                        <span className="font-regular">7</span>
                                    </p>
                                    <p className="mt-2">
                                        <span className="font-bold">Round 2: </span>
                                        <span className="font-regular">5</span>
                                    </p>
                                    <p className="mt-2">
                                        <span className="font-bold">Round 3: </span>
                                        <span className="font-regular">9</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-1 sm:order-1 md:order-2">
                            <div className="grid grid-rows bg-white rounded-xl p-6 shadow-lg">
                                <h1 className="text-#333 text-2xl font-bold mb-4">Status</h1>
                                <div className="flex">
                                    <strong className="mr-2">Status:</strong> {statusControl}
                                </div>
                                <div className="flex mt-4">
                                    <strong className="mr-2">Participation:</strong> {participationControl}
                                </div>
                                <div className="flex mt-4">
                                    <strong className="mr-2">Voting:</strong> {votingControl}
                                </div>
                            </div>

                            <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
                                <Widget />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ContestDetails;