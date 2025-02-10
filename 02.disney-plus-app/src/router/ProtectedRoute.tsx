import { Navigate } from "react-router-dom";
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";
import { userDataState } from "../atoms";
import { useSetRecoilState } from "recoil";

export default function ProtectedRoute({children}:{children:React.ReactNode}){
  const setUserData = useSetRecoilState(userDataState)
  onAuthStateChanged(auth, (user) =>{
    setUserData({
      uid: user?.uid ?? '',
      email: user?.email ?? null,
      displayName: user?.displayName ?? null,
      photoURL: user?.photoURL ?? null,
    });
    if(!user){
      return <Navigate to='/login' />
    }
  })
  return <>{children}</>
}