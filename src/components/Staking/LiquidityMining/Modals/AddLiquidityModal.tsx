import { FC, useEffect, useState } from "react";
import SuccessfullToken from "static/assets/Portfolio/claimed-token.png";
import UnSuccessfullToken from "static/assets/Portfolio/unclaimed-token.png";

interface ModalProps {
  show: boolean;
  setModal: (show: boolean) => void;
}

const AddLiquidityModal: FC<ModalProps> = ({
  show,
  setModal
}) => {

  const [is_staking_successfull, set_is_staking_successfull] = useState(true);

  const closeModal = () => {
    setModal(false);
  }

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show])

  return (
    <div className={`modal-wrapper ${show ? "show-modal" : ""}`}>
      <div className="popup-container d-flex align-items-end align-items-md-center justify-content-center">
        <div className="deposit-status-card site-box">
          <div className="d-flex justify-content-center margin-bottom-24">
            <img src={is_staking_successfull ? SuccessfullToken : UnSuccessfullToken} alt='' />
          </div>

          <div className={`title text-center margin-bottom-md-40 margin-bottom-24 ${is_staking_successfull ? 'text-pri-100' : 'text-err-100'}`}>
            {is_staking_successfull ? 'Liquidity Added!' : 'We faced an issue adding your liquidity'}
          </div>

          <div className="margin-bottom-24">
            <div className="staking-details-row d-flex justify-content-between align-items-center">
              <div className="purple-text body-p-400">
                LP Added
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
                Estimated reward
              </div>
              <div className="d-flex">
                <div className="body-p-500 text-pri-300">
                  0.0123
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
            is_staking_successfull ?
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
      </div>
    </div>
  )
}

export default AddLiquidityModal;