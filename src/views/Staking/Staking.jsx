import TopBanner from "components/Staking/TopBanner";
import PoolCard from "components/Staking/PoolCard";
import useGetStakeData from 'hooks/staking/useGetStakeData';

const Staking = () => {
  const { data, loaded } = useGetStakeData();
  return (
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
              ind={ind}
              balance={data.balance}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Staking;