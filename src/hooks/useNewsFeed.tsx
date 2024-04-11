import { News, fetchFeed } from "api/news";
import { useCallback, useEffect, useState } from "react"



export const useNewsFeed = () => {
   const [newsFeed, setNewsFeed] = useState<News[]>();
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState()
   const fetchNewsFeed = useCallback(async () => {
      try {
         setLoading(true);
         const feed = await fetchFeed();
         setNewsFeed(feed);  
      } catch (error) {
         const err: any = error;
       setError(err?.message || "Error fetching");
      } finally {
         setLoading(false);
      }
      
   }, [])
   useEffect(()=> {
      fetchNewsFeed()
   }, [fetchNewsFeed])

   return { newsFeed, error, loading, fetchNewsFeed}
   
}