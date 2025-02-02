import { Button, Card, Col, Row} from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import {Pizza01Icon, Hamburger01Icon, NoodlesIcon, Taco01Icon, RiceBowl01Icon, Sushi01Icon, BbqGrillIcon, FryIcon,SpaghettiIcon} from "hugeicons-react";

type CategoryItemProps = {
  name: string
  imgUrl: string
  OnClick?: () => void;
}

const iconMapping: Record<string, JSX.Element> = {
  "Pizza": <Pizza01Icon size={128} color="#fedebe" style={{fontWeight: "bold"}} />, 
  "Burger": <Hamburger01Icon size={128} color="#fedebe" style={{fontWeight: "bold"}} />, 
  "Pasta": <SpaghettiIcon size={128} color="#fedebe" style={{fontWeight: "bold"}} />, 
  "Taco": <Taco01Icon size={128} color="#fedebe" style={{fontWeight: "bold"}} />, 
  "Curry": <BbqGrillIcon size={128} color="#fedebe" style={{fontWeight: "bold"}} />,
  "Ramen": <NoodlesIcon size={128} color="#fedebe" style={{fontWeight: "bold"}} />,
  "Sushi": <Sushi01Icon size={128} color="#fedebe" style={{fontWeight: "bold"}} /> 
};

export function CategoryItem({ name, imgUrl, OnClick }: CategoryItemProps) {
  return (
    <Card className="h-100" onClick={OnClick}>
      <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{ height: "200px", backgroundColor: "#fe6e00"}}>
        {iconMapping[name]}
      </Card.Body>
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
        </Card.Title>
      </Card.Body>
    </Card>
  )
}


