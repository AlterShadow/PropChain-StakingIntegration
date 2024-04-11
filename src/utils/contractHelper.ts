import { ethers } from 'ethers';
import erc20Abi from 'config/abis/ERC20.json';
import { getRpcProviderByChanId } from 'utils';

import vestingAbi from 'config/abis/Vesting.json';
import stakingAbi from 'config/abis/Staking.json';
import stakingAbiOld from 'config/abis/Staking_Old.json';

import {
	getVestingAddress,
	getSeedVestingAddress,
	getPrivateVestingAddress,
	getKolVestingAddress,
	getPublicVestingAddress,
	getTeamVestingAddress,
	getAdvisorsVestingAddress,
	getCommunityVestingAddress,
	getRewardsVestingAddress,
	getLiquidityVestingAddress,
	getOperationsVestingAddress,
	getTreasuryVestingAddress,
	getAdditionalVestingAddress,
	getOtcVestingAddress,
	getStakingAddress,
	getPropContractAddress
} from './addressHelper';

const getContract = (
	abi: any,
	address: string,
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	const rpcProvider: ethers.providers.JsonRpcProvider | undefined = getRpcProviderByChanId(chainId);
	const signerOrProvider = signer ?? rpcProvider;
	return new ethers.Contract(address, abi, signerOrProvider);
};

export const getErc20Contract = (
	address: string,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	// const signerOrProvider = signer
	if (!address) return null;
	return new ethers.Contract(address, erc20Abi, signer);
};

export const getPropContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getErc20Contract(getPropContractAddress(chainId), signer);
}

export const getStakingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider,
	version: string = "v2"
) => {
	if (version === 'v2'){
		return getContract(stakingAbi, getStakingAddress(chainId, version), chainId, signer);	
	} else {
		return getContract(stakingAbiOld, getStakingAddress(chainId, version), chainId, signer);	
	}
}

export const getVestingContract = (
	chainId?: number,
	vestType?: string,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getVestingAddress(chainId, vestType), chainId, signer);
};

export const getSeedVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getSeedVestingAddress(chainId), chainId, signer);
};

export const getPrivateVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getPrivateVestingAddress(chainId), chainId, signer);
};

export const getKolVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getKolVestingAddress(chainId), chainId, signer);
};

export const getPublicVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getPublicVestingAddress(chainId), chainId, signer);
};

export const getTeamVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getTeamVestingAddress(chainId), chainId, signer);
};

export const getAdvisorsVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getAdvisorsVestingAddress(chainId), chainId, signer);
};

export const getCommunityVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getCommunityVestingAddress(chainId), chainId, signer);
};

export const getRewardsVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getRewardsVestingAddress(chainId), chainId, signer);
};

export const getLiquidityVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getLiquidityVestingAddress(chainId), chainId, signer);
};

export const getOperationsVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getOperationsVestingAddress(chainId), chainId, signer);
};

export const getTreasuryVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getTreasuryVestingAddress(chainId), chainId, signer);
};

export const getAdditionalVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getAdditionalVestingAddress(chainId), chainId, signer);
};

export const getOtcVestingContract = (
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(vestingAbi, getOtcVestingAddress(chainId), chainId, signer);
};

export const getERC20TokenContract = (
	address: string | undefined,
	chainId?: number,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	if (address === undefined) return null;
	return getContract(erc20Abi, address, chainId, signer);
};
