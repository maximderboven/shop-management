import { createContext } from 'react';
import { Theme } from '../model/Theme';

export const ThemeContext = createContext({
  theme: Theme.LIGHT,
  setTheme: (theme: Theme) => {}},
);