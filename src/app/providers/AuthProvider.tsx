import {supabase} from '../../lib/supabase'
import React ,  {useEffect,PropsWithChildren , createContext, useState, useContext } from 'react'
import { Session, User } from '@supabase/supabase-js'

type AuthContext = {
    session: Session | null;
    user: User | null;
}
const AuthContext = createContext<AuthContext >({
    session: null,
    user:null
})
const AuthProvider = ({children}:PropsWithChildren) => {

    const [session, setSession] = useState<Session | null>(null)  
    useEffect(() => {  
          supabase.auth.getSession().then(({ data: { session } }) =>
             {      setSession(session)    })   
           supabase.auth.onAuthStateChange((_event, session) => {      
            setSession(session)    })  }, [])
    
  return (
    <AuthContext.Provider value={{ session , user: session?.user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider


export const useAuth = () => useContext(AuthContext);