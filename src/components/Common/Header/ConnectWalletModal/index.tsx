import { FC } from "react";
import Cross from "static/assets/Common/cross.png";
import MetamaskIcon from "static/assets/Header/Metamask.png";
import TrustWalletIcon from "static/assets/Header/trust-wallet.png";
import WalletConnectIcon from "static/assets/Header/wallet-connect.svg";

interface ModalProps {
  show: boolean;
  setModal: (show: boolean)=> void;
  setWalletConnected: (show: boolean)=> void;
}

const ConnectWalletModal: FC<ModalProps> = ({show, setModal, setWalletConnected}) => {
   
   const handleConnect = () => {
      setModal(false);
      setWalletConnected(true);
   }

   return(
      <div className={`modal-wrapper connect-wallet-modal ${show ? 'show-modal' : ''}`}>
         <div className='modal-card connect-wallet-wrapper' style={{ width : "630px" }}>

            <div className='d-flex align-items-center justify-content-between'>
               <div className='d-flex align-items-center'>
                  <div className='icon-container d-flex align-items-center justify-content-center'>
                     <i className='pc-icon pc-icon-wallet pc-icon-size-29 text-pri-100 margin-top-3' />
                  </div>
                  <div className='modal-title text-pri-400 subheader-h4-500 body-mobile-md-500'>
                     Connect your Wallet
                  </div>
               </div>
               <button 
                  className='close-button'
                  onClick={() => setModal(false)}
               >
                  <img src={Cross} alt='' />
               </button>
            </div>

            <div className='desc'>
               Connect with one of available wallet providers orcreate a new wallet.
            </div>

            <button
               className='connect-wallet-button subheader-h5-500 body-mobile-md-500 text-sec-400'
               onClick={handleConnect}
            >
               <div className='icon-wrapper'>
                  <img src={MetamaskIcon} alt='' />
               </div>
               Metamask
            </button>
            <button
               className='connect-wallet-button subheader-h5-500 body-mobile-md-500 text-sec-400'
               onClick={handleConnect}
            >
               <div className='icon-wrapper'>
                  <img src={TrustWalletIcon} alt='' />
               </div>
               Trust Wallet
            </button>
            <button
               className='connect-wallet-button subheader-h5-500 body-mobile-md-500 text-sec-400'
               onClick={handleConnect}
            >
               <div className='icon-wrapper'>
                  <img src={WalletConnectIcon} alt='' />
               </div>
               Wallet Connect
            </button>
         </div>
      </div>
   )
}
export default ConnectWalletModal;