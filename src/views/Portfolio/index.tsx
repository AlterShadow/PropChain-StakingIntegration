import { useState } from "react";
import Header from "components/Common/Header";
import MyPortfolio from "components/Portfolio/MyPortfolio";
import PropcPriceCard from "components/Portfolio/PorpcPriceCard";
import ClaimTokenModal from "components/Portfolio/Modals/ClaimTokenModal";
import ClaimsSummaryModal from "components/Portfolio/Modals/ClaimsSummaryModal";
import MotionDiv from "components/Common/MotionDiv";
import ClaimUnderMaintenance from "components/Portfolio/Modals/ClaimUnderMaintenance";
import StakeCardModal from "components/Portfolio/Modals/StakeCardModal";

const Portfolio = () => {
   
   const [showClaimStatusModal, setShowClaimStatusModal] = useState<boolean>(false);
   const [showClaimSummaryModal, setShowClaimSummaryModal] = useState<boolean>(false);
   const [showClaimUnderMaintenance, setShowClaimUnderMaintenance] = useState<boolean>(false);
   const [showStakeCardModal, setShowStakeCardModal] = useState<boolean>(false);

   return(
      <>
         <div className='main-container portfolio-page position-relative'>
            <Header />
            <ClaimTokenModal 
               show={showClaimStatusModal}
               setModal={setShowClaimStatusModal}
            />

            <ClaimsSummaryModal
               show={showClaimSummaryModal}
               setModal={setShowClaimSummaryModal}
            />

            <ClaimUnderMaintenance
               show={showClaimUnderMaintenance}
               setModal={setShowClaimUnderMaintenance}
            />

            <StakeCardModal
               show={showStakeCardModal}
               setModal={setShowStakeCardModal}
            />

            <div className="site-container">
               <div className='row'>
                  <MotionDiv
                     className='col-xl-7 col-12'
                  >
                     <PropcPriceCard />
                  </MotionDiv>
                  <MotionDiv
                     transition={{ delay : 0.2, duration : 0.7 }}
                     className='col-xl-5 col-12'
                  >
                     <MyPortfolio
                        setShowClaimStatusModal={setShowClaimStatusModal}
                        setShowClaimSummaryModal={setShowClaimSummaryModal}
                        setShowClaimUnderMaintenance={setShowClaimUnderMaintenance}
                     />
                  </MotionDiv>
               </div>
            </div>
         </div>
      </>
   )
}
export default Portfolio;