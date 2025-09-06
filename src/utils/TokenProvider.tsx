import {supabase} from '../lib/supabase.ts';

export const tokenProvider = async()=>{
    const response = await supabase.functions.invoke('stream-token');
    if(response.error){
        console.log("Error fetching token:", response.error);
        return null;
    }
    console.log("Fetched token:", response.data);
    // Return just the token string, not the entire object
    return response.data.token;
}