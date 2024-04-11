import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { stakeOrWithdrawState, walletAddressState } from 'store/wallet';
import { ClaimDataType, claimObject, ClaimHistory } from 'config/constants/claimData';
import { SUBGRAPHS_SEPOLIA, SUBGRAPHS_MAIN } from 'config/constants';
import {request,  gql } from 'graphql-request';
import Connector from 'containers/Connector/Connector';
import { ethers } from 'ethers';
import { useConnectWallet } from '@web3-onboard/react';
import { ethValue } from "utils/formatters/number";
import { networkInfos } from 'config/constants/network';

import {
    getSeedVestingContract,
    getPrivateVestingContract,
    getKolVestingContract,
    getPublicVestingContract,
    getTeamVestingContract,
    getAdvisorsVestingContract,
    getCommunityVestingContract,
    getRewardsVestingContract,
    getLiquidityVestingContract,
    getOperationsVestingContract,
    getTreasuryVestingContract,
    getAdditionalVestingContract,
    getOtcVestingContract,
    getStakingContract
} from 'utils/contractHelper';

const claimTypes = ['seed', 'private', 'kol', 'public', 'team', 'advisors', 'community', 'rewards', 'liquidity', 'operations', 'treasury', 'dbm', 'otc', 'staking'];

const useGetClaimData = () => {
    const [claims, setClaimData] = useState<ClaimDataType>(claimObject);
    const [histories, setHistory] = useState<ClaimHistory[]>();
    const [claimLoaded, setDataLoaded] = useState<boolean>(false);
    const walletAddress = useRecoilValue(walletAddressState);
    const {activeChainId} = Connector.useContainer();
    const [{ wallet }] = useConnectWallet();
    const balanceChanged = useRecoilValue(stakeOrWithdrawState);

    useEffect(() => {
        const get = async () => {
            if (wallet && walletAddress){
                try {
                    const pvd = new ethers.providers.Web3Provider(wallet.provider, 'any');
                    const signer = pvd.getSigner();
                    const seedContract = getSeedVestingContract(activeChainId, signer);
                    const privateContract = getPrivateVestingContract(activeChainId, signer);
                    const kolContract = getKolVestingContract(activeChainId, signer);
                    const publicContract = getPublicVestingContract(activeChainId, signer);
                    const teamContract = getTeamVestingContract(activeChainId, signer);
                    const advisorsContract = getAdvisorsVestingContract(activeChainId, signer);
                    const communityContract = getCommunityVestingContract(activeChainId, signer);
                    const rewardsContract = getRewardsVestingContract(activeChainId, signer);
                    const liquidityContract = getLiquidityVestingContract(activeChainId, signer);
                    const operationsContract = getOperationsVestingContract(activeChainId, signer);
                    const treasuryContract = getTreasuryVestingContract(activeChainId, signer);
                    const additionalContract = getAdditionalVestingContract(activeChainId, signer);
                    const otcContract = getOtcVestingContract(activeChainId, signer);
                    const stakingContract = getStakingContract(activeChainId, signer);
    
                    const userPropSeed = await seedContract.userPropertiesList(walletAddress);
                    const vestIdSeed = userPropSeed.vestingId.toNumber();
                    let lockSeed = 0;
                    if(userPropSeed.isActive) {
                        const vestPropSeed = await seedContract.vestingPropertiesList();
                        lockSeed = vestPropSeed.length > 0 ? Number(ethValue(vestPropSeed[vestIdSeed].amountForUser)) - Number(ethValue(userPropSeed.spentAmount)) : 0;
                    }

                    const userPropPrivate = await privateContract.userPropertiesList(walletAddress);
                    const vestIdPrivate = userPropPrivate.vestingId.toNumber();
                    let lockPrivate = 0;
                    if(userPropPrivate.isActive) {
                        const vestPropPrivate = await privateContract.vestingPropertiesList();
                        lockPrivate = vestPropPrivate.length > 0 ? Number(ethValue(vestPropPrivate[vestIdPrivate].amountForUser)) - Number(ethValue(userPropPrivate.spentAmount)) : 0;
                    }

                    const userPropKol = await kolContract.userPropertiesList(walletAddress);
                    const vestIdKol = userPropKol.vestingId.toNumber();
                    let lockKol = 0;
                    if(userPropKol.isActive) {
                        const vestPropKol = await kolContract.vestingPropertiesList();
                        lockKol = vestPropKol.length > 0 ? Number(ethValue(vestPropKol[vestIdKol].amountForUser)) - Number(ethValue(userPropKol.spentAmount)) : 0;
                    }

                    const userPropPublic = await publicContract.userPropertiesList(walletAddress);
                    const vestIdPublic = userPropPublic.vestingId.toNumber();
                    let lockPublic = 0;
                    if(userPropPublic.isActive) {
                        const vestPropPublic = await publicContract.vestingPropertiesList();
                        lockPublic = vestPropPublic.length > 0 ? Number(ethValue(vestPropPublic[vestIdPublic].amountForUser)) - Number(ethValue(userPropPublic.spentAmount)) : 0;
                    }

                    const userPropTeam = await teamContract.userPropertiesList(walletAddress);
                    const vestIdTeam = userPropTeam.vestingId.toNumber();
                    let lockTeam = 0;
                    if(userPropTeam.isActive) {
                        const vestPropTeam = await teamContract.vestingPropertiesList();
                        lockTeam = vestPropTeam.length > 0 ? Number(ethValue(vestPropTeam[vestIdTeam].amountForUser)) - Number(ethValue(userPropTeam.spentAmount)) : 0;
                    }

                    const userPropAdvisors = await advisorsContract.userPropertiesList(walletAddress);
                    const vestIdAdvisors = userPropAdvisors.vestingId.toNumber();
                    let lockAdvisors = 0;
                    if(userPropAdvisors.isActive) {
                        const vestPropAdvisors = await advisorsContract.vestingPropertiesList();
                        lockAdvisors = vestPropAdvisors.length > 0 ? Number(ethValue(vestPropAdvisors[vestIdAdvisors].amountForUser)) - Number(ethValue(userPropAdvisors.spentAmount)) : 0;
                    }

                    const userPropCommunity = await communityContract.userPropertiesList(walletAddress);
                    const vestIdCommunity = userPropCommunity.vestingId.toNumber();
                    let lockCommunity = 0;
                    if(userPropCommunity.isActive) {
                        const vestPropCommunity = await communityContract.vestingPropertiesList();
                        lockCommunity = Number(ethValue(vestPropCommunity[vestIdCommunity].amountForUser)) - Number(ethValue(userPropCommunity.spentAmount));
                    }

                    const userPropRewards = await rewardsContract.userPropertiesList(walletAddress);
                    const vestIdRewards = userPropRewards.vestingId.toNumber();
                    let lockRewards = 0;
                    if(userPropRewards.isActive) {
                        const vestPropRewards = await rewardsContract.vestingPropertiesList();
                        lockRewards = vestPropRewards.length > 0 ? Number(ethValue(vestPropRewards[vestIdRewards].amountForUser)) - Number(ethValue(userPropRewards.spentAmount)) : 0;
                    }

                    const userPropLiquidity = await liquidityContract.userPropertiesList(walletAddress);
                    const vestIdLiquidity = userPropLiquidity.vestingId.toNumber();
                    let lockLiquidity = 0;
                    if(userPropLiquidity.isActive) {
                        const vestPropLiquidity = await liquidityContract.vestingPropertiesList();
                        lockLiquidity = Number(ethValue(vestPropLiquidity[vestIdLiquidity].amountForUser)) - Number(ethValue(userPropLiquidity.spentAmount));
                    }

                    const userPropOperations = await operationsContract.userPropertiesList(walletAddress);
                    const vestIdOperations = userPropOperations.vestingId.toNumber();
                    let lockOperations = 0;
                    if(userPropOperations.isActive) {
                        const vestPropOperations = await operationsContract.vestingPropertiesList();
                        lockOperations = vestPropOperations.length > 0 ? Number(ethValue(vestPropOperations[vestIdOperations].amountForUser)) - Number(ethValue(userPropOperations.spentAmount)) : 0;
                    }

                    const userPropTreasury = await treasuryContract.userPropertiesList(walletAddress);
                    const vestIdTreasury = userPropTreasury.vestingId.toNumber();
                    let lockTreasury = 0;
                    if(userPropTreasury.isActive) {
                        const vestPropTreasury = await treasuryContract.vestingPropertiesList();
                        lockTreasury = vestPropTreasury.length > 0 ? Number(ethValue(vestPropTreasury[vestIdTreasury].amountForUser)) - Number(ethValue(userPropTreasury.spentAmount)) : 0;
                    }

                    const userPropAdditional = await additionalContract.userPropertiesList(walletAddress);
                    const vestIdAdditional = userPropAdditional.vestingId.toNumber();
                    let lockAdditional = 0;
                    if(userPropAdditional.isActive) {
                        const vestPropAdditional = await additionalContract.vestingPropertiesList();
                        lockAdditional = vestPropAdditional.length > 0 ? Number(ethValue(vestPropAdditional[vestIdAdditional].amountForUser)) - Number(ethValue(userPropAdditional.spentAmount)) : 0;
                    }

                    const userPropOtc = await otcContract.userPropertiesList(walletAddress);
                    const vestIdOtc = userPropOtc.vestingId.toNumber();
                    let lockOtc = 0;
                    if(userPropOtc.isActive) {
                        const vestPropOtc = await otcContract.vestingPropertiesList();
                        lockOtc = vestPropOtc.length > 0 ? Number(ethValue(vestPropOtc[vestIdOtc].amountForUser)) - Number(ethValue(userPropOtc.spentAmount)) : 0;
                    }
    
                    const timeStamp = ((new Date()).getTime() / 1000).toFixed(0);
                    const allPendingReards = await stakingContract.allPendingRewardsToken(walletAddress);
                    const pendingReward1 = Number(ethValue(allPendingReards[0]));
                    const pendingReward2 = Number(ethValue(allPendingReards[1]));
                    const pendingReward3 = Number(ethValue(allPendingReards[2]));
                    const seedClaimAmount = Number(ethValue(await seedContract?.amountForClaim(walletAddress, timeStamp)));
                    const privateClaimAmount = Number(ethValue(await privateContract?.amountForClaim(walletAddress, timeStamp)));
                    const kolClaimAmount = Number(ethValue(await kolContract?.amountForClaim(walletAddress, timeStamp)));
                    const publicClaimAmount = Number(ethValue(await publicContract?.amountForClaim(walletAddress, timeStamp)));
                    const teamClaimAmount = Number(ethValue(await teamContract?.amountForClaim(walletAddress, timeStamp)));
                    const advisorsClaimAmount = Number(ethValue(await advisorsContract?.amountForClaim(walletAddress, timeStamp)));
                    const communityClaimAmount = Number(ethValue(await communityContract?.amountForClaim(walletAddress, timeStamp)));
                    const rewardsClaimAmount = Number(ethValue(await rewardsContract?.amountForClaim(walletAddress, timeStamp)));
                    const liquidityClaimAmount = Number(ethValue(await liquidityContract?.amountForClaim(walletAddress, timeStamp)));
                    const operationsClaimAmount = Number(ethValue(await operationsContract?.amountForClaim(walletAddress, timeStamp)));
                    const treasuryClaimAmount = Number(ethValue(await treasuryContract?.amountForClaim(walletAddress, timeStamp)));
                    const additionalClaimAmount = Number(ethValue(await additionalContract?.amountForClaim(walletAddress, timeStamp)));
                    const otcClaimAmount = Number(ethValue(await otcContract?.amountForClaim(walletAddress, timeStamp)));
                    const res = {
                        totalVesting: seedClaimAmount + privateClaimAmount + kolClaimAmount + publicClaimAmount
                         + teamClaimAmount + advisorsClaimAmount + communityClaimAmount + rewardsClaimAmount
                         + liquidityClaimAmount + operationsClaimAmount + treasuryClaimAmount + additionalClaimAmount + otcClaimAmount,
                        totalVested: lockSeed + lockPrivate + lockKol + lockPublic + lockTeam + lockAdvisors + lockCommunity + lockRewards + lockLiquidity + lockOperations + lockTreasury + lockAdditional + lockOtc,
                        seed: seedClaimAmount,
                        private: privateClaimAmount,
                        kol: kolClaimAmount,
                        public: publicClaimAmount,
                        team: teamClaimAmount,
                        advisors: advisorsClaimAmount,
                        community: communityClaimAmount,
                        rewards: rewardsClaimAmount,
                        liquidity: liquidityClaimAmount,
                        operations: operationsClaimAmount,
                        treasury: treasuryClaimAmount,
                        additional: additionalClaimAmount,
                        otc: otcClaimAmount,
                        staking: pendingReward1 + pendingReward2 + pendingReward3
                    }
                    setClaimData(res);
                    setDataLoaded(true);
                } catch(err) {
                    console.log("Get Claims causes error: ", err);
                    setClaimData(claimObject);
                    setDataLoaded(false);
                }                
            } else {
                setClaimData(claimObject);
                setDataLoaded(true);
            }
        }
        get();
        const interval = setInterval(async() => {
            await get();
        }, 30000);
  
        return () => clearInterval(interval);
    }, [walletAddress, activeChainId, wallet]);

    useEffect(() => {
        const get = async () => {
            if (walletAddress) {
                try {
                    const temp: ClaimHistory[] = [];
                    for (const claim_type of claimTypes) {
                        // if ((claim_type === "dbm" || claim_type === "otc") && activeChainId === 5) continue;
                        const sub_url = activeChainId === 1 ? SUBGRAPHS_MAIN[claim_type] : SUBGRAPHS_SEPOLIA[claim_type];
                        if (claim_type === 'staking') {
                            const query = gql`
                            query {
                                redeems(where: {user: "${walletAddress}" amount_not: "0"}) {
                                    user
                                    pid
                                    amount
                                    blockTimestamp
                                    transactionHash
                                }
                            }`
                            const response = await request<any>(
                                sub_url,
                                query
                            )
                            response.redeems.forEach((element: any) => {
                                const record = {
                                    type: claim_type,
                                    wallet: element.user,
                                    amount: Number(ethValue(element.amount)),
                                    timestamp: new Date(Number(element.blockTimestamp)*1000).toLocaleString(),
                                    hash: element.transactionHash,
                                    link: networkInfos[activeChainId].explorer + "tx/" + element.transactionHash
                                }
                                temp.push(record);
                            });
                        } else {
                            const query = gql`
                                query {
                                    claims(where: {wallet: "${walletAddress}" amount_not: "0"}) {
                                        wallet
                                        vestingId
                                        amount
                                        blockTimestamp
                                        transactionHash
                                    }
                                }`;
                            const response = await request<any>(
                                sub_url,
                                query
                            );
                            response.claims.forEach((element: any) => {
                                const record = {
                                    type: claim_type,
                                    wallet: element.wallet,
                                    amount: Number(ethValue(element.amount)),
                                    timestamp: new Date(Number(element.blockTimestamp)*1000).toLocaleString(),
                                    hash: element.transactionHash,
                                    link: networkInfos[activeChainId].explorer + "tx/" + element.transactionHash
                                }
                                temp.push(record);
                            });
                        }                        
                    }
                    setHistory(temp);
                } catch (err) {
                    console.log(err)
                }                
            }
            
        }
        get();
    }, [walletAddress, activeChainId, balanceChanged])

    return {claims, claimLoaded, histories};
}

export default useGetClaimData;