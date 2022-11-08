import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import UserContext, { IUserContext } from "../contexts/UserContext";
import { Role } from "../model/Role";

export default function AccountManager() {
  const { loggedIn, email, login, logout } = useContext<IUserContext>(UserContext);
  return (
    <>
      {/* <FormControlLabel
        control={<Switch checked={email} onChange={login} />}
        label="Logged in"
      /> */}
      {loggedIn ? (
        <>
          <Typography variant="body1" sx={{pr:4}}>{email}</Typography>
          <Button variant="contained" color="primary" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={() => login("manager@ui3shop.com",Role.Admin)}>
          Login
        </Button>
      )}
    </>
  );
}
