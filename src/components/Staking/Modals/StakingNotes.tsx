interface StakingNotesProps {
  fee: number;
  modalType: String
}
const StakingNotes : React.FC<StakingNotesProps> = ({fee, modalType}) => {
  return(
    <>
      {
        modalType === 'staking' &&
        <>
          <div className="stacking-notes-container margin-top-30 padding-x-20 padding-y-15">
            <div className="text-pri-100 d-flex align-items-center subheader-h6-700">
              <i className="pc-icon pc-icon-shield-warning margin-right-6"></i>Important
            </div>

            <div className="margin-top-8">
              During the process, you will be prompted TWICE by your Wallet provider (eg. MetaMask) to complete your Staking successfully. Ensure you <b>CONFIRM BOTH</b> the transactions in order to complete the process successfully.
            </div>
          </div>
          <div className="stacking-notes-container margin-top-12">
            <div className='title'>Please note:</div>
            <ul>
              <li>
                You can stake and withdraw assets at any time, but withdrawing before the end of lockup period will incur a penalty between 2 to 10%.
              </li>
              <li>
                If you initialize another staking action before the 1st lockup period ends, the lockup period will be recalculated and withdrawn amount will only be withdrawable after the final lockup period ends.
              </li>
              <li>
                You are entitled to rewards during the lockup period.
              </li>
            </ul>
          </div>
        </>
      }
      {
        modalType === 'unstaking' &&
        <>
          <div className="stacking-notes-container margin-top-30">
            <div className='title'>Unstaking:</div>
            <ul>
              <li>
                You can stake and withdraw assets at any time, but withdrawing before the end of lockup period will incur a penalty between 2 to 10%.
              </li>
              <li>
                If you initialize a withdrawal action before the 1st lockup period ends, the lockup period will be recalculated and withdrawn amount will only be withdrawable after the final lockup period in addition to the time you withdrew.
              </li>
              <li>
                You are entitled to rewards during the lockup period.
              </li>
              <li>
                It's always good to postpone withdrawal and continue staking to save on gas fees and continue to earn more rewards
              </li>
            </ul>
          </div>
        </>
      }
    </>
  )
}

export default StakingNotes;
