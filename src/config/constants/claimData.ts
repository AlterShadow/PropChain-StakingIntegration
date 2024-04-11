export type ClaimDataType = {
    totalVesting: number;
    totalVested: number;
	seed: number;
    private: number;
    kol: number;
    public: number;
    team: number;
    advisors: number;
    community: number;
    rewards: number;
    liquidity: number;
    operations: number;
    treasury: number;
    additional: number;
    otc: number;
    staking: number;
}

export const claimObject: ClaimDataType = {
    totalVesting: 0,
    totalVested: 0,
    seed: 0,
    private: 0,
    kol: 0,
    public: 0,
    team: 0,
    advisors: 0,
    community: 0,
    rewards: 0,
    liquidity: 0,
    operations: 0,
    treasury: 0,
    additional: 0,
    otc: 0,
    staking: 0
}

export type ClaimHistory = {
    type: string;
    wallet: string;
    amount: number;
    timestamp: string;
    hash: string;
    link: string;
}