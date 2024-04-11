import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom';
// import Home from './views/Home';
// import Portfolio from './views/Portfolio';
// import Maintenance from './views/Maintenance';
// import Staking from './views/Staking';
// import Members from './views/Members';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { walletAddressState } from 'store/wallet';
import useGetPoolData from 'hooks/staking/useGetPoolData';
import { DBMStatus } from 'api/news';
import BecomeMemberModal2 from 'components/Members/Modals/BecomeMember2';
import { retryLazy } from './utils/lazyUtil';
const Home = retryLazy(() => import('./views/Home'));
const Portfolio = retryLazy(() => import('./views/Portfolio'));
const Maintenance = retryLazy(() => import('./views/Maintenance'));
const Staking = retryLazy(() => import('./views/Staking'));
const Members = retryLazy(() => import('./views/Members'));
const Admin = retryLazy(() => import('./views/Admin'));

const MINIMUM_LOCK = Number(process.env.REACT_APP_LOCK_AMOUNT || 1000);

const RoutesContainer = () => {
    const location = useLocation();
    const [isSignedUp, setIsSignedUp] = useState<boolean>();
    const [walletAddress] = useRecoilState(walletAddressState);
    const [showBecomeAMember, setShowBecomeAMember] = useState(false);
    const fetchDBMStatus = useCallback(async () => {
        if(!walletAddress) return;
        try {
            const res = await DBMStatus(walletAddress);
            if (res) {
                setIsSignedUp(true);
            } else{
              setIsSignedUp(false)
            }
        } catch (error) {
            setIsSignedUp(false);
        }
    }, [walletAddress])
    const { data } = useGetPoolData();

    useEffect(() => {
        if (
            walletAddress &&
            isSignedUp === false &&
            data.availablePROPC >= MINIMUM_LOCK
        ) {
            setShowBecomeAMember(true);
        }
    }, [data.availablePROPC, walletAddress, isSignedUp]);
    useEffect(() => {
        if (!walletAddress) return;
        fetchDBMStatus();
    }, [walletAddress, fetchDBMStatus]);

    const onSignupSuccess = ()=> {
        setShowBecomeAMember(false);
        fetchDBMStatus();
		window.alert("Successfully signed up!");

    }
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" Component={Home} />
                <Route path="/portfolio" Component={Portfolio} />
                <Route path="/maintenance" Component={Maintenance} />
                <Route path="/staking" Component={Staking} />
                <Route path="/members" Component={Members} />
                <Route path="/admin" Component={Admin} />
            </Routes>
        </AnimatePresence>
    );
};
const RoutesConfig = () => {
    return (
        <Router>
            <RoutesContainer />
        </Router>
    );
};

export default RoutesConfig;
