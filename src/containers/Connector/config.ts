import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';

import { networkInfos, NetworkIdByName } from 'config/constants/network';
import { ThemingMap } from '@web3-onboard/core/dist/types';

const injected = injectedModule();
const walletConnect = walletConnectModule({
	projectId: '2570faee71555d0738b63d5c25a9e6e9',
	dappUrl: process.env.REACT_APP_DAPP_URL
});

const customTheme: ThemingMap = {
	"--w3o-background-color": "#132a2b", 
   "--w3o-foreground-color": "#132a2b", 
   "--w3o-text-color": "#ffffff", 
  //  "--w3o-border-color": "rgba(255, 255, 255, 0.5)", 
	 "--w3o-border-color": "#cadcff", 
   "--w3o-action-color": "unset", 
   "--w3o-border-radius": "unset", 
   "--w3o-font-family": "Archivo SemiExpanded", 
   }

export const initOnboard = init({
	connect: {
		autoConnectLastWallet: true,
		autoConnectAllPreviousWallet: true,
	},
	wallets: [injected, walletConnect],
	chains: [
		{
			id: '0x1',
			token: 'ETH',
			label: 'Ethereum Mainnet',
			rpcUrl: networkInfos[NetworkIdByName.mainnet].rpc,
		},{
			id: '0x5',
			token: networkInfos[NetworkIdByName.goerli].symbol,
			label: networkInfos[NetworkIdByName.goerli].name,
			rpcUrl: networkInfos[NetworkIdByName.goerli].rpc,
		},{
			id: '0xaa36a7',
			token: networkInfos[11155111].symbol,
			label: networkInfos[11155111].name,
			rpcUrl: networkInfos[11155111].rpc,
		}
	],
	accountCenter: {
	  desktop: {
		enabled: false,
	  },
	  mobile: {
		enabled: false,
	  }
	},
	apiKey: "11310fe6-fc7d-4a66-ac3e-28723b207873",
	// theme: 'default',
	theme: customTheme,
	disableFontDownload: true,
	appMetadata: {
		name: 'Propchain',
		description: 'Propchain frontend support for multi chain.',
		icon: '<svg width="501" height="501" viewBox="0 0 501 501" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="501" height="501" rx="120" fill="url(#paint0_linear_687_12701)"/> <path d="M290.598 123H122V202.602H201.933V299.595H290.598C339.581 299.595 379.299 260.041 379.299 211.297C379.299 162.518 339.581 123 290.598 123Z" fill="#FFBE06"/> <path d="M122 379.196H201.933V299.595H122V379.196Z" fill="#FFBE06"/> <defs> <linearGradient id="paint0_linear_687_12701" x1="459.25" y1="-1.13327" x2="95.2179" y2="368.122" gradientUnits="userSpaceOnUse"> <stop stop-color="#2A4785"/> <stop offset="1" stop-color="#182C56"/> </linearGradient> </defs> </svg>',
	}
});
