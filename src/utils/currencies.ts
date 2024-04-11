import { CurrencyKey, Synths, CryptoCurrency, FIAT_SYNTHS } from 'config/constants/currency';
import Wei, { wei } from '@synthr/wei';
import { Rates } from '@synthr/queries';
import { FuturesMarketKey } from './futures';

export const isSynth = (currencyKey?: CurrencyKey) => (currencyKey || '') in Synths;
export const isCryptoCurrency = (currencyKey: CurrencyKey) => currencyKey in CryptoCurrency;
// @ts-ignore
export const isFiatCurrency = (currencyKey: CurrencyKey) => FIAT_SYNTHS.has(currencyKey);

// TODO: replace this with a more robust logic (like checking the asset field)
export const toInverseSynth = (currencyKey: CurrencyKey) => currencyKey.replace(/^s/i, 'i');
export const toStandardSynth = (currencyKey: CurrencyKey) => currencyKey.replace(/^i/i, 's');
export const synthToAsset = (currencyKey: CurrencyKey) => currencyKey.replace(/^(i|s)/i, '');
export const assetToSynth = (currencyKey: CurrencyKey) => `s${currencyKey}`;
export const iStandardSynth = (currencyKey: CurrencyKey) => currencyKey.startsWith('s');

export const synthToContractName = (currencyKey: CurrencyKey) => `Synth${currencyKey}`;

export const getExchangeRatesForCurrencies = (
	rates: any,
	base: CurrencyKey | null,
	quote: CurrencyKey | null
) => (rates == null || base == null || quote == null ? wei(0) : rates[base]?.div(rates[quote]));

export const getCurrencyKeyURLPath = (currencyKey: CurrencyKey) =>
	`https:///www.synthetix.io/assets/synths/svg/${currencyKey}.svg`;

export function calculatePercentChange(
	oldVal?: Wei | number | string,
	newVal?: Wei | number | string
) {
	if (!oldVal) return wei(0);
	if (!newVal) return wei(0);
	return wei(newVal)
		.sub(oldVal)
		.div(Wei.max(wei(oldVal), wei(0.01)));
}

export const newGetExchangeRatesForCurrencies = (
	rates: Rates | null,
	base: CurrencyKey | FuturesMarketKey | string | null,
	quote: CurrencyKey | FuturesMarketKey | null
) => {
	base = new Set([
		FuturesMarketKey.sAPE,
		FuturesMarketKey.sDYDX,
		FuturesMarketKey.sXAU,
		FuturesMarketKey.sXAG,
	]).has(base as FuturesMarketKey)
		? synthToAsset(base as CurrencyKey)
		: base;
	return rates == null ||
		base == null ||
		quote == null ||
		rates[base] === undefined ||
		rates[quote] === undefined
		? wei(0)
		: rates[base].div(rates[quote]);
};

export const newGetExchangeRatesTupleForCurrencies = (
	rates: Rates | null,
	base: CurrencyKey | FuturesMarketKey | string | null,
	quote: CurrencyKey | FuturesMarketKey | null
) => {
	base = new Set([
		FuturesMarketKey.sAPE,
		FuturesMarketKey.sDYDX,
		FuturesMarketKey.sXAU,
		FuturesMarketKey.sXAG,
	]).has(base as FuturesMarketKey)
		? synthToAsset(base as CurrencyKey)
		: base;
	const baseRate =
		rates == null || base == null || rates[base] === undefined ? wei(0) : rates[base];
	const quoteRate =
		rates == null || quote == null || rates[quote] === undefined ? wei(0) : rates[quote];

	return [baseRate, quoteRate];
};
