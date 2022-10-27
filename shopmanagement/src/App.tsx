import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Product } from "./components/Products/Product";
import { Products } from "./components/Products/Products";
import { EditProduct } from "./components/Products/EditProduct";
import { Floorplan } from "./components/Floorplan/Floorplan";
import { CreateProduct } from "./components/Products/CreateProduct";
import { Departments } from "./components/Departments/Departments";
import MenuIcon from "@mui/icons-material/Menu";
import { Navigation } from "./components/Navigation";
import About from "./components/About";
import Settings from "./components/Settings";
import { useEffect } from "react";

axios.defaults.baseURL = "http://localhost:3001";
const queryClient = new QueryClient();

type HeaderProps = {
  onOpenDrawer: () => void;
};

const Header = ({ onOpenDrawer }: HeaderProps) => (
  <AppBar position="static" color="transparent"  style={{zIndex:10000,backgroundColor:"#234671",color:"white"}}>
    <Toolbar sx={{ justifyContent: "flex-start" }}>
      <IconButton onClick={onOpenDrawer}>
        <MenuIcon style={{ color: 'white' }}/>
      </IconButton>
      <Typography variant="h6">UI3Shop</Typography>
    </Toolbar>
  </AppBar>
);

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState("UI3SHOP");

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header onOpenDrawer={handleDrawerToggle} />
          <Navigation
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
          <Routes>
            <Route path="/products/:id" element={<Product />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/floorplan/:id" element={<Floorplan />} />
            <Route path="/" element={<Departments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
