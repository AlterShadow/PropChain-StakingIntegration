import axios from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';
import Connector from 'containers/Connector/Connector';

import { DEV_PROP_API, MAIN_PROP_API } from './constants';
import { NextClaimIn, NextClaimResponse } from './types';

const useNextClaimQuery = (
	userAddress: string | null,
	options?: UseQueryOptions<NextClaimIn>
) => {
	const {activeChainId} = Connector.useContainer();
    const fetchUrl = activeChainId === 1 ? MAIN_PROP_API : DEV_PROP_API;

	return useQuery<NextClaimIn>(
		[
            'prop',
            'next',
            userAddress
        ],
		async () => {
			const response = await axios.get<NextClaimResponse>(
				`${fetchUrl}/claim-in/${userAddress}`
			);
            const timeStamp = ((new Date()).getTime() / 1000);
            const claim_in = response.data.data.NextPayout - timeStamp;
			return {claim_in: claim_in};
		},
		{
			enabled: userAddress != null,
			...options,
		}
	);
};

export default useNextClaimQuery;
