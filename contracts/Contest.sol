//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Contest is Initializable {
    address public owner;
    address payable public winner;
    string public title;
    string public description;

    uint8 public constant NUM_ALLOWED_PARTICIPANTS = 4;
    uint256 public fee;
    uint8 public currentRound;

    bool public votingOpen;
    bool public participationOpen;

    enum ContestState { RUNNING, PAUSED, FINISHED}
    ContestState state;

    struct Contestant {
        bytes32 name;
        string bio;
        string[] performanceLinks;
        uint256[] votesReceived;
        uint8 progressedToRound;
    }
    mapping(address => Contestant) public contestants;
    //address[][NUM_ALLOWED_PARTICIPANTS] public qualifiers;
    address[][] public qualifiers;

    // Fired to signal that the contest is open for participation
    event ContestOpenedForParticipation();

    /*
     * Fired once the number of participants = 4.
     * Signals that the contest is closed for participation
     */
    event ContestClosedForParticipation(address indexed _addr);

    // Voting opened for a round
    event VotingOpened(uint8 round);

    // Voting closed for a round
    event VotingClosed(uint8 round);

    function initialize(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _fee
    ) external {
        //__ERC721_init(_name, _symbol);
        owner = _owner;
        title = _title;
        description = _description;
        fee = _fee;
        participationOpen = true;
        state = ContestState.RUNNING;
    }

    modifier isOwner() {
        require(msg.sender == owner, "___ONLY_OWNER___");
        _;
    }

    modifier isRunning() {
        require(state == ContestState.RUNNING, "___NOT_RUNNING___");
        _;
    }

    modifier isPaused() {
        require(state == ContestState.PAUSED, "___NOT_PAUSED___");
        _;
    }

    function stopContest() public isOwner{
        require(state != ContestState.FINISHED, "___FINISHED___");
        state = ContestState.FINISHED;
    }

    function pauseContest() public isOwner isRunning{
        state = ContestState.PAUSED;
    }

    function resumeContest() public isOwner isPaused{
        state = ContestState.RUNNING;
    }

    function enableParticipation() public isOwner isRunning {
        participationOpen = true;
    }

    function disableParticipation() public isOwner isRunning{
        participationOpen = false;
    }

    function openVoting() public isOwner isRunning{
        require(!participationOpen, "___PARTICIPATION_OPEN___");
        //require( qualifiers[0].length == NUM_ALLOWED_PARTICIPANTS, "Not enough participants" );
        require( qualifiers[0].length > 0, "___NO_CONTESTANTS___" );
        if( qualifiers[0].length > 1) {
            votingOpen = true;
        }
        else {
            pickWinner();
        }
    }

    function closeVoting() public isOwner isRunning{
        require(votingOpen, "___VOTING_CLOSED___");
        require(!participationOpen, "___PARTICIPATION_OPEN___");
        votingOpen = false;

        /*
         * Max. Rounds = NUM_ALLOWED_PARTICIPANTS - 1
         * So, for 4 participants, max rounds = 3 => R0, R1, R2
         * So, we count votes of the current round and eliminate
         * the person with the lowest votes.
         * Except for the Final Round.
         * For final round, we have an algorthm that takes into
         * consideration weighted votes from all the rounds.
         */
        //uint8 total_rounds = NUM_ALLOWED_PARTICIPANTS - 1;

        //if (currentRound < total_rounds - 1) {
        if ( (qualifiers[0].length <= 2) || (currentRound < qualifiers[0].length - 1) ) {
            uint8 tmpCId = 0;
            uint256 tmpLowestVotes = contestants[
                qualifiers[currentRound][tmpCId]
            ].votesReceived[currentRound];

            for (uint8 i = 1; i < qualifiers[currentRound].length; i++) {
                //TODO: Right now, I haven't accounted for a scenario when 2 contestants
                // have equal scores. So, using <= instead of < , for now
                if (
                    contestants[qualifiers[currentRound][i]].votesReceived[
                        currentRound
                    ] <= tmpLowestVotes
                ) {
                    tmpLowestVotes = contestants[qualifiers[currentRound][i]]
                        .votesReceived[currentRound];
                    tmpCId = i;
                }
            }

            for (uint8 i = 0; i < qualifiers[currentRound].length; i++) {
                //Skip the one with the lowest votes
                if (i != tmpCId) {
                    qualifiers[currentRound + 1].push(
                        qualifiers[currentRound][i]
                    );
                    contestants[qualifiers[currentRound][i]]
                        .progressedToRound = currentRound + 1;
                }
            }
            currentRound++;
        } else {
            pickWinner();
        }
    }

    function pickWinner() private isRunning{
        /*
         * For final score, we use weighted scores of all the roundsWeighted
         * final score = 60% x final (3rd) Round + 30% x 2nd round + 10% x 1st round
         */
        /*uint256[4] storage finalistOneAllVotes = contestants[qualifiers[2][0]].votesReceived;
        uint256 finalistOneFinalScore = 60 * finalistOneAllVotes[2] + 30 * finalistOneAllVotes[1] + 10 * finalistOneAllVotes[0];

        uint256[4] storage finalistTwoAllVotes = contestants[qualifiers[2][1]].votesReceived;
        uint256 finalistTwoFinalScore = 60 * finalistTwoAllVotes[2] + 30 * finalistTwoAllVotes[1] + 10 * finalistTwoAllVotes[0];*/

        require(qualifiers[0].length > 0, "___NO_CONTESTANTS___");
        
        if( currentRound == 0 && qualifiers[0].length == 1 ) {
            winner = payable(qualifiers[0][0]);
        }
        else {
            uint256 finalistOneFinalScore = 0;
            uint256 finalistTwoFinalScore = 0;
            for(uint8 i = 0; i < currentRound; i++ ) {
                finalistOneFinalScore += 2 * i * contestants[qualifiers[currentRound][0]].votesReceived[i];
                finalistTwoFinalScore += 2 * i * contestants[qualifiers[currentRound][1]].votesReceived[i];
            }

            if (finalistTwoFinalScore > finalistOneFinalScore) {
                winner = payable(qualifiers[2][1]);
            } else {
                winner = payable(qualifiers[2][0]);
            }
        }
        state = ContestState.FINISHED;
    }

    function uint2str(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function participate( bytes32 _name, string memory _performanceLink, string memory _bio ) public payable isRunning{
        require(participationOpen, "___PARTICIPATION_CLOSED___");
        require( msg.value == fee, "___FEE___" );
        require(msg.sender != owner, "___NO_ADMIN___");
        require( bytes(contestants[msg.sender].bio).length == 0, "___EXISTING___" );
        //require( qualifiers[0].length < NUM_ALLOWED_PARTICIPANTS, "Maximum participants reached" );
        require(_name.length != 0, "___EMPTY_NAME___");
        require(bytes(_performanceLink).length != 0, "___EMOTY_LINK___");
        require(bytes(_bio).length != 0, "___EMPTY_BIO___");
        require(bytes(_bio).length <= 60, "___LONG_BIO___");

        if(qualifiers.length == 0) {
            address[] memory a;
            qualifiers.push(a);
        }
        qualifiers[0].push(msg.sender);
        contestants[msg.sender].name = _name;
        //contestants[msg.sender].performanceLinks[currentRound] = _performanceLink;
        contestants[msg.sender].performanceLinks.push(_performanceLink);
        contestants[msg.sender].bio = _bio;

        /*
         * If we have reached NUM_ALLOWED_PARTICIPANTS contestants now,
         * disable further participantion and notify the UI
         */
        /*if (qualifiers[0].length == NUM_ALLOWED_PARTICIPANTS) {
            participationOpen = false;
            emit ContestClosedForParticipation(msg.sender);
        }*/
    }

    function submitPerformamce(string memory _performanceLink) public payable isRunning{
        require(participationOpen, "___PARTICIPATION_CLOSED___");
        //require( qualifiers[0].length < NUM_ALLOWED_PARTICIPANTS, "Maximum participants reached" );
        require( bytes(contestants[msg.sender].bio).length != 0, "___INVALID_CONTESTANT___" );
        require( contestants[msg.sender].progressedToRound == currentRound, "___ELIMINATED___" );
        require(bytes(_performanceLink).length != 0, "___EMPTY_LINK___");
        require(contestants[msg.sender].performanceLinks.length == currentRound, "___SUBMITTED___");

        //contestants[msg.sender].performanceLinks[currentRound] = _performanceLink;
        contestants[msg.sender].performanceLinks.push(_performanceLink);
    }

    function vote(address _addr) public payable isRunning{
        require(votingOpen, "___VOTING_CLOSED___");
        require(msg.sender != owner, "___NO_ADMIN___");
        require(msg.sender != _addr, "___NO_SELF___");
        require( bytes(contestants[_addr].bio).length != 0, "___INVALID_CONTESTANT___" );
        require( contestants[_addr].progressedToRound == currentRound, "___ELIMINATED___" );
        //also check whether the contestant has advanced to this round or not
        //contestants[_addr].votesReceived[currentRound] += 1;
        if(contestants[_addr].votesReceived.length != currentRound + 1) {
            contestants[_addr].votesReceived.push(0);
        }
        contestants[_addr].votesReceived[currentRound] += 1;
    }

    function claimReward() public {
        require(state == ContestState.FINISHED, "___NOT_FINISHED___");
        require(msg.sender == winner, "___NOT_WINNER___");
        winner.transfer(address(this).balance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getContestDetails()
        public
        view
        returns (
            address,
            string memory,
            string memory,
            address,
            uint8,
            uint256,
            uint256,
            bool,
            bool,
            //address[][NUM_ALLOWED_PARTICIPANTS] memory,
            address[][] memory,
            ContestState
        )
    {
        return (
            owner,
            title,
            description,
            winner,
            NUM_ALLOWED_PARTICIPANTS,
            fee,
            currentRound,
            participationOpen,
            votingOpen,
            qualifiers,
            state
        );
    }

    function getContestantDetails(address _addr) public view returns (Contestant memory, address, uint8, bool){
        return (contestants[_addr], owner, currentRound, (votingOpen == false || state != ContestState.RUNNING) );
    }
}
