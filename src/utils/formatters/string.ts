import { CurrencyKey } from 'config/constants/currency';
// import { CONTRACT_ERRORS } from 'config/constants/errors';
import { networkNamesByChainId } from 'config/constants/network';
import { truncate } from 'lodash';

export const truncateAddress = (address: string, first = 7, last = 3) =>
	`${address.slice(0, first)}...`;

export const shortenAddress = (address: string, first = 7, last = 3) => 
	`${address.slice(0, first)}...${address.slice(address.length - last)}`;
	
export const truncateString = (value: string, maxLength = 5) =>
	truncate(value, {
		length: maxLength,
	});

export const formatCurrencyPair = (baseCurrencyKey: CurrencyKey, quoteCurrencyKey: CurrencyKey) =>
	`${baseCurrencyKey} / ${quoteCurrencyKey}`;

export const strPadLeft = (string: string | number, pad: string, length: number) => {
	return (new Array(length + 1).join(pad) + string).slice(-length);
};

export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export const hexToAsciiV2 = (S: string) => {
	// https://gist.github.com/gluk64/fdea559472d957f1138ed93bcbc6f78a#file-reason-js
	const hex = S.substr(147).toString();
	let str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
};

export const getTokenIcon = (currencyKey: string) =>
	`/images/tokens/${currencyKey}.png`;

export const getFaucetTokenIcon = (currencyKey: string) =>
	`/images/tokens/faucet/${currencyKey}.png`;

export const getNetworkIconByLzId = (lzId: number | string) => {
	return `/images/networks/${networkNamesByChainId[lzId]}.png`;
}

export const getLzLink = (
	lzFromId: number | undefined,
	lzToId: number | undefined,
	srcUAAddr: string,
	destUAAddr: string,
	nonce: number
) => {
	return `https://testnet.layerzeroscan.com/${lzFromId}/address/${srcUAAddr.toLowerCase()}/message/${lzToId}/address/${destUAAddr.toLowerCase()}/nonce/${nonce}`;
};

// const START_OFFSET: number = 1;
// const END_OFFSET: number = 2;

// const getErrorBlobMessage = (message: string) => {
// 	// check if it's BigNumber error
// 	if (message.includes('BigNumber')) {
// 		return 'Invalid input';
// 	  }
	
// 	  const start = message.indexOf('"code":-32603');
// 	  const end = message.indexOf('code=UNPREDICTABLE_GAS_LIMIT');
	
// 	  const jsonError = JSON.parse(
// 		message.substring(start - START_OFFSET, end - END_OFFSET)
// 	  );
	
// 	  const reason = jsonError.data.data;
	
// 	  let displayError: string = reason;
	
// 	  if (reason.includes('allowance')) {
// 		return 'You did not approve enough.';
// 	  } else if (reason.includes('exceeds balance')) {
// 		return 'You are trying to transfer more than you have.';
// 	  }
	
// 	  try {
// 		displayError = CONTRACT_ERRORS[reason.toString()] ?? jsonError.data.message;
// 	  } catch (err) {
// 		console.log(err);
// 	  }
// 	  return displayError;
// }

export const errorToErrorMessage = (error: any) => {
	if (error.reason) return error.reason;
	let errorMessage = error.data?.message ?? error.message;
	const isFrameWalletError = errorMessage?.includes('(error={');
	if (isFrameWalletError) {
		// Frame wallet throws a weird error, we try to parse the message and if it fails we just show the ugly full message
		errorMessage = errorMessage.match(/"message":"([^"]+)"/)?.[1] || errorMessage;
	}
	if (errorMessage) {
		return errorMessage;
	}

	return 'Unknown error';
	// if (error?.data?.message !== undefined) {
	// 	return error.data.message;
	// } else {
	// 	if (error.message.includes("user rejected transaction")) {
	// 		return "User rejected transaction.";
	// 	} else {
	// 		return getErrorBlobMessage(error.message);
	// 	}
	// }
};