pragma solidity ^0.4.18;

contract Controlled {
    address public controller;
    address public controller_in_waiting;

    function Controlled() public {
        controller = msg.sender;
    }

    modifier onlyController() {
        require(msg.sender == controller);
        _;
    }

    function transferControl(address _newController)
        onlyController
        public returns (bool)
    {
        controller_in_waiting = _newController;
        return true;
    }

    function assumeControl()
        public returns (bool)
    {
        require(msg.sender == controller_in_waiting);
        delete controller_in_waiting;
        controller = msg.sender;
        return true;
    }
}
