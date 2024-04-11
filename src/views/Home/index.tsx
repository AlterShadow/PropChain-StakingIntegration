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
const Home = ({showDBMModal}: { showDBMModal: ()=> void}) => {
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
                       <MotionDiv className="propc-banner d-xl-flex shining-effect">
                           <div className="title-container">
                               <div className="title">
                                   Welcome to the <br />{' '}
                                   <div> World of PROPC </div>
                               </div>
                               <p className="desc">
                                A native utility token to optimize the experience for its holders, contributing to Propchain's expansive Blockchain Ecosystem for Real-World Asset & PropTech Solutions.
                               </p>
                               <button
                                   onClick={() => openLink(URLs.TokenUtility)}
                                   className="button-lg button-primary"
                               >
                                   Learn about $PROPC
                               </button>
                           </div>
                           <div className="d-xl-flex d-none justify-content-center image-container">
                               <img
                                   src={PropcCoin}
                                   alt=""
                                   className="propc-token-img"
                               />
                           </div>
                       </MotionDiv>

                       <MotionDiv
                           transition={{ delay: 0.2, duration: 0.7 }}
                           className="position-relative home-cards-container flex-grow-1"
                       >
                           <div className="home-cards shining-effect">
                               <div className="title">
                                   Become a <br />{' '}
                                   <span>Digital Board Member</span>
                               </div>
                               <p className="desc">
                                   Get special access to latest news and events,
                                   special member class staking and other
                                   special access areas.
                               </p>
                               <button
                                   onClick={showDBMModal}
                                   className="start-now-button"
                               >
                                   Start now
                               </button>
                               <img
                                   src={BoardMember}
                                   alt=""
                                   className="board-member-img"
                               />
                           </div>

                           <img
                               src={PropBgLogo}
                               className="card-bg-logo"
                               alt=""
                           />
                       </MotionDiv>

                       <MotionDiv
                           transition={{ delay: 0.4, duration: 0.7 }}
                           className="position-relative home-cards-container flex-grow-1"
                       >
                           <div className="home-cards shining-effect">
                               <div className="title">
                                   You can now <br /> <span>Stake PROPC</span>
                               </div>
                               <p className="desc">
                                Our staking solution is designed for you to earn rewards and support the Propchain ecosystem simultaneously
                               </p>
                               <Link
                                   to="/staking"
                                   className="coming-soon-button"
                               >
                                   Stake now
                               </Link>
                               <img
                                   src={StakingReward}
                                   alt=""
                                   className="board-member-img"
                               />
                           </div>
                           <img
                               src={PropBgLogo}
                               className="card-bg-logo"
                               alt=""
                           />
                       </MotionDiv>
                   </div>
               
               </div>
           </div>
       </>
   );
}
export default Home;
