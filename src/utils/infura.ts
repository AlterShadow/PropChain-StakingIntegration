import Blocks from 'eth-block-timestamp'
import { DEFAULT_NETWORK_ID } from 'config/constants/defaults';
import { CUSTOM_RPC_CHAINS, networkInfos, REACT_APP_INFURA_PROJECT_ID, NetworkNameById, NetworkId } from 'config/constants/network';

export const GWEI_DECIMALS = 9;

export const GWEI_UNIT = 1000000000;
const SYNTHETIX_OVM_SUFFIX = '-ovm';
const INFURA_OWN_PREFIX = 'optimism-';

const ethereumInfura = `https://goerli.infura.io/v3/${REACT_APP_INFURA_PROJECT_ID}`;
const blocks = new Blocks(ethereumInfura);

const getNetworkName = (networkId?: NetworkId) => {
	if (!networkId) return NetworkNameById[DEFAULT_NETWORK_ID];
	return networkId in NetworkNameById ? NetworkNameById[networkId] : NetworkNameById[DEFAULT_NETWORK_ID];
};

export const getInfuraRpcURL = (networkId?: NetworkId) => {
	const networkName = getNetworkName(networkId);
	const optimismPrefix = networkName.includes(SYNTHETIX_OVM_SUFFIX) ? INFURA_OWN_PREFIX : '';
	const url = `https://${
		optimismPrefix + networkName.replace(SYNTHETIX_OVM_SUFFIX, '')
	}.infura.io/v3/${REACT_APP_INFURA_PROJECT_ID}`;
	
	return !CUSTOM_RPC_CHAINS.includes(networkId ?? DEFAULT_NETWORK_ID) ? url : networkInfos[networkId ?? DEFAULT_NETWORK_ID].rpc;
};

export const getBlockTimestamp = async () => {
	const res = await blocks.getDate('latest');
	return res?.timestamp;
}
  