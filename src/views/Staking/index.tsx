import Header from "components/Common/Header";
import TopBanner from "components/Staking/TopBanner";
import BecomeAMember from "components/Staking/BecomeAMember";
import PoolCard from "components/Staking/PoolCard";
import useGetPoolData from 'hooks/staking/useGetPoolData';

const Staking = () => {

   const { data, loaded } = useGetPoolData();

   return(
      <div className='main-container staking-page d-flex flex-column'>
         <Header />

         <div className="site-container">
            <TopBanner
               totalStacked={data.totalStaked}
               totalStackedUSD={data.totalStakedUSD}
               totalRewards={0}
               totalRewardsUSD={0}
             />

            {/* <BecomeAMember /> */}

            <div className='pools-wrapper'>
               {
                  data.pools.map((item, ind) => (
                     <PoolCard 
                        {...item}
                        key={ind}
                        ind = {ind}
                        balance = {data.balance}
                     />
                  ))
               }
            </div>
         </div>
      </div>
   )
}
export default Staking;