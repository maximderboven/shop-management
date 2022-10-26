import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AppBar, IconButton, Menu, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import { Product } from "./components/Products/Product";
import { Products } from "./components/Products/Products";
import { EditProduct } from "./components/Products/EditProduct";
import { Floorplan } from "./components/Floorplan/Floorplan";
import { CreateProduct } from "./components/Products/CreateProduct";
import { Departments } from "./components/Departments/Departments";

axios.defaults.baseURL = "http://localhost:3001";
const queryClient = new QueryClient();


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/products/:id" element={<Product />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/floorplan/:id" element={<Floorplan />} />
            <Route path="/" element={<Departments />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
