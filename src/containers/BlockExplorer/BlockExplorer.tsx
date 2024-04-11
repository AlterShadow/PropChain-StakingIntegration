import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { useRecoilValue } from 'recoil';

import { Network } from 'store/wallet';

import { networkState } from 'store/wallet';
import { networkInfos, NetworkIdByName } from 'config/constants/network';

type BlockExplorerInstance = {
	txLink: (txId: string) => string;
	addressLink: (address: string) => string;
	tokenLink: (address: string) => string;
	blockLink: (blockNumber: string) => string;
	messageRelayer: (txId: string) => string;
};

const getBaseUrl = (network: Network) => {
	if (network.id === NetworkIdByName.mainnet) {
		return 'https://etherscan.io';
	}
	return networkInfos[network.id].explorer; // `https://${network.name}.etherscan.io`;
};

const generateExplorerFunctions = (baseUrl: string) => {
	return {
		txLink: (txId: string) => `${baseUrl}/tx/${txId}`,
		addressLink: (address: string) => `${baseUrl}/address/${address}`,
		tokenLink: (address: string) => `${baseUrl}/token/${address}`,
		blockLink: (blockNumber: string) => `${baseUrl}/block/${blockNumber}`,
		messageRelayer: (txId: string) => `${baseUrl}/messagerelayer?search=${txId}`,
	};
};

const useBlockExplorer = () => {
	const network = useRecoilValue(networkState);
	const [blockExplorerInstance, setBlockExplorerInstance] = useState<BlockExplorerInstance | null>(
		null
	);

	useEffect(() => {
		if (network) {
			const baseUrl = getBaseUrl(network);
			setBlockExplorerInstance(generateExplorerFunctions(baseUrl));
		}
	}, [network]);

	return {
		blockExplorerInstance,
	};
};

const BlockExplorer = createContainer(useBlockExplorer);

export default BlockExplorer;
