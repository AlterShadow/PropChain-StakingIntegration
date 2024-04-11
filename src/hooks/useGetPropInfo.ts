import axios from "axios";
import { useEffect, useState } from "react";

const defaultPropInfo = {
    current_price: 1.25,
    change_percentage_24h: 0,
    low_24h: 1.25,
    high_24h: 1.25,
    market_cap: 2829960,
    total_volume_usd: 188583
}

const defaultSupply = {
    total_supply: 100000000,
    circulating_supply: 2263738
}

const useGetPropInfo = () => {
    const [propInfo, setPropInfo] = useState(defaultPropInfo);
    const [propSupply, setPropSupply] = useState(defaultSupply);
    const [supplyLoaded, setSupplyLoad] = useState<boolean>(false);

    useEffect(() => {
        const updatePrice = async () => {
            axios.get("https://tokens.propchain.com/get-market-data")
            .then((res) => {
                 const info = {
                     current_price: res.data.data.current_price_usd,
                     change_percentage_24h: res.data.data.change_percentage_24h,
                     low_24h: res.data.data.low_24h_usd,
                     high_24h: res.data.data.high_24h_usd,
                     market_cap: res.data.data.market_cap_usd,
                     total_volume_usd: res.data.data.total_volume_usd
                 }                 
                 setPropInfo(info);
            })
            .catch((error) => {
                 console.log("Get Pricing causes error: ", error);
                 setPropInfo(defaultPropInfo);
            });
        }

        const updateSupply = async () => {
            axios.get("https://tokens.propchain.com/propc-available")
            .then((res) => {
                const info = {
                    circulating_supply: res.data,
                    total_supply: 0
                }
                axios.get("https://tokens.propchain.com/total-propc")
                .then((res) => {
                    info.total_supply = res.data;
                    setPropSupply(info);
                    setSupplyLoad(true);
                })
                .catch((error) => {
                    console.log("Get Supply causes error: ", error);
                    setPropSupply(defaultSupply);
               });
            })
            .catch((error) => {
                 console.log("Get Supply causes error: ", error);
                 setPropSupply(defaultSupply);
            });
        }

        updatePrice();
        updateSupply();
        const interval = setInterval(async() => {
            await updatePrice();
        }, 30000);
  
        return () => clearInterval(interval);
     }, []);

     return { propInfo, propSupply, supplyLoaded }
}

export default useGetPropInfo;