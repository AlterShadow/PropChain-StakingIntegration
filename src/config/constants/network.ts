import { BigNumber } from 'ethers';
import { BASE_URL } from '.';

export const GWEI_PRECISION = 9;
export const REACT_APP_INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;
export enum Transaction {
	PRESUBMIT = 'PRESUBMIT',
	WAITING = 'WAITING',
	FAILED = 'FAILED',
	SUCCESS = 'SUCCESS',
}
export type GasLimitEstimate = BigNumber | null;
export const DEBT_RATIO_UNIT = 10000000000000000000;
export const ETH_UNIT = 1000000000000000000;

export const NetworkIdByName:{[chainName: string]: number} = {
    'mainnet': 1,
    'rinkeby': 4,
    'goerli': 5,
    'bsc': 56,
    'bsc-testnet': 97,
    'polygon': 137,
    'mumbai': 80001,
    'arbitrum': 42161,
    'arbitrum-goerli': 421613,
    'fuji': 43113,
    'metis': 1088,
    'metis-goerli': 599,
	'sepolia': 11155111,
};
export const NetworkNameById:{[chainId: number]: string }  = { 
    1: "mainnet",
    4: "rinkeby",
    5: "goerli",
    56: "bsc",
    97: "bsc-testnet",
    137: "polygon",
    80001: "mumbai",
    42161: "arbitrum",
    421613: "arbitrum-goerli",
    43113: "fuji",
    1088: "metis",
    599: "metis-goerli",
	11155111: "sepolia"
};

export declare type NetworkIdByNameType = typeof NetworkIdByName;
export declare type NetworkName = keyof typeof NetworkIdByName;
export declare type NetworkId = typeof NetworkIdByName[keyof typeof NetworkIdByName];

export type NetworksType = {
	name: string;
	symbol: string;
	chainId: number;
	rpc: string;
	explorer: string;
	icon?: string;
	lzChainId?: number;
	networkBkColor?: string;
	networkTxColor?: string;
	smallIcon?: string;
}

export const networkInfos: { [chainId: number]: NetworksType } = {
	1: {
		name: 'Mainnet',
		symbol: 'ETH',
		chainId: 1,
		lzChainId: 101,
		rpc: `https://mainnet.infura.io/v3/${REACT_APP_INFURA_PROJECT_ID}`,
		explorer: 'https://etherscan.io/',
		icon: `${BASE_URL}images/networks/ethereum.png`,
		smallIcon: `${BASE_URL}images/networks/ethereum.png`,
		networkBkColor: 'rgba(191, 244, 255, 0.83)',
		networkTxColor: '#00232C',
	},
	5: {
		name: 'Goerli Testnet',
		symbol: 'ETH',
		chainId: 5,
		lzChainId: 10121,
		rpc: `https://goerli.infura.io/v3/${REACT_APP_INFURA_PROJECT_ID}`,
		explorer: 'https://goerli.etherscan.io/',
		icon: `${BASE_URL}images/networks/eth.png`,
		smallIcon: `${BASE_URL}images/networks/ethereum.png`,
		networkBkColor: 'rgba(191, 244, 255, 0.83)',
		networkTxColor: '#00232C',
	},
	97: {
		name: 'BSC Testnet',
		symbol: 'BNB',
		chainId: 97,
		lzChainId: 10102,
		rpc: 'https://data-seed-prebsc-2-s1.binance.org:8545',
		explorer: 'https://testnet.bscscan.com/',
		icon: `${BASE_URL}images/networks/binance.png`,
		smallIcon: `${BASE_URL}images/networks/bsc.png`,
		networkBkColor: '#FFEFC8',
		networkTxColor: '#C58B00',
	},
	56: {
		name: 'Binance Smart Chain',
		symbol: 'BNB',
		chainId: 56,
		lzChainId: 102,
		rpc: 'https://bsc-dataseed2.binance.org/',
		explorer: 'https://www.bscscan.com/',
		icon: `${BASE_URL}images/networks/bsc.png`,
		smallIcon: `${BASE_URL}images/networks/bsc.png`,
		networkBkColor: '#FFEFC8',
		networkTxColor: '#C58B00',
	},
	137: {
		name: 'Polygon Mainnet',
		symbol: 'MATIC',
		chainId: 137,
		lzChainId: 109,
		rpc: 'https://polygon-rpc.com/',
		explorer: 'https://polygonscan.com',
		icon: `${BASE_URL}images/networks/polygon.png`,
		smallIcon: `${BASE_URL}images/networks/polygon.png`,
		networkBkColor: '#DAC4FF',
		networkTxColor: '#8247E5',
	},
	80001: {
		name: 'Polygon Mumbai',
		symbol: 'MATIC',
		chainId: 80001,
		lzChainId: 10109,
		rpc: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
		explorer: 'https://mumbai.polygonscan.com',
		icon: `${BASE_URL}images/networks/polygon.png`,
		smallIcon: `${BASE_URL}images/networks/polygon.png`,
		networkBkColor: '#DAC4FF',
		networkTxColor: '#8247E5',
	},
	42161: {
		name: 'Arbitrum',
		symbol: 'ETH',
		chainId: 42161,
		lzChainId: 110,
		rpc: 'https://arb1.arbitrum.io/rpc',
		explorer: 'https://arbiscan.io/',
		icon: `${BASE_URL}images/networks/arbitrum.png`,
		smallIcon: `${BASE_URL}images/networks/arbitrum.png`,
		networkBkColor: '#C8E1FF',
		networkTxColor: '#004FC5',
	},
	421613: {
		name: 'Arbitrum Goerli',
		symbol: 'AETH',
		chainId: 421613,
		lzChainId: 10143,
		rpc: 'https://goerli-rollup.arbitrum.io/rpc', // 'https://arb-goerli.g.alchemy.com/v2/XcdM-HZA9Xze389DoFFpvVdGf5UwsujN',
		explorer: 'https://testnet.arbiscan.io/',
		icon: `/images/networks/arbitrum.png`,
		smallIcon: `/images/networks/arbitrumSmall.png`,
		networkBkColor: '#C8E1FF',
		networkTxColor: '#004FC5',
	},
	43113: {
		name: 'Fuji C Chain',
		symbol: 'AVAX',
		chainId: 43113,
		lzChainId: 10106,
		rpc: 'https://avalanche-fuji-c-chain.publicnode.com',
		explorer: 'https://testnet.snowtrace.io/',
		icon: `/images/networks/avalanche.png`,
		smallIcon: `/images/networks/avalancheSmall.png`,
		networkBkColor: 'rgba(191, 244, 255, 0.83)',
		networkTxColor: '#00232C',
	},
	11155111: {
		name: 'Sepolia',
		symbol: 'MATIC',
		chainId: 11155111,
		lzChainId: 10161,
		rpc: `https://sepolia.infura.io/v3/${REACT_APP_INFURA_PROJECT_ID}`,
		explorer: 'https://sepolia.etherscan.io/',
		icon: `/images/networks/avalanche.png`,
		smallIcon: `/images/networks/avalancheSmall.png`,
		networkBkColor: 'rgba(191, 244, 255, 0.83)',
		networkTxColor: '#00232C',
	},
}

export const CUSTOM_RPC_CHAINS = [56, 97, 137, 80001, 43113, 421613, 11155111 ]

export const networkList: NetworksType[] = [
	{
		name: 'Fuji C Chain',
		symbol: 'AVAX',
		chainId: 43113,
		lzChainId: 10106,
		rpc: 'https://avalanche-fuji-c-chain.publicnode.com',
		explorer: 'https://testnet.snowtrace.io/',
		icon: `/images/networks/avalanche.png`,
		smallIcon: `/images/networks/avalancheSmall.png`,
		networkBkColor: 'rgba(191, 244, 255, 0.83)',
		networkTxColor: '#00232C',
	},
	{
		name: 'Goerli Testnet',
		symbol: 'ETH',
		chainId: 5,
		lzChainId: 10121,
		rpc: `https://goerli.infura.io/v3/${REACT_APP_INFURA_PROJECT_ID}`,
		explorer: 'https://goerli.etherscan.io/',
		icon: `/images/networks/eth.png`,
		smallIcon: `${BASE_URL}images/networks/ethereum.png`,
		networkBkColor: 'rgba(191, 244, 255, 0.83)',
		networkTxColor: '#00232C',
	},
	{
		name: 'BSC Testnet',
		symbol: 'BNB',
		chainId: 97,
		lzChainId: 10102,
		rpc: 'https://data-seed-prebsc-2-s1.binance.org:8545',
		explorer: 'https://testnet.bscscan.com/',
		icon: `/images/networks/binance.png`,
		smallIcon: `/images/networks/bsc.png`,
		networkBkColor: '#FFEFC8',
		networkTxColor: '#C58B00',
	},
	{
		name: 'Arbitrum Goerli',
		symbol: 'AETH',
		chainId: 421613,
		lzChainId: 10143,
		rpc: 'https://goerli-rollup.arbitrum.io/rpc', // 'https://arb-goerli.g.alchemy.com/v2/XcdM-HZA9Xze389DoFFpvVdGf5UwsujN',
		explorer: 'https://testnet.arbiscan.io/',
		icon: `/images/networks/arbitrum.png`,
		smallIcon: `/images/networks/arbitrumSmall.png`,
		networkBkColor: '#C8E1FF',
		networkTxColor: '#004FC5',
	},
	{
		name: 'Polygon Mumbai',
		symbol: 'MATIC',
		chainId: 80001,
		lzChainId: 10109,
		rpc: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
		explorer: 'https://mumbai.polygonscan.com',
		icon: `${BASE_URL}images/networks/polygon.png`,
		smallIcon: `${BASE_URL}images/networks/polygon.png`,
		networkBkColor: '#DAC4FF',
		networkTxColor: '#8247E5',
	},
	{
		name: 'Sepolia',
		symbol: 'MATIC',
		chainId: 11155111,
		lzChainId: 10161,
		rpc: `https://sepolia.infura.io/v3/${REACT_APP_INFURA_PROJECT_ID}`,
		explorer: 'https://sepolia.etherscan.io/',
		icon: `${BASE_URL}images/networks/polygon.png`,
		smallIcon: `${BASE_URL}images/networks/polygon.png`,
		networkBkColor: '#DAC4FF',
		networkTxColor: '#8247E5',
	},
];

export const networkNamesByChainId: { [chainId: number | string]: string } = {
	1: 'eth',
	5: 'eth',
	56: 'bsc',
	97: 'bsc',
	137: 'polygon',
	80001: 'mumbai',
	11155111: 'sepolia',
	42161: 'arbitrum',
	421613: 'arbitrum',
	43113: 'avalanche',

	110: 'arbitrum',
	10143: 'arbitrum',
	10102: 'binance',
	102: 'binance',
	101: 'eth',
	10121: 'eth',
	10106: 'avalanche',
	10109: 'mumbai'
};

export const exploerNamesByChainId: { [chainId: number | string] : string } = {
	1: 'ether',
	5: 'ether',
	56: 'bsc',
	97: 'bsc',
	137: 'polygon',
	80001: 'polygon',
	42161: 'arbitrum',
	421613: 'arbitrum',
	43113: 'avalanche',
	11155111: 'sepolia',
};

export const lzIdByChainId: { [chainId: number | string]: number | string } = {
	1: 101,
	5: 10121,
	56: 102,
	97: 10102,
	42161: 110,
	421613: 10143,
	43113: 10106,
	80001: 10109,
	11155111: 10161
}