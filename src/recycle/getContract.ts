import Web3 from 'web3';
import type { AbiItem } from 'web3-utils';
import UserABI from "../../truffle/build/contracts/UserCRUD.json";
import BadgeABI from "../../truffle/build/contracts/BadgeNFT.json";
import STKTokenABI from "../../truffle/build/contracts/STKToken.json";

const getContract = () => {
    const UserABIContract = import.meta.env.VITE_USER_CONTRACT;
    const STKTokenABIContract = import.meta.env.VITE_STK_TOKEN_CONTRACT;
    const BadgeABIContract = import.meta.env.VITE_BADGE_NFT_CONTRACT;

    const web3 = new Web3(window.ethereum);

    const userContract = new web3.eth.Contract(
        UserABI.abi as AbiItem[],
        UserABIContract
    );

    const stkTokenContract = new web3.eth.Contract(
        STKTokenABI.abi as AbiItem[],
        STKTokenABIContract
    );

    const badgeNFTContract = new web3.eth.Contract(
        BadgeABI.abi as AbiItem[],
        BadgeABIContract
    );

    return {
        UserABIContract,
        STKTokenABIContract,
        BadgeABIContract,
        userContract,
        stkTokenContract,
        badgeNFTContract,
    };
};

export default getContract;