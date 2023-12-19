import { useEffect, useState } from "react"

export function useLocalStorage<T> (key:string, initialValue: T | (()=>T)) {
    const [value,setValue]=useState<T>(()=>{
          // localStorage'dan değeri çek
    const jsonValue = localStorage.getItem(key)
   
    if(jsonValue !== null) return JSON.parse(jsonValue)
    // Eğer başlangıç değeri bir fonksiyon ise, o fonksiyonu çağır ve sonucu döndür
    if( initialValue ===  "function") {
        return (initialValue as ()=> T)()
         // Eğer başlangıç değeri bir fonksiyon değilse, doğrudan başlangıç değerini döndür
    }else {
        return initialValue
    }
    })
//    useEffect hook'u kullanılarak, her value değiştiğinde 
// localStorage.setItem ile bu değer yerel depolamaya yazılır
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])
    return [value, setValue] as [typeof value, typeof setValue]
}