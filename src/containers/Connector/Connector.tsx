import { useState, useEffect, useCallback } from 'react';
import { createContainer } from 'unstated-next';
import { useRecoilState } from 'recoil';
import { TransactionNotifier, TransactionNotifierInterface } from '@synthr/transaction-notifier';
import { loadProvider } from '@synthr/providers';

import { useConnectWallet, useSetChain } from '@web3-onboard/react';
import { initOnboard } from './config';

import { isSupportedNetworkId } from 'utils/network';
import { NetworkId } from 'config/constants/network';
import { ethers, providers } from 'ethers';

import { appReadyState } from 'store/app';
import { walletAddressState, networkState } from 'store/wallet';

import { keyBy } from 'lodash';
import { useMemo } from 'react';
import { BIG_ZERO, DEFAULT_NETWORK_ID, localStorageKeyForChainId } from 'config/constants/defaults';
import { REACT_APP_INFURA_PROJECT_ID } from 'config/constants/network';
import { toast } from 'react-toastify';

export const useConnector = () => {
	const [{ wallet }, connect, disconnect] = useConnectWallet();
	const [{ connectedChain, settingChain }, setChain] = useSetChain();

	const [provider, setProvider] = useState<ethers.providers.Provider | null>(null);
	const [switchingOn, setSwitchingOn] = useState<boolean>(false);
	// const { toastWarning, toastInfo } = useToast();

	const [signer, setSigner] = useState<ethers.Signer | null>(null);
	const [onboard, setOnboard] = useState<any | null>(null);
	const [isNotInstalled, setIsNotInstalled] = useState<boolean>(false);
	const [isAppReady, setAppReady] = useRecoilState(appReadyState);
	const [walletAddress, setWalletAddress] = useRecoilState(walletAddressState);

	const [transactionNotifier, setTransactionNotifier] =
		useState<TransactionNotifierInterface | null>(null);

	const checkMM = useCallback(() => {
		// toastInfo("Info", "Please install metamask.");
		// window.alert("Please install metamask");
		toast.warn("Please install metamask")
		setIsNotInstalled(true);
	}, []);

	useEffect(() => {
		if (!window.ethereum && !isNotInstalled) {
			checkMM();
		}
	}, [checkMM, isNotInstalled]);

	useEffect(() => {
		setOnboard(initOnboard);
	}, []);

	const switchNetworkByOnboard = useCallback(async (chainId: number) => {
		try {
			setSwitchingOn(true);
			const hexChainId = `0x${chainId.toString(16)}`;
			const res = await setChain({ chainId: hexChainId });
			setTimeout(() => {
				setSwitchingOn(false);
			}, res ? 5 * 1000 : 500);
			return {
				status: res,
				msg: res ? 'Succefully switched.': 'User rejected switching network.'
			};
		} catch (e: any) {
			setSwitchingOn(false);
			return {
				status: false,
				msg: e?.message
			};
		}
	}, [setChain]);

	const initConnectedChain = useCallback(async() => {
		if (connectedChain) {
			const networkId = parseInt(connectedChain.id, 16);
			if (networkId !== Number(process.env.REACT_APP_CHAIN_ID)) {
				// This should only happen when a user is connected and changes to an unsupported network
				if (window.ethereum) {
					setIsNotInstalled(false);
					// window.alert('You are on the wrong network.');
					// toastWarning('Warning', 'You are on the wrong network.');
					toast.warn("You are on the wrong network.")
					await switchNetworkByOnboard(Number(process.env.REACT_APP_CHAIN_ID));
				}
				return;
			}
			const supportedId = isSupportedNetworkId(networkId) ? networkId : DEFAULT_NETWORK_ID;
			window.localStorage.setItem(localStorageKeyForChainId, supportedId.toString());
		}
	}, [connectedChain, switchNetworkByOnboard])

	const initOnboardWeb3 = useCallback(() => {
		if (connectedChain && wallet) {
			const pvd = new ethers.providers.Web3Provider(wallet.provider, 'any');
			const signer = pvd.getSigner();			
			
			if (transactionNotifier) {
				transactionNotifier.setProvider(pvd);
			} else {
				setTransactionNotifier(new TransactionNotifier(pvd));
			}
			setAppReady(true);
			setProvider(pvd);
			setSigner(signer);
			setWalletAddress(wallet.accounts[0].address);
		}
	}, [connectedChain, wallet, transactionNotifier, setWalletAddress, setAppReady])

	useEffect(() => {
		initConnectedChain();
		initOnboardWeb3();
	}, [connectedChain, initOnboardWeb3, initConnectedChain]);

	const nativeBalance = useMemo(() => {
		const obj = wallet?.accounts[0]?.balance;
		return obj ? ethers.utils.parseEther(Object.values(obj)[0]) : BIG_ZERO;
	}, [wallet?.accounts])

	const connectWallet = async () => {
		try {
			await connect();
		} catch (e) {
			console.log(e);
		}
	};

	const disconnectWallet = async () => {
		try {
			if (wallet) {
				await disconnect(wallet);
				setWalletAddress(null);
				setSigner(null);
				setAppReady(false);
				window.localStorage.removeItem('connectedWallets');
			}
		} catch (e) {
			console.log(e);
		}
	};

	return {
		walletAddress,
		activeChainId: connectedChain?.id ? parseInt(connectedChain?.id, 16)  as NetworkId : DEFAULT_NETWORK_ID  as NetworkId,
		nativeBalance,
		isAppReady,
		provider,
		signer,
		onboard,
		settingChain,
		connectWallet,
		disconnectWallet,
		switchNetworkByOnboard,
		transactionNotifier,
	};
};

const Connector = createContainer(useConnector);

export default Connector;
