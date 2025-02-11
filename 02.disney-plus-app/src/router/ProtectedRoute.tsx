import { Navigate } from "react-router-dom";
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

export default function ProtectedRoute({children}:{children:React.ReactNode}){
  const [isAuthData, setIsAuthData] = useState<boolean | null>(null);
    onAuthStateChanged(auth, (user) => { 
      if (user === null) {
        setIsAuthData(false);
      }
      else{
        setIsAuthData(true);
      }
    });
  if (isAuthData === false) {
    return <Navigate to='/login' />; 
  }
  return <>{children}</>;
}