import { HashRouter, Route, Routes } from "react-router-dom";
import { useState , useEffect } from "react";

import Layout from "./layouts/Layout/Layout";
import Home from "./pages/Home/Home";
import Todo from "./pages/Todo/Todo";
import Calculator from "./pages/Calculator/Calculator";
import Components from "./pages/Components/Components";
import Products from "./pages/Products/Products";
import Carts from "./pages/Carts/Carts";
import Animation from "./pages/Animation/Animation";
import Login from "./pages/Login/Login";
import { fetchProducts } from "./data/products";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";


function App() {

  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    setProducts(fetchProducts())
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  if(token === "") {
    return <Login setToken={setToken}/>
  }
  else {
    return (
        <div>
          <div className="app-container">
            <HashRouter>
              <Routes>
                <Route element={<Layout products={products} carts={carts} setToken={setToken} />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/animation" element={<Animation />} />
                  <Route path="/components" element={<Components />} />
                  <Route path="/todo" element={<Todo />} />
                  <Route 
                    path="/products" 
                    element={<Products 
                    products={products} 
                    carts={carts}
                    setCarts={setCarts}/>} 
                  />
                  <Route path="/carts" element={<Carts carts={carts} setCarts={setCarts}/>} />
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>
            </HashRouter>
          </div>
        </div> 
    );
  }

}

export default App;
