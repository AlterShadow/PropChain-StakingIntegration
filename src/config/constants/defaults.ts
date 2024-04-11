import { BigNumber } from 'ethers';


import { NetworkId, NetworkIdByName } from 'config/constants/network';

export const SYNTH_DECIMALS = 18;
// app defaults

export const localStorageKeyForCrossSwap = 'localStorageKeyForCrossSwap';
export const localStorageKeyForMint = 'localStorageKeyForMint';
export const localStorageKeyForChainId = 'localStorageKeyForChainId';
export const localStorageKeyForOGModal = 'localStorageKeyForOGModal';

// network defaults
const storageChainId = window.localStorage.getItem(localStorageKeyForChainId);
export const supportedChainIds = [1, 5, 11155111]; // 

const res: any = supportedChainIds.find((e: number) => e === Number(storageChainId));

const supportedNetId = res ?? NetworkIdByName['mainnet'];

export const DEFAULT_NETWORK_ID = storageChainId ? Number(supportedNetId) as NetworkId : NetworkIdByName['mainnet'];

export const DEFAULT_GAS_LIMIT = 500000;
export const DEFAULT_GAS_BUFFER = 15000;

// ui defaults
export const DEFAULT_SEARCH_DEBOUNCE_MS = 300;
export const DEFAULT_REQUEST_REFRESH_INTERVAL = 300000;
export const DEFAULT_CRYPTO_DECIMALS = 4;
export const DEFAULT_CRYPTO_DECIMALS2 = 4;
export const DEFAULT_FIAT_DECIMALS = 4;
export const DEFAULT_NUMBER_DECIMALS = 4;
export const DEFAULT_PERCENT_DECIMALS = 4;

// leverage adjustment
export const DEFAULT_NP_LEVERAGE_ADJUSTMENT: number = 0.9975;

// for mobile leaderboard
export const DEFAULT_LEADERBOARD_ROWS = 20;
export const DEFAULT_SLIPPAGE = 1;
export const DEFAULT_NUMBER_OF_TRADES: number = 16;
export const MAX_TIMESTAMP: number = 8640000000000000;

export const BIG_ZERO = BigNumber.from(0);
export const SMALL_MINT_AMOUNT = BigNumber.from(0);

export const AVAILABLE_NETWORK_COUNTS = 4;

export const CROSS_ACTION_TIME_INTERVAL = 5000;
export const ACTION_TIME_LIMIT = 25 * 60;
export const ACTION_TIME_LIMIT_SOURCE_CHAIN = 1 * 40;

export const ETH_TX_BUFFER = 0.006;
