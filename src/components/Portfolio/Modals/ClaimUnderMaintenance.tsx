import { FC, useEffect } from 'react';
import Cross from "static/assets/Common/cross.png";
import SuccssfullToken from "static/assets/Portfolio/claimed-token.png";
import { ReactComponent as Settings } from "static/assets/Portfolio/Settings.svg";

interface ModalProps {
   show: boolean;
   setModal: (show: boolean)=> void;
}

const ClaimUnderMaintenance: FC<ModalProps> = ({ show, setModal }) => {

   useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
   }, [show])

   return(
      <div className={`modal-wrapper claim-status-modal ${show ? 'show-modal' : ''}`}>
         <div className='modal-card claim-status-wrapper' style={{ width : "560px" }}>
            <div className='d-flex justify-content-between w-100 align-items-center'>
               <div className='d-flex align-items-center'>
                  
               </div>
               <button 
                  className='close-button'
                  onClick={() => setModal(false)}
               >
                  <img src={Cross} alt='' />
               </button>
            </div>

            <Settings className='margin-bottom-40' />

            <div className={`title text-pri-100`}>
              Claim is under maintenance
            </div>

            <div className='desc'>
              Claiming feature is currently under maintenance and will be back in a few hours.
            </div>

         </div>
      </div>
   )
}
export default ClaimUnderMaintenance;