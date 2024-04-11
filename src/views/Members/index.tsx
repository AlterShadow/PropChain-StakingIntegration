import { DBMStatus, DBMUser } from "api/news";
import Header from "components/Common/Header";
import Loader from "components/Common/Loader";
import BecomeAMemberSection from "components/Members/BecomeAMemberSection";
import BoardMemberSection from "components/Members/BoardMemberSection";
import JoinTgSection from "components/Members/JoinTgSection";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { walletAddressState } from "store/wallet";

const Members = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<boolean>();
  const [DBMUser, setDBMUser] = useState<DBMUser>();
  const [walletAddress] = useRecoilState(walletAddressState);
  const onSignupConfirm = ()=> {
    setIsSignedUp(true)
  }
  useEffect(() => {
    if(!walletAddress) return;
    const fetchDBMStatus = async () => {
      try {
        setLoading(true);
        const res = await DBMStatus(walletAddress);
        setLoading(false);
        if(res) {
          setDBMUser(res);
          setIsSignedUp(true);}
      } catch (error) {
        setIsSignedUp(false);
        setLoading(false);
      }
    }
    fetchDBMStatus()
  }, [walletAddress])
  return (
      <div className="main-container members-page">
          <Header />  

          <div className="banner-section">
              {loading ? (
                  <Loader />
              ) : isSignedUp ? (
                  // <JoinTgSection />
                  <BoardMemberSection user={DBMUser}/> 
              ) : (
                  <BecomeAMemberSection onSignupComplete={onSignupConfirm}/>
              )}
          </div>

          {/* <BoardMemberSection /> */}
      </div>
  );
}
export default Members;