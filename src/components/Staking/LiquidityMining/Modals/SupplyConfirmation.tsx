import { FC } from "react";
import { ReactComponent as PropcIcon } from "static/assets/Staking/propc-icon.svg";
import { ReactComponent as USDTIcon } from "static/assets/Staking/usdt-icon.svg";

interface ModalProps {
  setStep : (step : string) => void;
}

const SupplyConfirmation: FC<ModalProps> = ({ setStep }) => {
  return(
    <div className="supply-confirmation-box site-box">
      <div className="subheader-h4-500 text-center text-pri-400 title">
        You will receive
      </div>

      <div className="d-flex align-items-center margin-bottom-8">
        <div className="text-pri-300 subheader-h3-500 margin-right-8">
          2.02
        </div>
        <PropcIcon />
        <USDTIcon style={{ marginLeft : "-4px" }} />
      </div>

      <div className="body-p-400 subtitle margin-bottom-16">
        PROPC/USDT Pool Tokens
      </div>
      <div className="body-sm-400 subtitle margin-bottom-16">
        Output is estimated. If the price changes by more than 4% your transaction will revert.
      </div>

      <div className="details-container site-box br-0">
        <div className="details-row d-flex justify-content-between">
          <div className="subheader-h6-400 purple-text">
            PROPC Deposited
          </div>

          <div className="d-flex">
            <div className="body-p-400 text-pri-300">
              6.69753
            </div>
            <div className="subheader-h6-400 purple-text margin-left-4">
              PROPC
            </div>
          </div>
        </div>

        <div className="details-row d-flex justify-content-between">
          <div className="subheader-h6-400 purple-text">
            USDT Deposited
          </div>

          <div className="d-flex">
            <div className="body-p-400 text-pri-300">
              26.79012
            </div>
            <div className="subheader-h6-400 purple-text margin-left-4">
              USDT
            </div>
          </div>
        </div>

        <div className="details-row d-flex justify-content-between">
          <div className="subheader-h6-400 purple-text">
            Rates
          </div>

          <div>
            <div className="d-flex justify-content-end">
              <div className="body-p-400 text-pri-300">
                1
              </div>
              <div className="subheader-h6-400 purple-text margin-left-4">
                PROPC
              </div>
              <div className="subheader-h6-400 text-pri-300 margin-left-4">
                = 4.3
              </div>
              <div className="subheader-h6-400 purple-text margin-left-4">
                USDT
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <div className="body-p-400 text-pri-300">
                1
              </div>
              <div className="subheader-h6-400 purple-text margin-left-4">
                USDT
              </div>
              <div className="subheader-h6-400 text-pri-300 margin-left-4">
                = 0.25
              </div>
              <div className="subheader-h6-400 purple-text margin-left-4">
                PROPC
              </div>
            </div>
          </div>
        </div>

        <div className="details-row d-flex justify-content-between">
          <div className="subheader-h6-400 purple-text">
            Share of pool
          </div>

          <div className="body-p-400 text-pri-300">
            0.005143%
          </div>
        </div>

        <div className="button-row margin-top-20 gap-8">
          <button
            className="button-primary"
            onClick={() => setStep("LP STAKING PROCESSING")}
          >
            Confirm Supply
          </button>
          <button
            className="button-secondary"
            onClick={() => setStep("ADD LIQUIDITY")}
          >
            Update Supply
          </button>
        </div>

      </div>
    </div>
  )
}

export default SupplyConfirmation;