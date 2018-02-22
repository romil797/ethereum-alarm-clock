pragma solidity ^0.4.18;

import 'contracts/Dispatch/Controlled.sol';

contract DispatchHub is Controlled {
    mapping(string => address) libs;

    function DispatchHub() public {}

    function set(
        string _name,
        address _newLib
    ) 
        onlyController
        public returns (bool) 
    {
        libs[_name] = _newLib;
    }

    function get(string _name)
        public view returns (address)
    {
        return libs[_name];
    }
}
