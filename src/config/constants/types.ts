export interface Address {
    1: string
    5: string
    11155111: string
}

export interface Stake {
    index: number;
    amount: number;
    stakeAtTimestamp: number;
    rewardsRedeemed: number;
    lastClaimingTimestamp: number;
    lockTime: number;
    lockTimeStr: string;
    penaltyFee: number;
    version: string;
}