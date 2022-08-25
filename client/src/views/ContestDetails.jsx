import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3Context from '@/store/web3-context';
import ContestContract from "@/../../build/contracts/Contest.json";
import Loader from "@/components/Loader";
import Message from '@/components/Message';
import Switch from '@/components/Switch';
import ParticipateForm from '@/components/ParticipateForm';
import { extractErrorCode, getAppChainId, compareStr } from '@/utils/utils';
import { ZERO_ADDR } from '@/utils/constants';
import Toast from '@/components/Toast';
import Button from '@/components/Button';
import Contestant from '@/components/Contestant';
import ContainedLayout from '@/layouts/Contained';
import SubmitPerformanceForm from '@/components/SubmitPerformanceForm';
//import img from '@/src/1.jpg'

const STATUS_RUNNING = 0;
const STATUS_PAUSED = 1;
const STATUS_FINISHED = 2;

const OWNER_INDEX = 0;
const TITLE_INDEX = 1;
const DESCRIPTION_INDEX = 2;
const WINNER_INDEX = 3;
//const MAX_PARTICIPANTS_INDEX = 4;
const FEE_INDEX = 4;
const CURRENT_ROUND_INDEX = 5;
const PARTICIPATION_OPEN_INDEX = 6;
const VOTING_OPEN_INDEX = 7;
const QUALIFIERS_INDEX = 8;
const STATE_INDEX = 9;
const BALANCE_INDEX = 10;
const CLAIMED_INDEX = 11;

const ContestDetails = () => {
    const params = useParams();
    const address = params.id;
    const { web3, factory, accounts, walletConnected, walletChainId } = useContext(Web3Context);
    const [contest, setContest] = useState(undefined);
    const [details, setDetails] = useState(undefined);
    const [fetchDetails, setFetchDetails] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [notifType, setNotifType] = useState('info');
    const [msg, setMsg] = useState('');

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
            if (details[STATE_INDEX] == STATUS_RUNNING) { //Already running. So, pause now
                await contest.methods.pauseContest().send({
                    from: accounts[0]
                });
            }
            else { //Paused. So, resume now
                await contest.methods.resumeContest().send({
                    from: accounts[0]
                });
            }
            setNotifType('success');
            setMsg('Success');
            setFetchDetails(true);
        }
        catch (e) {
            console.log('Error => ', e);
            setNotifType('error');
            setMsg('Failed: ' + (e.message ? extractErrorCode(e.message) : 'An error occured'));
        }
        setToastVisible(true);
        setLoading(false);
    }

    const toggleParticipation = async () => {
        console.log('in toggleParticipation')
        setLoading(true);
        try {
            if (details[PARTICIPATION_OPEN_INDEX]) { //Already enabled. So, disable now
                await contest.methods.disableParticipation().send({
                    from: accounts[0]
                });
            }
            else {
                await contest.methods.enableParticipation().send({
                    from: accounts[0]
                });
            }
            setNotifType('success');
            setMsg('Success');
            setFetchDetails(true);
        }
        catch (e) {
            console.log('Error => ', e);
            setNotifType('error');
            setMsg('Failed: ' + (e.message ? extractErrorCode(e.message) : 'An error occured'));
        }
        setToastVisible(true);
        setLoading(false);
    }

    const toggleVoting = async () => {
        console.log('in toggleVoting')
        setLoading(true);
        try {
            if (details[VOTING_OPEN_INDEX]) { //Already enabled. So, disable now
                await contest.methods.closeVoting().send({
                    from: accounts[0]
                });
            }
            else {
                await contest.methods.openVoting().send({
                    from: accounts[0]
                });
            }
            setNotifType('success');
            setMsg('Success');
            setFetchDetails(true);
        }
        catch (e) {
            console.log('Error => ', e);
            setNotifType('error');
            setMsg('Failed: ' + (e.message ? extractErrorCode(e.message) : 'An error occured'));
        }
        setToastVisible(true);
        setLoading(false);
    }

    const participate = async (data) => {
        setLoading(true);
        let nickname = web3.utils.asciiToHex(data.nickname);
        console.log('participate data 0 => ', nickname, nickname.length);
        nickname = web3.utils.padRight(nickname, 32);
        const performanceLink = data.performanceLink;
        console.log('participate nickname 1 => ', nickname, nickname.length);
        console.log('participate nickname 2=> ', web3.utils.padLeft(data.nickname, 32), web3.utils.padLeft(data.nickname, 32).length);
        //return;
        try {
            //await contest.methods.participate("0x636f726c656f6e650000000000000000", performanceLink, data.bio).send({
            await contest.methods.participate(nickname, performanceLink, data.bio).send({
                from: accounts[0],
                value: details[FEE_INDEX]
            })
            setNotifType('success');
            setMsg('Success');
            setFetchDetails(true);
        }
        catch (e) {
            console.log('Participate error => ', e);
            setNotifType('error');
            setMsg('Failed: ' + (e.message ? extractErrorCode(e.message) : 'An error occured'));
        }
        setToastVisible(true);
        setLoading(false);
    }

    const submitPerformance = async (data) => {
        console.log(data)
        setLoading(false);
        try {
            await contest.methods.submitPerformance(data.link).send({
                from: accounts[0]
            })
            setMsg('Successfully submitted!!');
            setFetchDetails(true);
            setNotifType('success');
        }
        catch (e) {
            console.log(e);
            setMsg('Failed: ' + (e.message ? extractErrorCode(e.message) : 'An error occured'));
            setNotifType('error');
        }
        setToastVisible(true);
    }

    const claimReward = async () => {
        setLoading(false);
        try {
            await contest.methods.claimReward().send({
                from: accounts[0]
            })
            setMsg('Successfully withdrawn!!');
            setFetchDetails(true);
            setNotifType('success');
        }
        catch (e) {
            console.log(e);
            setMsg('Failed: ' + (e.message ? extractErrorCode(e.message) : 'An error occured'));
            setNotifType('error');
        }
        setToastVisible(true);
    }

    const vote = async (_addr) => {
        console.log('Inside Vote, _addr', _addr);
        setLoading(true);
        try {
            await contest.methods.vote(_addr).send({
                from: accounts[0],
                handleRevert: true
            })
            setNotifType('success');
            setMsg('Success!!');
        }
        catch (e) {
            console.log('Vote failed => ', e.message)
            console.log('Vote failed 2=> ', extractErrorCode(e.message))
            setNotifType('error');
            setMsg('Failed: ' + (e.message ? extractErrorCode(e.message) : 'An error occured'));
        }
        setLoading(false);
        setToastVisible(true);
    }

    const isAdmin = () => {
        return (accounts[0] ? (details[OWNER_INDEX].toLowerCase() == accounts[0].toLowerCase()) : false);
    }

    const isContestant = () => {
        if (details[QUALIFIERS_INDEX].length == 0) {
            return false;
        }
        const allContestants = details[QUALIFIERS_INDEX][0];
        const found = (accounts[0] ? (allContestants.find(key => key.toUpperCase() === accounts[0].toUpperCase()) != undefined) : false);
        return found;
    }

    const isWinner = (_addr) => {
        return (_addr ? (details[WINNER_INDEX].toLowerCase() == _addr.toLowerCase()) : false);
    }

    const hasQualified = (addr, roundNum) => {
        //return details[QUALIFIERS_INDEX][roundNum].includes(addr);

        //if (details[QUALIFIERS_INDEX].length < roundNum + 1) {
        if (!details[QUALIFIERS_INDEX][roundNum]) {
            return false;
        }
        const allContestants = details[QUALIFIERS_INDEX][roundNum];
        const found = (addr ? (allContestants.find(key => key.toLowerCase() === addr.toLowerCase()) != undefined) : false);
        return found;
    }

    /*if (loading) {
        return (
            <Loader show={true} />
        )
    }*/
    if (error) {
        return (
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <Message type="error">
                        There was an error fetching the details. Please check the contest id
                    </Message>
                </div>
            </div>
        )
    }

    let statusControl = '';
    let participationControl = '';
    let votingControl = '';


    if (details != undefined) {
        if (walletConnected && (getAppChainId() == walletChainId) && (parseInt(details[STATE_INDEX]) != STATUS_FINISHED) && isAdmin()) {
            statusControl = <Switch value={parseInt(details[STATE_INDEX]) == STATUS_RUNNING} onToggle={toggleStatus} onLabel="Running" offLabel="Paused" />;
            /*
             * Participation Button
             * Should be disabled if:
             * 1. STATUS is not RUNNING
             * 2. Participation has been closed once
             */
            participationControl = <Switch value={details[PARTICIPATION_OPEN_INDEX]} onToggle={toggleParticipation} disabled={parseInt(details[STATE_INDEX]) != STATUS_RUNNING || (details[PARTICIPATION_OPEN_INDEX] == false)} onLabel="Open" offLabel="Closed" />;

            /*
             * Voting Button. 
             * Should be disabled if:
             * 1. contest is not RUNNING. 
             * 2. if Participation is still On
             */
            votingControl = <Switch value={details[VOTING_OPEN_INDEX]} onToggle={toggleVoting} disabled={(parseInt(details[STATE_INDEX]) != STATUS_RUNNING) || details[PARTICIPATION_OPEN_INDEX]} onLabel="Open" offLabel="Closed" />;
        }
        else {
            if (details[STATE_INDEX] == STATUS_RUNNING) {
                statusControl = 'Running';
            }
            else if (details[STATE_INDEX] == STATUS_PAUSED) {
                statusControl = 'Paused';
            }
            else {
                statusControl = 'Finished';
            }

            participationControl = details[PARTICIPATION_OPEN_INDEX] ? 'Open' : 'Closed';
            votingControl = details[VOTING_OPEN_INDEX] ? 'Open' : 'Closed';
        }
    }

    const Widget = () => {
        if (isAdmin()) {
            return '';
        }

        //Don't show anything if user is not logged in
        if (!accounts[0]) {
            return '';
        }
        //If contest is not running, then dont show anything
        if (details[STATE_INDEX] != STATUS_RUNNING) {
            if (details[STATE_INDEX] == STATUS_FINISHED && isContestant() && isWinner(accounts[0])) {
                //const bal = web3.utils.fromWei((details[FEE_INDEX] * details[QUALIFIERS_INDEX][0].length).toString())
                const bal = web3.utils.fromWei(details[BALANCE_INDEX], 'ether');
                return (
                    <div className="mt-12 rounded-xl p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                        <p>Congratulations! You have won the contest and the reward amount of <strong>{bal} Ether</strong> <br />
                            <br />
                            {
                                details[CLAIMED_INDEX]
                                    ?
                                    <span>You have claimed your reward amount. </span>
                                    :
                                    <Button onClick={claimReward} label="Claim Reward" />
                            }
                        </p>
                    </div>
                )
            }
            else {
                return '';
            }
        }

        const currentRound = details[CURRENT_ROUND_INDEX];

        if (!isContestant()) {
            if (currentRound == 0 && details[PARTICIPATION_OPEN_INDEX] == true) {
                return (
                    <>
                        <h1 className="mt-12 text-2xl font-bold ">Participate</h1>
                        <div className="mt-6 rounded-lg p-3 md:p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                            <ParticipateForm onSubmit={participate} />
                        </div>
                    </>
                )
            }
            else {
                return '';
            }
        }
        else {
            if (currentRound == 0) {
                return (
                    <div className="mt-12 rounded-xl p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                        <p>Congratulations! You have successfully taken part in the contest. <br /> <br />Please wait for the results of the voting for this round</p>
                    </div>
                )
            }
            else if (hasQualified(accounts[0], currentRound)) {
                if (details[VOTING_OPEN_INDEX] == true) {
                    return (
                        <div className="mt-12 rounded-xl p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                            <p>Please wait for the results of the voting for this round</p>
                        </div>
                    )
                }
                else {
                    return (
                        <div className="mt-12 rounded-xl p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                            <SubmitPerformanceForm onSubmit={submitPerformance} />
                        </div>
                    )
                }
            }
            else { //Not qualified
                return (
                    <div className="mt-12 rounded-xl p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                        <p>Sorry! You have not been able to progress to this round.</p>
                    </div>
                )
            }
        }
    }

    return (
        <>
            <Loader show={loading} />
            <Toast show={toastVisible} type={notifType} msg={msg} />
            {
                (details != undefined)
                &&
                <ContainedLayout>
                    <div className="grid mb-12">
                        <h1 className="text-#333 text-4xl font-bold text-center mb-2">{details[TITLE_INDEX]}</h1>
                        <span className="font-regular text-xs md:text-sm block text-center"><strong>Address: </strong>{address}</span>
                    </div>

                    <hr />

                    <div className="grid sm:grid-rows md:grid-cols-3 mt-12 gap-y-12 gap-x-[80px]">
                        <div className="sm:col-span-2 sm:order-2 md:order-1">
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold">Description</h2>
                                <p className="mt-2 text-xs text-[#444] md:text-sm font-regular leading-7">
                                    {details[DESCRIPTION_INDEX]}
                                </p>
                            </div>

                            <hr />

                            <div className="my-12">
                                <h1 className="text-teal text-2xl font-bold">Contest Details</h1>
                                <div className="grid sm:grid-rows md:grid-cols-2 mt-6 gap-y-5 gap-x-4">
                                    <div className="rounded-lg p-3 md:p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                                        <h2 className="text-2xl font-bold text-blue-500">Owner</h2>
                                        <p className="mt-2 text-xs text-[#444] md:text-sm font-regular leading-7">{details[OWNER_INDEX]}</p>
                                    </div>
                                    <div className="rounded-lg p-3 md:p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                                        <h2 className="text-2xl font-bold text-red-500">Participation Fee</h2>
                                        <p className="mt-2 text-xs text-[#444] md:text-sm font-regular leading-7">{web3.utils.fromWei(details[FEE_INDEX], 'ether')} <strong>Ether</strong></p>
                                    </div>
                                    <div className="rounded-lg p-3 md:p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                                        <h2 className="text-2xl font-bold text-yellow-500">Current Round</h2>
                                        <p className="mt-2 text-xs text-[#444] md:text-sm font-regular leading-7">{parseInt(details[CURRENT_ROUND_INDEX]) == 0 ? 'Audition' : details[CURRENT_ROUND_INDEX]}</p>
                                    </div>
                                    <div className="rounded-lg p-3 md:p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                                        <h2 className="text-2xl font-bold text-green-500">Winner</h2>
                                        <p className="mt-2 text-xs text-[#444] md:text-sm font-regular leading-7">
                                            {details[WINNER_INDEX] == ZERO_ADDR ? 'Not declared yet' : details[WINNER_INDEX]}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <div className="mt-12">
                                <h1 className="text-teal text-2xl font-bold">Contestants</h1>
                                {
                                    details[QUALIFIERS_INDEX].length
                                        ?
                                        <div className="grid sm:grid-rows md:grid-cols-2 mt-6 gap-y-5 gap-x-4">
                                            {details[QUALIFIERS_INDEX][0].map((c, i) => {
                                                /*
                                                 * Disable vote button for self and for admins. 
                                                 * Also, if voting is disabled, or the projet is not running
                                                 */
                                                const voteDisabled = (accounts[0] ? (!hasQualified(c, details[CURRENT_ROUND_INDEX]) || compareStr(c, accounts[0]) || compareStr(details[OWNER_INDEX], accounts[0]) ||
                                                    details[VOTING_OPEN_INDEX] == false || details[STATE_INDEX] != STATUS_RUNNING) : true);
                                                return (
                                                    <Contestant key={c} address={c} isWinner={isWinner(c)} contest={address} onVote={e => vote(c)} voteDisabled={voteDisabled} />
                                                )
                                            })}
                                        </div>
                                        :
                                        <p className="mt-6">No contestants yet</p>
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-1 sm:order-1 md:order-2">
                            <h1 className="text-#333 text-2xl font-bold">Status</h1>
                            <div className="grid grid-rows rounded-xl mt-6 mb-12 p-6 bg-[#fafafa] border-[1px] border-[#ddd]">
                                <div className="flex">
                                    <strong className="mr-2">Status:</strong> {statusControl}
                                </div>
                                <div className="flex mt-4">
                                    <strong className="mr-2">Participation:</strong> {participationControl}
                                </div>
                                <div className="flex mt-4">
                                    <strong className="mr-2">Voting:</strong> {votingControl}
                                </div>
                                <div className="flex mt-4">
                                    <strong className="mr-2">Balance:</strong> {web3.utils.fromWei(details[BALANCE_INDEX], 'ether')} Ether
                                </div>
                            </div>

                            <hr />

                            <Widget />
                        </div>
                    </div>
                </ContainedLayout>
            }
        </>
    )
}

export default ContestDetails;