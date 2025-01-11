import React, { createContext, useState } from "react";

export const LoadingContext = createContext(); // 모든 컴포넌트에서 useContext(LoadingContext)로 접근할 수 있다.

export function LoadingProvider({children}){
  const [ isLoading, setIsLoading ] = useState(false);
  if(isLoading){
    document.querySelector('body').style.overflow = 'hidden';
  }
  else{
    document.querySelector('body').style.overflow = 'auto';
  }

  return (
    // LoadingContext.Provider로 자식 컴포넌트들에게 isLoading과 setIsLoading을 제공
    <LoadingContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </LoadingContext.Provider>
  )
}