import { JsonRpcProvider } from '@ethersproject/providers';
import { supportedChainIds } from 'config/constants/defaults';
import { ethers } from 'ethers';
import { useState, useEffect, useMemo } from 'react';
import { getRpcProvider, getRpcProviderByChanId } from 'utils';

const useGetRpcProvider = (rpcs: string[]) => {
	const [provider, setProvider] = useState<JsonRpcProvider | null>(null);

	useEffect(() => {
		const get = async () => {
			const pvd = await getRpcProvider(rpcs);
			setProvider(pvd);
		};
		if (rpcs.length) {
			get();
		}
	}, [rpcs]);

	return provider;
};

export const useGetRpcProviderByChainId = (chainId?: number) => {
	const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | undefined>(undefined);

	useEffect(() => {
		const get = async () => {
			const pvd = await getRpcProviderByChanId(chainId);
			setProvider(pvd);
		};
		if (chainId) {
			get();
		}
	}, [chainId]);

	return provider;
};

export const useGetAllProviders = () => {
	const rpcs = useMemo(() => {
		const res: { [key in number | string]: JsonRpcProvider | undefined } = {};
		supportedChainIds.forEach((id: number) => {
			res[id] = getRpcProviderByChanId(id);
		});
		return res;
	}, []);

	return rpcs;
};

export default useGetRpcProvider;
