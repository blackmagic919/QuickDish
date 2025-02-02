import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
  children: ReactNode
}

export type CartItem = {
  id: number,
  store: string,
  quantity: number
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number, store: string) => void
  decreaseCartQuantity: (id: number, store: string) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  function getItemQuantity(id: number) {
    return cartItems.filter(item => item.id === id)?.reduce((quantity, item) => item.quantity + quantity, 0)|| 0
  }
  function increaseCartQuantity(id: number, store: string) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id && item.store === store) === undefined) {
        return [...currItems, { id, store, quantity: 1 }]
      } 

      return currItems.map(item => {
        if (item.id === id && store === item.store) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })
    })
  }
  function decreaseCartQuantity(id: number, store: string) {
    setCartItems(currItems => {
      if(currItems.some(item => item.id === id && item.store === store)){
        currItems = currItems.map(item => {
          if (item.id === id && item.store === store) 
            return { ...item, quantity: item.quantity - 1 }
          else return item;
        })
      } else if (currItems.some(item => item.id === id)) {
        currItems.map(item =>{
          if(item.id == id) return { ...item, quantity: item.quantity - 1 };
          else return item;
        });
      } 
      return currItems.filter(item => item.quantity > 0);
    })
  }
  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
