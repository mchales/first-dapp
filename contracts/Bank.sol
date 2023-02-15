// SPDX-License-Identifier: Unliscensed

pragma solidity ^0.8.1;

contract Bank{
    address owner;
    mapping (address => uint) receivedFrom;

    constructor(){
        owner = msg.sender; // The person who deploys the contract is the owner
    }

    // Recieve money from people
    function recieveMoney() public payable{
        receivedFrom[msg.sender] += msg.value;
    }

    // Gets the balance of this smart contract
    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    // The owner can withdraw all the money to their wallet
    function withDrawMoney() public{
        require(msg.sender == owner, "You are not the owner");
        address payable to = payable(owner);
        to.transfer(this.getBalance());
    }

    // The owner can withdraw money to a specific address
    function withdrawMoneyTo(address payable _to, uint _val) public{
        require(msg.sender == owner, "You are not the owner");
        require(_val <= this.getBalance(), "Not enough in the balance");
        _to.transfer(_val);
    }

    // Can view how much a particular address deposited into the contract
    function getReceivedFrom(address _address) public view returns(uint){
        return receivedFrom[_address];
    }

}