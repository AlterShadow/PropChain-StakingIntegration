export type NextClaimResponse = {
    message: string;
    data: {
        NextPayout: number;
    }
    error: string;
};

export type NextClaimIn = {
    claim_in: number
}