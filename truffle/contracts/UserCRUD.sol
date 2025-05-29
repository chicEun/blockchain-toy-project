// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IbadgeNFT {
    function mint(address to, uint256 id, uint256 amount) external;
    function balanceOf(
        address account,
        uint256 id
    ) external view returns (uint256);
}

contract UserCRUD is Ownable {
    IERC20 public stkToken;
    IbadgeNFT public badgeNFT;

    uint256 public memberCount;

    mapping(address => bool) public isMember;
    mapping(address => uint256) public postingsCounts;
    mapping(address => uint256) public totalRewards;

    address[] public connectedUsers;
    mapping(address => bool) public connected;
    address[] public members;

    struct Postings {
        string title;
        string content;
        uint256 timestamp;
    }

    mapping(address => Postings[]) public userPostings;

    event PostCreated(
        address indexed _address,
        string title,
        string content,
        uint256 timestamp
    );
    event MemberAddress(address indexed _address);
    event RewardSent(address indexed _address, uint256 amount);
    event BadgeMinted(address indexed _address, uint256 badgeId);
    event WalletConnected(address indexed user);

    constructor(address _stkToken, address _badgeNFT) Ownable(msg.sender) {
        stkToken = IERC20(_stkToken);
        badgeNFT = IbadgeNFT(_badgeNFT);
    }

    function connectWallet() external {
        require(!connected[msg.sender], "Wallet already connected");
        connected[msg.sender] = true;
        connectedUsers.push(msg.sender);
        emit WalletConnected(msg.sender);
    }

    function setMember(address _address) public onlyOwner {
        require(!isMember[_address], "already a member");
        isMember[_address] = true;
        memberCount += 1;
        members.push(_address);
        emit MemberAddress(_address);
    }

    function getAllMembers() external view returns (address[] memory) {
        return members;
    }

    function getConnectedUsers() external view returns (address[] memory) {
        return connectedUsers;
    }

    function writePostings(
        string memory title,
        string memory content
    ) external payable {
        require(msg.value == 0.5 ether, "must pay 0.5 Ether");

        userPostings[msg.sender].push(
            Postings(title, content, block.timestamp)
        );
        emit PostCreated(msg.sender, title, content, block.timestamp);

        postingsCounts[msg.sender] += 1;

        uint256 rewardAmount = 1 ether; // 기본 보상

        if (isMember[msg.sender]) {
            string memory currentGrade = getGrade(msg.sender);
            uint256 pc = postingsCounts[msg.sender];

            if (
                keccak256(abi.encodePacked(currentGrade)) ==
                keccak256(abi.encodePacked("EXCELLENT")) &&
                pc > 20
            ) {
                // EXCELLENT
                rewardAmount = 20 ether;
                badgeNFT.mint(msg.sender, 2, 1);
                emit BadgeMinted(msg.sender, 2);
            } else if (
                keccak256(abi.encodePacked(currentGrade)) ==
                keccak256(abi.encodePacked("BEST")) &&
                pc > 10
            ) {
                // BEST
                rewardAmount = 10 ether;
                badgeNFT.mint(msg.sender, 1, 1);
                emit BadgeMinted(msg.sender, 1);
            } else if (
                keccak256(abi.encodePacked(currentGrade)) ==
                keccak256(abi.encodePacked("GOOD")) &&
                pc > 3
            ) {
                // GOOD

                rewardAmount = 2 ether;
                badgeNFT.mint(msg.sender, 0, 1);
                emit BadgeMinted(msg.sender, 0);
            }
        }

        stkToken.transfer(msg.sender, rewardAmount);
        totalRewards[msg.sender] += rewardAmount;
        emit RewardSent(msg.sender, rewardAmount);
    }

    function getPostings() external view returns (Postings[] memory) {
        return userPostings[msg.sender];
    }

    function getMyStatus()
        external
        view
        returns (
            uint256 postingCount,
            uint256 rewardTotal,
            string memory grade,
            uint256 badge0,
            uint256 badge1,
            uint256 badge2
        )
    {
        address user = msg.sender;
        postingCount = postingsCounts[user];
        rewardTotal = totalRewards[user];
        grade = getGrade(user);
        badge0 = badgeNFT.balanceOf(user, 0);
        badge1 = badgeNFT.balanceOf(user, 1);
        badge2 = badgeNFT.balanceOf(user, 2);
    }

    function getGrade(address user) public view returns (string memory) {
        if (!isMember[user]) return "General";

        uint256 pc = postingsCounts[user];
        uint256 reward = stkToken.balanceOf(user);

        if (pc >= 20 && reward >= 100 ether) return "EXCELLENT";
        else if (pc >= 10 && reward >= 10 ether) return "BEST";
        else if (pc >= 3 && reward >= 3 ether) return "GOOD";
        else return "MEMBER";
    }

    function getBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function withdrawETH(address payable to) external onlyOwner {
        to.transfer(address(this).balance);
    }
}
