import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Logo from "static/assets/SideNavbar/logo.svg";
import PropchainIcon from "static/assets/SideNavbar/propchain-icon.svg"
import Linkdin from "static/assets/SideNavbar/linkdin.svg";
import Instagram from "static/assets/SideNavbar/instagram.svg";
import Site from "static/assets/SideNavbar/site.svg";
import Telegram from "static/assets/SideNavbar/telegram.svg";
import Twitter from "static/assets/SideNavbar/twitter.svg";
import propcIcon from "static/assets/Home/propchain-icon.svg";
import ClickAwayListener from "react-click-away-listener";
import { ReactComponent as Uniswap } from "static/assets/Header/uniswap-logo.svg";
import { ReactComponent as Bitget } from "static/assets/Header/bitget-logo.svg";
import { ReactComponent as Mexc } from "static/assets/Header/mexc.svg";
import Coinmerce from 'static/assets/Header/coinmerce.png';
import URLs from "config/constants/URLs";
import useGetPropInfo from "hooks/useGetPropInfo";
import { useRecoilValue } from "recoil";
import { isWalletConnectedState } from "store/wallet";

const NavLinks = [
   {
      label: 'Home',
      path: '/',
      icon: <i className='pc-icon pc-icon-dashboard pc-icon-size-24' />
   },
   {
      label: 'Portfolio',
      path: '/portfolio',
      icon: <i className='pc-icon pc-icon-coins pc-icon-size-24' />
   },
   {
      label: 'Staking',
      path: '/staking',
      icon: <i className='pc-icon pc-icon-coin-growth pc-icon-size-24' />
   },
   {
      label: 'Admin',
      path: '/admin',
      icon: <i className='pc-icon pc-icon-coin-growth pc-icon-size-24' />
   },
//    {
//       label: 'Members',
//       path: '/members',
//       icon: <i className='pc-icon pc-icon-rooms pc-icon-size-24' />
//    },
   // {
   //    label: 'Community',
   //    path: '/community',
   //    icon: <i className='pc-icon pc-icon-users pc-icn-size-24' />
   // }
]

const socialMedia = [
   {
      icon: Site,
      cta: 'https://www.propchain.com',
   },
   {
      icon: Twitter,
      cta: 'https://twitter.com/PropChainGlobal',
   },
   {
      icon: Telegram,
      cta: 'https://t.me/propchainannouncements',
   },
   {
      icon: Instagram,
      cta: 'https://instagram.com/propchainglobal',
   },
   {
      icon: Linkdin,
      cta: 'https://www.linkedin.com/company/propchain-global/',
   },
]

interface Props {
   showSidebar: boolean;
}

const SideNavbar : React.FC<Props> = ({showSidebar}) => {

   const location = useLocation();
   const [pagePath, setPagePath] = useState('/');
   const [showBuyDropdown, setShowBuyDropdown] = useState<boolean>(false);
   const isWalletConnected = useRecoilValue(isWalletConnectedState);

   const { propInfo } = useGetPropInfo();
   const [propcPrice, setPropcPrice] = useState(0);
   const [propcChange, setPropcChange] = useState(0.0);

   useEffect(() => {
      setPagePath(location.pathname);
   }, [location])
   
   const openLink = (link: string) => {
      window.open(link, '_blank');
      setShowBuyDropdown(false);
   }

   useEffect(() => {
      setPropcPrice(propInfo.current_price);
      setPropcChange(propInfo.change_percentage_24h);
   }, [propInfo]);

   return (
       <div
           className={`side-navbar d-flex flex-column justify-content-between ${
               showSidebar ? 'open' : ''
           }`}
       >
           <div>
               <div className="d-xl-flex d-none justify-content-center">
                   <Link to="/" className="mx-auto d-block">
                       <img src={Logo} alt="" className="logo" />
                   </Link>
               </div>

               <div
                   className="d-flex d-lg-none align-items-center justify-content-between"
                   style={{ padding: '0 14px' }}
               >
                   <div className=" d-flex propc-price-wrapper align-items-center justify-content-center">
                       <div className="propc-icon flex-shrink-0">
                           <img src={propcIcon} alt="" />
                       </div>
                       <div className="propc-label">PROPC</div>
                       <div className="propc-price">${propcPrice}</div>
                       <div
                           className={
                               'percentage subheader-h6-500 d-flex align-items-end ' +
                               (propcChange < 0 ? 'down' : 'up')
                           }
                       >
                           <i
                               className={
                                   'pc-icon pc-icon-triangle-' +
                                   (propcChange < 0 ? 'down' : 'up')
                               }
                           ></i>
                           {propcChange}% (1d)
                       </div>
                   </div>

                   <ClickAwayListener
                       onClickAway={() => setShowBuyDropdown(false)}
                   >
                       <div className="position-relative">
                           <button
                               className="buy-propc-button d-flex"
                               onClick={() =>
                                   setShowBuyDropdown(!showBuyDropdown)
                               }
                           >
                               <img src={propcIcon} alt="" />
                               Buy PROPC
                           </button>
                           <div
                               className={`header-dropdown buy-propc-dropdown ${
                                   showBuyDropdown ? 'open' : ''
                               }`}
                           >
                               <div
                                   className="dropdown-item d-flex align-items-center justify-content-between text-pri-400"
                                   onClick={() =>
                                       openLink(URLs.PROPCHAIN_UNISWAP)
                                   }
                               >
                                   <Uniswap />
                                   <div className="flex-grow-1 subheader-h6-500 text-sec-400 d-flex align-items-center justify-content-center">
                                       Get on Uniswap
                                   </div>
                                   <i className="pc-icon pc-icon-external-link"></i>
                               </div>
                               <div
                                   className="dropdown-item d-flex align-items-center justify-content-between text-pri-400"
                                   onClick={() =>
                                       openLink(URLs.PROPCHAIN_BITGET)
                                   }
                               >
                                   <Bitget />
                                   <div className="flex-grow-1 subheader-h6-500 text-sec-400 d-flex align-items-center justify-content-center">
                                       Get on Bitget
                                   </div>
                                   <i className="pc-icon pc-icon-external-link"></i>
                               </div>
                               <div
                                   className="dropdown-item d-flex align-items-center justify-content-between text-pri-400"
                                   onClick={() => openLink(URLs.COINMERCE)}
                               >
                                   <img
                                       src={Coinmerce}
                                       alt=""
                                       className="coinmerce-icon"
                                   />
                                   <div className="flex-grow-1 subheader-h6-500 text-sec-400 d-flex align-items-center justify-content-center">
                                       Get on Coinmerce
                                   </div>
                                   <i className="pc-icon pc-icon-external-link"></i>
                               </div>
                               <div
                                   className="dropdown-item d-flex align-items-center justify-content-between text-pri-400"
                                   onClick={() => openLink(URLs.PROPCHAIN_MEXC)}
                               >
                                   <Mexc />
                                   <div className="flex-grow-1 subheader-h6-500 text-sec-400 d-flex align-items-center justify-content-center">
                                       Get on Mexc
                                   </div>
                                   <i className="pc-icon pc-icon-external-link"></i>
                               </div>
                           </div>
                       </div>
                   </ClickAwayListener>
               </div>

               <div className="navigation-links">
                   {NavLinks.map((item, ind) =>
                       item.label === 'Members' && !isWalletConnected ? null : (
                           <Link
                               to={item.path}
                               className={`navigation-link-wrapper body-md-500 text-sec-400 ${
                                   item.path === pagePath
                                       ? 'active text-sec-100'
                                       : ''
                               } `}
                               key={ind}
                           >
                               {item.icon}
                               <span className="margin-left-21">
                                   {item.label}
                               </span>
                           </Link>
                       )
                   )}
               </div>
           </div>

           <div className="bottom-container">
               <a
                   href="https://prop.com"
                   className="go-to-app-button text-pri-300 body-p-600"
                   target="_blank"
               >
                   <img src={PropchainIcon} alt="" className="pc-icon" />
                    Go to Prop.com App
               </a>

               <div className="d-flex align-items-center justify-content-md-between justify-content-center social-icons-container">
                   {socialMedia.map((item, ind) => (
                       <a href={item.cta} key={ind} target="_blank">
                           <img src={item.icon} alt={item.cta} />
                       </a>
                   ))}
               </div>
           </div>
       </div>
   );

}
export default SideNavbar;
