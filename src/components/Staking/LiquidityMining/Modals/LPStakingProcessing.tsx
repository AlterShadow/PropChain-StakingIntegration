import { FC, useEffect } from "react";

interface ModalProps {
  setStep : (step : string) => void;
}

const LPStakingProcessing: FC<ModalProps> = ({ setStep }) => {

  useEffect(() => {
    setTimeout(() => {
      setStep("DEPOSIT STATUS")
    }, 3000)
  }, [])
  return(
    <div className="processing-card site-box d-flex align-items-center justify-content-center">

      <div>
        <div className="loader mx-auto"></div>

        <div className="margin-top-20 text-pri-300 subheader-h5-400 text-center">
          Taking you back to LP staking, this might take a few minutes..
        </div>
      </div>
    </div>
  )
}

export default LPStakingProcessing;