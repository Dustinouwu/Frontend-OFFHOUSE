import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function useDebounceHook(value, timeout, callback) {

    const [timer , setTimer] = useState(null);

    const clearTimer= () => {
        if(timer){
            clearTimeout(timer);
        }
    }

    useEffect (() => {
        clearTimer();
        if(value && callback){
            const newTimer = setTimeout(callback, timeout);
            setTimer(newTimer); 
            
        }
    }, [value]);


  return (
    <div>debounceHook</div>
  )
}

export default useDebounceHook