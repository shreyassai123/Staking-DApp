pragma solidity 0.6.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakingToken is ERC20 {
    constructor() public ERC20("Staking Token", "STK") {
        uint256 initialSupply = 100000000;
        _mint(msg.sender, initialSupply);
    }
    
}