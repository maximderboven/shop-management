import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
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
import UserContextProvider from "./contexts/UserContextProvider";
import { useContext, useState } from "react";
import UserContext, { IUserContext } from "./contexts/UserContext";
import AccountManager from "./components/AccountManager";
import { ThemeContext } from "./contexts/ThemeContext";
import { Role } from "./model/Role";
import { Theme } from "./model/Theme";

axios.defaults.baseURL = "http://localhost:3001";
const queryClient = new QueryClient();

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState("UI3SHOP");
  const { loggedIn, role } = useContext<IUserContext>(UserContext);
  
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(isBrowserDefaultDark() ? Theme.DARK : Theme.LIGHT);


  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <BrowserRouter>
              <AppBar
                position="static"
                color="transparent"
                style={{
                  zIndex: 10000,
                  backgroundColor: "#234671",
                  color: "white",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    borderRadius: 1,
                  }}
                >
                  <Grid item>
                    <Toolbar>
                      <IconButton onClick={handleDrawerToggle}>
                        <MenuIcon style={{ color: "white" }} />
                      </IconButton>
                      <Typography variant="h6">UI3Shop</Typography>
                    </Toolbar>
                  </Grid>
                  <Grid item>
                    <Toolbar>
                      <AccountManager />
                    </Toolbar>
                  </Grid>
                </Grid>
              </AppBar>
              <Navigation
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              />
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id/edit" element={<EditProduct />} />
                <Route path="/products/create" element={<CreateProduct />} />
                <Route path="/floorplan/:id" element={<Floorplan />} />
                <Route
                  path="/floorplan/:id/:productId"
                  element={<Floorplan />}
                />
                <Route path="/departments" element={<Departments />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </BrowserRouter>
            {/* <Footer></Footer> */}
          </ThemeContext.Provider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
