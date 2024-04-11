import { FC, useEffect, useState } from "react";
import AddTokens from "./AddTokens";
import Processing from "./Processing";
import SupplyConfirmation from "./SupplyConfirmation";
import LPStakingProcessing from "./LPStakingProcessing";
import DepositStatus from "./DepositStatus";

interface ModalProps {
  show: boolean;
  setModal: (show: boolean) => void;
}

const STEPS = {
  "ADD_LIQUIDITY" : "ADD LIQUIDITY",
  "PROCESSING" : "PROCESSING",
  "SUPPLY_CONFIRMATION" : "SUPPLY CONFIRMATION",
  "LP_STAKING_PROCESSING" : "LP STAKING PROCESSING",
  "DEPOSIT_STATUS" : "DEPOSIT STATUS"
}
const GetLpTokensModal: FC<ModalProps> = ({
  show,
  setModal
}) => {

  const [step, setStep] = useState(STEPS.ADD_LIQUIDITY);
  const [is_staking_successfull, set_is_staking_successfull] = useState(true);

  useEffect(() => {
    if (show) {
      setStep(STEPS.ADD_LIQUIDITY);
    }
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show])

  const handleCloseModal = () => {
    setModal(false);
  }

  return (
    <div className={`modal-wrapper ${show ? "show-modal" : ""}`}>
      <div className="popup-container d-flex align-items-end align-items-md-center justify-content-center">
        {
          step === STEPS.ADD_LIQUIDITY &&
          <AddTokens
            closeModal = {handleCloseModal}
            setStep = {setStep}
          />
        }
        {
          step === STEPS.PROCESSING &&
          <Processing
            setStep = {setStep}
          />
        }
        {
          step === STEPS.SUPPLY_CONFIRMATION &&
          <SupplyConfirmation
            setStep = {setStep}
          />
        }
        {
          step === STEPS.LP_STAKING_PROCESSING &&
          <LPStakingProcessing
            setStep = {setStep}
          />
        }
        {
          step === STEPS.DEPOSIT_STATUS &&
          <DepositStatus
            closeModal = {handleCloseModal}
            is_staking_successfull = {is_staking_successfull}
          />
        }
      </div>
    </div>
  )
}

export default GetLpTokensModal;