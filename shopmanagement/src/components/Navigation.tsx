import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import BoardsIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from '@mui/icons-material/Settings';
import AboutIcon from "@mui/icons-material/InfoOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {useContext} from "react";
import UserContext, { IUserContext } from "../context/UserContext";
import { Role } from "../model/Role";

interface NavigationProps {
    isOpen: boolean;
    onClose: () => void
}

export function Navigation({isOpen, onClose}: NavigationProps) {
    const { loggedIn, role } = useContext<IUserContext>(UserContext);
    return (
        <div>
            <Drawer open={isOpen} onClose={onClose}>
                <List sx={{width: 200}}>
                    {[
                        {label: "Products", link: "/products", icon: <ShoppingBasketIcon/>},
                        (loggedIn && (role === Role.Admin)) ? {label: "Departments", link: "/departments", icon: <CategoryIcon/> } : null,
                        {label: "Settings", link: "/settings", icon: <SettingsIcon/>},
                        {label: "About", link: "/about", icon: <AboutIcon/>},
                    ].map((menuItem) => (
                        (menuItem) ? (
                        <ListItem disableGutters key={menuItem.link}>
                            <ListItemButton component="a" href={menuItem.link}>
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText primary={menuItem.label}/>
                            </ListItemButton>
                        </ListItem>
                        ) : null
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
