import Web3 from 'web3';
import type { AbiItem } from 'web3-utils';
import UserABI from "../../truffle/build/contracts/UserCRUD.json";
import BadgeABI from "../../truffle/build/contracts/BadgeNFT.json";
import STKTokenABI from "../../truffle/build/contracts/STKToken.json";

const getContract = () => {
    const UserABIContract = '0xF77B8DAA634f3BdFB7b422b4f804aad932913A9D';
    const STKTokenABIContract = '0x18c0A0C4bE9B1BaC1367031193fb9eE0942Cf43A';
    const BadgeABIContract = '0x0B207190510c64209b52F887e143Fd224b543453';

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