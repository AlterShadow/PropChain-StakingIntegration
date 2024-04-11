import Unlock from "static/assets/Staking/unlock-icon.svg";
import StakingModal from "../Modals/StakingModal";
import { useState } from "react";
import UntakingModal from "../Modals/UnstackingModal";
import MotionDiv from "components/Common/MotionDiv";
import { useRecoilValue } from 'recoil';
import { walletAddressState } from 'store/wallet';
import Connector from 'containers/Connector';
import CustomTooltip from "components/Common/CustomTooltip";
import { ReactComponent as Clock } from "static/assets/Staking/clock-icon.svg";
interface PoolCardProps {
   icon: any;
   poolTerm: string,
   apy: number,
   lockYear: string,
   tvl: string
   poolIndex: number,
   staked: boolean,
   ind : number,
   balance: number,
   penaltyFee: number,
   amount: number,
   lockTime: number
}

const PoolCard : React.FC<PoolCardProps> = ({
   icon,
   poolTerm,
   apy,
   lockYear,
   tvl,
   amount,
   poolIndex,
   staked,
   ind,
   balance,
   penaltyFee,
   lockTime
}) => {

   const walletAddress = useRecoilValue(walletAddressState);
   const [ showStakeModal, setShowStakeModal ] = useState(false);
   const [ showUnstakeModal, setShowUnstakeModal ] = useState(false);   
   const { connectWallet } = Connector.useContainer();
   
   return(
      <>
         <MotionDiv
            className='pool-card'
            transition={{ delay : ((ind * 0.2) + 0.4), duration : 0.7 }}
         >
            <div className='d-flex align-items-center'>
               <div className='icon-container d-flex align-items-center justify-content-center'>
                  <img src={icon} alt='' />
               </div>

               <div className='title'>
                  {poolTerm}
                  <span className='text-white'> Term Pool</span>
               </div>
            </div>

            <div className='apy-card'>
               <div>
                  <div className='label'> APY </div>
                  <div className='apy-value'> {apy}% </div>
               </div>
               <div className="position-relative">
                  <div className='label'>
                     <Clock />
                  </div>
                  <div className='lock-value'> {lockYear} </div>
                  <CustomTooltip 
                     content="This is the amount of time a user needs to stake in the pool to not get a penalty. Withdrawing before this period will lead to a penalty (only on staked amount not on your rewards) as per pool conditions."
                     tootlTipId="locaked propc"
                  />
               </div>
            </div>

            <div className='tvl-wrapper d-flex align-items-center justify-content-between'>
               <div className='label'>TVL</div>
               <div className='tvl-value'> <span></span>{tvl === '0' ? '-' : '$' + tvl} </div>
            </div>

            {/* After connect wallet show this */}
            <div className='tvl-wrapper d-flex align-items-center justify-content-between'>
               <div className='label'>PROPC</div>
               <div className='tvl-value'> {amount>0? amount.toLocaleString(undefined, {minimumFractionDigits: 2}):'-' } </div>
            </div>

            {/* Connect Wallet button */}
            {!walletAddress?
               <button className='connect-wallet-button' onClick={() => connectWallet()}>
                  <i className='pc-icon pc-icon-lock pc-icons-size-20 text-pri-300' />
                  Connect Wallet
               </button>
            : <></>
            }            

            {/* Stake button - show after wallet connected */
            walletAddress?
            <button className='stake-button' onClick={() => setShowStakeModal(true)}>
               Stake
            </button>
            : <></>
            }            

            {/* unstake button - show after Wallet connected */
            walletAddress?
            <button className={` unstake-button ${staked ? 'acive' : ''}`} onClick={() => setShowUnstakeModal(true)} disabled={!staked}>
               Unstake
            </button>
            : <></>
            }            

         </MotionDiv>
         <StakingModal
            stakingSuccessfull = {true}
            show = {showStakeModal}
            balance = { balance }
            apy = { apy }
            penaltyFee = {penaltyFee}
            lockYear = { lockYear }
            poolIndex = { poolIndex }
            poolTerm = { poolTerm }
            setModal={setShowStakeModal}
         />
         <UntakingModal
            stakingSuccessfull = {true}
            show = {showUnstakeModal}
            propc = { amount }
            apy = { apy }
            penaltyFee = { penaltyFee }
            poolIndex={poolIndex}
            setModal={setShowUnstakeModal}
         />
      </>
   )
}
export default PoolCard;