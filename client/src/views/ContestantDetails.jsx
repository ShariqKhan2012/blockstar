import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Web3Context from '../store/web3-context';
import ContestContract from '../../../build/contracts/Contest.json';
import Button from '../components/Button';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ContainedLayout from '../layouts/Contained';

const ContestantDetails = () => {
    const params = useParams();
    const contestId = params.id;
    const contestantId = params.cId;
    const [fetchDetails, setFetchDetails] = useState(true);
    const [contest, setContest] = useState(undefined);
    const [details, setDetails] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
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

    const onVote = () => {

    }

    return (
        <>
            <Loader show={loading} />
            {
                (details != undefined)
                &&
                <ContainedLayout>
                    <div className="grid mb-12 align-center">
                        <h1 className="text-#333 text-4xl font-bold text-center mb-2">{web3.utils.toAscii(details[0]['name'])}</h1>
                        <span className="font-regular text-sm block text-center"><strong>Address: </strong>{contestantId}</span>
                        <div className="mt-4 mx-auto">
                            <Button disabled={details[3]} onVote={onVote} label="Vote" />
                        </div>
                    </div>


                    <div className="grid grid-rows mt-16 gap-y-16 gap-x-[80px]">
                        <div className="">
                            <h2 className="text-2xl font-bold">About Me</h2>
                            <p className="mt-2 text-[#444] text-sm font-regular leading-7">
                                {details[0].bio}
                            </p>
                        </div>

                        <div className="">
                            <h2 className="text-2xl font-bold">Performances</h2>
                            <div className="mt-4 grid grid-rows md:grid-cols-3 gap-x-6">
                                {details[0]['performanceLinks'].map((link, i) => {
                                    return (
                                        <div key={i} className="bg-[#fafafa] border-[1px] border-[#ddd] p-6">
                                            <h2 className="fonts-['Montserrat'] text-md font-medium text-center">Round {i + 1}</h2>
                                            <div className="mt-4">
                                                <iframe className="max-w-[100%]" width="350" height="200"
                                                    src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=1">
                                                </iframe>
                                            </div>
                                            <p className="mt-4">
                                                <span className="font-bold">Votes received: </span>
                                                <span className="font-regular">{details[0]['votesReceived'][i] ?? 0}</span>
                                            </p>
                                            {(details[2] == i) && <div className="mt-4"><Button disabled={details[3]} onVote={onVote} label="Vote" /></div>}
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