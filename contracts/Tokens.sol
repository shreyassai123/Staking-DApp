pragma solidity 0.6.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    constructor() public ERC20("Reward Token", "REW") {
        uint256 initialSupply = 100000000;
        _mint(msg.sender, initialSupply);
    }
    
} 
