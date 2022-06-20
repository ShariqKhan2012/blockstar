//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";
import './Contest.sol';

contract ContestCloneFactory {
    
    address immutable implementation;
    Contest[] public contests;
    
    constructor() {
        implementation = address(new Contest());
    }

    function createClone(uint _contestingFee, uint _votingFee) external returns (address) {
        address clone = Clones.clone(implementation);
        Contest(clone).initialize(msg.sender, _contestingFee, _votingFee);
        contests.push(Contest(clone));
        return clone;
    }

    function getContests() public view returns ( Contest[] memory){
        return contests;
    }
}