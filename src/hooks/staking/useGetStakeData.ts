import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { stakeOrWithdrawState } from 'store/wallet';
import Connector from 'containers/Connector/Connector';
import { ethers } from 'ethers';
import { ethValue } from "utils/formatters/number";
import { useConnectWallet } from '@web3-onboard/react';
import { Stake } from 'config/constants/types';

import {
    getStakingContract
} from 'utils/contractHelper';

const useGetStakeData = (poolIndex: number, walletAddress: string | null) => {
    const [data, setStakeData] = useState<Stake[]>([]);
    const [loaded, setDataLoaded] = useState<boolean>(false);
    const [{ wallet }] = useConnectWallet();
    const { activeChainId } = Connector.useContainer();
    const stakeOrWithdraw = useRecoilValue(stakeOrWithdrawState);

    useEffect(() => {
        const get = async () => {
            if (wallet && walletAddress) {
                try {
                    const pvd = new ethers.providers.Web3Provider(wallet.provider, 'any');
                    const signer = pvd.getSigner();
                    let stakeList = [] as Stake[];
                    const stakingContract1 = getStakingContract(activeChainId, signer, "v1");
                    let poolIndexV1 = poolIndex;
                    if (poolIndex === 1) {
                        poolIndexV1 = 2; 
                    } else if (poolIndex === 2 ) {
                        poolIndexV1 = 1;
                    } else {
                        poolIndexV1 = poolIndex;
                    }
                    const stakeInfo1 = await stakingContract1.getUserInfo(poolIndexV1, walletAddress);
                    const poolInfo1 = await stakingContract1.getPoolInfo(poolIndexV1);
                    const amount = Number(ethValue(stakeInfo1.amount.toBigInt()));
                    if (amount > 0) {
                        let lockTime = Number(stakeInfo1.depositTimestamp.toNumber()) + Number(poolInfo1.penaltyTimeLimit);
                        const lockDate = new Date(lockTime * 1000);
                        const yyyy = lockDate.getFullYear();
                        let mm = lockDate.getMonth() + 1;
                        let dd = lockDate.getDate();
                        const stakeItemV1 = {
                            index: 0,
                            amount: amount,
                            stakeAtTimestamp: stakeInfo1.depositTimestamp.toNumber(),
                            rewardsRedeemed: Number(ethValue(stakeInfo1.totalRedeemed)),
                            lastClaimingTimestamp: stakeInfo1.depositTimestamp.toNumber(),
                            version: "v1",
                            lockTime: lockTime,
                            penaltyFee: poolInfo1.penaltyFee / 100,
                            lockTimeStr: (dd < 10 ? '0' + dd : dd) + '/' + (mm < 10 ? '0' + mm : mm) + '/' + yyyy
                        }
                        stakeList.push(stakeItemV1);
                    }                    
                    const stakingContract2 = getStakingContract(activeChainId, signer);
                    const stakeInfo2 = await stakingContract2.getStakesInfo(poolIndex, walletAddress);
                    const poolInfo2 = await stakingContract2.getPoolInfo(poolIndex);
                    let index = 0;
                    for (const stakeItem of stakeInfo2) {
                        let lockTime = Number(stakeItem[1]) + Number(poolInfo2.penaltyTimeLimit);
                        const lockDate = new Date(lockTime * 1000);
                        const yyyy = lockDate.getFullYear();
                        let mm = lockDate.getMonth() + 1;
                        let dd = lockDate.getDate();
                        stakeList.push({
                            index: index, 
                            amount: Number(ethValue(stakeItem[0])),
                            stakeAtTimestamp: stakeItem[1],
                            rewardsRedeemed: stakeItem[2],
                            lastClaimingTimestamp: stakeItem[3],
                            version: "v2",
                            lockTime: lockTime,
                            penaltyFee: poolInfo1.penaltyFee / 100,
                            lockTimeStr: (dd < 10 ? '0' + dd : dd) + '/' + (mm < 10 ? '0' + mm : mm) + '/' + yyyy
                        })
                        index++;
                    }
                    setStakeData(stakeList);
                    setDataLoaded(true);
                } catch (err) {
                    console.log("Get Staking causes error: ", err);
                    setStakeData([]);
                    setDataLoaded(false);
                }
            } else {
                setStakeData([]);
                setDataLoaded(false);
            }
            
        }
        get();
    }, [poolIndex, activeChainId, wallet, walletAddress, stakeOrWithdraw]);
    return { data, loaded };
}

export default useGetStakeData;
