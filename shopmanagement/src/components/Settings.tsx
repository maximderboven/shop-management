import {
  FormControl,
  FormGroup,
  FormLabel,
} from "@mui/material";
import AccountManager from "./AccountManager";

export default function Settings() {
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
