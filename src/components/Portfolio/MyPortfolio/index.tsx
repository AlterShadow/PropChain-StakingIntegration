import useGetPoolData from 'hooks/staking/useGetPoolData';
import useGetClaimData from "hooks/portfolio/useGetClaimData";
import useNextClaimQuery from 'queries/useNextClaimQuery';
import CustomTooltip from "components/Common/CustomTooltip";
import Loader from 'components/Common/Loader';
import { walletAddressState } from 'store/wallet';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

interface Props {
   setShowClaimStatusModal: (show: boolean)=> void;
   setShowClaimSummaryModal : (show: boolean)=> void;
   setShowClaimUnderMaintenance : (show: boolean)=> void;
}

const MyPortfolio : React.FC<Props> = (props) => {
   const { data, loaded } = useGetPoolData();
   const { claims, claimLoaded } = useGetClaimData();
   const [ claimIn, setClaimIn ] = useState("_");
   const walletAddress = useRecoilValue(walletAddressState);
   const nextClaim = useNextClaimQuery(walletAddress);
   const [ remainTime, setRemainTime ] = useState(Math.round(Math.abs(nextClaim.data?.claim_in ? nextClaim.data?.claim_in : 0)));

   useEffect(() => {
      const get = () => {
         if (walletAddress == null) {
            setClaimIn("_");            
         } else if (remainTime < 1) {
            setClaimIn("now");         
         } else {
            if (remainTime > 86400 * 2) {
               setClaimIn(`${remainTime / 86400}`)
            } else {
               const date = new Date(remainTime * 1000).toISOString().substring(11, 16);
               setClaimIn(date);
            }
            setRemainTime(remainTime - 1)
         }
      }
      get();
      const interval = setInterval(async() => {
         get();
      }, 1000);
  
      return () => clearInterval(interval);
   }, [remainTime, walletAddress])

   const valueToStr = (value: number) => {
      if (value >= 0.001) {
         return value.toLocaleString(undefined, {minimumFractionDigits: 3});
      } else {
         return '-';
      }
   }

   return(
      <div className='portfolio-card my-portfolio'>
         <div className='d-flex align-items-center justify-content-between title-container'>
            <div className='d-flex align-items-center'>
               <div className='wallet-container'>
                  <i className="pc-icon pc-icon-coins pc-icon-size-24 text-pri-100"></i>
               </div>
               <div className='card-title margin-left-16'>My Portfolio</div>
            </div>
            {/* <div className='percentage body-p-400 d-flex align-items-center'> 
               <i className="pc-icon pc-icon-triangle-up pc-icon-size-24"></i> 2.62%
            </div> */}
         </div>

         <div className='details-wrapper'>
            <div className='body-p-400 title'>
               My PROPC
            </div>
            <div className='d-flex align-items-end justify-content-between'>
               <div className='propc-amount'> {loaded && claimLoaded ? valueToStr(data.balance) : <Loader bgColor="white" />} </div>
               <div className='body-p-400 subheader-mobile-h6-400 text-sec-300 margin-bottom-4'> { loaded && claimLoaded ? '$' + valueToStr(data.balanceUSD) : <Loader bgColor="white" /> } </div>
            </div>
         </div>

         <div className='details-wrapper margin-top-13'>
            <div className='body-p-400 title d-flex align-items-center'>
               <span className='margin-right-5'>Locked PROPC</span>
               <CustomTooltip 
                  content="Locked PROP' represents the total number of PROPC tokens that you have both staked and vested."
                  tootlTipId="locaked propc"
               />
            </div>
            <div className='d-flex align-items-end justify-content-between'>
               <div className='propc-amount'> { loaded && claimLoaded ? valueToStr(data.totalAmount + claims.totalVested) : <Loader bgColor="white" /> } </div>
               <div className='body-p-400 subheader-mobile-h6-400 text-sec-300 margin-bottom-4'> { loaded && claimLoaded ? '$' + valueToStr((data.totalAmount + claims.totalVested)*data.price) : <Loader bgColor="white" /> } </div>
            </div>

            <div className='claim-details-wrapper'>
               <div className='details-row'>
                  <div className='body-p-400 subheader-mobile-h6-400 label'> Vested Amount </div>
                  <div className='value'>{ loaded && claimLoaded ? valueToStr(claims.totalVested) : <Loader bgColor="white" /> } <span className='subheader-h6-400 label'>PROPC</span></div>
               </div>
               <div className='details-row padding-bottom-0'>
                  <div className='body-p-400 subheader-mobile-h6-400 label'> Staked Amount </div>
                  <div className='value'> { loaded && claimLoaded ? valueToStr(data.totalAmount) : <Loader bgColor="white" /> } <span className='subheader-h6-400 label'>PROPC</span></div>
               </div>
            </div>

            <div className='claim-details-wrapper'>
               <div className='details-row'>
                  <div className='body-p-400 subheader-mobile-h6-400 label'> Vesting to Claim </div>
                  <div className='value'>{ loaded && claimLoaded ? valueToStr(claims.totalVesting) : <Loader bgColor="white" /> } <span className='subheader-h6-400 label'>PROPC</span></div>
               </div>
               <div className='details-row'>
                  <div className='body-p-400 subheader-mobile-h6-400 label'> Rewards to Claim </div>
                  <div className='value'> { loaded && claimLoaded ? valueToStr(data.totalPending) : <Loader bgColor="white" /> } <span className='subheader-h6-400 label'>PROPC</span></div>
               </div>
                <div className='details-row'>
                  <div className='body-p-400 subheader-mobile-h6-400 label'> Next Claim in </div>
                  <div className='value-days text-pri-100'> {claimIn} {remainTime>86400 *2 ? <span className='subheader-h6-400'>days</span> : ''}</div>
               </div>
               <div className='d-flex align-items-center details-row padding-bottom-0'>
                  <button
                     className='claim-button'
                     onClick={() => props.setShowClaimStatusModal(true)}
                     disabled = {!(claims.totalVesting + data.totalPending >= 0.001)}
                  >
                     {
                        claims.totalVesting + data.totalPending >= 0.001 ? "Claim now" : "Nothing to Claim"
                     }
                  </button>
                  <button
                     className='past-claim-button'
                     onClick={() => props.setShowClaimSummaryModal(true)}
                     // disabled={true}
                  >
                     Past Claims
                  </button>
               </div>
            </div>

         </div>
      
         <div className='details-wrapper token-detail-wrapper'>
            <div className='body-p-400 label'> PROPG (Gas Token) </div>
            <div className='soon-label'><span>&middot;	 &middot;	 &middot;	</span> Soon</div>
         </div>

         <div className='details-wrapper token-detail-wrapper'>
            <div className='body-p-400 label'> Vote </div>
            <div className='soon-label'><span>&middot;	 &middot;	 &middot;	</span> Soon</div>
         </div>
      </div>
   )
}
export default MyPortfolio;