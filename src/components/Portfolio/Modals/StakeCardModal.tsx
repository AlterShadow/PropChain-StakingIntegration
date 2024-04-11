import { FC, useEffect } from 'react';
import Cross from "static/assets/Common/cross.png";
import CustomTooltip from "components/Common/CustomTooltip";
import LongTerm from "static/assets/Portfolio/long-term.svg";
import MidTerm from "static/assets/Portfolio/mid-term.svg";
import ShortTerm from "static/assets/Portfolio/short-term.svg";

interface ModalProps {
  show: boolean;
  setModal: (show: boolean)=> void;
}


const Pools = [
   {
      icon: LongTerm,
      poolTerm: 'Long',
      apy: '20',
      lockYear: '3y',
      tvl: '823,456.28',
   },
   {
      icon: MidTerm,
      poolTerm: 'Mid',
      apy: '20',
      lockYear: '3y',
      tvl: '823,456.28',
   },
   {
      icon: ShortTerm,
      poolTerm: 'Short',
      apy: '20',
      lockYear: '3y',
      tvl: '823,456.28',
   },
   
]

const StakeCardModal: FC<ModalProps> = ({ show, setModal }) => {

  useEffect(() => {
   document.body.style.overflow = show ? "hidden" : "auto";
  }, [show])

  return(
    <>
      <div className={`modal-wrapper stake-cards-modal ${show ? 'show-modal' : ''}`}>
         <div className='modal-card stake-card-modal-wrapper'>
            <div className='d-flex justify-content-between align-items-center w-100 '>
               <h2 className='title'>
                  Earn Up to <span>20%!</span> Stake Your Tokens Today.
               </h2>
               <button 
                  className='close-button'
                  onClick={() => setModal(false)}
               >
                  <img src={Cross} alt='' />
               </button>
            </div>

            <p className='description d-md-none'>
               Choose staking durations from short to long-term based on your goals. Earn extra tokens as rewards and strengthen the Propchain Ecosystem. Dive in and amplify your impact.
            </p>
            <p className='description d-none d-md-block'> By staking your tokens with Real-E-Stake, you tap into a rewarding mechanism, increasing your token holdings while leveraging the expansive utilities of the Propchain ecosystem. Define your staking path based on your vision and horizon, choosing from short- to long-term durations. By taking this step, you are unlocking an opportunity to earn extra tokens as rewards. Dive in, stake, and amplify the strength of the Propchain Ecosystem. </p>

            <div className='stake-card-wrapper'>
               {
                  Pools.map((itme, ind) => (
                     <div className='stake-box'>
                        <div className='d-flex align-items-center'>
                           <div className='pool-icon-container'>
                              <img src={itme.icon} alt='' />
                           </div>
                           <div className='stake-box-title'>
                              <span> {itme.poolTerm} </span> Term Pool
                           </div>
                        </div>

                        <div className='apy-card'>
                           <div>
                              <div className='label'> APY </div>
                              <div className='apy-value'> {itme.apy}% </div>
                           </div>
                           <div className="position-relative">
                              <div className='label'>
                                 LOCK
                              </div>
                              <div className='lock-value'> {itme.lockYear} </div>
                              <CustomTooltip 
                                 content="This is the amount of time a user needs to stake in the pool to not get a penalty. Withdrawing before this period will lead to a penalty (only on staked amount not on your rewards) as per pool conditions."
                                 tootlTipId="locaked propc"
                              />
                           </div>
                        </div>

                        <div className='tvl-wrapper d-flex align-items-center justify-content-between'>
                           <div className='label'>TVL</div>
                           <div className='tvl-value'> <span></span>{itme.tvl === '0' ? '-' : '$' + itme.tvl} </div>
                        </div>

                        <button className='stake-button'>Stake</button>
                     </div>
                  ))
               }
            </div>
         </div>
      </div>
    </>
  )
}
export default StakeCardModal;