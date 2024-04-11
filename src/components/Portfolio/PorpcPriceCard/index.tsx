import React, { useEffect } from "react";
import { useState } from "react";
import useAxios from "axios-hooks";
import { DataProps } from "interfaces/DataProps";
import { VictoryChart, VictoryArea, VictoryAxis } from "victory";
import useGetPropInfo from "hooks/useGetPropInfo";
import moment from "moment";
import axios from "axios";
import Loader from 'components/Common/Loader';

const Duration = [
   {
      label: 'D',
      value: '1'
   },
   {
      label: 'W',
      value: '7'
   },
   {
      label: 'M',
      value: '30'
   },
   {
      label: 'Y',
      value: '365'
   },
]

const PorpcPriceCard = () => {

   const [duration, setDuration] = useState(Duration[0].value);
   const { propInfo, propSupply, supplyLoaded } = useGetPropInfo();
   const [propcPrice, setPropcPrice] = useState(0.00);
   const [propcChange, setPropcChange] = useState(0.00);
   const [lowPrice, setLowPrice] = useState(0.00);
   const [highPrice, setHighPrice] = useState(0.00);
   const [marketCap, setMarketCap] = useState(0);
   const [volume_24h, setVolume24h] = useState(0);
   const [totalSupply, setTotalSupply] = useState(0);
   const [cirSupply, setCirSupply] = useState(0);
   const [viewChart, setViewChart] = useState(false);
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   // const [{ data, loading, error }] = useAxios({
   //    url: `https://api.coingecko.com/api/v3/coins/ethereum/contract/0x9ff58067Bd8D239000010c154C6983A325Df138E/market_chart?vs_currency=usd&days=${duration}`,
   //    method: "GET",
   // });

   useEffect(() => {

      setIsLoading(true);

      axios({
         url : `https://api.coingecko.com/api/v3/coins/ethereum/contract/0x9ff58067Bd8D239000010c154C6983A325Df138E/market_chart?vs_currency=usd&days=${duration}`
      }).then((res) => {
         const resData = res.data;
         const mappedData = resData ?
            resData?.prices.map((ele: any) => ({
               x: new Date(ele[0]),
               y: ele[1],
            }))
         : [];
         let highestNumber = null as any;
         let lowestNumber = null as any;
         resData?.prices.forEach((item : any) => {
            const number = item[1];
            if (highestNumber === null || number > highestNumber) {
               highestNumber = number;
            }
            if (lowestNumber === null || number < lowestNumber) {
               lowestNumber = number;
            }
         });
         lowestNumber = Number(lowestNumber.toFixed(2));
         highestNumber = Number(highestNumber.toFixed(2));
         setLowPrice(lowestNumber);
         setHighPrice(highestNumber);
         
         setData(mappedData);
         setTimeout(() => {
            setIsLoading(false);
         }, 1000)
      })
   }, [duration])

   // Set price and price_change_24h
   useEffect(() => {
      setPropcPrice(propInfo.current_price);
      setPropcChange(propInfo.change_percentage_24h);
      // setLowPrice(propInfo.low_24h);
      // setHighPrice(propInfo.high_24h);
      setMarketCap(propInfo.market_cap);
      setVolume24h(propInfo.total_volume_usd);
      setTotalSupply(propSupply.total_supply);
      setCirSupply(propSupply.circulating_supply);
   }, [propInfo, propSupply]);
   
   const getFormat = () => {
      if(duration === Duration[0].value){
         return "HH:mm A"
      }
      if(duration === Duration[1].value){
         return "DD MMM"
      }
      if(duration === Duration[2].value){
         return "DD MMM"
      }
      if(duration === Duration[3].value){
         return "MMM YYYY"
      }

      return "DD-MMM-YYYY";
   }

   return(
      <div className='portfolio-card propc-price-card'>

         <div className="d-flex align-items-center justify-content-between">
            <div className='propc-label'> PROPC Price </div>

            <div className='d-flex align-items-center'>
               {Duration.map((item, ind) => (
                  <div 
                     className={` change-duration-container body-p-400 text-sec-200 ${duration === item.value ? 'text-sec-400' : ''} `} 
                     key={ind}
                     onClick={() => setDuration(item.value)}
                  >
                     {item.label}
                  </div>
               ))}
            </div>
         </div>
         <div className="d-md-flex align-items-end justify-content-between margin-top-14">
            <div className='d-flex align-items-end'>
               <div className='propc-price'> <span>$</span>{propcPrice} </div>
               <div className={'up-down-percentage d-flex align-items-center ' + (propcChange < 0 ? 'down' : 'up')}>
                  <i className={"pc-icon pc-icon-size-24 pc-icon-triangle-" + (propcChange < 0 ? 'down' : 'up')}></i>
                  {propcChange.toFixed(2)}% (1d) 
               </div>
            </div>
            
            <div className='d-flex align-items-center justify-content-between margin-top-14 mt-md-0 margin-bottom-5 margin-bottom-md-32'>
               <div className="d-flex align-items-center subheader-h6-400 text-sec-400">
                  <div>
                     <span className="purple-text"> L: </span> ${lowPrice}
                  </div>
                  <div className="margin-left-8">
                     <span className="purple-text"> H: </span> ${highPrice}
                  </div>
                  {/* <div className="margin-left-16">
                     Rank #110 
                  </div>
                  <i className="pc-icon pc-icon-growth text-pri-100 pc-icon-size-17 margin-left-4"></i> */}
               </div>
               <button 
                  className='view-chart-btn body-sm-500 text-pri-400 d-md-none' 
                  onClick={() => setViewChart(!viewChart)}
               >
                  View Chart
               </button>   
            </div>
         </div>

         <div className={`position-relative d-md-block ${viewChart ? 'd-block' : 'd-none'}`}>

            <div className={`chart-loader d-flex justify-content-center align-items-center ${isLoading ? "show" : ""}`}>
               <div className="loader"></div>
            </div>
            <svg height={0} width={0}>
               <defs>
                  <linearGradient id="portfolio-chart-gradient"
                     x1="0%" y1="0%" x2="0%" y2="100%"
                  >
                     <stop offset="0%" stopColor="rgba(66, 99, 166, 0.40)"/>
                     <stop offset="30%" stopColor="rgba(66, 99, 166, 0.30)"/>
                     <stop offset="95%" stopColor="rgba(66, 99, 166, 0)"/>
                  </linearGradient>
               </defs>
            </svg>
            <div className={`chart-container ${isLoading ? "" : "show"}`}>
               {data?.length && (
                  <>
                     {/* <PrimaryChart
                        data={data}
                        height={400}
                        width={800}
                        margin={{
                        top: 16,
                        right: 16,
                        bottom: 40,
                        left: 48,
                        }}
                     /> */}
                     <VictoryChart
                        minDomain={{ y: 0 }}
                        domain={{y: [lowPrice - 0.3, highPrice + 0.3]}}
                        padding={{ top: -20, bottom: 40, left: 35, right: 10 }}
                        height={270}
                        // animate={{
                        //    duration: 2000,
                        //    onLoad: { duration: 1000 }
                        // }}
                     >

                        <VictoryAxis
                           style={{
                              tickLabels : {
                                 fontSize : "8px",
                                 fontWeight : 400,
                                 lineHeight : "18px",
                                 fill : "rgba(255, 249, 236, 0.33)"
                              },
                              axis: { stroke: 'rgba(0,0,0,0)' }
                           }}

                           tickFormat={(t) => moment(t).format(getFormat())}
                        />
                        <VictoryAxis
                           dependentAxis
                           // tickCount={20}
                           style={{
                              tickLabels : {
                                 fontSize : "9px",
                                 fontWeight : 400,
                                 lineHeight : "13px",
                                 fill : "#4263A6"
                              },
                              axis: { stroke: '', strokeDasharray: 3 },
                              grid : {stroke : "rgba(229, 229, 239, 0.08)"}
                           }}
                        />
                        <VictoryArea
                           data={data}

                           style={{
                              data: {
                                 fill: 'url(#portfolio-chart-gradient)',
                                 stroke : "#00B67A",
                                 strokeWidth : 1.5
                              },
                              labels : {
                                 fontSize : 10
                              }
                           }}
                        />
                     </VictoryChart>
                  </>
               )}
            </div>
         </div>

         <div className={`propc-values-container ${isLoading ? "pt-50" : ""}`}>
            <div className='details-wrapper'>
               <div className='label'>Market Cap</div>
               <div className='value'> ${Number(marketCap).toLocaleString()} </div>
            </div>
            <div className='details-wrapper'>
               <div className='label'>Volume (24h)</div>
               <div className='value'> ${Number(volume_24h).toLocaleString()} </div>
            </div>
            <div className='details-wrapper'>
               <div className='label'>Total supply</div>
               <div className='value'> {supplyLoaded ? Number(totalSupply).toLocaleString() : <Loader bgColor="white" />} </div>
            </div>
            <div className='details-wrapper'>
               <div className='label'>Cir. Supply</div>
               <div className='value'> {supplyLoaded ? Number(cirSupply).toLocaleString() : <Loader bgColor="white" />} </div>
            </div>
         </div>
      </div>
   )
}
export default PorpcPriceCard;
