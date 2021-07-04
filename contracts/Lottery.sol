// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Lottery{
    address public manager;
    address payable[] public players;
    

    constructor(){
        manager = msg.sender;
    }
    
    function enter() public  payable {
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
    }
    
    function random() private view returns (uint){
        //Sha3  is a global function or keccak256()
        //Black is a global variablem
        return  uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
    }
    
    function reset() private{
        delete players;
    }
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    function pickWinner() public payable restricted(){
        uint index = random() % players.length;
        address payable winningPlayer =  players[index];
        //This is a global and balance represent all od the value
        winningPlayer.transfer(address(this).balance);
        //Reset the address
        reset();
    }
    
    function getAllPlayers() public view returns(address payable[] memory){
        return players;
    }    

}