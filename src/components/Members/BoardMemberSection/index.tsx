import { useEffect, useState } from 'react';
import MotionDiv from "components/Common/MotionDiv";
import { ReactComponent as Settings } from "static/assets/Common/settings-icon.svg";
import { ReactComponent as PollBg } from "static/assets/Member/poll-bg.svg";
import CroppedToken from "static/assets/Member/cropped-token.png";
import Deck from "static/assets/Member/deck.png";
import MemberImage from "static/assets/Member/member-image.jpg";
import { ReactComponent as Brick } from "static/assets/Member/brick-icon.svg";
import { ReactComponent as Star } from "static/assets/Member/star.svg";
import { ReactComponent as Bolt } from "static/assets/Member/firebolt.svg";
import { ReactComponent as Arch } from "static/assets/Member/arch.svg";
import { ReactComponent as Coins } from "static/assets/Member/coins.svg";
import { ReactComponent as Snowflake } from "static/assets/Member/snowflake.svg";
import { ReactComponent as Poll } from "static/assets/Member/poll.svg";
import { Carousel } from "react-bootstrap";
import Links from "config/constants/URLs"
import { DBMNews, DBMSignupStatus, DBMUser, TotalSignups, fetchDBMFeed } from 'api/news';
import { format } from 'date-fns';
import { useRecoilState } from "recoil";
import { walletAddressState } from "store/wallet";

type BoardMemberProps = {
  user?: DBMUser
}
const BoardMemberSection = ({ user }: BoardMemberProps) => {

  const [tab, setTab] = useState('Deposit');
  const [fetchingNewsFeed, setFetchingNewsFeed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signups, setSignups] = useState<TotalSignups>();
  const [news, setNews] = useState<DBMNews[]> ();
  const [walletAddress] = useRecoilState(walletAddressState);
  const [newsTab, setNewsTab] = useState('Latest');
  const [newsIndex, setNewsIndex] = useState(0);

  const launchReport = ()=> {
    window.open(Links.LAUNCH_REPORT, "_blank");
  }
  useEffect(()=> {
    const fetchNews = async () => {
      if(news) return;
      
      try {
        setFetchingNewsFeed(true);
        const res = await fetchDBMFeed();
        setNews(res);
      } catch (error) {
        console.error("From fetching DBM feed", error);
      } finally{
        setFetchingNewsFeed(false);
      }
    }
    fetchNews();
  }, [news])

  useEffect(() => {
    const fetchSignups = async  () => {
      if(signups) return;
      try {
        setLoading(true);
        const res = await DBMSignupStatus()
      setSignups(res);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false)
      }
      
    }
    fetchSignups();
  }, [signups])
  const newsArr = [
    {
      title : "Propchain launches Defi-lending marketplace",
      description : "Revolutionizing the financial landscape with seamless peer-to-peer borrowing and lending"
    },
    {
      title : "Propchain launches Defi-lending marketplace",
      description : "Revolutionizing the financial landscape with seamless peer-to-peer borrowing and lending"
    },
    {
      title : "Propchain launches Defi-lending marketplace",
      description : "Revolutionizing the financial landscape with seamless peer-to-peer borrowing and lending"
    }
  ]

  return(
    <div className="margin-top-30 board-members-section">
      <MotionDiv className="d-flex align-items-center justify-content-between margin-bottom-24">
        <div className="d-flex align-items-center welcome-text">
          <div className="text-pri-400"> Hello !</div> &nbsp;
          <div className="text-pri-100"> Board Member </div>
        </div>

        <div className="d-flex align-items-center text-sec-400 subheader-h6-500">
          <Settings className="margin-right-6" />
          Settings
        </div>
      </MotionDiv>

      <MotionDiv
        className="d-flex justify-content-between member-details-container flex-column flex-md-row"
        transition={{ delay : 0.2, duration : 0.7 }}
      >
        <div className='d-flex flex-column flex-md-row'>
          <div className='brick-circle-container bg-sec-100 d-flex align-items-center justify-content-center'>
            <Arch className='arch' />
            <Brick />

            <div className='star-container d-flex align-items-center justify-content-center'>
              <Star className='star' />
              <Bolt className='bolt' />
              <div className='text-center position-relative'>
                <div className='xp-label'> XP </div>
              </div>
            </div>
          </div>
          <div className="title-container">
            <div>
              <div className="d-flex align-items-center margin-bottom-6">
                <div className="title text-pri-400">
                  {user?.username || ""}
                </div>
                <div className="member-status d-flex align-items-center margin-left-12 padding-x-12">
                  Connected
                </div>
              </div>
              <div className="member-since">
                {`Member since ${user?.created_at ? format(new Date(user?.created_at), 'd MMM yyyy') : ""}`}
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex align-items-end peer-board-members'>
          <div className='d-flex align-items-md-center flex-column flex-md-row'>
            <div className='margin-right-14'>
              Peer Board Members
            </div>

            <div className='d-flex peer-member-image-container'>
              {
                signups?.signups?.map((initial, i) => (
                  <div className='d-flex align-items-center justify-content-center peer-member-image bg-sec-100 text-white body-p-600' key={`dbm-member-${i}-${initial}`}>
                    {initial}
                  </div>
                ))
              }
              <div className='d-flex align-items-center justify-content-center peer-member-number bg-pri-100 text-sec-100 body-p-600'>
                {signups?.total_signups || 0}
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>

      <MotionDiv
        className='member-earning-details d-flex flex-column flex-md-row'
        transition={{ delay : 0.4, duration : 0.7 }}
      >
        {/* <div className='box d-flex align-items-center'>
          <Coins className='icon' />

          <div>
            <div className='value'> $1,450.00 </div>
            <div className='label'> PROPC Earned </div>
          </div>
        </div> */}

        <div className='box d-flex align-items-center'>
          <Snowflake className='icon' />

          <div>
            <div className='label'> Reward Points </div>
          </div>
        </div>

        <div className='box d-flex align-items-center'>
          <Poll className='icon' />

          <div>
            <div className='value'>
            </div>
            <div className='label'> Tier Level </div>
          </div>
        </div>
      </MotionDiv>

    
      <div className='row'>
      <div className='col-12 col-xl-7'>
          <MotionDiv
            className='news-box'
            transition={{ delay : 0.6, duration : 0.7 }}
          >
            <div className='d-flex'>
              <div className={`news-tab margin-right-30 ${newsTab === "Latest" ? "active" : ""}`} onClick={() => setNewsTab("Latest")}>
                Latest
              </div>
              <div className={`news-tab ${newsTab === "Events" ? "active" : ""}`} onClick={() => setNewsTab("Events")}>
                Events
              </div>
            </div>

            <Carousel
              controls={false}
              interval={5000}
              className="news-carousel"
              activeIndex={newsIndex}
              onSelect={(newIndex) => setNewsIndex(newIndex)}
            >
              {
                news?.map((news, ind) =>
                  <Carousel.Item key={ind}>
                    <div className='title text-pri-400'>
                      {news.title}
                    </div>
                    <div className='description text-sec-400'>
                      {news.teaser}
                    </div>
                  </Carousel.Item>
                )
              }
            </Carousel>

            <div className='text-sec-400 dot-number' style={{ marginLeft : `${(news || []).length * 20 + 5}px` }}>
              {newsIndex + 1} / {news?.length}
            </div>
          </MotionDiv>
          <MotionDiv
            className='buy-propc-box flex-grow-1'
            transition={{ delay : 1, duration : 0.7 }}
          >
            {/* <img src={CroppedToken} alt='' className='corpped-token' /> */}
            {/* <div className='title'>
              Buy Discounted PROPC
            </div>

            <div className='description'>
              As a board member, you can now enjoy PROPC purchases at special prices. Fill the form below to share interest. 
            </div>

            <button className='button-lg button-primary-dark w-100'>
              <i className='pc-icon pc-icon-coins pc-icon-size-20 text-pri-100 margin-right-5' />
              Buy PROPC
            </button> */}
            
          </MotionDiv>
          <MotionDiv
            className='buy-propc-box flex-grow-1'
            transition={{ delay : 1.2, duration : 0.7 }}
          >
            <img src={Deck} alt='' className='deck-img' />

            <div className='title'>
              Launch Report
            </div>

            <div className='description'>
              You are now exposed to special reports
            </div>

            <button onClick={launchReport} className='button-lg button-primary-dark w-100'>
              <i className='pc-icon pc-icon-file pc-icon-size-20 text-pri-100 margin-right-5' />
              Get Report
            </button>
          </MotionDiv>
      </div>
        <div className='col-12 col-xl-5 flex-grow-1 d-flex flex-column'>
          <MotionDiv
            className='buy-propc-box flex-grow-1'
            transition={{ delay : 1, duration : 0.7 }}
          >
            {/* <img src={CroppedToken} alt='' className='corpped-token' /> */}
            {/* <div className='title'>
              Buy Discounted PROPC
            </div>

            <div className='description'>
              As a board member, you can now enjoy PROPC purchases at special prices. Fill the form below to share interest. 
            </div>

            <button className='button-lg button-primary-dark w-100'>
              <i className='pc-icon pc-icon-coins pc-icon-size-20 text-pri-100 margin-right-5' />
              Buy PROPC
            </button> */}
            
          </MotionDiv>
          <MotionDiv
            className='staking-box'
            transition={{ delay : 1.4, duration : 0.7 }}
          >
            {/* <div className='d-md-flex align-items-center justify-content-between'>
              <div className='title'>
                Board Member Staking
              </div>
              <div className='tabs'>
                <div 
                  className={`item-box ${tab === 'Deposit' ? 'active' : '' }`}
                  onClick={() => setTab('Deposit')}
                >
                  Deposit
                </div>
                <div 
                  className={`item-box ${tab === 'Withdraw' ? 'active' : '' }`}
                  onClick={() => setTab('Withdraw')}
                >
                  Withdraw
                </div>
              </div>
            </div>

            <div className='number-matrix'>
              <div className='number-matrix-box'>
                <div className='label'> APY </div>
                <div className='value yellow'> 7% </div>
              </div>
              <div className='number-matrix-box'>
                <div className='label'> Stake Period </div>
                <div className='value yellow'> 1Y </div>
              </div>
              <div className='number-matrix-box'>
                <div className='label'> PROPC Amount </div>
                <div className='value'> 500.00 </div>
              </div>
              <div className='number-matrix-box'>
                <div className='label'> TVL </div>
                <div className='value'> $823K </div>
              </div>
            </div>

            <div className='stake-input-wrapper'>
              <input 
                type='number'
                value={depositAmountNumber}
                onChange={(e) => setDepositAmountNumber(e.target.value)}
              />

              <div className='max-tab'> Max </div>
            </div>

            <div className='d-md-flex align-items-center justify-content-between'>
              <div className='d-flex'>
                <div className='reward-label'> Estimated Rewards  </div>
                <div className='reward-value'> &nbsp; 7 PROPC (1Y) </div>
              </div>
              <div className='d-flex mt-2 mt-md-0'>
                <div className='reward-label'> Available PROPC  </div>
                <div className='reward-value'> &nbsp; 1000 </div>
              </div>
            </div>

            <div className='d-flex align-items-center justify-content-end margin-top-25'>
              <button className='button-primary button-lg deposit-button'>
                Deposit
              </button>
            </div> */}
          </MotionDiv>
        </div>

        
      </div>
       
    </div>
  )
}

export default BoardMemberSection;