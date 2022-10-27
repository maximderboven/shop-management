import { Button, FormControlLabel, Switch, Typography } from "@mui/material";
import { useContext } from "react";
import UserContext, { IUserContext } from "../context/UserContext";

export default function AccountManager() {
  const { email, login } = useContext<IUserContext>(UserContext);
  return (
    <>
      {/* <FormControlLabel
        control={<Switch checked={email} onChange={login} />}
        label="Logged in"
      /> */}
      {email ? (
        <Typography variant="h6">{email}</Typography> && (
          <Button variant="contained" color="primary" onClick={login}>
            Logout
          </Button>
        )
      ) : (
        <Button variant="contained" color="primary" onClick={login}>
          Login
        </Button>
      )}
    </>
  );
}
