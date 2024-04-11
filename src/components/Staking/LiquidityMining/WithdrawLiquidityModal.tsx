import { FC, useEffect, useState } from "react";
import SuccessfullToken from "static/assets/Portfolio/claimed-token.png";
import UnSuccessfullToken from "static/assets/Portfolio/unclaimed-token.png";

interface ModalProps {
  show: boolean;
  setModal: (show: boolean) => void;
}

const WithdrawLiquidityModal: FC<ModalProps> = ({
  show,
  setModal
}) => {

  const [is_withdrawal_successfull, set_is_withdrawal_successfull] = useState(true);
  const [step, setStep] = useState(1);
  const [withdraw_amount, set_withdraw_amount] = useState("0.00");
  const [is_processing, set_is_processing] = useState(false);

  const closeModal = () => {
    setModal(false);
  }

  useEffect(() => {
    if (show) {
      setStep(1);
    }
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show])

  const handleClickWithdraw = () => {
    set_is_processing(true);
    setTimeout(() => {
      set_is_processing(false);
      setStep(2)
    }, 3000)
  }

  return (
    <div className={`modal-wrapper ${show ? "show-modal" : ""}`}>
      <div className="popup-container d-flex align-items-end align-items-md-center justify-content-center">

        {
          step === 1 &&
          <div className="withdraw-card site-box d-flex flex-column gap-24">
            
            <div className="d-flex align-items-center justify-content-between title text-pri-400 margin-bottom-24">
              Withdraw liquidity

              <i
                className="pc-icon pc-icon-cross pc-icon-size-32 cursor-pointer"
                onClick={closeModal}
              ></i>
            </div>
            <div className="liquidity-mining-input-container d-flex align-items-md-center justify-content-md-between flex-column flex-md-row site-box br-9 gap-12">
              <input
                type="text"
                className="w-100"
                value={withdraw_amount}
                onChange={(e) => set_withdraw_amount(e.target.value)}
              />

              <div className="d-flex gap-8">
                <div className="percentage-label d-flex align-items-center justify-content-center text-pri-300">
                  25%
                </div>
                <div className="percentage-label d-flex align-items-center justify-content-center text-pri-300">
                  50%
                </div>
                <div className="percentage-label d-flex align-items-center justify-content-center text-pri-300">
                  75%
                </div>
                <div className="percentage-label d-flex align-items-center justify-content-center text-pri-300">
                  Max
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <div className="body-p-400 text-sec-300"> Available LP </div>
              <div className="body-p-500 text-sec-400 margin-left-6"> 2.12 </div>
            </div>

            <button
              className="button-primary"
              style={{ height : "56px" }}
              onClick={handleClickWithdraw}
              disabled = {is_processing}
            >
              {is_processing ? "Processing . . ." : "Withdraw Liquidity"}
            </button>

            <div className="mining-details-container site-box br-7 padding-10">
              <ul className="mb-0 padding-left-20">
                <li> You can stake and withdraw assets at any time, but withdrawing before the end of 3 years will incur a penalty of 30% of staking amount. </li>
                <li> You can stake and withdraw assets at any time, but withdrawing before the end of 3 years will incur a penalty of 30% of staking amount. </li>
              </ul>
            </div>
          </div>
        }
        {
          step === 2 &&
          <div className="deposit-status-card site-box">
            <div className="d-flex justify-content-center margin-bottom-24">
              <img src={is_withdrawal_successfull ? SuccessfullToken : UnSuccessfullToken} alt='' />
            </div>

            <div className={`title text-center margin-bottom-md-40 margin-bottom-24 ${is_withdrawal_successfull ? 'text-pri-100' : 'text-err-100'}`}>
              {is_withdrawal_successfull ? 'Withdrawal Successful!' : 'Withdrawal Unsuccessful!'}
            </div>

            <div className="margin-bottom-24">
              <div className="staking-details-row d-flex justify-content-between align-items-center">
                <div className="purple-text body-p-400">
                  Amount
                </div>
                <div className="d-flex">
                  <div className="body-p-500 text-pri-300">
                    2.02
                  </div>
                  <div className="subheader-h6-400 purple-text margin-left-4">
                    LP
                  </div>
                </div>
              </div>

              <div className="staking-details-row d-flex justify-content-between align-items-center">
                <div className="purple-text body-p-400">
                  Transaction ID
                </div>
                <div className="d-flex align-items-center">
                  <div className="body-p-500 text-pri-300">
                    0x934...3e4f4
                  </div>
                  <div className="purple-text margin-left-15">
                    <i className="pc-icon pc-icon-copy pc-icon-size-20 cursor-pointer"></i>
                  </div>
                  <div className="purple-text margin-left-8">
                    <i className="pc-icon pc-icon-external-link pc-icon-size-20 cursor-pointer"></i>
                  </div>
                </div>
              </div>
            </div>

            {
              is_withdrawal_successfull ?
                <button
                  className="button-primary w-100"
                  onClick={closeModal}
                >
                  Okay
                </button> :
                <div className="button-row gap-16">
                  <button
                    className="button-primary"
                  >
                    Try Again
                  </button>
                  <button
                    className="button-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default WithdrawLiquidityModal;