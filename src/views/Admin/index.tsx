import { Link } from "react-router-dom";
import Header from "components/Common/Header";
import PropcCoin from "static/assets/Home/propc-token.png";
import PropBgLogo from "static/assets/Home/card-bg-prop-icon.png";
import BoardMember from "static/assets/Home/board-member.svg";
import StakingReward from "static/assets/Home/staking-returns-distributed.svg"
import Marquee from "react-fast-marquee";
import MotionDiv from "components/Common/MotionDiv";
import { useNewsFeed } from "hooks/useNewsFeed";
import URLs from "config/constants/URLs";
import DeleteVesting from "../../components/Admin/DeleteVesting";
import AddVesting from "../../components/Admin/AddVesting";
const Admin = ({showDBMModal}: { showDBMModal: ()=> void}) => {
   const { newsFeed } = useNewsFeed();

   const openLink = (link: string) => {
      window.open(link, '_blank');
   }


   return (
       <>
           <div className="main-container home-page d-flex flex-column">
               <Header />

               <div className="site-container flex-grow-1 d-flex flex-column">
                   <div className="d-flex flex-column flex-md-row news-container">
                       <div className="d-flex align-items-center title flex-shrink-0">
                           <span className="circle"></span> Latest News
                       </div>
                       <Marquee className="flex-grow-1 news-text">
                           <div className="d-flex align-items-center">
                               {newsFeed?.length &&
                                   newsFeed.map(({ message }, i) => (
                                       <>
                                           {message}
                                           <span className="circle"></span>
                                       </>
                                   ))}
                           </div>
                       </Marquee>
                   </div>
                   <div className="d-flex flex-wrap home-row flex-grow-1">
                       <DeleteVesting />
                       <AddVesting/>

                   </div>
               
               </div>
           </div>
       </>
   );
}
export default Admin;
