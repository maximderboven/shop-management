import { createContext } from "react";
import { Role } from "../model/Role";

export interface IUserContext {
  loggedIn: boolean;
  email: string;
  role: Role;
  login: (email: string, role: Role) => void;
  logout: () => void;
}

export default createContext<IUserContext>({
  loggedIn: false,
  email: "",
  role: Role.Guest,
  login: () => {},
  logout: () => {}
});
