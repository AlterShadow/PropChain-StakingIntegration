import { FC, useEffect, useState } from 'react';
import Cross from "static/assets/Common/cross.png";
import SuccssfullToken from "static/assets/Portfolio/claimed-token.png";
import UnSuccssfullToken from "static/assets/Portfolio/unclaimed-token.png";
import Eye from "static/assets/Portfolio/eye.svg";
import ClaimableTokensList from './ClaimableTokensList';

interface ModalProps {
   show: boolean;
   setModal: (show: boolean)=> void;
}

const ClaimTokenModal: FC<ModalProps> = ({ show, setModal }) => {

   const [step, setStep] = useState(1);
   const [claimValue, setClaimValue] = useState("1000.00");
   const [claimStatus, setClaimStatus] = useState(false);
   const [claimLink, setClaimLink] = useState("https://www.google.com");

   const getWidth = () => {
      let width = 580;
      if(step === 1){
         width = 660
      }
      if(step === 2){
         width = 620
      }

      return `${width}px`
   }

   const getTitle = () => {
      if(step === 1){
         return(
            <div className='modal-title text-pri-400 subheader-h4-500'> Tokens Claimable </div>
         )
      }
      if(step === 2){
         return(
            <>
               <div className='d-flex align-items-center justify-content-center icon-container bg-sec-100'>
                  <i className='pc-icon pc-icon-withdraw pc-icon-size-30 text-pri-100'></i>
               </div>
               <div className='modal-title text-pri-400 subheader-h4-500'> Claim Rewards </div>
            </>
         )
      }

      return <></>
   }

   useEffect(() => {
      if(show){
         setStep(1);
      }
      document.body.style.overflow = show ? "hidden" : "auto";
   }, [show])

   return(
      <div className={`modal-wrapper claim-status-modal ${show ? 'show-modal' : ''}`}>
         <div className='modal-card claim-status-wrapper' style={{ width : getWidth() }}>
            <div className='d-flex justify-content-between w-100 align-items-center'>
               <div className='d-flex align-items-center'>
                  {
                     getTitle()
                  }
               </div>
               <button 
                  className='close-button'
                  onClick={() => setModal(false)}
               >
                  <img src={Cross} alt='' />
               </button>
            </div>

            {
               step === 1 &&
               <ClaimableTokensList
                  setStep = {setStep}
                  setClaimValue = { setClaimValue }
                  setClaimStatus = { setClaimStatus }
                  setClaimLink = { setClaimLink }
               />
            }

            {
               step === 2 &&
               <>
                  <div className='claim-token-input-container w-100'>
                     <label className='body-p-400 text-sec-400'> PROPC </label>
                     <div className='d-flex gap-12 align-items-center'>
                        <input type='text' className='w-100 text-pri-300' value={claimValue} onChange={(e) => setClaimValue(e.target.value)}/>
                        <button className='bg-pri-100 subheader-mobile-h6-500 text-sec-100 body-p-500 flex-shrink-0'> MAX </button>
                     </div>
                  </div>
                  <div className='text-end body-p-500 subheader-mobile-h6-500 w-100'>
                     <span className='text-sec-300'>Available Rewards</span> <span className='text-sec-400'>1000 PROPC</span>
                  </div>

                  <button
                     className='button-lg button-primary w-100 margin-top-md-36 margin-top-20'
                     style={{ height : "56px" }}
                     onClick={() => setStep(3)}
                  >
                     Claim
                  </button>
               </>
            }
            {
               step === 3 &&
               <>
                  <img src={claimStatus ? SuccssfullToken : UnSuccssfullToken} alt='' className='token-img' />

                  <div className={`title ${claimStatus ? 'successfull' : '' }`}>
                     {claimStatus ? 'Claim Successful!' : 'Claim Unsuccessful!'}
                  </div>

                  <div className='desc'>
                     {claimStatus ? `You claimed ${claimValue} new PROPC.` : `Your claim of ${claimValue} PROPC declined.`}
                  </div>

                  <div className='d-flex justify-content-center align-items-center'>
                     <img src={Eye} alt='' className='eye-icon' />
                     <a 
                        href={claimLink}
                        rel={"noreferrer"}
                        target={'_blank'}
                        className='transction-link'
                     >
                        View Transaction on Etherscan
                     </a>
                  </div>
               </>

            }

         </div>
      </div>
   )
}
export default ClaimTokenModal;