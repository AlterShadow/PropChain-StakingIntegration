import contracts from 'config/constants/contracts';
import { DEFAULT_NETWORK_ID } from 'config/constants/defaults';
import { Address } from 'config/constants/types';

export const getAddress = (address: Address, chId?: number): string => {
	const chainId: number = Number(chId ?? DEFAULT_NETWORK_ID);
	return address[chainId as keyof Address];
};

export const getVestingAddress = (chainId?: number, type = "Seed"): string => {
    if (type === "Seed"){
        return getAddress(contracts.vesting.seed, chainId);
    } else if (type === "Private") {
        return getAddress(contracts.vesting.private, chainId);
    } else if (type === "Kol") {
        return getAddress(contracts.vesting.kol, chainId);
    } else if (type === "Public") {
        return getAddress(contracts.vesting.public, chainId);
    } else if (type === "Team") {
        return getAddress(contracts.vesting.team, chainId);
    } else if (type === "Advisors") {
        return getAddress(contracts.vesting.advisors, chainId);
    } else if (type === "Community") {
        return getAddress(contracts.vesting.comunity, chainId);
    } else if (type === "Rewards") {
        return getAddress(contracts.vesting.rewards, chainId);
    } else if (type === "Liquidity") {
        return getAddress(contracts.vesting.liquidity, chainId);
    } else if (type === "Operations") {
        return getAddress(contracts.vesting.operations, chainId);
    } else if (type === "Treasury") {
        return getAddress(contracts.vesting.treasury, chainId);
    } else if (type === "DBM") {
        return getAddress(contracts.vesting.additional, chainId);
    } else if (type === "OTC") {
        return getAddress(contracts.vesting.otc, chainId);
    } else {
        return getAddress(contracts.vesting.seed, chainId);
    }
}

export const getPropContractAddress = (chainId?: number): string => {
    return getAddress(contracts.token, chainId)
}

export const getStakingAddress = (chainId?: number, version: string = "v2"): string => {
    if (version === "v1"){
        return getAddress(contracts.staking.v1, chainId);
    } else {
        return getAddress(contracts.staking.v2, chainId);
    }
}

export const getSeedVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.seed, chainId);
}

export const getPrivateVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.private, chainId);
}

export const getKolVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.kol, chainId);
}

export const getPublicVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.public, chainId);
}

export const getTeamVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.team, chainId);
}

export const getAdvisorsVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.advisors, chainId);
}

export const getCommunityVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.comunity, chainId);
}

export const getRewardsVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.rewards, chainId);
}

export const getLiquidityVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.liquidity, chainId);
}

export const getOperationsVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.operations, chainId);
}

export const getTreasuryVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.treasury, chainId);
}

export const getAdditionalVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.additional, chainId);
}

export const getOtcVestingAddress = (chainId?: number): string => {
    return getAddress(contracts.vesting.otc, chainId);
}
