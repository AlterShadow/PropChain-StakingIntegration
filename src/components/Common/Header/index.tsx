import propcIcon from "static/assets/Home/propchain-icon.svg";
import Logo from "static/assets/SideNavbar/logo.svg";
import SideNavbar from "../SideNavbar";
import { useEffect, useState } from "react";
import { ReactComponent as Uniswap } from "static/assets/Header/uniswap-logo.svg";
import { ReactComponent as Bitget } from "static/assets/Header/bitget-logo.svg";
import Mexc from "static/assets/Header/mexc.svg";
import Coinmerce from 'static/assets/Header/coinmerce.png';
import ClickAwayListener from 'react-click-away-listener';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Connector from 'containers/Connector';
import Etherscan from 'containers/BlockExplorer';
import {useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Metamask from "static/assets/Header/Metamask.png";
import URLs from "config/constants/URLs";
import useGetPropInfo from "hooks/useGetPropInfo";

import {
	isWalletConnectedState,
   walletAddressState,
	truncatedWalletAddressState,
	ensNameState,
} from 'store/wallet';

import {
	ExternalLink,
} from 'styles/common';


const Header = () => {

   const { connectWallet, disconnectWallet } = Connector.useContainer();
   const { blockExplorerInstance } = Etherscan.useContainer();
   const [showSidebar, setShowSidebar] = useState<boolean>(false);
   const isWalletConnected = useRecoilValue(isWalletConnectedState);
   const truncatedWalletAddress = useRecoilValue(truncatedWalletAddressState);
	const ensName = useRecoilValue(ensNameState);
   const [walletAddress] = useRecoilState(walletAddressState);
   const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
   const [showWalletDropdown, setShowWalletDropdown] = useState<boolean>(false);
   const [showBuyDropdown, setShowBuyDropdown] = useState<boolean>(false);
   const { propInfo } = useGetPropInfo();
   const [propcPrice, setPropcPrice] = useState(0);
   const [propcChange, setPropcChange] = useState(0.0);

   useEffect(() => {
		if (copiedAddress) {
			setInterval(() => {
				setCopiedAddress(false);
			}, 3000); // 3s
		}
	}, [copiedAddress]);

   useEffect(() => {
      const handleMouseDown = (event : Event) => {
      }
      document.addEventListener("mousedown", handleMouseDown)
   }, []);

   const openLink = (link: string) => {
      window.open(link, '_blank');
   }

   // Set price and price_change_24h
   useEffect(() => {
      setPropcPrice(propInfo.current_price);
      setPropcChange(propInfo.change_percentage_24h);
   }, [propInfo]);

   return(
      <header>

         <SideNavbar showSidebar = {showSidebar} />
         {/* <ConnectWalletModal 
            show={showConnectWalletModal}
            setModal={setShowConnectWalletModal}
            setWalletConnected = {setWalletConnected}
         /> */}

         <div className="d-flex d-xl-none align-items-center">
            {
               showSidebar ?
               <i
                  className="pc-icon pc-icon-arrow-left pc-icon-size-32 text-pri-300 margin-right-12"
                  onClick={() => setShowSidebar(false)}
               ></i>
               :
               <i
                  className="pc-icon pc-icon-hamburger pc-icon-size-32 text-pri-300 margin-right-12"
                  onClick={() => setShowSidebar(true)}
               ></i>
            }
            <img src={Logo} alt="" style={{ height : "24px" }} />
         </div>
         <div className='live-eth-wrapper'>
            <div className='dot'></div>
            <div className=''>Live on ETH Mainnet</div>
         </div>

         <div className='d-flex align-items-center justify-content-end '>
            <div className='d-none d-lg-flex propc-price-wrapper align-items-center justify-content-center'>
               <div className='propc-icon'>
                  <img src={propcIcon} alt='' />
               </div>
               <div className='propc-label'>PROPC</div>
               <div className='propc-price'>${propcPrice}</div>
               <div className={'percentage subheader-h6-500 d-flex align-items-end ' + (propcChange < 0 ? 'down' : 'up')}>
                  <i className={"pc-icon pc-icon-triangle-" + (propcChange < 0 ? 'down' : 'up')}></i>
                  {propcChange.toFixed(2)}% (1d)
               </div>
            </div>

            <ClickAwayListener onClickAway={() => setShowBuyDropdown(false)}>
               <div className="position-relative">
                  <button
                     className='buy-propc-button d-none d-lg-flex'
                     onClick={() => setShowBuyDropdown(!showBuyDropdown)}
                  >
                     <img src={propcIcon} alt='' />
                     Buy PROPC
                  </button>
                  <div className={`header-dropdown buy-propc-dropdown ${showBuyDropdown ? "open" : ""}`}>
                     <div
                        className="dropdown-item d-flex align-items-center justify-content-between text-pri-400"
                        onClick={() => openLink(URLs.PROPCHAIN_UNISWAP)}
                     >
                        <Uniswap />
                        <div className="flex-grow-1 subheader-h6-500 text-sec-400 d-flex align-items-center justify-content-center">
                           Get on Uniswap
                        </div>
                        <i className="pc-icon pc-icon-external-link"></i>
                     </div>
                     <div
                        className="dropdown-item d-flex align-items-center justify-content-between text-pri-400"
                        onClick={() => openLink(URLs.PROPCHAIN_BITGET)}
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
                        <img src={Coinmerce} alt='' className='coinmerce-icon' />
                        <div className="flex-grow-1 subheader-h6-500 text-sec-400 d-flex align-items-center justify-content-center">
                           Get on Coinmerce
                        </div>
                        <i className="pc-icon pc-icon-external-link"></i>
                     </div>
                     <div
                        className="dropdown-item d-flex align-items-center justify-content-between text-pri-400"
                        onClick={() => openLink(URLs.PROPCHAIN_MEXC)}
                     >
                        <img src={Mexc} alt='' className="coinmerce-icon" />
                        <div className="flex-grow-1 subheader-h6-500 text-sec-400 d-flex align-items-center justify-content-center">
                           Get on MEXC
                        </div>
                        <i className="pc-icon pc-icon-external-link"></i>
                     </div>
                  </div>
               </div>
            </ClickAwayListener>

            <ClickAwayListener onClickAway={() => setShowWalletDropdown(false)}>
               <div className="position-relative">
                  {
                     isWalletConnected ?
                     <>
                        <button
                           className='wallet-connected-button d-flex align-items-center justify-content-between'
                           onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                        >
                           <div className="d-flex align-items-center gap-12">
                              <img src={Metamask} alt='' className="wallet-icon" />
                              <div className="d-none d-md-block text-sec-400 body-p-500">
                                 {ensName || truncatedWalletAddress}
                              </div>
                              <span className="dot bg-succ-100"></span>
                           </div>
                           <i className="pc-icon pc-icon-chevron-down pc-icon-size-20 margin-left-6"></i>
                        </button>
                        <div className={`header-dropdown wallet-dropdown ${showWalletDropdown ? "open" : ""}`}>
                           <CopyToClipboard text={walletAddress!} onCopy={() => setCopiedAddress(true)}>
                              <div
                                 className="dropdown-item d-flex align-items-center justify-content-center text-pri-400"
                                 onClick={() => setShowWalletDropdown(false)}
                              >
                                 <i className="pc-icon pc-icon-copy margin-right-8"></i>
                                 <div className="subheader-h6-500 d-flex align-items-center">
                                    Copy Address
                                 </div>
                              </div>
                           </CopyToClipboard>
                              
                           <div
                              className="dropdown-item d-flex align-items-center justify-content-center text-pri-400"
                           >
                              <WrappedExternalLink href={blockExplorerInstance?.addressLink(walletAddress!)}>
                                 <i className="pc-icon pc-icon-eye margin-right-8"></i>
                                 <div className="subheader-h6-500 d-flex align-items-center">
                                    View on Explorer
                                 </div>
                              </WrappedExternalLink>
                           </div>
                           <div
                              className="dropdown-item d-flex align-items-center justify-content-center text-pri-400"
                              onClick={() => {
                                 setShowWalletDropdown(false);
                                 disconnectWallet();
                              }}
                           >
                              <span className="bg-err-100 margin-right-8 br-8 dot"></span>
                              <div className="subheader-h6-500 d-flex align-items-center">
                                 Disconnect Wallet
                              </div>
                           </div>
                        </div>
                     </> :
                     <button
                        className='button-lg button-primary connect-wallet-button'
                        onClick={() => {
                           connectWallet();
                        }}
                     >
                        <i className='pc-icon pc-icon-wallet pc-icon-size-20 text-sec-100' />
                        <span>Connect Wallet</span>
                     </button>
                  }
               </div>
            </ClickAwayListener>
         </div>

      </header>
   )
}
export default Header;


const WrappedExternalLink = styled(ExternalLink)`
   color: #FFF9EC;
	display: flex;
	justify-content: center;
	align-items: center;
	max-height: 16px;
`;