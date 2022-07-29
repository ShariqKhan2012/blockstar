//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Contest is Initializable {
    address public owner;
    address payable public winner;
    string public title;

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
        string[4] performanceLinks;
        uint256[4] votesReceived;
        uint8 progressedToRound;
    }
    mapping(address => Contestant) public contestants;
    address[][NUM_ALLOWED_PARTICIPANTS] public roundWinners;

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
        uint256 _fee
    ) external {
        //__ERC721_init(_name, _symbol);
        owner = _owner;
        title = _title;
        fee = _fee;
        participationOpen = true;
        state = ContestState.RUNNING;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Only owners allowed");
        _;
    }

    modifier isRunning() {
        require(state == ContestState.RUNNING, "Contest not running");
        _;
    }

    modifier isPaused() {
        require(state == ContestState.PAUSED, "Contest not paused");
        _;
    }

    function stopContest() public isOwner{
        require(state != ContestState.FINISHED, "Contest not paused");
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
        require(!participationOpen, "Participation open");
        require( roundWinners[0].length == NUM_ALLOWED_PARTICIPANTS, "Not enough participants" );
        votingOpen = true;
    }

    function closeVoting() public isOwner isRunning{
        require(votingOpen, "Voting not open");
        require(!participationOpen, "Participation open");
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
        uint8 total_rounds = NUM_ALLOWED_PARTICIPANTS - 1;

        if (currentRound < total_rounds - 1) {
            uint8 tmpCId = 0;
            uint256 tmpLowestVotes = contestants[
                roundWinners[currentRound][tmpCId]
            ].votesReceived[currentRound];

            for (uint8 i = 1; i < roundWinners[currentRound].length; i++) {
                //TODO: Right now, I haven't accounted for a scenario when 2 contestants
                // have equal scores. So, using <= instead of < , for now
                if (
                    contestants[roundWinners[currentRound][i]].votesReceived[
                        currentRound
                    ] <= tmpLowestVotes
                ) {
                    tmpLowestVotes = contestants[roundWinners[currentRound][i]]
                        .votesReceived[currentRound];
                    tmpCId = i;
                }
            }

            for (uint8 i = 0; i < roundWinners[currentRound].length; i++) {
                //Skip the one with the lowest votes
                if (i != tmpCId) {
                    roundWinners[currentRound + 1].push(
                        roundWinners[currentRound][i]
                    );
                    contestants[roundWinners[currentRound][i]]
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
        uint256[4] storage finalistOneAllVotes = contestants[roundWinners[2][0]]
            .votesReceived;
        uint256 finalistOneFinalScore = 60 *
            finalistOneAllVotes[2] +
            30 *
            finalistOneAllVotes[1] +
            10 *
            finalistOneAllVotes[0];

        uint256[4] storage finalistTwoAllVotes = contestants[roundWinners[2][1]]
            .votesReceived;
        uint256 finalistTwoFinalScore = 60 *
            finalistTwoAllVotes[2] +
            30 *
            finalistTwoAllVotes[1] +
            10 *
            finalistTwoAllVotes[0];

        if (finalistTwoFinalScore > finalistOneFinalScore) {
            winner = payable(roundWinners[2][1]);
        } else {
            winner = payable(roundWinners[2][0]);
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
        require(participationOpen, "Participation is closed for now");
        require( msg.value == fee, "Please pay the required fee to partipate" );
        require(msg.sender != owner, "Admin not allowed");
        require( bytes(contestants[msg.sender].bio).length == 0, "Existing contestant" );
        require( roundWinners[0].length < NUM_ALLOWED_PARTICIPANTS, "Maximum participants reached" );
        require(_name.length != 0, "Empty name");
        require(bytes(_performanceLink).length != 0, "Empty link");
        require(bytes(_bio).length != 0, "Empty Bio");
        require(bytes(_bio).length <= 60, "Long Bio");

        roundWinners[0].push(msg.sender);
        contestants[msg.sender].name = _name;
        contestants[msg.sender].performanceLinks[currentRound] = _performanceLink;
        contestants[msg.sender].bio = _bio;

        /*
         * If we have reached NUM_ALLOWED_PARTICIPANTS contestants now,
         * disable further participantion and notify the UI
         */
        if (roundWinners[0].length == NUM_ALLOWED_PARTICIPANTS) {
            participationOpen = false;
            emit ContestClosedForParticipation(msg.sender);
        }
    }

    function submitPerformamce(string memory _performanceLink) public payable isRunning{
        require(participationOpen, "Participation is closed for now");
        require( roundWinners[0].length < NUM_ALLOWED_PARTICIPANTS, "Maximum participants reached" );
        require( bytes(contestants[msg.sender].bio).length != 0, "Invalid contestant" );
        require( contestants[msg.sender].progressedToRound == currentRound, "Contestant already eliminated" );
        require(bytes(_performanceLink).length != 0, "Empty link");

        //roundWinners[0].push(msg.sender);
        contestants[msg.sender].performanceLinks[currentRound] = _performanceLink;
    }

    function vote(address _addr) public payable isRunning{
        require(votingOpen, "Voting is closed for now");
        require(msg.sender != owner, "Admin not allowed");
        require( bytes(contestants[_addr].bio).length != 0, "Invalid contestant" );
        require( contestants[_addr].progressedToRound == currentRound, "Contestant already eliminated" );
        //also check whether the contestant has advanced to this round or not
        contestants[_addr].votesReceived[currentRound] += 1;
    }

    function claimReward() public {
        require(state == ContestState.FINISHED, "Contest not finished");
        require(msg.sender == winner);
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
            address,
            uint8,
            uint256,
            uint256,
            bool,
            bool,
            address[][NUM_ALLOWED_PARTICIPANTS] memory,
            ContestState
        )
    {
        return (
            owner,
            title,
            winner,
            NUM_ALLOWED_PARTICIPANTS,
            fee,
            currentRound,
            participationOpen,
            votingOpen,
            roundWinners,
            state
        );
    }
}
