import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Switch,
  Divider,
} from "@mui/material";
import AccountManager from "./AccountManager";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { Theme } from "../model/Theme";
import '../styles/settings.scss';

export default function Settings() {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleThemeChange = () => {
    setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <div className={`theme-${theme}`}>
      <Paper sx={{ maxWidth: 600, mx: "auto", mt: "2rem", padding: "10px" }} className="settingsBox">
        <h2>Settings</h2>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={theme === Theme.LIGHT}
                onChange={handleThemeChange}
              />
            }
            label="Dark Mode"
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <AccountManager />
        </FormGroup>
      </Paper>
    </div>
  );
}
