import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { walletAddressState, stakeOrWithdrawState } from 'store/wallet';
import Connector from 'containers/Connector/Connector';
import { BigNumber, ethers } from 'ethers';
import LongTermIcon from "static/assets/Staking/long-term.svg";
import MidTermIcon from "static/assets/Staking/mid-term.svg";
import ShortTermIcon from "static/assets/Staking/short-term.svg";
import { usdAmount, ethValue } from "utils/formatters/number";
import axios from "axios";
import { useConnectWallet } from '@web3-onboard/react';

import {
    getStakingContract,
    getPropContract
} from 'utils/contractHelper';

const poolData = {
    price: 0,
    balance: 0,
    balanceUSD: 0,
    totalAmount: 0,
    totalAmountUSD: 0,
    totalPending: 0,
    totalStaked: 0,
    totalStakedUSD: 0,
    availablePROPC: 0,
    pools: [
        {
            icon: LongTermIcon,
            poolTerm: 'Long',
            apy: 20,
            lockYear: '2Y',
            tvl: '0',     
            poolIndex: 3,
            penaltyFee: 10,
            staked: false,
            amount: 0,
            pendingRwards: 0,
            lockTime: 0,
        },
        {
            icon: MidTermIcon,
            poolTerm: 'Mid',
            apy: 13,
            lockYear: '1Y',
            tvl: '0',
            poolIndex: 1,
            penaltyFee: 5,
            staked: false,
            amount: 0,
            pendingRwards: 0,
            lockTime: 0,
        },
        {
            icon: ShortTermIcon,
            poolTerm: 'Short',
            apy: 5,
            lockYear: '6M',
            tvl: '0',
            poolIndex: 2,
            penaltyFee: 10,
            staked: false,
            amount: 0,
            pendingRwards: 0,
            lockTime: 0,
        },
    ]
}

const useGetPoolData = () => {
    const [data, setStakeData] = useState(poolData);
    const [loaded, setDataLoaded] = useState<boolean>(false);
    const walletAddress = useRecoilValue(walletAddressState);
    const [{ wallet }] = useConnectWallet();
    const {activeChainId} = Connector.useContainer();
    const stakeOrWithdraw = useRecoilValue(stakeOrWithdrawState);
        
    useEffect(() => {
        const get = async () => {
            if (wallet && walletAddress) {
                try {
                    const pvd = new ethers.providers.Web3Provider(wallet.provider, 'any');
                    const signer = pvd.getSigner();

                    const stakingContract = getStakingContract(activeChainId, signer);
                    const tokenContract = getPropContract(activeChainId, signer);
                    const balance: BigNumber = tokenContract ? await tokenContract.balanceOf(walletAddress) : BigNumber.from(0);
                    const bal = ethValue(balance);
                    const poolInfo1 = await stakingContract.getPoolInfo(1);
                    const poolInfo2 = await stakingContract.getPoolInfo(2);
                    const poolInfo3 = await stakingContract.getPoolInfo(3);
                    const pendingRewards = await stakingContract.allPendingRewardsToken(walletAddress);
                    const pendingReward1 = Number(ethValue(pendingRewards[0].toBigInt()));
                    const pendingReward2 = Number(ethValue(pendingRewards[1].toBigInt()));
                    const pendingReward3 = Number(ethValue(pendingRewards[2].toBigInt()));
                    const userInfo1 = await stakingContract.getUserInfo(1, walletAddress);
                    const userInfo2 = await stakingContract.getUserInfo(2, walletAddress);
                    const userInfo3 = await stakingContract.getUserInfo(3, walletAddress);
                    const stakedAmount1 = Number(ethValue(userInfo1));
                    const stakedAmount2 = Number(ethValue(userInfo2));
                    const stakedAmount3 = Number(ethValue(userInfo3));

                    const stakingContractV1 = getStakingContract(activeChainId, signer, "v1");                    
                    const poolInfo1V1 = await stakingContractV1.getPoolInfo(2);
                    const poolInfo2V1 = await stakingContractV1.getPoolInfo(1);
                    const poolInfo3V1 = await stakingContractV1.getPoolInfo(3);
                    const pendingRewardsV1 = await stakingContractV1.allPendingRewardsToken(walletAddress);
                    const pendingReward1V1 = Number(ethValue(pendingRewardsV1[1].toBigInt()));
                    const pendingReward2V1 = Number(ethValue(pendingRewardsV1[0].toBigInt()));
                    const pendingReward3V1 = Number(ethValue(pendingRewardsV1[2].toBigInt()));
                    const userInfo1V1 = await stakingContractV1.getUserInfo(2, walletAddress);
                    const userInfo2V1 = await stakingContractV1.getUserInfo(1, walletAddress);
                    const userInfo3V1 = await stakingContractV1.getUserInfo(3, walletAddress);
                    const stakedAmount1V1 = Number(ethValue(userInfo1V1.amount.toBigInt()));
                    const stakedAmount2V1 = Number(ethValue(userInfo2V1.amount.toBigInt()));
                    const stakedAmount3V1 = Number(ethValue(userInfo3V1.amount.toBigInt()));

                    const priceData = await axios.get("https://tokens.propchain.com/get-market-data");
                    const propPrice = priceData.data.data.current_price_usd;
                    const totalStaked = Number(ethValue(poolInfo1.totalStaked)) + Number(ethValue(poolInfo2.totalStaked)) + Number(ethValue(poolInfo3.totalStaked)) + Number(ethValue(poolInfo1V1.totalStaked)) + Number(ethValue(poolInfo2V1.totalStaked)) + Number(ethValue(poolInfo3V1.totalStaked));
                    const res = {
                        price: propPrice,
                        balance: Number(bal),
                        balanceUSD: Number(bal) * propPrice,
                        totalAmount: stakedAmount1 + stakedAmount2 + stakedAmount3 + stakedAmount1V1 + stakedAmount2V1 + stakedAmount3V1,
                        totalAmountUSD: (stakedAmount1 + stakedAmount2 + stakedAmount3 + stakedAmount1V1 + stakedAmount2V1 + stakedAmount3V1) * propPrice,
                        totalPending: pendingReward1 + pendingReward2 + pendingReward3 + pendingReward1V1 + pendingReward2V1 + pendingReward3V1,
                        totalStaked: totalStaked,
                        totalStakedUSD: totalStaked * propPrice,
                        availablePROPC: stakedAmount3 + stakedAmount1,
                        pools: [
                            {
                                icon: LongTermIcon,
                                poolTerm: 'Long',
                                lockYear: '2Y',
                                apy: poolInfo3.apyPercent.toNumber()/100,
                                tvl: (Number(usdAmount(poolInfo3.totalStaked, propPrice)) + Number(usdAmount(poolInfo3V1.totalStaked, propPrice))).toLocaleString(undefined, {minimumFractionDigits: 2}),
                                poolIndex: 3,
                                penaltyFee: poolInfo3.penaltyFee.toNumber()/100,
                                staked: stakedAmount3 + stakedAmount3V1 > 0,
                                amount: stakedAmount3 + stakedAmount3V1,
                                pendingRwards: pendingReward3 + pendingReward3V1,
                                lockTime: poolInfo3.penaltyTimeLimit.toNumber(),
                            },
                            {
                                icon: MidTermIcon,
                                poolTerm: 'Mid',
                                lockYear: '1Y',
                                apy: poolInfo2.apyPercent.toNumber()/100,
                                tvl: (Number(usdAmount(poolInfo2.totalStaked, propPrice)) + Number(usdAmount(poolInfo2V1.totalStaked, propPrice))).toLocaleString(undefined, {minimumFractionDigits: 2}),
                                poolIndex: 2,
                                penaltyFee: poolInfo2.penaltyFee.toNumber()/100,
                                staked: stakedAmount2 + stakedAmount2V1 > 0,
                                amount: stakedAmount2 + stakedAmount2V1,
                                pendingRwards: pendingReward2 + pendingReward2V1,
                                lockTime: poolInfo2.penaltyTimeLimit.toNumber(),
                            },
                            {
                                icon: ShortTermIcon,
                                poolTerm: 'Short',
                                lockYear: '6M',
                                apy: poolInfo1.apyPercent.toNumber()/100,
                                tvl: (Number(usdAmount(poolInfo1.totalStaked, propPrice)) + Number(usdAmount(poolInfo1V1.totalStaked, propPrice))).toLocaleString(undefined, {minimumFractionDigits: 2}),
                                poolIndex: 1,
                                penaltyFee: poolInfo1.penaltyFee.toNumber()/100,
                                staked: stakedAmount1 + stakedAmount1V1 > 0,
                                amount: stakedAmount1 + stakedAmount1V1,
                                pendingRwards: pendingReward1 + pendingReward1V1,
                                lockTime: poolInfo1.penaltyTimeLimit.toNumber(),
                            },
                        ]
                    }
                    setStakeData(res);
                    setDataLoaded(true);
                } catch(err) {
                    console.log("Get Staking causes error: ", err);
                    console.log(walletAddress);
                    setStakeData(poolData);
                    setDataLoaded(false);     
                }
                     
            } else {
                try {
                    let chainName = "homestead";
                    if (process.env.REACT_APP_CHAIN_ID === '5') {
                        chainName = "goerli";
                    } else if (process.env.REACT_APP_CHAIN_ID === '11155111') {
                        chainName = "sepolia";
                    } else {
                        chainName = "homestead";
                    }
                    const pvd = new ethers.providers.InfuraProvider(
                        chainName,
                        process.env.REACT_APP_INFURA_PROJECT_ID
                    );
                    const stakingContract = getStakingContract(Number(process.env.REACT_APP_CHAIN_ID), pvd);
                    const poolInfo1 = await stakingContract.getPoolInfo(1);
                    const poolInfo2 = await stakingContract.getPoolInfo(2);
                    const poolInfo3 = await stakingContract.getPoolInfo(3);
                    const priceData = await axios.get("https://tokens.propchain.com/get-market-data");
                    const propPrice = priceData.data.data.current_price_usd;

                    const stakingContractV1 = getStakingContract(Number(process.env.REACT_APP_CHAIN_ID), pvd, "v1");
                    const poolInfo1V1 = await stakingContractV1.getPoolInfo(2);
                    const poolInfo2V1 = await stakingContractV1.getPoolInfo(1);
                    const poolInfo3V1 = await stakingContractV1.getPoolInfo(3);

                    const totalStaked = Number(ethValue(poolInfo1.totalStaked)) + Number(ethValue(poolInfo2.totalStaked)) + Number(ethValue(poolInfo3.totalStaked)) + Number(ethValue(poolInfo1V1.totalStaked)) + Number(ethValue(poolInfo2V1.totalStaked)) + Number(ethValue(poolInfo3V1.totalStaked));

                    const res = {
                        price: propPrice,
                        balance: 0,
                        balanceUSD: 0,
                        totalAmount: 0,
                        totalAmountUSD: 0,
                        totalPending: 0,
                        totalStaked: totalStaked,
                        totalStakedUSD: totalStaked * propPrice,
                        availablePROPC: 0,
                        pools: [
                            {
                                icon: LongTermIcon,
                                poolTerm: 'Long',
                                lockYear: '2Y',
                                apy: poolInfo3.apyPercent.toNumber()/100,
                                tvl: (Number(usdAmount(poolInfo3.totalStaked, propPrice)) + Number(usdAmount(poolInfo3V1.totalStaked, propPrice))).toLocaleString(undefined, {minimumFractionDigits: 2}),
                                poolIndex: 3,
                                penaltyFee: poolInfo3.penaltyFee.toNumber()/100,
                                staked: false,
                                amount: 0,
                                totalRedeemed: 0,
                                pendingRwards: 0,
                                lockTime: poolInfo3.penaltyTimeLimit.toNumber()
                            },
                            {
                                icon: MidTermIcon,
                                poolTerm: 'Mid',
                                lockYear: '1Y',
                                apy: poolInfo2.apyPercent.toNumber()/100,
                                tvl: (Number(usdAmount(poolInfo2.totalStaked, propPrice)) + Number(usdAmount(poolInfo2V1.totalStaked, propPrice))).toLocaleString(undefined, {minimumFractionDigits: 2}),
                                poolIndex: 2,
                                penaltyFee: poolInfo2.penaltyFee.toNumber()/100,
                                staked: false,
                                amount: 0,
                                totalRedeemed: 0,
                                pendingRwards: 0,
                                lockTime: poolInfo2.penaltyTimeLimit.toNumber()
                            },
                            {
                                icon: ShortTermIcon,
                                poolTerm: 'Short',
                                lockYear: '6M',
                                apy: poolInfo1.apyPercent.toNumber()/100,
                                tvl: (Number(usdAmount(poolInfo1.totalStaked, propPrice)) + Number(usdAmount(poolInfo1V1.totalStaked, propPrice))).toLocaleString(undefined, {minimumFractionDigits: 2}),
                                poolIndex: 1,
                                penaltyFee: poolInfo1.penaltyFee.toNumber()/100,
                                staked: false,
                                amount: 0,
                                totalRedeemed: 0,
                                pendingRwards: 0,
                                lockTime: poolInfo1.penaltyTimeLimit.toNumber()
                            },
                        ]
                    }
                    setStakeData(res);
                    setDataLoaded(true);
                } catch(err) {
                    console.log("Get Staking causes error: ", err);
                    setStakeData(poolData);
                    setDataLoaded(false);  
                }
            }
                   
        }

        get();
        // if (wallet && walletAddress) {
        //     const interval = setInterval(async() => {
        //         await get();
        //     }, 30000);
      
        //     return () => clearInterval(interval);
        // }
    }, [activeChainId, wallet, walletAddress, stakeOrWithdraw]);

    return {data, loaded};
}

export default useGetPoolData;
