import * as React from 'react';
import { Offcanvas, Stack, Button } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItemDisplay, IngredientItem } from "./CartItemDisplay"
import { GetPrice } from "./CartItemDisplay"
import recipes from "../data/recipes.json"
import { Store } from "../pages/Store"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const [ cancelItems, setCancel ] = React.useState<Map<string, number>>(new Map<string, number>());
  const { closeCart, cartItems } = useShoppingCart()
  var ingredientDict = new Map<string, number>();
  var ingredients = new Array<IngredientItem>();
  
  cartItems.forEach(cartItem => {
    var recipe = recipes[cartItem.id]
    recipe.Ingredients.forEach(iName => {
      let itemKey = `${iName}::${cartItem.store}`;
      if(ingredientDict.has(itemKey)){
        ingredients[(ingredientDict.get(itemKey) || 0)].Quantity += cartItem.quantity;
      } else {
        ingredientDict.set(itemKey, ingredients.length);
        ingredients.push({Ingredient: iName, Store: cartItem.store, Quantity: cartItem.quantity});
      }
    })
  })

  let storeDict = new Map<string, IngredientItem[]>();
  ingredients.forEach(ingredient => {
    if (!storeDict.has(ingredient.Store))
      storeDict.set(ingredient.Store, []);
    storeDict.get(ingredient.Store)?.push(ingredient);
  });


  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
        <Button variant="outline-primary" className="ms-auto">Trash Icon Here</Button>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Stack gap={3}>
          {
            [...storeDict].map(([key, store]) => (
              <>
              <h4>{key as string}</h4>
              {store.map(item => (
                <CartItemDisplay key = {item.Ingredient + item.Store}
                {...item} CancelItem={cancelItems} SetCancel={setCancel}
                />
              ))}
              </>
            ))
          }
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              ingredients.reduce((total, cartItem) => {
                let quantity = cartItem.Quantity - (cancelItems.get(`${cartItem.Ingredient}::${cartItem.Store}`) || 0)
                return total + GetPrice({
                  Ingredient: cartItem.Ingredient,
                  Store: cartItem.Store,
                  Quantity: quantity
                });
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
