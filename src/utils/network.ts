import { detectEthereumProvider } from './metamask-detect-provider';
import { DEFAULT_GAS_BUFFER, DEFAULT_NETWORK_ID } from 'config/constants/defaults';

import { GasLimitEstimate, NetworkId } from 'config/constants/network';
import Wei, { wei } from '@synthr/wei';
import { GWEI_DECIMALS, GWEI_UNIT } from './infura';
import { GasPrice } from '@synthr/queries';
import { BASE_URL, MAIN_CHAINS } from 'config/constants';

const supportedNetwork = {
	43113: 'fuji',
	421613: 'arbitrum-goerli',
	97: 'bsc-testnet',
	5: 'goerli',
	80001: 'mumbai',
	11155111: 'sepolia'
}

export function isMainNetwork(id: number) : boolean {
	return MAIN_CHAINS.includes(id);
}

export function isSupportedNetworkId(id: number | string): id is NetworkId {
	return id in supportedNetwork;
}

export async function getDefaultNetworkId(): Promise<NetworkId> {
	try {
		const provider = await detectEthereumProvider();
		const id = Number(provider?.chainId || 0);
		return isSupportedNetworkId(id) ? id : DEFAULT_NETWORK_ID;
	} catch (e) {
		console.log(e);
		return DEFAULT_NETWORK_ID;
	}
}

export const getTotalGasPrice = (gasPriceObj?: GasPrice | null) => {
	if (!gasPriceObj) return wei(0);
	const { gasPrice, baseFeePerGas, maxPriorityFeePerGas } = gasPriceObj;
	if (gasPrice) {
		return wei(gasPrice, GWEI_DECIMALS);
	}
	return wei(baseFeePerGas || 0, GWEI_DECIMALS).add(wei(maxPriorityFeePerGas || 0, GWEI_DECIMALS));
};

export const getTransactionPrice = (
	gasPrice: GasPrice | null,
	gasLimit: GasLimitEstimate,
	ethPrice: Wei | null,
	optimismLayerOneFee: Wei | null
) => {
	if (!gasPrice || !gasLimit || !ethPrice) return null;
	const totalGasPrice = getTotalGasPrice(gasPrice);

	const extraLayer1Fees = optimismLayerOneFee;
	const gasPriceCost = totalGasPrice.mul(wei(gasLimit, GWEI_DECIMALS)).mul(ethPrice);
	const l1Cost = ethPrice.mul(extraLayer1Fees || 0);

	const txPrice = gasPriceCost.add(l1Cost);

	return txPrice;
};

export const normalizeGasLimit = (gasLimit: number) => gasLimit + DEFAULT_GAS_BUFFER;

export const gasPriceInWei = (gasPrice: number) => Math.ceil(gasPrice * GWEI_UNIT); // 🤔 sometimes a float on kovan

export const normalizedGasPrice = (gasPrice: number) => gasPrice * GWEI_UNIT;

export const getIsOVM = (networkId: number): boolean => !!~[10, 69].indexOf(networkId);
export const matchesNetworkErrorString = (error: string) =>
	error.includes('unsupported network or network id passed');

export const networkErrorMessage = 'Wrong network detected';

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
	tokenAddress: string,
	tokenSymbol: string,
	tokenDecimals = 18
) => {
	const tokenAdded = await window?.ethereum?.request({
		method: 'wallet_watchAsset',
		params: {
			type: 'ERC20',
			options: {
				address: tokenAddress,
				symbol: tokenSymbol,
				decimals: tokenDecimals,
				image: `${BASE_URL}/images/tokens/${tokenSymbol}.png`,
			},
		},
	});

	return tokenAdded;
};
