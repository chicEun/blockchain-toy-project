// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BadgeNFT is ERC1155, Ownable {
    constructor(
        string memory badgeURIs
    ) ERC1155(badgeURIs) Ownable(msg.sender) {}

    function mint(address to, uint256 id, uint256 amount) external onlyOwner {
        _mint(to, id, amount, "");
    }

    // 배지 ID별 메타데이터 URI 반환
    function uri() public view returns (string memory) {
        return uri();
    }

    // URI를 수정할 수 있는 함수
    function setURI(string memory newURI) external onlyOwner {
        _setURI(newURI);
    }

    function trsnsferApprove(address newOwner) external onlyOwner {
        transferOwnership(newOwner);
    }
}
