import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import {Table, TableHead, TableRow, Box, TableCell, TableBody, ListItem} from "@mui/material/"
import {Paper, List} from "@mui/material/"
import { MealCategory } from "../pages/Store"
import { GetPrice } from "./CartItemDisplay"
import recipes from "../data/recipes.json"


type Recipe = {
  Id: number,
  Servings: number, 
  Name : string,
  Category: string,
  Ingredients: string[]
}

type StoreTableProps = {
  category: MealCategory
  store: string
}

export function StoreTable({category, store} : StoreTableProps){
  const CategoryRecipes = recipes.filter( (recipe : Recipe) => recipe.Category == category.Name )
  return (
      <Box sx={{ overflowX: 'auto' }}>
      <Card>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell>Purchase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              CategoryRecipes.map((recipe : Recipe) => (
                <StoreItem
                  category={recipe}
                  store= {store}
                />
              ))
            }
          </TableBody>
        </Table>
        </Card>
      </Box>
    
  );
}


type StoreItemProps = {
  category: Recipe
  store: string
}

export function StoreItem({ category, store }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(category.Id)
  var totalCost = 0;
  category.Ingredients.forEach(ingredient => totalCost += GetPrice({Ingredient: ingredient, Store: store, Quantity: 1}));

  return (
    <TableRow >
    <TableCell>
      <span className="fs-2">{category.Name}</span>
    </TableCell>
    <TableCell>
      <div className="d-flex align-items-center flex-column">
      <span className="ms-2 text-muted">Cost: ${totalCost.toFixed(2)}</span>
      <span className="ms-2 text-muted">Cost-Per Serving: ${(totalCost / category.Servings).toFixed(2)}</span>
      </div>
    </TableCell>
    <TableCell>
    <Paper style={{maxHeight: '100px', overflow: 'auto'}}>
      <List>
        { category.Ingredients.map(ingredient => (
          <ListItem>{ingredient}</ListItem>
        ))}
      </List>
    </Paper>
    </TableCell>
    <TableCell sx={{width: '150px'}}>
      {quantity === 0 ? (
        <Button className="w-100" onClick={() => increaseCartQuantity(category.Id, store)}>
          + Add To Cart
        </Button>
      ) : (
        <div
          className="d-flex align-items-center flex-column"
          style={{ gap: ".5rem" }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ gap: ".5rem" }}
          >
            <Button onClick={() => decreaseCartQuantity(category.Id, store)}>-</Button>
            <div>
              <span className="fs-3">{quantity}</span> in cart
            </div>
            <Button onClick={() => increaseCartQuantity(category.Id, store)}>+</Button>
          </div>
          <Button
            onClick={() => removeFromCart(category.Id)}
            variant="danger"
            size="sm"
          >
            Remove
          </Button>
        </div>
      )}
    </TableCell>
    </TableRow>
  )
}

