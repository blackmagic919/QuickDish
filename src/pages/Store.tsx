import * as React from 'react'
import { useLocation } from 'react-router-dom';
import { Col, Row } from "react-bootstrap"
import { CategoryItem } from "../components/CategoryItem"
import mealItems from "../data/meals.json"
import storeInfo from "../data/storeInfo.json"
import recipes from "../data/recipes.json";

import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import {XVariableCircleIcon as XCircle} from "hugeicons-react";
import { StoreTable } from '../components/StoreItem'
import { Stack, Select, MenuItem } from '@mui/material/'

export interface MealCategory {
  Name : string
  ImgUrl : string,
  Variants : string[]
}

export function Store() {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery?.toLowerCase() || "";
  const [isOpen, setIsOpen] = React.useState<string>("");
  const [store, selectStore] = React.useState<string>(storeInfo[0].Name);
  const togglePopup = (name : string) => {
    if(isOpen === name) setIsOpen("");
    else setIsOpen(name);
  };
  
  return (
      <div>
      <Stack 
        direction="row" 
        spacing={3} 
        sx={{
          overflow: "visible", 
          marginBottom: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
        }}
      >
        {/* <h1>Store: </h1> */}
        <Select 
          // variant="standard"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={store}
          label="Store"
          onChange={(e) => selectStore(e.target.value)}
          sx={{
            minWidth: 200,
            backgroundColor: "#fe6e00",
            overflow: "visible", 
            color: "black",
            zIndex: 1000,
            borderRadius: '25px',
          }}
          displayEmpty
        >
          <MenuItem value="" disabled>Select Store</MenuItem>
          {storeInfo.map(shop => (
              <MenuItem value={shop.Name}>{shop.Name}</MenuItem>
          ))}
          
        </Select>
      </Stack>
      <Row md={3} xs={1} lg={3} className="g-3">
  {mealItems.Categories.map((meal: MealCategory) => (
    <Col key={meal.Name}>
      <div style={{ 
        borderRadius: '100px', 
        background: "white", 
        overflow: "hidden", 
        textAlign: "center", 
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" 
      }}> 
        <CategoryItem 
          name={meal.Name}
          imgUrl={meal.ImgUrl}
          OnClick={() => togglePopup(meal.Name)}
        />
      </div>
      <Popover 
        open={meal.Name === isOpen} 
        onClose={togglePopup} 
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        sx={{ borderRadius: "100px", width: "100%" }} 
      >
        <div style={{
          position: "relative", 
          borderRadius: "0px",
          background: "#fedebe",
          width: "100%",
          height: "100%",
          padding: "20px",
        }}>
          <Button 
            onClick={() => togglePopup(meal.Name)}
            sx={{
              position: "absolute",
              zIndex: 10000,
              top: 10,
              right: 10,
              minWidth: "30px",
              padding: "5px",
              borderRadius: "50%",
              backgroundColor: "white",
              color: "#fe6e00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { backgroundColor: "#ddd" }
            }}
          >
            <XCircle size={24} />
          </Button>

          <StoreTable category={meal} store={store} />
        </div>
      </Popover>
    </Col>
  ))}
</Row>
</div>
  )
}
