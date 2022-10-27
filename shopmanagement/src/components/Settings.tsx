import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import UserContext, { IUserContext } from "../context/UserContext";
import AccountManager from "./AccountManager";

export default function Settings() {
  const { email, login } = useContext<IUserContext>(UserContext);
  return (
    <div className="settings">
      <h2>Settings</h2>
      <FormControl>
        <FormLabel>Change settings</FormLabel>
        <FormGroup>

          <AccountManager />
        </FormGroup>
      </FormControl>
    </div>
  );
}
