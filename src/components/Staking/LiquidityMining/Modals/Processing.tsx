import { FC, useEffect } from "react";

interface ModalProps {
  setStep : (step : string) => void;
}

const Processing: FC<ModalProps> = ({ setStep }) => {

  useEffect(() => {
    setTimeout(() => {
      setStep("SUPPLY CONFIRMATION")
    }, 3000)
  }, [])
  return(
    <div className="processing-card site-box d-flex align-items-center justify-content-center">
      <div className="loader"></div>
    </div>
  )
}

export default Processing;