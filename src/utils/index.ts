import { DEFAULT_NETWORK_ID, localStorageKeyForChainId } from 'config/constants/defaults';
import { networkInfos } from 'config/constants/network';
import { ethers } from 'ethers';
import sample from 'lodash/sample';

let web3: { [chainId: number]: ethers.providers.JsonRpcProvider | undefined} = {
    1: undefined,
    5: undefined    
};

export const getNodeUrl = (nodes: string[]) => {
    return sample(nodes);
};

export const getRpcProvider = async (rpcs: string[]) => {
    const RPC_URL = getNodeUrl(rpcs);
    return new ethers.providers.JsonRpcProvider(RPC_URL, 'any');
};

export const  getRpcProviderByChanId = (chId?: number): ethers.providers.JsonRpcProvider | undefined => {
    const chainId: number = Number(chId ?? DEFAULT_NETWORK_ID);
    if (web3[chainId] === undefined) {        
        const RPC_URL = getNodeUrl([networkInfos[chainId].rpc]);
        web3[chainId] = new ethers.providers.JsonRpcProvider(RPC_URL, 'any');
    }
    return web3[chainId];
};

export const addNetworkToMetamask = async (chainId: number) => {
    const selectedNetwork = networkInfos[chainId];
    const { rpc, name, symbol, explorer, icon } = selectedNetwork;

    const { ethereum } = window;

    if (!ethereum || !ethereum.isMetaMask) throw new Error('Metamask is not installed');

    const networkConfig = {
        chainId: `0x${chainId.toString(16)}`,
        chainName: `${name}`,
        rpcUrls: [rpc],
        nativeCurrency: {
            name,
            symbol,
            decimals: 18
        },
        blockExplorerUrls: [explorer],
        iconUrls: [icon]
    }
    await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkConfig],
    });
};

export const switchNetworkForMulti = async (chainId?: number) => {
    const { ethereum } = window;
    if (!ethereum || !ethereum.isMetaMask || chainId === undefined) {
        return {
            status: false,
            msg: 'Metamask is not installed. Please install metamask and refresh the app.'
        }
    }

    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [
            {
                chainId: `0x${chainId.toString(16)}`
            }
            ]
        });
        window.localStorage.setItem(localStorageKeyForChainId, chainId.toString());

        return {
            status: true,
            msg: 'Success'
        }
    } catch (e: any) {
        if (e?.code === 4902) {
            addNetworkToMetamask(chainId);
            return {
                status: false,
                msg: 'Network added. Please refresh the app and try again.'
            };
        } else {
            return {
                status: false,
                msg: e?.message
            }
        }
    }
}

export const convertStringToByte32 = (str: string) => {
    return ethers.utils.formatBytes32String(str);
}
