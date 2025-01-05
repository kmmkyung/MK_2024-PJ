import React, { useContext } from 'react';
import { LoadingContext } from '../context/LoadingContext'; 
import '../css/LoadingSpinner.css';

function LoadingSpinner() {
  const { isLoading } = useContext(LoadingContext); // isLoading을 context에서 가져오기
  
  if (!isLoading) return null;
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingSpinner;
