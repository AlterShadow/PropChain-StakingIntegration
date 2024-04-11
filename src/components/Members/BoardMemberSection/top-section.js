import MotionDiv from "components/Common/MotionDiv";
import { ReactComponent as Settings } from "static/assets/Common/settings-icon.svg";

const BoardMemberSection = () => {
  return(
    <div className="margin-top-30 board-members-section">
      <MotionDiv className="d-flex align-items-center justify-content-between margin-bottom-24">
        <div className="d-flex align-items-center body-text-500">
          <div className="text-pri-400"> Hello !</div> &nbsp;
          <div className="text-pri-100"> Board Member </div>
        </div>

        <div className="d-flex align-items-center text-sec-400 subheader-h6-500">
          <Settings className="margin-right-6" />
          Settings
        </div>
      </MotionDiv>

      <MotionDiv className="d-flex justify-content-between member-details-container">
        <div className="d-flex align-items-center">
          <div>
            <div className="d-flex align-items-center margin-bottom-6">
              <div className="subheader-h3-700 text-pri-400">
                Goldenwolf
              </div>
              <div className="member-status d-flex align-items-center margin-left-12 padding-x-12">
                Connected
              </div>
            </div>
            <div className="member-since">
              Member since 13 Jun 2023
            </div>
          </div>
        </div>

        
      </MotionDiv>
    </div>
  )
}

export default BoardMemberSection;