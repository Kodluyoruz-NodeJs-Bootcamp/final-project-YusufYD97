import * as React from "react";
import { Link } from "react-router-dom";
import Home from "components/Home";
import Box from "@mui/material/Box";
import Login from "components/Login";
import Register from "components/Register";
import Button from "@mui/material/Button";

export interface IMenuItem {
    name: string;
    id: number;
    link: string;
}

const menuItems: IMenuItem[] = [
  {
    name: "Home",
    id: 0,
    link: "/",
  },
  {
    name: "Login",
    id: 1,
    link: "/login",
  },
  {
    name: "Register",
    id: 2,
    link: "/register",
  },
];

const Menu = () => {
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {menuItems.map((item: IMenuItem, index: number) => {
        return (
          <Button key={index} variant="text">
            <Link to={item.link}>{item.name}</Link>
          </Button>
        );
      })}
    </Box>
  );
};

export default Menu;
