import MotionDiv from "components/Common/MotionDiv";

const BecomeAMember = () => {

   return(
      <MotionDiv
         transition={{ delay : 0.2, duration : 0.7 }}
         className='become-a-member-wrapper d-lg-flex align-items-center justify-content-between'
      >
         <div className='d-flex align-items-center'>
            <div className='icon-container'>
               <i className='pc-icon pc-icon-rooms pc-icon-size-31 text-pri-100' />
            </div>
            
            <div className='title'>
               Stake as a <span>Digital Board member</span>
            </div>
         </div>

         <button className='become-a-member-button'>
            Become a Member
         </button>
      </MotionDiv>
   )
}
export default BecomeAMember;