import { atom } from 'recoil';
import { getPortfolioKey } from '../utils';

export const amountToClaimState = atom<string>({
	key: getPortfolioKey('amountToClaim'),
	default: '',
});

