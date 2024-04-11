import { FC, useEffect, useState } from 'react';
import SuccssfullToken from "static/assets/Portfolio/claimed-token.png";
import UnSuccssfullToken from "static/assets/Portfolio/unclaimed-token.png";
// import {ReactComponent as LongTermIcon} from "static/assets/Staking/long-term.svg";
import StakingNotes from './StakingNotes';
import { ethers } from 'ethers';
import { useConnectWallet } from '@web3-onboard/react';
import { getStakingContract } from 'utils/contractHelper';
import Connector from 'containers/Connector';
import { shortenAddress } from 'utils/formatters/string';
import { networkInfos } from 'config/constants/network';
import Loader from 'components/Common/Loader';
import { useRecoilState, useRecoilValue } from 'recoil';
import { stakeOrWithdrawState, walletAddressState } from 'store/wallet';
import useGetStakeData from 'hooks/staking/useGetStakeData';
import { toast } from 'react-toastify';

interface ModalProps {
  stakingSuccessfull: boolean;
  show: boolean;
  propc: number;
  apy: number;
  penaltyFee: number;
  poolIndex: number;
  setModal: (show: boolean) => void;
}

const UntakingModal: FC<ModalProps> = ({ stakingSuccessfull, show, propc, apy, penaltyFee, poolIndex, setModal }) => {

  const [step, setStep] = useState<'select-to-unstake' | 'unstaking' | 'transaction-status'>('select-to-unstake');
  const [claimValue, setClaimValue] = useState("");
  const [penaltyValue, setPenaltyValue] = useState('0');
  const [{ wallet }] = useConnectWallet();
  const { activeChainId } = Connector.useContainer();
  const walletAddress = useRecoilValue(walletAddressState);
  const {data} = useGetStakeData(poolIndex, walletAddress);
  const [matured, setMatured] = useState(false);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [stakeIndex, setStakeIndex] = useState(0);
  const [version, setVersion] = useState('');
  const [lockDate, setLockDate] = useState('');
  const [txhash, setTxHash] = useState("");
  const [txlink, setTxLink] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [balanceChanged, onWalletBalanceChange] = useRecoilState(stakeOrWithdrawState);
  const [transaction_id, set_transaction_id] = useState("")

  const onChange = (unstakingValue: string) => {
    if (Number(unstakingValue) > propc) return;
    setClaimValue(unstakingValue);
    setPenaltyValue((Number(unstakingValue) * Number(penaltyFee) / 100).toString());
  }
  const getTitle = () => {
    if (step === 'select-to-unstake') {
      return (
        <>
          <div className='d-flex align-items-center justify-content-center icon-container bg-sec-100' style={{ height: "48px", width: "48px" }}>
            <i className='pc-icon pc-icon-coins pc-icon-size-24 text-pri-100' />
          </div>
          <div className='modal-title text-pri-400 subheader-h4-500'> Select to unstake </div>
        </>
      )
    }
    if (step === 'unstaking') {
      return(
        <>
          <div className='d-flex align-items-center justify-content-center icon-container bg-sec-100' style={{ height: "48px", width: "48px" }}>
            <i className='pc-icon pc-icon-coins pc-icon-size-24 text-pri-100' />
          </div>
          <div className='modal-title text-pri-400 subheader-h4-500'> Unstaking </div>
        </>
      )
    }

    return <></>
  }

  const openLink = (link: string) => {
    window.open(link, '_blank');
  }

  const onWithdraw = async () => {
    if (wallet) {
      try {
        setShowLoader(true)
        const pvd = new ethers.providers.Web3Provider(wallet.provider, 'any');
        const signer = pvd.getSigner();
        const stakingContract = getStakingContract(activeChainId, signer, version);
        if (version === 'v1') {
          let poolIndexV1 = poolIndex;
          if (poolIndex === 1) {
            poolIndexV1 = 2; 
          } else if (poolIndex === 2 ) {
            poolIndexV1 = 1;
          } else {
            poolIndexV1 = poolIndex;
          }
          const tx = await stakingContract.leavePool(poolIndexV1, ethers.utils.parseUnits(claimValue, "ether"));
          if (tx.hash) {
            const receipt = await tx.wait();
            if (receipt.status) {
              setTxHash(shortenAddress(tx.hash));
              set_transaction_id(tx.hash)
              setTxLink(networkInfos[activeChainId].explorer + "tx/" + tx.hash);
              setStep('transaction-status');
              onWalletBalanceChange(!balanceChanged);
            }
          }
        } else {
          const tx = await stakingContract.unstake(poolIndex, ethers.utils.parseUnits(claimValue, "ether"), stakeIndex);
          if (tx.hash) {
            const receipt = await tx.wait();
            if (receipt.status) {
              setTxHash(shortenAddress(tx.hash));
              set_transaction_id(tx.hash)
              setTxLink(networkInfos[activeChainId].explorer + "tx/" + tx.hash);
              setStep('transaction-status');
              onWalletBalanceChange(!balanceChanged);
            }
          }
        }        
        setShowLoader(false)
      } catch (err) {
        setShowLoader(false);
      }

    }
  }

  const onPercent = (percent: number) => {
    setClaimValue((propc * percent / 100).toFixed(2));
    setPenaltyValue((propc * percent / 100 * Number(penaltyFee) / 100).toString())
  }

  useEffect(() => {
    if (show) {
      setStep('select-to-unstake');
    }
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show])

  const copyTransactionID = () => {
    navigator.clipboard.writeText(transaction_id);
    toast.success("Transaction ID copied !")
  }

  const moveToUnstaking = (ind: number, version: string) => {
    const stakeItem = data[ind];
    setStakedAmount(data[ind].amount);
    let t = new Date(1970, 0, 1);
    t.setSeconds(data[ind].lockTime);
    setLockDate(t.toLocaleString());
    let current = Math.floor(Date.now() / 1000);    
    setMatured(data[ind].lockTime < current);
    setStep('unstaking');
    setVersion(version);
    setStakeIndex(ind);
  }  

  return (
    <div className={`modal-wrapper stacking-modal ${show ? 'show-modal' : ''}`}>
      <div className='modal-card modal-card-wrapper' style={{ width: "630px" }}>
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
          step === 'select-to-unstake' &&
          <>
            {
              data.map((staking_item, ind) => 
                <div
                  className='unstake-list-card padding-25 margin-top-30'
                  key={`staking-item-${ind}`}
                >

                  <div className='d-flex justify-content-between align-items-end margin-bottom-9'>

                    <div>
                      <div className='staking-contract-title body-p-400 margin-bottom-9'>
                        Staking Contract {staking_item.version}
                      </div>

                      <div className='d-flex gap-7 align-items-baseline'>
                        <div className='subheader-h4-400 text-pri-300'>
                          {staking_item.amount}
                        </div>

                        <div className='purple-text body-p-400'>
                          PROPC
                        </div>
                      </div>

                    </div>

                    <button className='button-tertiary button-lg text-pri-300' onClick={() => moveToUnstaking(ind, staking_item.version)}>
                      Unstake
                    </button>

                  </div>

                  <div className='d-flex align-items-center gap-4 staking-contract-title body-p-400'>
                    <i className='pc-icon pc-icon-lock text-pri-100 pc-icon-size-15'></i>
                    {`until ${staking_item.lockTimeStr} - Fee ${staking_item.penaltyFee}%`}
                  </div>
                </div>
              )
            }
          </>
        }

        {
          step === 'unstaking' &&
          <>

            <div
              className='unstaking-stake-item margin-top-40 d-flex align-items-center justify-content-between'
              onClick={() => setStep('select-to-unstake')}
            >
              <div className='staking-contract-title'>
                <div className='body-p-400 margin-bottom-9'>
                  Staking Contract {version}
                </div>

                <div className='d-flex align-items-center gap-4'>
                  <i className='pc-icon pc-icon-lock pc-icon-size-15 text-pri-100'></i>

                  {`until ${lockDate}`}
                </div>
              </div>
              <div className='d-flex gap-7 align-items-baseline'>
                <div className='subheader-h4-400 text-pri-300'>
                  {stakedAmount}
                </div>

                <div className='purple-text body-p-400'>
                  PROPC
                </div>
              </div>

            </div>

            <div className='token-input-container w-100 margin-top-40'>
              <div className='d-md-flex gap-12 align-items-center'>
                <input type='text' placeholder='0.00' className='w-100 text-pri-300' value={claimValue} onChange={(e) => onChange(e.target.value)} />

                <div className='d-flex gap-8'>
                  <button className='bordered text-pri-300 body-p-500 flex-shrink-0' onClick={() => onPercent(25)}> 25% </button>
                  <button className='bordered text-pri-300 body-p-500 flex-shrink-0' onClick={() => onPercent(50)}> 50% </button>
                  <button className='bordered text-pri-300 body-p-500 flex-shrink-0' onClick={() => onPercent(75)}> 75% </button>
                  <button className='bg-pri-100 text-sec-100 body-p-500 flex-shrink-0' onClick={() => onPercent(100)}> MAX </button>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-between body-p-500 subheader-mobile-h6-500 w-100 estimate-reward'>
              {!matured ?
                <div>
                  <span className='text-sec-300'>Estimated Penalty ({penaltyFee}%)</span> <br className='d-md-none' /> <span className='text-err-100'>{penaltyValue} PROPC</span>
                </div>
                : <div></div>
              }

              <div>
                <span className='text-sec-300'>Staked PROPC</span> <br className='d-md-none' /> <span className='text-sec-400'>{propc}</span>
              </div>
            </div>

            <button
              className='button-lg button-primary w-100 margin-top-md-36 margin-top-24 deposit-button'
              onClick={() => onWithdraw()}
              disabled={!(Number(claimValue) > 0) || showLoader}
            >
              {showLoader && <Loader />}
              <span className='margin-left-15'>{showLoader ? 'Withdrawing..' : 'Withdraw'}</span>
            </button>

            <StakingNotes fee={penaltyFee} modalType='unstaking' />
          </>
        }
        {
          step === 'transaction-status' &&
          <>
            <div className='d-flex justify-content-center'>
              <img src={stakingSuccessfull ? SuccssfullToken : UnSuccssfullToken} alt='' className='token-img' />
            </div>

            <div className={`title text-center margin-bottom-md-40 margin-bottom-30 ${stakingSuccessfull ? 'text-pri-100' : 'text-err-100'}`}>
              {stakingSuccessfull ? 'Withdraw Successful!' : 'Withdraw Unsuccessful!'}
            </div>

            <div className='d-flex align-items-center justify-content-between staking-details padding-bottom-12'>
              <div className='purple-text label'>
                Amount
              </div>
              <div className='d-flex align-items-center label'>
                <div className='text-pri-300 margin-right-6'>
                  {Number(claimValue) - Number(penaltyValue)}
                </div>
                <div className='purple-text '>
                  PROPC
                </div>
              </div>
            </div>

            {/* <div className='d-flex align-items-center justify-content-between staking-details padding-top-12 padding-bottom-12'>
                    <div className='purple-text body-p-400'>
                      APY
                    </div>
                    <div className='d-flex align-items-center subheader-h6-400'>
                      <div className='text-pri-300'>
                        {apy}%
                      </div>
                    </div>
                  </div> */}

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
export default UntakingModal;
