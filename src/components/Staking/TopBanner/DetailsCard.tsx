import { useState } from "react";

interface Props {
  title: string,
  amount: string,
  tokens: string
}

const DetailsCard : React.FC<Props> = ({ title, amount, tokens }) => {

  const [isOpen, setIsOpen] = useState(false);

  return(
    <div
      className={`stake-details-card d-md-flex justify-content-between align-items-md-end ${isOpen ? "open" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className='d-flex align-items-center justify-content-between'>
        <div className="d-flex align-items-center">
            <div className='icon-container'>
              <i className='pc-icon pc-icon-lock pc-icon-size-26 text-pri-100' />
            </div>
            <div>
              <div className='body-p-400 label'>{title}</div>
              <div className='text-pri-300 amount d-none d-md-block'> <span>$</span>{amount}</div>
            </div>
        </div>
        <div className="text-sec-400 d-md-none d-flex align-items-center">
            <i className="pc-icon pc-icon-chevron-down pc-icon-size-30"></i>
        </div>
      </div>
      <div className='d-md-flex flex-row flex-md-column d-flex align-items-end justify-content-between justify-content-end'>
        <div className='pools-pill'>All Pools</div>
        <div className='d-md-flex d-block'>
          <div className='text-pri-300 amount d-md-none'> <span>$</span>{amount}</div>
          <div className='total-propc'>
            {tokens} PROPC
          </div>

        </div>
      </div>
    </div>
  )
}

export default DetailsCard;
