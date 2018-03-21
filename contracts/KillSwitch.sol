pragma solidity ^0.4.19;

contract KillSwitch {

    address owner;

    function KillSwitch() public {
        owner = msg.sender;

    }

    bool killed = true;

    event Pause();
    event Unpause();

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier whenNotPaused() {
        require(!killed);
        _;
    }

    modifier whenPaused() {
        require(killed);
        _;
    }

    function pause() onlyOwner whenNotPaused public {
        killed = true;
        Pause();
    }

    function unpause() onlyOwner whenPaused public {
        killed = false;
        Unpause();
    }

}