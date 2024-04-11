import { FC, useEffect, useState } from 'react';
import SuccssfullToken from "static/assets/Portfolio/claimed-token.png";
import UnSuccssfullToken from "static/assets/Portfolio/unclaimed-token.png";
// import {ReactComponent as LongTermIcon} from "static/assets/Staking/long-term.svg";
import StakingNotes from './StakingNotes';

import { ethers } from 'ethers';
import { useConnectWallet } from '@web3-onboard/react';
import { getStakingContract, getErc20Contract } from 'utils/contractHelper';
import { getPropContractAddress, getStakingAddress } from "utils/addressHelper";
import Connector from 'containers/Connector';
import { shortenAddress } from 'utils/formatters/string';
import { networkInfos } from 'config/constants/network';
import Loader from 'components/Common/Loader';
import { useRecoilState } from 'recoil';
import { stakeOrWithdrawState } from 'store/wallet';
import { toast } from 'react-toastify';

interface ModalProps {
  stakingSuccessfull: boolean;
  show: boolean;
  balance: number;
  apy: number;
  penaltyFee: number;
  poolIndex: number;
  lockYear: string;
  poolTerm: string;
  setModal: (show: boolean)=> void;
}

const StakingModal: FC<ModalProps> = ({ stakingSuccessfull, show, balance, apy, penaltyFee, lockYear, poolIndex, poolTerm, setModal }) => {

  const [step, setStep] = useState(1);
  const [claimValue, setClaimValue] = useState("");
  const [{ wallet }] = useConnectWallet();
  const { activeChainId } = Connector.useContainer();
  const [txhash, setTxHash] = useState("");
  const [txlink, setTxLink] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [balanceChanged, onWalletBalanceChange] = useRecoilState(stakeOrWithdrawState);
  const [transaction_id, set_transaction_id] = useState("")

  const openLink = (link: string) => {
    window.open(link, '_blank');
  }

  const onChangeValue = (changeValue: string) => {
    if (Number(changeValue) > balance) {
      return;
    }
    setClaimValue(changeValue);
  }

  const onDeposit = async () => {
    if (wallet) {
      setShowLoader(true)
      const pvd = new ethers.providers.Web3Provider(wallet.provider, 'any');
      const signer = pvd.getSigner();
      const tokenAddress = getPropContractAddress(activeChainId);
      const stakingAddress = getStakingAddress(activeChainId);
      const tokenContract = getErc20Contract(tokenAddress, signer);
      try {
        const approveTx = await tokenContract?.approve(stakingAddress, ethers.utils.parseUnits(claimValue, "ether"));
        if (approveTx.hash) {
          const approveReceipt = await approveTx.wait();
          if (approveReceipt.status) {          
            const stakingContract = getStakingContract(activeChainId, signer);
            const tx = await stakingContract.stake(poolIndex, ethers.utils.parseUnits(claimValue, "ether"));
            if (tx.hash) {
              const receipt = await tx.wait();
              if (receipt.status) {
                set_transaction_id(tx.hash);
                setTxHash(shortenAddress(tx.hash));
                setTxLink(networkInfos[activeChainId].explorer + "tx/" + tx.hash);
                onWalletBalanceChange(!balanceChanged);
                setStep(2);
              }
            }
          }
        }     
        setShowLoader(false)
      } catch(err) {
        console.log(err)
        setShowLoader(false)
      }       
    }
  }

  const onPercent = (percent: number) => {
    setClaimValue((balance * percent / 100).toFixed(2));
  }


   const getTitle = () => {
      if(step === 1){
        return(
          <>
            <div className='d-flex align-items-center justify-content-center icon-container bg-sec-100'>
              <i className='pc-icon pc-icon-coins pc-icon-size-24 text-pri-100' />
            </div>
            <div className='modal-title text-pri-400 subheader-h4-500'> {poolTerm} Term Staking </div>
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

   const copyTransactionID = () => {
    navigator.clipboard.writeText(transaction_id);
    toast.success("Transaction ID copied !")
   }

   return(
      <div className={`modal-wrapper stacking-modal ${show ? 'show-modal' : ''}`}>
         <div className='modal-card modal-card-wrapper'>
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
                  <i className='pc-icon pc-icon-cross pc-icon-size-32'></i>
               </button>
            </div>

            {
               step === 1 &&
               <>

                <div className='stacking-details-row gap-10 margin-top-md-40 margin-bottom-12 margin-top-30'>
                  <div className='d-flex align-items-center justify-content-between details-container padding-x-11'>
                    <div className='purple-text detail-title'> APY </div>
                    <div className='text-sec-400 detail-value'> { apy }% </div>
                  </div>
                  <div className='d-flex align-items-center justify-content-between details-container padding-x-11'>
                    <div className='purple-text detail-title'> Lock </div>
                    <div className='text-sec-400 detail-value'> { lockYear } </div>
                  </div>
                </div>

                <div className='token-input-container w-100'>
                    <div className='d-md-flex gap-md-12 align-items-center'>
                      <input type='number' placeholder='0.00' min={0.00} max={balance.toFixed(2)} step={0.01} className='w-100 text-pri-300' value={claimValue} onChange={(e) => onChangeValue(e.target.value)} />
                      
                      <div className='d-flex gap-8'>
                        <button className='bordered text-pri-300 body-p-500 flex-shrink-0' onClick={() => onPercent(25)}> 25% </button>
                        <button className='bordered text-pri-300 body-p-500 flex-shrink-0' onClick={() => onPercent(50)}> 50% </button>
                        <button className='bordered text-pri-300 body-p-500 flex-shrink-0' onClick={() => onPercent(75)}> 75% </button>
                        <button className='bg-pri-100 text-sec-100 body-p-500 flex-shrink-0' onClick={() => onPercent(100)}> MAX </button>
                      </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between body-p-500 subheader-mobile-h6-500 w-100 estimate-reward'>
                  <div>
                    {/* <span className='text-sec-300'>Estimated Rewards</span> <br className='d-md-none' /> <span className='text-sec-400'>7 PROPC</span> */}
                  </div>
                  <div>
                    <span className='text-sec-300'>Available PROPC</span> <br className='d-md-none' /> <span className='text-sec-400'>{balance.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className='button-lg button-primary w-100 margin-top-md-36 margin-top-24 deposit-button'
                  onClick={() => onDeposit()}
                  disabled = {!(Number(claimValue)>0) || showLoader}
                >
                  {showLoader && <Loader />}
                  <span className='margin-left-15'>{showLoader ? 'Depositing..' : 'Deposit'}</span>
                </button>

                <StakingNotes fee={penaltyFee} modalType="staking" />
              </>
            }
            {
               step === 2 &&
               <>
                  <div className='d-flex justify-content-center'>
                    <img src={stakingSuccessfull ? SuccssfullToken : UnSuccssfullToken} alt='' className='token-img' />
                  </div>

                  <div className={`title text-center margin-bottom-md-40 margin-bottom-30 ${stakingSuccessfull ? 'text-pri-100' : 'text-err-100' }`}>
                    {stakingSuccessfull ? 'Deposit Successful!' : 'Deposit Unsuccessful!'}
                  </div>

                  <div className='d-flex align-items-center justify-content-between staking-details padding-bottom-12'>
                    <div className='purple-text label'>
                      Amount
                    </div>
                    <div className='d-flex align-items-center subheader-h6-400'>
                      <div className='text-pri-300 margin-right-6'>
                        {claimValue}
                      </div>
                      <div className='purple-text label'>
                        PROPC
                      </div>
                    </div>
                  </div>

                  <div className='d-flex align-items-center justify-content-between staking-details padding-top-12 padding-bottom-12'>
                    <div className='purple-text label'>
                      APY
                    </div>
                    <div className='d-flex align-items-center subheader-h6-400'>
                      <div className='text-pri-300 label'>
                        {apy}%
                      </div>
                    </div>
                  </div>

                  <div className='d-flex align-items-center justify-content-between staking-details padding-top-12'>
                    <div className='purple-text label'>
                      Transaction ID
                    </div>
                    <div className='d-flex align-items-center subheader-h6-400 gap-7'>
                      <div className='text-pri-300 label'>
                        {txhash}
                      </div>
                      <div className='d-flex purple-text gap-7'>
                        <i className='pc-icon pc-icon-copy' onClick={copyTransactionID}></i>
                        <i className='pc-icon pc-icon-external-link' onClick={() => openLink(txlink)}></i>
                      </div>
                    </div>
                  </div>
               </>

            }

         </div>
      </div>
   )
}
export default StakingModal;