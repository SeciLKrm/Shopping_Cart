import { ReactNode, createContext, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps ={
    children : ReactNode
}
type CartItem ={
    id:number,
    quantity : number
}
type ShoppingCartContext ={
getItemQuantity : (id : number) => number,
increaseCartQuantity : (id : number) => void,
decreaseCartQuantity : (id : number) => void,
removeFromCart : (id : number) => void,
openCart :() =>void,
closeCart :()=>void,
cartItems : CartItem[],
cartQuantity : number
}


export const ShoppingCartContext = createContext({} as ShoppingCartContext)


export const useShoppingCart =()=>{
return useContext(ShoppingCartContext)

}

export const ShoppingCartProvider =({children}:ShoppingCartProviderProps)=>{
const [isOpen,setIsOpen]=useState(false)
const [cartItems,setCartItems]=useLocalStorage<CartItem[]>("shopping-cart",[])

// ürün miktarını belirleme
const getItemQuantity= (id:number)=>{
return cartItems.find(item => item.id === id)?.quantity || 0 
}

// ürün ekleme 
const increaseCartQuantity =(id : number) =>{
    return setCartItems(currItems =>{
        if(currItems.find(item =>item.id === id) == null) {
            return [...currItems,{id, quantity : 1} ]
        }else{
            return currItems.map(item =>{
                if(item.id === id){
                    return{...item, quantity:item.quantity +1 }
                }else {
                   return item
                }
            })
        }
    } )
}
// ürün azaltma
const decreaseCartQuantity =(id:number)=>{
return setCartItems(currItems =>{
if(currItems.find(item => item.id === id)?.quantity === 1){
    return (currItems.filter(item =>item.id !== id))
}else{
    return currItems.map(item =>{
        if(item.id === id){
            return {...item, quantity : item.quantity -1}
        }else{
            return item
        }
    })
}
})
}
// ürün kaldırma
const removeFromCart =(id : number)=>{
setCartItems(currItems=>{
return (currItems.filter(item=>item.id !== id))
}
)}
// sepeti açma
const openCart = () => setIsOpen(true)
// sepeti kapatma
const closeCart =()=> setIsOpen(false)
// sepetteki toplam ürün miktarını belirleme
const cartQuantity = cartItems.reduce((quantity,item)=>item.quantity+quantity,0 )
    
return (
    <ShoppingCartContext.Provider 
    value={{getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    openCart,
    closeCart,
    cartItems,
    cartQuantity}}>
        {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
)
}