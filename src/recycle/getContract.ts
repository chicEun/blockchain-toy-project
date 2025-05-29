import Web3 from 'web3';
import type { AbiItem } from 'web3-utils';
import UserABI from "../../truffle/build/contracts/UserCRUD.json";

const getContract = () => {
    const UserABIContract = '0xF77B8DAA634f3BdFB7b422b4f804aad932913A9D';
    const web3 = new Web3(window.ethereum);

    const userNftTokenContract = new web3.eth.Contract(
        UserABI.abi as AbiItem[],
        UserABIContract
    );

    return {
        UserABIContract,
        userNftTokenContract,
    };
};

export default getContract;