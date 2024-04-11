import BottomLeftImg from "static/assets/Staking/unstake completed.png";
import MotionDiv from "components/Common/MotionDiv";
import DetailsCard from "./DetailsCard";
import { FC } from "react";

interface BannerProps {
   totalStacked: number;
   totalStackedUSD: number;
   totalRewards: number;
   totalRewardsUSD: number;
}

const TopBanner: FC<BannerProps> = ({totalStacked, totalStackedUSD, totalRewards, totalRewardsUSD}) => {

   return(
      <MotionDiv
         className='top-banner position-relative'
      >  
         <div className='top-banner-bg'>

            <img src={BottomLeftImg} alt='' className='bottom-left-img' />
            <div>
               <div className='active-staking subheader-h6-400 body-mobile-p-500 d-flex align-items-center'>
                  <span></span>
                  Staking Active
               </div>

               <h2 className='real-stake-title text-pri-100'>
                  Real<span className='text-pri-400'>-E-Stake</span>
               </h2>

               <p className='desc'>
                  Say hello to a world of limitless possibilities with our innovative staking program! Experience the liberty of earning staking rewards while supporting the Propchain Ecosystem
               </p>
            </div>
            <div>
               <DetailsCard
                  title = "Total Value Locked"
                  amount = {totalStackedUSD.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                  tokens = {totalStacked.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
               />
               {/* <DetailsCard
                  title = "Total Rewards Distributed"
                  amount = "54.00 K"
                  tokens = "50,000"
               /> */}
            </div>
         </div>

      </MotionDiv>
   )
}

export default TopBanner;