// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract STKToken is ERC20, Ownable {
    constructor() ERC20("STK Token", "STK") Ownable(msg.sender) {}

    // 무제한 발행
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
