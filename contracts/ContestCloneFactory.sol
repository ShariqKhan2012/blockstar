//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import "./Contest.sol";

contract ContestCloneFactory {
    address immutable implementation;
    struct ClonedContest {
        address addr;
        string title;
    }
    ClonedContest[] public contests;

    //Events
    /*
     * Fired once the number of participants = 4.
     * Signals that the contest is closed for participation
     */
    event NewContestCreated(address indexed _creator, string _title, uint _fee);

    constructor() {
        implementation = address(new Contest());
    }

    function createClone(
        string memory _title,
        string memory _description,
        uint256 _fee
    ) external returns (address) {
        address clone = Clones.clone(implementation);
        Contest(clone).initialize(
            msg.sender,
            _title,
            _description,
            _fee
        );
        //contests.push(Contest(clone));
        ClonedContest storage _contest = contests.push();
        _contest.title = _title;
        _contest.addr = clone;

        emit NewContestCreated(msg.sender, _title, _fee);
        return clone;
    }

    function getContests() public view returns (ClonedContest[] memory) {
        return contests;
    }
}
