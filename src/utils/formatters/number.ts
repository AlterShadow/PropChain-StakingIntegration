import Wei, { wei } from '@synthr/wei';
import BN from 'bn.js';
import { BigNumber, ethers } from 'ethers';

import {
	DEFAULT_CRYPTO_DECIMALS,
	DEFAULT_FIAT_DECIMALS,
	DEFAULT_NUMBER_DECIMALS,
} from 'config/constants/defaults';
import { CurrencyKey } from 'config/constants/currency';
import { isFiatCurrency } from 'utils/currencies';

type WeiSource = Wei | number | string | ethers.BigNumber;

export type FormatNumberOptions = {
	minDecimals?: number;
	maxDecimals?: number;
	prefix?: string;
	suffix?: string;
};

export type FormatCurrencyOptions = {
	minDecimals?: number;
	maxDecimals?: number;
	sign?: string;
	currencyKey?: string;
};

const DEFAULT_CURRENCY_DECIMALS = 4;
export const SHORT_CRYPTO_CURRENCY_DECIMALS = 4;
export const LONG_CRYPTO_CURRENCY_DECIMALS = 8;

export const getDecimalPlaces = (value: WeiSource) => (value.toString().split('.')[1] || '').length;

export const zeroBN = wei(0);
export const UNIT_BN = new BN('10').pow(new BN(18));
export const UNIT_BIG_NUM = BigNumber.from(10).pow(18);
export const ZERO_BIG_NUM = BigNumber.from(0);
export const BIG_TEN = BigNumber.from(10);
export const BIG_100 = BigNumber.from(100);
export const BIG_150 = BigNumber.from(150);

export function percentValue(value: number, decimals = 2) {
	return (value/100).toFixed(decimals);
}

export function ethValue(value: BigNumber) {
	return ethers.utils.formatEther(value);
}

export function usdAmount(value: BigNumber, price = 1) {
	const ethValue = ethers.utils.formatEther(value);
	return (price * Number(ethValue)).toFixed(2);
}

export function numberWithCommas(value: string, dispDecimal = 2) {
	var parts = value.split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	parts[1] = parts.length > 1 ? parts[1].substring(0, dispDecimal) : parts[1];
	return parts.join('.');
}

export function formatNumberWithCommas(value: number, locale: string = 'en-US'): string {
	const formatedNumber = new Intl.NumberFormat(locale, { maximumFractionDigits: 0}).format(value)
	return formatedNumber
};

const safeValueWithDecimal = (value: string, options?: FormatNumberOptions) => {
	const [left, right] = value.split('.');
	const decimal = options?.minDecimals ?? DEFAULT_NUMBER_DECIMALS;
	const customDecimal = Number(value) < 0.0002 && Number(value) !== 0 ? decimal + 2 : decimal;
	const rightWithDecimal = right.substring(0, customDecimal);
	return `${left}.${rightWithDecimal}`;
}

// TODO: implement max decimals
export const formatNumber = (value: WeiSource, options?: FormatNumberOptions, decimals = 18) => {
	const prefix = options?.prefix;
	const suffix = options?.suffix;

	let weiValue = wei(0);
	try {
		weiValue = wei(value, decimals);
	} catch {}

	const formattedValue = [];
	if (prefix) {
		formattedValue.push(prefix);
	}
	
	formattedValue.push(
		numberWithCommas(safeValueWithDecimal(weiValue.toString(), options), options?.minDecimals)
	);

	if (suffix) {
		formattedValue.push(` ${suffix}`);
	}

	return formattedValue.join('');
};

export const formatCryptoCurrency = (value: WeiSource, options?: FormatCurrencyOptions) =>
	formatNumber(value, {
		prefix: options?.sign,
		suffix: options?.currencyKey,
		minDecimals: options?.minDecimals ?? DEFAULT_CRYPTO_DECIMALS,
		maxDecimals: options?.maxDecimals,
	});

export const formatFiatCurrency = (value: WeiSource, options?: FormatCurrencyOptions) =>
	formatNumber(value, {
		prefix: options?.sign,
		suffix: options?.currencyKey,
		minDecimals: options?.minDecimals ?? DEFAULT_FIAT_DECIMALS,
		maxDecimals: options?.maxDecimals,
	});

export const formatCurrency = (
	currencyKey: string,
	value: WeiSource,
	options?: FormatCurrencyOptions
) =>
	isFiatCurrency(currencyKey as CurrencyKey)
		? formatFiatCurrency(value, options)
		: formatCryptoCurrency(value, options);

export const formatPercent = (value: WeiSource, options?: { minDecimals: number }) => {
	const decimals = options?.minDecimals ?? 4;

	return wei(value).mul(100).toString(decimals).concat('%');
};

// TODO: figure out a robust way to get the correct precision.
const getPrecision = (amount: WeiSource | number) => {
	if (amount >= 1) {
		return DEFAULT_CURRENCY_DECIMALS;
	}
	if (amount > 0.01) {
		return SHORT_CRYPTO_CURRENCY_DECIMALS;
	}
	return LONG_CRYPTO_CURRENCY_DECIMALS;
};

// TODO: use a library for this, because the sign does not always appear on the left. (perhaps something like number.toLocaleString)
export const formatCurrencyWithSign = (
	sign: string | null | undefined,
	value: WeiSource,
	decimals?: number
) => `${sign}${formatCurrency(String(value), decimals || getPrecision(value))}`;

export const formatCurrencyWithKey = (
	currencyKey: CurrencyKey,
	value: WeiSource,
	decimals?: number
) => `${formatCurrency(String(value), decimals || getPrecision(value))} ${currencyKey}`;

export function scale(input: Wei, decimalPlaces: number): Wei {
	return input.mul(wei(10).pow(decimalPlaces));
}

export const isZero = (value: Wei) => value.eq(0);

export const weiFromWei = (weiAmount: WeiSource) => {
	return wei(weiAmount, 18, true);
};

export const truncateNumbers = (value: WeiSource | string, maxDecimalDigits: number) => {
	if (value.toString().includes('.')) {
		const parts = value.toString().split('.');
		return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
	}
	return value.toString();
};

export const multiplyDecimal = (x: BigNumber, y: BigNumber) => {
	return x.mul(y).div(UNIT_BIG_NUM);
};

export const divideDecimal = (x: BigNumber, y: BigNumber) => {
	return x.mul(UNIT_BIG_NUM).div(y);
};

export const getBalanceWithComma = (value: BigNumber | Wei, decimals = 18, dispDecimals = DEFAULT_CRYPTO_DECIMALS) => {
	return formatNumber(value, {
		prefix: '',
		suffix: '',
		minDecimals: dispDecimals,
		maxDecimals: dispDecimals,
	}, decimals);
}

export const getBalanceWithDecimal = (value: string | number, decimals = 18) => {
	return wei(value.toString(), decimals)
	// const bigValue = BigNumber.from(value.toString());
	// return bigValue.mul(BigNumber.from('10').pow(decimals));
}
