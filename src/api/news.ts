const BASE_PATH = process.env.REACT_APP_API_URL || "https://tokens.propchain.com"
const NEWS_FEED_PATH = `${BASE_PATH}/utility/news`;
const DBM_NEWS_FEED = `${BASE_PATH}/dbm/news`;
const DBM_SIGNUP_PATH = `${BASE_PATH}/signups`
const DBM_TOTAL_SIGNUP_PATH = `${BASE_PATH}/signups/total`
const Authorization = "Basic YWRtaW46U2VjcmV0UGFzc3dvcmQh"
export type News = {
   ID: string;
   created_at: string;
   ctaTitle: string;
   ctaUrl: string;
   message: string;
   title: string;
   updated_at: string;
}
export type TotalSignups = {
   total_signups: number;
   signups: string [];
}
export type DBMNews = {
   ID: string;
   created_at: string;
   updated_at: string;
   title: string;
   teaser: string;
   image: string;
}
export type APIResponse<T> = {
   data: T,
   error: string | null;
   message: string;
}

type DBMSignupFields = {
   wallet_address: string;
   email?: string;
   locked_amount: number;
}
export type DBMUser = {
   wallet_address: string;
   created_at: string;
   updated_at: string;
   username: string;
   ID: string;
   email: string;
}
export const fetchFeed = async () => {


   const response = await fetch(NEWS_FEED_PATH);
   if(!response.ok) {
      throw new Error("Failed to fetch news feed");
   }
   const {  data } = await response.json();
   return data as News[];
}
export const fetchDBMFeed = async () => {


   const response = await fetch(DBM_NEWS_FEED);
   if(!response.ok) {
      throw new Error("Failed to fetch news feed");
   }
   const res = await response.json();
   return res.data as DBMNews[];
}

export const DBMSignup = async (variable: DBMSignupFields) => {
   const response = await fetch(DBM_SIGNUP_PATH + '/', {
       headers: { Authorization: Authorization, 'Content-type': 'application/json' },
       body: JSON.stringify(variable),
       method: 'POST',
   });
   if(!response.ok) {
      if(response.status === 500){
         const data = await response.json();
         new Error(data?.message || "Failed to signup")
      }
      throw new Error("Failed to signup");
   }
}

export const DBMStatus = async (walletAddress: string) => {
    const response = await fetch(`${DBM_SIGNUP_PATH}/${walletAddress}`, {
      headers: { Authorization},
      method: 'GET',
    })
    if(!response.ok) {
      throw new Error("Failed to fetch DBM status");
   }
   const data = await response.json();
   return data?.data as DBMUser;
}

export const DBMSignupStatus = async () => {
   const response = await fetch(DBM_TOTAL_SIGNUP_PATH, {
     headers: { Authorization},
     method: 'GET',
   })
   if(!response.ok) {
     throw new Error("Failed to fetch news feed");
  }
  const {data} = await response.json();
  return data as TotalSignups;
}
