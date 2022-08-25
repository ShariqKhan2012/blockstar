import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Web3Context from '@/store/web3-context';
import ContestContract from '@/../../build/contracts/Contest.json';
import Button from '@/components/Button';
import Message from '@/components/Message';
import Toast from '@/components/Toast';
import Loader from '@/components/Loader';
import ContainedLayout from '@/layouts/Contained';
import { extractErrorCode, compareStr } from '@/utils/utils';
import Ribbon from '@/components/Ribbon';

const CONTESTANT_DETAILS_INDEX = 0;
const OWNER_INDEX = 1;
const CURRENT_ROUND_INDEX = 2;
const VOTING_STATUS_INDEX = 3;
const WINNER_INDEX = 4;
const BALANCE_INDEX = 5;
const CLAIMED_INDEX = 6;

const ContestantDetails = () => {
    const params = useParams();
    const contestId = params.id;
    const contestantId = params.cId;
    const [fetchDetails, setFetchDetails] = useState(true);
    const [contest, setContest] = useState(undefined);
    const [details, setDetails] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [notifType, setNotifType] = useState('info');
    const [msg, setMsg] = useState('');
    const { web3, factory, accounts } = useContext(Web3Context);

    useEffect(() => {
        if (web3 != undefined && factory != undefined) {
            try {
                const _contest = new web3.eth.Contract(ContestContract.abi, contestId);
                console.log('_contest => ', _contest)
                setContest(_contest);
            }
            catch (e) {
                console.log('_contest error => ', e)
            }
        }
    }, [web3, factory])

    useEffect(() => {
        if (web3 != undefined && factory != undefined && contest != undefined && fetchDetails) {
            fetchContestantDetails();
        }
    }, [contest, fetchDetails])

    const fetchContestantDetails = async () => {
        setFetchDetails(false);
        setLoading(true);
        try {
            const _details = await contest.methods.getContestantDetails(contestantId).call();
            if (_details.bio == "") { //Invalid contestant
                throw "Invalid contestant";
            }
            setDetails(_details);
            console.log('contestant _details =>', _details);
        }
        catch (e) {
            console.log('fetchContestantDetails error => ', e)
            setError(true);
        }
        setLoading(false);
    }

    if (error) {
        return (
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <Message type="error">
                        There was an error fetching the details. Please check the contest and contestant id
                    </Message>
                </div>
            </div>
        )
    }

    const onVote = async () => {
        setLoading(true);
        try {
            await contest.methods.vote(contestantId).send({
                from: accounts[0],
                handleRevert: true
            })
            setNotifType('success');
            setMsg('Success!!');
            setFetchDetails(true);
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

    const isVotingDisabled = () => {
        if (!accounts[0]) {
            return true;
        }
        if (details[VOTING_STATUS_INDEX] == true || compareStr(contestantId, accounts[0]) ||
            compareStr(details[OWNER_INDEX], accounts[0])) {
            //console.log('Disabling here 1', )
            return true;
        }
        return false;
    }

    return (
        <>
            <Loader show={loading} />
            <Toast show={toastVisible} type={notifType} msg={msg} />
            {
                (details != undefined)
                &&
                <ContainedLayout>
                    {(details[WINNER_INDEX] == contestantId) && <Ribbon label="WINNER" />}
                    <div className="grid mb-12 align-center">
                        <h1 className="text-#333 text-4xl font-bold text-center mb-2">{web3.utils.toAscii(details[CONTESTANT_DETAILS_INDEX]['name'])}</h1>
                        <span className="font-regular text-xs md:text-sm block text-center"><strong>Address: </strong>{contestantId}</span>
                        <div className="mt-4 mx-auto flex">
                            <Button disabled={isVotingDisabled()} onClick={onVote} label="Vote" />
                        </div>
                    </div>


                    <div className="grid grid-rows mt-16 gap-y-12 gap-x-[80px]">
                        {
                            ((details[WINNER_INDEX] == contestantId) &&
                                accounts[0] && (accounts[0] == contestantId) 
                            )
                            &&
                            <div className="">
                                <Message>Congratulations! You have won the contest and the reward amount of <strong>{web3.utils.fromWei(details[BALANCE_INDEX], 'ether')} Ether </strong> <br />
                                    <br />
                                    {
                                        details[CLAIMED_INDEX]
                                            ?
                                            <span>You have claimed your reward amount. </span>
                                            :
                                            <Button onClick={claimReward} label="Claim Reward" />
                                    }
                                </Message>
                            </div>
                        }
                        <div className="">
                            <h2 className="text-2xl font-bold">About Me</h2>
                            <p className="mt-2 text-[#444] text-sm font-regular leading-7">
                                {details[CONTESTANT_DETAILS_INDEX].bio}
                            </p>
                        </div>

                        <hr />

                        <div className="">
                            <h2 className="text-2xl font-bold">Performances</h2>
                            <div className="mt-4 grid grid-rows md:grid-cols-3 gap-x-6">
                                {/*details[CONTESTANT_DETAILS_INDEX]['performanceLinks'].map((link, i) => {
                                    return (
                                        <div key={i} className="bg-[#fafafa] border-[1px] border-[#ddd] p-6">
                                            <h2 className="fonts-['Montserrat'] text-md font-medium text-center">{i ? `Round ${i}` : 'Audition Round'} </h2>
                                            <div className="mt-4">
                                                <iframe className="max-w-[100%]" width="350" height="200"
                                                    src={`https://www.youtube.com/embed/${link}?controls=1`}>
                                                </iframe>
                                            </div>
                                            <p className="mt-4">
                                                {
                                                    (parseInt(details[CONTESTANT_DETAILS_INDEX].progressedToRound) >= i)
                                                        ?
                                                        <>
                                                            <span className="font-bold">Votes received: </span>
                                                            <span className="font-regular">{details[CONTESTANT_DETAILS_INDEX]['votesReceived'][i] ?? 0}</span>
                                                        </>
                                                        :
                                                        <span className="font-bold">Eliminated </span>
                                                }
                                            </p>
                                            {(details[CURRENT_ROUND_INDEX] == i) && <div className="mt-4"><Button disabled={isVotingDisabled()} onClick={onVote} label="Vote" /></div>}
                                        </div>
                                    )
                                })*/}

                                {[...new Array(parseInt(details[CURRENT_ROUND_INDEX]) + 1)].map((val, i) => {
                                    const progressedToRound = parseInt(details[CONTESTANT_DETAILS_INDEX].progressedToRound);

                                    if (i > progressedToRound) {
                                        return '';
                                    }
                                    const link = details[CONTESTANT_DETAILS_INDEX]['performanceLinks'][i] ?? '';

                                    return (
                                        <div key={i} className="bg-[#fafafa] border-[1px] border-[#ddd] p-6">
                                            <h2 className="fonts-['Montserrat'] text-md font-medium text-center">{i ? `Round ${i}` : 'Audition Round'} </h2>
                                            <div className="mt-4">
                                                {
                                                    link
                                                        ?
                                                        <iframe className="max-w-full mx-auto" width="350" height="200"
                                                            src={`https://www.youtube.com/embed/${link}?controls=1`}>
                                                        </iframe>
                                                        :
                                                        <div className="flex justify-center items-center px-4 max-w-[full] mx-auto w-full h-[200px] bg-[#eee]">
                                                            <p>Performance not submitted for this round</p>
                                                        </div>
                                                }

                                            </div>
                                            <p className="mt-4">
                                                <span className="font-bold">Votes received: </span>
                                                <span className="font-regular">{details[CONTESTANT_DETAILS_INDEX]['votesReceived'][i] ?? 0}</span>
                                                {
                                                    (progressedToRound < details[CURRENT_ROUND_INDEX] && progressedToRound == i)
                                                    &&
                                                    <p className="font-bold text-red-500">Eliminated </p>
                                                }
                                            </p>
                                            {(details[CURRENT_ROUND_INDEX] == i) && <div className="mt-4"><Button disabled={isVotingDisabled()} onClick={onVote} label="Vote" /></div>}
                                        </div>
                                    )
                                })}

                            </div>
                        </div>


                    </div>
                </ContainedLayout>
            }
        </>
    )
}

export default ContestantDetails;