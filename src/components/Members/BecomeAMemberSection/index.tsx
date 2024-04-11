import { FC, useState } from 'react';
import { ReactComponent as RightCaret } from "static/assets/Member/caret-right.svg";
import Tokens from "static/assets/Member/tokens.png";
import BecomeMemberModal from '../Modals/BecomeMember';


const SpecialAccess = [
  {
    icon: Tokens,
    label: "Exclusive Information & Early Access"
  },
  {
    icon: Tokens,
    label: "Vote and Earn"
  },
  {
    icon: Tokens,
    label: "News and Events"
  },
  {
    icon: Tokens,
    label: "Affiliate Program"
  },
  {
    icon: Tokens,
    label: "Daily Tasks & Quests"
  },
  {
    icon: Tokens,
    label: "Quarterly Board Meetings with Team"
  },
]

type BecomeAMemberSectionProps = {
  onSignupComplete: () => void;
}

const BecomeAMemberSection:FC<BecomeAMemberSectionProps> = ({onSignupComplete}) => {

  const [showModal, setShowModal] = useState<boolean>(false);

  const onSignupSuccess = () => {
    setShowModal(false);
    onSignupComplete();
  }
  return(
    <>
      <div className='become-member-section h-100 d-flex justify-content-between align-items-center flex-column w-100' style={{ minHeight: 0, flex: 1 }}>
        <div>
          <div className='intro-title'>
            Introducing the
          </div>

          <div className='title-container margin-top-6'>
            <h1 className='title'>
              Digital Board <br /> Member Program
            </h1>

            <p className='desc margin-top-14 margin-bottom-30'>
              Get special access to latest news and events, special member class staking and other special access areas. 
            </p>

            <button 
              className='button-primary button-lg'
              onClick={() => setShowModal(true)}
            >
              Become a Member
              <RightCaret className='margin-left-5' />
            </button>
          </div>
        </div>

        <div className='w-100'>
          <div className='special-access-title'> Get Special Access to.. </div>

          <div className='special-access-wrapper'>
            {
              SpecialAccess.map((item, ind) => (
                <div className='item-box' key={ind}>
                  <img src={item.icon} alt={item.label} />
                  <div className='title'> {item.label} </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <BecomeMemberModal
        show = {showModal}
        setModal = {setShowModal}
        onSuccess={onSignupSuccess}
      />
    </>
  )
}
export default BecomeAMemberSection;