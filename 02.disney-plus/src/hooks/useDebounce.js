import { useState, useEffect } from "react";

export function useDebounce(value, delay){
  const [ debounceValue, setDebounceValue ] = useState(value);
  useEffect(()=>{
    const handler = setTimeout(function(){
      setDebounceValue(value)
    }, delay)
    return ()=>{
      clearTimeout(handler);
    }
  },[value,delay]);
  return debounceValue;
}