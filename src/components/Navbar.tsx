import {Navbar as NavbarBs, Container,Nav,Button} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
  const {cartQuantity,openCart}=useShoppingCart()
  return <>
<NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
    <Container>
       <Nav className="me-auto">
        <Nav.Link to="/" as={NavLink}>
            Home
        </Nav.Link>
        <Nav.Link to="/store" as={NavLink}>
            Store
        </Nav.Link>
        <Nav.Link to="/about" as={NavLink}>
            About
        </Nav.Link>
       </Nav>
{cartQuantity > 0 && (
         <Button onClick={openCart} style={{width: "3rem", height:"3rem", position : "relative"}}
         variant="outline-primary" 
         className="rounded-circle">
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="16" height="16" fill="currentColor" 
        className="bi bi-cart-fill" viewBox="0 0 16 16">
   <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
 </svg>
 <div className="rounded-circle bg-danger d-flex 
 justify-content-center align-items-center"
 style={{color :"white", 
 width :"1.3rem",
  height : "1.3rem",
  position:"absolute",
  transform :"translate(60%, -5%)", 
  fontSize:"0.8rem"}}> {cartQuantity} </div>
        </Button>
) }
    </Container>
</NavbarBs>
  </>;
};

export default Navbar;
