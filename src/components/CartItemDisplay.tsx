import { Button, Stack } from "react-bootstrap"
import { useShoppingCart, CartItem } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"
import storeInfo from "../data/storeInfo.json"
import React from "react"

type StoreInventory = {
  Name : string,
  Id: number,
  Price: number,
  Type: string,
  Stock: number,
  Brand: string
}

export type IngredientItem = {
  Ingredient : string
  Store: string,
  Quantity: number
}

export interface IngredientProperty {
  Ingredient : string
  Store: string,
  Quantity: number
  CancelItem :  Map<string, number>,
  SetCancel: (thing : Map<string, number>) => void
}

export function GetPrice({ Ingredient, Store, Quantity }: IngredientItem){
  var shop = storeInfo.findLast(shop => shop.Name === Store);
  if(!shop?.Inventory.some(item => item.Name == Ingredient)) console.log(Ingredient);
  var item = shop?.Inventory.find(item => item.Name == Ingredient) as StoreInventory;
  return item.Price * Quantity;
}

export function CartItemDisplay({Ingredient, Store, Quantity, CancelItem, SetCancel} : IngredientProperty) 
{
  var shop = storeInfo.findLast(shop => shop.Name === Store);
  var item = shop?.Inventory.find(item => item.Name == Ingredient) as StoreInventory;
  if (item == null) return null;
  const [cancelAmount, setCancelAmount] = React.useState(0);

  React.useEffect(() => {
    let key = `${Ingredient}::${Store}`;
    let amount = CancelItem?.get(key) || 0;
    if(amount < 0 || amount > Quantity) AssertCancel();
    else setCancelAmount(CancelItem?.get(key) || 0);
  }, [CancelItem]);

  function AssertCancel(){
    var nCancel = new Map<string, number>();
    CancelItem.forEach((value, key) => (
      nCancel.set(key, value)
    ))
    let key = `${Ingredient}::${Store}`;
    let nValue = (nCancel.get(key) || 0);
    nValue = nValue > Quantity ? Quantity : nValue;
    nValue = nValue < 0 ? 0 : nValue;
    nCancel.set(key, nValue);
    SetCancel(nCancel);
  }

  function AddCancel(){
    var nCancel = new Map<string, number>();
    CancelItem.forEach((value, key) => (
      nCancel.set(key, value)
    ))
    let key = `${Ingredient}::${Store}`;
    let nValue = (nCancel.get(key) || 0) + 1;
    if(nValue > Quantity) nValue = Quantity;
    nCancel.set(key, nValue);
    SetCancel(nCancel);
  }


  function DecreaseCancel(){
    var nCancel = new Map<string, number>();
    CancelItem.forEach((value, key) => (
      nCancel.set(key, value)
    ))
    let key = `${Ingredient}::${Store}`;
    let nValue = (nCancel.get(key) || 0) - 1;
    if(nValue < 0) nValue = 0;
    nCancel.set(key, nValue);
    SetCancel(nCancel);
  }

  function SwapCancel(){
    var nCancel = new Map<string, number>();
    CancelItem.forEach((value, key) => (
      nCancel.set(key, value)
    ))
    let key = `${Ingredient}::${Store}`;
    let nValue = (nCancel.get(key) || 0);
    if(nValue >= Quantity) nValue = 0;
    else nValue = Quantity;
    nCancel.set(key, nValue);
    SetCancel(nCancel);
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <div className="me-auto">
        <div>
        <button
          onClick={SwapCancel}
          style={{
            all: 'unset',  
            cursor: 'pointer',  
            background: 'none',  
            border: 'none',     
            padding: '0',       
            margin: '0',        
            textDecoration: cancelAmount == Quantity ? "line-through" : "none",
          }}
        >
          {item.Name}{" "}
        </button>
          {Quantity > 1 && (
            <button
              onClick={AddCancel}
              style={{
                all: 'unset',  
                cursor: 'pointer',  
                background: 'none',  
                border: 'none',     
                padding: '0',       
                margin: '0',        
                textDecoration: cancelAmount != 0 ? "line-through" : "none",
              }}
            >
            <span className="text-muted" style={{ fontSize: "0.8rem" }}>
              x{Quantity}
            </span> 
            </button>
          )}
          {Quantity > 1  && cancelAmount > 0 && cancelAmount < Quantity && (
            <button
            onClick={DecreaseCancel}
            style={{
              all: 'unset',  
              cursor: 'pointer',  
              background: 'none',  
              border: 'none',     
              padding: '0',       
              margin: '0',        
            }}
          >
            <span className="text-muted" style={{ fontSize: "0.8rem" }}>
              x{cancelAmount}
            </span> 
          </button>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.Price)}
        </div>
      </div>
      <div> {formatCurrency(item.Price * (Quantity - cancelAmount))}</div>
      {/*<Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>*/}
    </Stack>
  )
}
