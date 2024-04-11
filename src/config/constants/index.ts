export const BASE_URL = 'http://localhost:3000/';

export const SCAN_BASE_URLS: { [key in number | string] : string } = {
    10121: 'https://goerli.etherscan.io/',
    10102: 'https://testnet.bscscan.com/',
    10143: 'https://testnet.arbiscan.io/',
    10106: 'https://testnet.snowtrace.io/',
    10109: 'https://mumbai.polygonscan.com/'
}

export const SUBGRAPHS_MAIN: { [key in string] : string } = {
    'seed': 'https://api.studio.thegraph.com/query/50213/vesting-seed-main/v0.0.1',
    'private': 'https://api.studio.thegraph.com/query/50213/vesting-private-main/v0.0.1',
    'kol': 'https://api.studio.thegraph.com/query/50213/vesting-kol-main/v0.0.1',
    'public': 'https://api.studio.thegraph.com/query/50213/vesting-public-main/v0.0.1',
    'team': 'https://api.studio.thegraph.com/query/50213/vesting-team-main/v0.0.1',
    'advisors': 'https://api.studio.thegraph.com/query/50213/vesting-advisors-main/v0.0.1',
    'community': 'https://api.studio.thegraph.com/query/50213/vesting-community-main/v0.0.1',
    'rewards': 'https://api.studio.thegraph.com/query/50213/vesting-rewards-main/v0.0.1',
    'liquidity': 'https://api.studio.thegraph.com/query/50213/vesting-liquidity-main/v0.0.1',
    'operations': 'https://api.studio.thegraph.com/query/50213/vesting-operations-main/v0.0.1',
    'treasury': 'https://api.studio.thegraph.com/query/50213/vesting-treasury-main/v0.0.1',
    'dbm': 'https://api.studio.thegraph.com/query/50213/vesting-dbm-main/v0.0.1',
    'otc': 'https://api.studio.thegraph.com/query/50213/vesting-otc-main/v0.0.1',
    'staking': 'https://api.studio.thegraph.com/query/50213/staking-main-v2/v0.0.2'
}

export const SUBGRAPHS_SEPOLIA: { [key in string] : string } = {
    'seed': 'https://api.studio.thegraph.com/query/50213/vesting-seed-sepolia/v0.0.1',
    'private': 'https://api.studio.thegraph.com/query/50213/vesting-private-sepolia/v0.0.1',
    'kol': 'https://api.studio.thegraph.com/query/50213/vesting-kol-sepolia/v0.0.1',
    'public': 'https://api.studio.thegraph.com/query/50213/vesting-public-sepolia/v0.0.1',
    'team': 'https://api.studio.thegraph.com/query/50213/vesting-team-sepolia/v0.0.1',
    'advisors': 'https://api.studio.thegraph.com/query/50213/vesting-advisors-sepolia/v0.0.1',
    'community': 'https://api.studio.thegraph.com/query/50213/vesting-community-sepolia/v0.0.1',
    'rewards': 'https://api.studio.thegraph.com/query/50213/vesting-rewards-sepolia/v0.0.1',
    'liquidity': 'https://api.studio.thegraph.com/query/50213/vesting-liquidity-sepolia/v0.0.1',
    'operations': 'https://api.studio.thegraph.com/query/50213/vesting-operations-sepolia/v0.0.1',
    'treasury': 'https://api.studio.thegraph.com/query/50213/vesting-treasury-sepolia/v0.0.1',
    'dbm': 'https://api.studio.thegraph.com/query/50213/vesting-dbm-sepolia/v0.0.1',
    'otc': 'https://api.studio.thegraph.com/query/50213/vesting-otc-sepolia/v0.0.1',
    'staking': 'https://api.studio.thegraph.com/query/50213/staking-sepolia-v2/v0.0.2'
}

export const MAIN_CHAINS = [421613];
export const mainChainId = MAIN_CHAINS[0];

export const DISCORD_LINK = 'https://discord.com/invite/KkUzFPanf5';
export const TWITTER_LINK = 'https://twitter.com/synthr_defi?t=unyrZSBszalaFD2tA8dYrw&s=08';

export const ZERO_BYTES = '0x0000000000000000000000000000000000000000000000000000000000000000';

export const GAS_LIMITS: {[key in string | number] : string} = {
    5: '2000000',
    43113: '150000',
    97: '200000',
    421613: '200000000',
    80001: '1500000',
}
