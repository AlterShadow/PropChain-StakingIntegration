import { atom } from 'recoil';

import { getAppKey } from '../utils';

import {
	assetCurrencyStateKey,
	currentNetworkStateKey,
	currentNetworkStateKey2,
	layerzeroClientStateKey,
	networkChangeStatusKey,
} from './constants';
import { TokenAssetsTypes, collateralTiles } from 'config/constants/collateralTiles';
import { NetworksType, networkInfos } from 'config/constants/network';
import { mainChainId } from 'config/constants';

export enum AssetPanelType {
	ASSET = 'Asset',
	COLLATERAL = 'Collateral',
}

export enum NetworkPanelType {
	ASSET = 'Asset',
	COLLATERAL = 'Collateral',
}
const defaultSyUSD = {
	id: 21,
	tokenSymbol: 'syUSD',
	realSymbol: 'sUSD',
	chainId: 421613,
	contractAddress: '0x20fA210691a62B47baeDf0412cF8BB231BDA59F3',
	decimals: 18,
};

export const DEFAULT_ASSET: TokenAssetsTypes = collateralTiles.find(
	(_: TokenAssetsTypes) => _.tokenSymbol === 'USDT' && _.chainId === mainChainId
) ?? defaultSyUSD;

export const DEFAULT_NETWORK: NetworksType = networkInfos[mainChainId];

export const appReadyState = atom<boolean>({
	key: getAppKey('appReady'),
	default: false,
});

export const assetCurrencyState = atom<TokenAssetsTypes>({
	key: assetCurrencyStateKey,
	default: DEFAULT_ASSET,
});

export const currentNetworkState = atom<NetworksType>({
	key: currentNetworkStateKey,
	default: DEFAULT_NETWORK,
});

export const currentNetworkState2 = atom<NetworksType>({
	key: currentNetworkStateKey2,
	default: DEFAULT_NETWORK,
});

export const layerzeroClientState = atom<any>({
	key: layerzeroClientStateKey,
	default: null,
});

export const networkChangeStatus = atom<boolean>({
	key: networkChangeStatusKey,
	default: false,
});
