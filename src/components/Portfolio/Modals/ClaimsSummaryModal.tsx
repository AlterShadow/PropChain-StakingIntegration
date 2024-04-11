import { FC, useEffect } from 'react';
import Cross from "static/assets/Common/cross.png";
import useGetClaimData from "hooks/portfolio/useGetClaimData";
import { shortenAddress, capitalizeFirstLetter } from 'utils/formatters/string';

interface ModalProps {
  show: boolean;
  setModal: (show: boolean)=> void;
}

const ClaimsSummaryModal: FC<ModalProps> = ({ show, setModal }) => {

  const {histories} = useGetClaimData();

   useEffect(() => {
      document.body.style.overflow = show ? "hidden" : "auto";
   }, [show])

  const openLink = (link: string) => {
    window.open(link, '_blank');
  }

  const copyTx = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);     
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

   return(
      <div className={`modal-wrapper claim-status-modal ${show ? 'show-modal' : ''}`}>
         <div className='modal-card claim-status-wrapper' style={{ width : "660px" }}>
            <div className='d-flex justify-content-between w-100 align-items-center'>
               <div className='d-flex align-items-center'>
                  <div className='modal-title text-pri-400 subheader-h4-500'> Claim Summary </div>
               </div>
               <button 
                  className='close-button'
                  onClick={() => setModal(false)}
               >
                  <img src={Cross} alt='' />
               </button>
            </div>

            <div className="claimable-list-container w-100 margin-top-50">
              {
                histories?.map((token, ind) => {
                  return(
                    <div className="token-card br-15 w-100 d-md-flex align-items-center justify-content-between" key={ind}>
                      <div>
                        <div className="d-flex align-items-center body-p-400 subheader-mobile-h6-400 top-label margin-bottom-8 card-title">
                          <div>{ token.type === "staking" ? "Staking Reward" : "Vesting Claim"}</div>
                          {
                            token.type !== "staking" &&
                            <>
                              <span className="margin-x-8"></span>
                              <div className='purple-text'>{capitalizeFirstLetter(token.type)}</div>
                            </>
                          }
                        </div>

                        <div className="d-flex align-items-baseline">
                          <div className="subheader-h4-400 text-pri-300 token-value">
                            {token.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                          </div>
                          <div className="body-p-400 margin-left-8 purple-text">
                            PROPC
                          </div>
                        </div>
                      </div>

                      <div className='d-flex flex-column align-items-md-end purple-text mt-2 mt-md-0'>

                        <div className='d-flex flex-row flex-md-column justify-content-between align-items-md-end'>
                          <div className='subheader-h6-500 margin-bottom-4'>
                            Claimed on
                          </div>
                          <div className='subheader-h6-400 margin-bottom-14 text-pri-300 claim-date'>
                            {token.timestamp}
                          </div>
                        </div>

                        <div className='d-flex align-items-center justify-content-between justify-content-md-start'>
                          <div className='subheader-h6-500'>
                            Txn ID
                          </div>
                          <div className='d-flex align-items-center'>
                            <div className='subheader-h6-400 text-pri-300 margin-x-8'>
                              {shortenAddress(token.hash, 5, 5)}
                            </div>
                            <i className='pc-icon pc-icon-copy margin-right-4 cursor-pointer' onClick={() => copyTx(token.hash)}></i>
                            <i className='pc-icon pc-icon-external-link cursor-pointer' onClick={() => openLink(token.link)}></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
         </div>
      </div>
   )
}
export default ClaimsSummaryModal;