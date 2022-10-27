import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from "@mui/material";
import { useContext } from "react";

export default function Settings() {
  return (
    <div className="settings">
      <h2>Settings</h2>
      <FormControl>
        <FormLabel>Change settings</FormLabel>
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Show names" />
        </FormGroup>
      </FormControl>
    </div>
  );
}
