import { BigNumber } from 'ethers';
import { BIG_ZERO } from './defaults';

export type TokenAssetsTypes = {
	id: number;
	tokenSymbol: string;
	realSymbol?: string;
	tvl?: BigNumber | number | string;
	stakedValue?: BigNumber | number | string;
	stakedValueInUsd?: BigNumber | number | string;
	network?: string;
	chainId: number;
	contractAddress: string;
	decimals: number;
	networkBkColor?: string;
	networkTxColor?: string;
	icon?: string;
	netIcon?: string;
	balance?: BigNumber;
	volume24h?: BigNumber | number | string;
	usdPrice?: BigNumber | number | string;
	supply?: BigNumber | number | string;
	freeCollateral?: BigNumber;
	dispBalance?: string;
	iDispBalance?: number;
	faucetAmount?: number;
	faucetLink?: string;
}

export const collateralTiles: TokenAssetsTypes[] = [
	{
		id: 1,
		tokenSymbol: 'ETH',
		realSymbol: 'ETH',
		tvl: 0,
		chainId: 5,
		contractAddress: '',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 2,
		tokenSymbol: 'USDT',
		realSymbol: 'USDT',
		chainId: 5,
		contractAddress: '0x67AcEeBEC61f780F9E25D234c1966D6eb1CCe744',
		decimals: 18,
		tvl: 0,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 3,
		tokenSymbol: 'USDC',
		realSymbol: 'USDC',
		tvl: 0,
		chainId: 5,
		contractAddress: '0x101ed9CA766c5BA0DacC5637Dd29457Cb948f0EC',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 4,
		tokenSymbol: 'USDT',
		realSymbol: 'USDT',
		tvl: 0,
		chainId: 43113,
		contractAddress: '0xA38FCf04F5EcA08fFE57F295f7B49e6E23B61a11',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 5,
		tokenSymbol: 'USDC',
		realSymbol: 'USDC',
		tvl: 0,
		chainId: 43113,
		contractAddress: '0x54889ee066CcE0C98FA49932EeA02b376A0181B0',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 6,
		tokenSymbol: 'WETH',
		realSymbol: 'ETH',
		tvl: 0,
		chainId: 43113,
		contractAddress: '0xe4ded492FaEd5a08Fb93ffB6d645ed8b07d59695',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 7,
		tokenSymbol: 'USDT',
		realSymbol: 'USDT',
		tvl: 0,
		chainId: 97,
		contractAddress: '0x1C76C79B43711F5EE225824A18299996E2FEd962',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 8,
		tokenSymbol: 'USDC',
		realSymbol: 'USDC',
		tvl: 0,
		chainId: 97,
		contractAddress: '0x3b62b0f0327Ed2198006A1E94812DE2db75bFA63',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 9,
		tokenSymbol: 'WETH',
		realSymbol: 'ETH',
		tvl: 0,
		chainId: 97,
		contractAddress: '0x1Fa8EC0556895eD63600BA24aBb608503A6613A5',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 10,
		tokenSymbol: 'USDT',
		realSymbol: 'USDT',
		tvl: 0,
		chainId: 421613,
		contractAddress: '0x27b4643bdD11C9761d64b2478B22d5f4C79609cd',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 11,
		tokenSymbol: 'USDC',
		realSymbol: 'USDC',
		tvl: 0,
		chainId: 421613,
		contractAddress: '0xF46Cf0917d8687fB4e9394ac0d253cE21eB0e1aa',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 12,
		tokenSymbol: 'AETH',
		realSymbol: 'ETH',
		tvl: 0,
		chainId: 421613,
		contractAddress: '',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 13,
		tokenSymbol: 'USDT',
		realSymbol: 'USDT',
		tvl: 0,
		chainId: 80001,
		contractAddress: '0x44D5DC1566576343d666aAE809A894489c27515e',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 14,
		tokenSymbol: 'USDC',
		realSymbol: 'USDC',
		tvl: 0,
		chainId: 80001,
		contractAddress: '0x5E5BBD784c1CFEe0f851a7bAeC3F068297AAD1Fb',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
	{
		id: 15,
		tokenSymbol: 'WETH',
		realSymbol: 'ETH',
		tvl: 0,
		chainId: 80001,
		contractAddress: '0x4AA164f64d5DCAd28EDeFa35B95CC0f827f4ca48',
		decimals: 18,
		balance: BIG_ZERO,
		usdPrice: BIG_ZERO,
		stakedValue: BIG_ZERO,
		iDispBalance: 0,
		volume24h: 0,
	},
];

export const collateralSymbols = [
	'ETH', 'USDT', 'USDC'
];
