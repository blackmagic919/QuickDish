import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import React, { useEffect } from "react";

// function App() {
//   return (
//     <ShoppingCartProvider>
//       <Navbar />
//       <Container className="mb-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/store" element={<Store />} />
//           <Route path="/about" element={<About />} />
//         </Routes>
//       </Container>
//     </ShoppingCartProvider>
//   )
// }

const App: React.FC = () => {
  useEffect(() => {
      document.body.style.fontFamily = "'Inter', sans-serif";
  }, []);

  return (
    <ShoppingCartProvider >
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
