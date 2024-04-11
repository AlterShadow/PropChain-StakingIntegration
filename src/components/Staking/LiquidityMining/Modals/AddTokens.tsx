import { FC, useState } from "react";
import { ReactComponent as PropcIcon } from "static/assets/Staking/propc-icon.svg";
import { ReactComponent as USDTIcon } from "static/assets/Staking/usdt-icon.svg";
import { ReactComponent as LampIcon } from "static/assets/Staking/lamp-icon.svg";

interface ModalProps {
  closeModal: () => void;
  setStep : (step : string) => void;
}

const AddTokens: FC<ModalProps> = ({ closeModal, setStep }) => {

  const [propc_balance, set_propc_balance] = useState("0.00");
  const [usdt_balance, set_usdt_balance] = useState("0.00");

  return(
    <div className="add-liquidity-card site-box">
      <div className="d-flex align-items-center justify-content-between title text-pri-400 margin-bottom-24">
        Add liquidity to get LP token

        <i
          className="pc-icon pc-icon-cross pc-icon-size-32 cursor-pointer"
          onClick={closeModal}
        ></i>
      </div>

      <div className="add-liquidity-row">
        <div className="d-flex flex-column gap-24">
          <div className="d-flex flex-column gap-16">
            <div className="liquidity-mining-input-container site-box br-9 gap-12">
              <div className="d-flex justify-content-between">
                <div className="body-sm-400 text-pri-300">
                  Input
                </div>
                <div className="body-sm-400 text-pri-300 text-end">
                  Balance: 6.69753
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center gap-10 margin-y-10">
                <input
                  type="text"
                  className="w-100"
                  value={propc_balance}
                  onChange={(e) => set_propc_balance(e.target.value)}
                />

                <div className="d-flex align-items-center currency-label text-pri-400">
                  <PropcIcon className="margin-right-4" />
                  PROPC
                </div>
              </div>
              
              <div className="d-flex gap-8 justify-content-end">
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

            <div className="text-center subheader-h1-600 text-pri-400">
              +
            </div>

            <div className="liquidity-mining-input-container site-box br-9 gap-12">
              <div className="d-flex justify-content-between">
                <div className="body-sm-400 text-pri-300">
                  Input
                </div>
                <div className="body-sm-400 text-pri-300 text-end">
                  Balance: 6.69753
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center gap-10 margin-y-10">
                <input
                  type="text"
                  className="w-100"
                  value={usdt_balance}
                  onChange={(e) => set_usdt_balance(e.target.value)}
                />

                <div className="d-flex align-items-center currency-label text-pri-400">
                  <USDTIcon className="margin-right-4" />
                  USDT
                </div>
              </div>
              
              <div className="d-flex gap-8 justify-content-end">
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
          </div>

          <button className="button-secondary" onClick={() => setStep("PROCESSING")}>
            Review Supply
          </button>

          <div className="mining-statistics-row br-11 padding-y-8">
            <div className="text-center mining-statistics-box padding-y-8">
              <div className="title body-sm-400">
                Staked LP Tokens
              </div>
              <div className="value margin-top-8 text-pri-400">
                0
              </div>
            </div>

            <div className="text-center mining-statistics-box padding-y-8">
              <div className="title body-sm-400">
                APR %
              </div>
              <div className="value margin-top-8 text-pri-400">
                0
              </div>
            </div>

            <div className="text-center mining-statistics-box padding-y-8">
              <div className="title body-sm-400">
                Realized Tokens
              </div>
              <div className="value margin-top-8 text-pri-400">
                0
              </div>
            </div>
          </div>
          
        </div>

        <div className="d-flex flex-column gap-16">
          <div className="d-flex padding-y-10 padding-x-12 gap-12 details-container">
            <div className="lamp-icon-container flex-shrink-0 d-flex align-items-center justify-content-center br-6">
              <LampIcon />
            </div>

            You can stake and withdraw assets at any time, but withdrawing before the end of 3 years will incur a penalty of 30% of staking amount.
          </div>

          <div className="d-flex padding-y-10 padding-x-12 gap-12 details-container">
            <div className="lamp-icon-container flex-shrink-0 d-flex align-items-center justify-content-center br-6">
              <LampIcon />
            </div>

            You can stake and withdraw assets at any time, but withdrawing before the end of 3 years will incur a penalty of 30% of staking amount.
          </div>

          <div className="d-flex padding-y-10 padding-x-12 gap-12 details-container">
            <div className="lamp-icon-container flex-shrink-0 d-flex align-items-center justify-content-center br-6">
              <LampIcon />
            </div>

            You can stake and withdraw assets at any time, but withdrawing before the end of 3 years will incur a penalty of 30% of staking amount.
          </div>

          <div className="d-flex padding-y-10 padding-x-12 gap-12 details-container">
            <div className="lamp-icon-container flex-shrink-0 d-flex align-items-center justify-content-center br-6">
              <LampIcon />
            </div>

            You can stake and withdraw assets at any time, but withdrawing before the end of 3 years will incur a penalty of 30% of staking amount.
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTokens;