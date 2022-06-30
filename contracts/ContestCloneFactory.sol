//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";
import './Contest.sol';

contract ContestCloneFactory {
    
    address immutable implementation;
    struct ClonedContest {
        address addr;
        string title;
    }
    ClonedContest[] public contests;
    
    constructor() {
        implementation = address(new Contest());
    }

    function createClone(string memory _title, uint _contestingFee, uint _votingFee) external returns (address) {
        address clone = Clones.clone(implementation);
        Contest(clone).initialize(msg.sender, _title, _contestingFee, _votingFee);
        //contests.push(Contest(clone));
        ClonedContest storage _contest = contests.push();
        _contest.title = _title;
        _contest.addr = clone;
        return clone;
    }

    function getContests() public view returns ( ClonedContest[] memory){
        return contests;
    }

    function getDummy() public pure returns (string memory) {
        return "Helllloooooo!!";
    }
}