import { useState, useEffect, SetStateAction } from "react";
import useGetClaimData from "hooks/portfolio/useGetClaimData";
import { useConnectWallet } from '@web3-onboard/react';
import Connector from 'containers/Connector/Connector';
import { ethers } from 'ethers';
import { useRecoilState, useRecoilValue } from 'recoil';
import { stakeOrWithdrawState, walletAddressState } from 'store/wallet';
import { networkInfos } from 'config/constants/network';

import { getVestingContract, getStakingContract } from 'utils/contractHelper';
import Loader2 from "components/Common/Loader2";
interface Props {
  setStep: (step : number) => void;
  setClaimValue: (claimValue : string) => void;
  setClaimStatus: (claimStatus: boolean) => void;
  setClaimLink: (claimLink: string) => void;
}

const statuses = ["All", "Vesting", "Staking Rewards"];


const tokens: SetStateAction<any[]> = [];
const ClaimableTokensList : React.FC<Props> = ({ setStep, setClaimValue, setClaimStatus, setClaimLink }) => {

  const [currentStatus, setCurrentStatus] = useState("All");
  const [tokensData, setTokensData] = useState<any[]>(tokens);
  const [totalData, setTotalData] = useState<any[]>(tokens);
  const {claims, claimLoaded} = useGetClaimData();
  const [showLoader, setShowLoader] = useState(false);
  const [vestingType, setVestingType] = useState("Seed");

  const [{wallet}] = useConnectWallet();
  const walletAddress = useRecoilValue(walletAddressState);
  const {activeChainId} = Connector.useContainer();
  const [balanceChanged, onWalletBalanceChange] = useRecoilState(stakeOrWithdrawState);

  useEffect(() => {
    if (claimLoaded){
      let claimInfo = [];
      if (claims?.seed >= 0.001) {        
        claimInfo.push({round: "Seed", value: claims?.seed, claimType: "Vesting"});
      }
      if(claims.private >= 0.001) {
        claimInfo.push({round: "Private", value: claims?.private, claimType: "Vesting"});
      }
      if(claims.kol >= 0.001) {
        claimInfo.push({round: "Kol", value: claims?.kol, claimType: "Vesting"});
      }
      if(claims.public >= 0.001) {
        claimInfo.push({round: "Public", value: claims?.public, claimType: "Vesting"});
      }
      if(claims.team >= 0.001) {
        claimInfo.push({round: "Team", value: claims?.team, claimType: "Vesting"});
      }
      if(claims.advisors >= 0.001) {
        claimInfo.push({round: "Advisors", value: claims?.advisors, claimType: "Vesting"});
      }
      if(claims.community >= 0.001) {
        claimInfo.push({round: "Community", value: claims?.community, claimType: "Vesting"});
      }
      if(claims.rewards >= 0.001) {
        claimInfo.push({round: "Rewards", value: claims?.rewards, claimType: "Vesting"});
      }
      if(claims.liquidity >= 0.001) {
        claimInfo.push({round: "Liquidity", value: claims?.liquidity, claimType: "Vesting"});
      }
      if(claims.operations >= 0.001) {
        claimInfo.push({round: "Operations", value: claims?.operations, claimType: "Vesting"});
      }
      if(claims.treasury >= 0.001) {
        claimInfo.push({round: "Treasury", value: claims?.treasury, claimType: "Vesting"});
      }
      if(claims.additional >= 0.001) {
        claimInfo.push({round: "DBM", value: claims?.additional, claimType: "Vesting"});
      }
      if(claims.otc >= 0.001) {
        claimInfo.push({round: "OTC", value: claims?.otc, claimType: "Vesting"});
      }
      if(claims.staking >= 0.001) {
        claimInfo.push({round: "Staking Rewards", value: claims?.staking, claimType: "Staking Rewards"});
      }
      setTokensData(claimInfo);
      setTotalData(claimInfo);
    }
    
  }, [claims, claimLoaded]);
  useEffect(() => {
    if (currentStatus === "All") {
      setTokensData(totalData);
    } else {
      setTokensData(totalData.filter(token => token.claimType === currentStatus))
    }
  }, [currentStatus, totalData])

  const onClaim = async (claimType: string, claimValue: number) => {
    setVestingType(claimType);
    if(wallet && walletAddress) {
      setShowLoader(true);
      const pvd = new ethers.providers.Web3Provider(wallet.provider, 'any');
      const signer = pvd.getSigner();
      try {
        if (claimType === "Staking Rewards") {
          console.log(wallet);
          const stakingContract = getStakingContract(activeChainId, signer);
          console.log(stakingContract);
          const tx = await stakingContract.redeemAll();
          if (tx.hash) {
            const receipt = await tx.wait();
            setClaimValue(claimValue.toFixed(2))
            setClaimStatus(receipt.status);
            setClaimLink(networkInfos[activeChainId].explorer + "tx/" + tx.hash);
            onWalletBalanceChange(!balanceChanged);
            setShowLoader(false);
            setStep(3);
          }     
        } else {        
          const claimContract = getVestingContract(activeChainId, claimType, signer);
          const tx = await claimContract.claim(walletAddress);
          if (tx.hash) {
            const receipt = await tx.wait();
            setClaimValue(claimValue.toFixed(2))
            setClaimStatus(receipt.status);
            setClaimLink(networkInfos[activeChainId].explorer + "tx/" + tx.hash);
            setShowLoader(false);
            setStep(3);
          }
        }      
      } catch(err) {
        console.log(err);
        setShowLoader(false);
      }
      
    }
    
  }

  return(
    <div className="claimable-list-container w-100">
      <div className="d-flex gap-8">
        {
          statuses.map((status) => 
            <div
              className={`status-chip text-sec-${currentStatus === status ? 400 : 200} cursor-pointer bg-pri-200 padding-x-25 padding-y-7 br-9 margin-top-md-50 margin-top-30 body-p-500 subheader-mobile-h6-500 margin-bottom-20`}
              key={status}
              onClick={() => setCurrentStatus(status)}
            >
              {status}
            </div>
          )
        }
      </div>

      {
        tokensData.map((token, ind) => {
          return(
            <div className="token-card br-15 w-100 d-md-flex align-items-center justify-content-between" key={ind}>
              <div>
                <div className="d-flex align-items-center body-p-400 subheader-mobile-h6-400 top-label margin-bottom-8 card-title">
                  <div>{token.round === "Staking Rewards" ? 'Rewards to Claim' : 'Vesting to Claim'}</div>
                  <span className="margin-x-8"></span>
                  <div className="purple-text">{token.round}</div>
                </div>

                <div className="d-flex align-items-baseline">
                  <div className="subheader-h4-400 subheader-mobile-h5-400 text-pri-300">
                    {(token.value).toLocaleString(undefined, {minimumFractionDigits: 3})}
                  </div>
                  <div className="body-p-400 subheader-mobile-h6-400 margin-left-8 purple-text">
                    PROPC
                  </div>
                </div>
              </div>

              <button
                  className="claim-button d-flex align-items-center br-6 padding-x-20 body-p-600 text-pri-300"
                  onClick={() => onClaim(token.round, token.value)}
                >
                  {vestingType === token.round && showLoader && <Loader2 />}
                  {(vestingType !== token.round || !showLoader) && <span className="bg-succ-100 br-6 margin-right-8"></span>}
                  {vestingType === token.round && showLoader ? 'Claiming..' : 'Claim now'}
              </button>

              {/* {
                token.is_ready_to_claim ?
                <button
                  className="claim-button d-flex align-items-center br-6 padding-x-20 body-p-600 text-pri-300"
                  onClick={() => onClaim(token.round)}
                >
                  <span className="bg-succ-100 br-6 margin-right-8"></span>
                  Claim Now
                </button> :
                <div className="text-pri-100 body-p-600 subheader-mobile-h6-600 claim-days-text">
                  Claim in 234 Days
                </div>
              } */}
            </div>
          )
        })
      }
    </div>
  )
}

export default ClaimableTokensList;