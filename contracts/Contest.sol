//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Contest is Initializable{
    address public owner;
    address payable public winner;

    uint8 constant MAX_PARTICIPANTS = 4;
    uint public contestingFee;
    uint public votingFee;
    uint8 public currentRound;

    bool public votingOpen;
    bool public participationOpen;

    struct Contestant {
        uint[4] votesReceived;
        uint8 progressedToRound;
        string ipfsHash;
    }
    mapping(address => Contestant) public contestants;
    address[][MAX_PARTICIPANTS] public roundWinners;

    // Fired to signal that the contest is open for participation
    event ContestOpenedForParticipation();

    /*
     * Fired once the number of participants = 4. 
     * Signals that the contest is closed for participation
     */
    event ContestClosedForParticipation( address indexed _addr);

    // Voting opened for a round
    event VotingOpened(uint8 round);

    // Voting closed for a round
    event VotingClosed(uint8 round);

    function initialize(address _owner, uint _contestingFee, uint _votingFee) external {
        //__ERC721_init(_name, _symbol);
        owner = _owner;
        contestingFee = _contestingFee;
        votingFee = _votingFee;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Only owners allowed");
        _;
    }

    function enableParticipation() public isOwner {
        participationOpen = true;
    }

    function disableParticipation() public isOwner {
        participationOpen = false;
    }
    
    function openVoting() public isOwner {
        require(!participationOpen, "Participation open");
        require(roundWinners[0].length == MAX_PARTICIPANTS, "No participants");
        votingOpen = true;
    }

    function closeVoting() public isOwner {
        require(votingOpen, "Voting not open");
        require(!participationOpen, "Participation open");
        votingOpen = false;

        /*
         * Max. Rounds = MAX_PARTICIPANTS - 1
         * So, for 4 participants, max rounds = 3 => R0, R1, R2
         * So, we count votes of the current round and eliminate 
         * the person with the lowest votes.
         * Except for the Fina Round.
         * For final round, we have an algorthm that takes into 
         * consideration weighted votes from all the rounds.
         */
        uint8 total_rounds = MAX_PARTICIPANTS - 1;

        if( currentRound <  total_rounds - 1) {
            uint8 tmpCId = 0;
            uint tmpLowestVotes = contestants[roundWinners[currentRound][tmpCId]].votesReceived[currentRound];
            
            for(uint8 i = 1; i < roundWinners[currentRound].length; i++) {     
                //TODO: Right now, I haven't accounted for a scenario when 2 contestants 
                // have equal scores. So, using <= instead of < , for now           
                if( contestants[roundWinners[currentRound][i]].votesReceived[currentRound] <= tmpLowestVotes) {
                    tmpLowestVotes = contestants[roundWinners[currentRound][i]].votesReceived[currentRound];
                    tmpCId = i;
                }               
            }

            for(uint8 i = 0; i < roundWinners[currentRound].length; i++) {
                //Skip the one with the lowest votes
                if(i != tmpCId) {
                    roundWinners[currentRound + 1].push(roundWinners[currentRound][i] );
                    contestants[roundWinners[currentRound][i]].progressedToRound = currentRound + 1;
                }
            }
            currentRound++;
        }
        else {
            pickWinner();
        }        
    }

    function pickWinner() private {
        /*
         * For final score, we use weighted scores of all the roundsWeighted 
         * final score = 60% x final (3rd) Round + 30% x 2nd round + 10% x 1st round
         */
        uint[4] storage finalistOneAllVotes = contestants[roundWinners[2][0]].votesReceived;
        uint finalistOneFinalScore = 60 * finalistOneAllVotes[2] + 30 * finalistOneAllVotes[1] + 10 * finalistOneAllVotes[0];
        
        uint[4] storage finalistTwoAllVotes = contestants[roundWinners[2][1]].votesReceived;
        uint finalistTwoFinalScore = 60 * finalistTwoAllVotes[2] + 30 * finalistTwoAllVotes[1] + 10 * finalistTwoAllVotes[0];

        if( finalistTwoFinalScore > finalistOneFinalScore) {
            winner = payable(roundWinners[2][1]);
        }
        else {
            winner = payable(roundWinners[2][0]);
        }
    }


    function participate(string memory _ipfsHash) public payable{
        require(participationOpen, "Participation is closed for now");
        require(roundWinners[0].length < MAX_PARTICIPANTS, "Maximum number of participants reached");
        require(msg.value == contestingFee, "Please pay the required fee to partipate");
        
        roundWinners[0].push(msg.sender);
        contestants[msg.sender].ipfsHash = _ipfsHash;

        /* 
         * If we have reached MAX_PARTICIPANTS contestants now, 
         * disable further participantion and notify the UI
         */
        if( roundWinners[0].length == MAX_PARTICIPANTS ) {
            participationOpen = false;
            emit ContestClosedForParticipation(msg.sender);
        }
    }

    function vote(address _addr) public payable {
        require(msg.value == votingFee, "Please pay the required fee to vote");
        require(votingOpen, "Voting is closed for now");
        //require( keccak256(contestants[_addr].ipfsHash) != keccak256("") , "Invalid contestant");
        require(bytes(contestants[_addr].ipfsHash).length != 0 , "Invalid contestant");
        require(contestants[_addr].progressedToRound == currentRound, "Contestant already eliminated");
        //also check whether the contestant has advanced to this round or not
        contestants[_addr].votesReceived[currentRound] += 1;
    }

    function claimReward() public {
        require(msg.sender == winner);
        winner.transfer(address(this).balance);
    }

    function getBalance() public view returns (uint){
        return address(this).balance;
    }
}