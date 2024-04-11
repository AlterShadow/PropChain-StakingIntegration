import MotionDiv from "components/Common/MotionDiv";
import AddLiquidityModal from "components/Staking/LiquidityMining/Modals/AddLiquidityModal";
import GetLpTokensModal from "components/Staking/LiquidityMining/Modals/GetLpTokensModal";
import WithdrawLiquidityModal from "components/Staking/LiquidityMining/WithdrawLiquidityModal";
import { useState } from "react";
import {ReactComponent as PieChart} from "static/assets/Staking/pie-chart.svg";
import {ReactComponent as PlusCircle} from "static/assets/Staking/plus-circle.svg";

const LIQUIDITY_MINING_DETAILS = [
  "You can stake and withdraw assets at any time, but withdrawing before the end of 3 years will incur a penalty of 30% of staking amount.",
  "You can stake and withdraw assets at any time, but withdrawing before the end of 3 years will incur a penalty of 30% of staking amount.",
  "You can stake and withdraw assets at any time, but withdrawing before the end of 3 years will incur a penalty of 30% of staking amount."
]
const LiquidityMining = () => {

  const [show_get_lp_modal, set_show_get_lp_modal] = useState(false);
  const [mining_amount, set_mining_amount] = useState("0");
  const [show_add_liquidity_modal, set_show_add_liquidity_modal] = useState(false);
  const [show_withdraw_liquidity_modal, set_show_withdraw_liquidity_modal] = useState(false);

  return(
    <div className="site-container liquidity-mining-container">

      <GetLpTokensModal
        show = {show_get_lp_modal}
        setModal={set_show_get_lp_modal}
      />

      <AddLiquidityModal
        show = {show_add_liquidity_modal}
        setModal={set_show_add_liquidity_modal}
      />

      <WithdrawLiquidityModal
        show = {show_withdraw_liquidity_modal}
        setModal={set_show_withdraw_liquidity_modal}
      />

      <div>
        <MotionDiv
          className='details-container site-box'
        >
          <div className="detail-box site-box d-flex align-items-center">
            <div className="icon-container d-flex align-items-center justify-content-center flex-shrink-0 margin-right-24">
              <i className="pc-icon pc-icon-coins text-pri-100 pc-icon-size-27"></i>
            </div>
            <div>
              <div className="title body-p-400 margin-bottom-8">
                Total Liquidity
              </div>
              <div className="value text-pri-300 body-text-400">
                $700,500.01
              </div>
            </div>
          </div>

          <div className="detail-box site-box d-flex align-items-center">
            <div className="icon-container d-flex align-items-center justify-content-center flex-shrink-0 margin-right-24">
              <i className="pc-icon pc-icon-growth text-pri-100 pc-icon-size-27"></i>
            </div>
            <div>
              <div className="title body-p-400 margin-bottom-8">
                Current APR
              </div>
              <div className="value text-pri-300 body-text-400">
                47%
              </div>
            </div>
          </div>
        </MotionDiv>

        <MotionDiv
          className='site-box margin-top-20'
          transition={{ delay : 0.2, duration : 0.7 }}
        >
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-center liquidity-staking-icon-container br-9 bg-sec-100 flex-shrink-0">
              <PieChart />
            </div>
            <div className="subheader-h4-400 text-pri-300">
              What is Liquidity Mining?
            </div>
          </div>

          {
            LIQUIDITY_MINING_DETAILS.map((item, ind) => 
              <div
                className="margin-top-24 text-sec-400 d-flex liquidity-mining-description"
                key={`liquidity-mining-description-${ind + 1}`}
              >
                <i className="pc-icon pc-icon-check text-pri-100 pc-icon-size-24 margin-right-12 flex-shrink-0"></i>
                {item}
              </div>
            )
          }
        </MotionDiv>
      </div>

      <div>
        <MotionDiv
          className='site-box d-flex flex-column gap-24'
          transition={{ delay : 0.4, duration : 0.7 }}
        >
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-center liquidity-staking-icon-container br-9 bg-sec-100 flex-shrink-0 margin-right-20">
              <i className="pc-icon pc-icon-coins text-pri-100 pc-icon-size-27"></i>
            </div>
            <div className="subheader-h4-500 text-pri-300">
              Liquidity Mining
            </div>
          </div>

          <div className="liquidity-mining-input-container d-flex align-items-md-center justify-content-md-between flex-column flex-md-row site-box br-9 gap-12">
            <input
              type="text"
              className="w-100"
              value={mining_amount}
              onChange={(e) => set_mining_amount(e.target.value)}
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

          <div className="d-flex flex-column flex-md-row gap-8 align-items-md-center justify-content-between">
            <div className="body-p-400">
              <span className="text-sec-300"> Estimated Rewards </span>
              <span className="text-sec-400"> - </span>
            </div>

            <div className="body-p-400 d-flex align-items-center">
              <div className="margin-right-8">
                <span className="text-sec-300"> Available LP tokens </span>
                <span className="text-sec-400"> 0 </span>
              </div>
              <PlusCircle className="cursor-pointer" />
            </div>
          </div>

          <div className="buttons-row gap-16">
            <button
              className="button-primary"
              onClick={() => set_show_add_liquidity_modal(true)}
              // disabled // Toggle disabled condition
            >
              Add Liquidity
            </button>
            {/* <button className="button-primary"> Connect Wallet </button> */}
            <button className="button-secondary" onClick={() => set_show_get_lp_modal(true)}> Get LP Tokens </button>
          </div>

          <div className="mining-details-container site-box br-7 padding-10">
            <ul className="mb-0 padding-left-20">
              <li> You can stake and withdraw assets at any time, but withdrawing before the end of 3 years will incur a penalty of 30% of staking amount. </li>
              <li> You can stake and withdraw assets at any time, but withdrawing before the end of 3 years will incur a penalty of 30% of staking amount. </li>
            </ul>
          </div>
        </MotionDiv>

        <MotionDiv
          className="site-box margin-top-20"
          transition={{ delay : 0.6, duration : 0.7 }}
        >
          <div className="mining-statistics-row">
            <div className="text-center mining-statistics-box padding-y-8 padding-x-4">
              <div className="title">
                Staked LP Tokens
              </div>
              <div className="value margin-top-8 text-pri-400">
                0
              </div>
            </div>

            <div className="text-center mining-statistics-box padding-y-8 padding-x-4">
              <div className="title">
                APR %
              </div>
              <div className="value margin-top-8 text-pri-400">
                0
              </div>
            </div>

            <div className="text-center mining-statistics-box padding-y-8 padding-x-4">
              <div className="title">
                Realized Tokens
              </div>
              <div className="value margin-top-8 text-pri-400">
                0
              </div>
            </div>
          </div>

          {/* Show / Hide below button conditionally */}
          <button
            className="button-secondary w-100 margin-top-24"
            style={{ height : "44px" }}
            onClick={() => set_show_withdraw_liquidity_modal(true)}
          >
            Withdraw liquidity
          </button>
        </MotionDiv>

      </div>
    </div>
  )
}

export default LiquidityMining;