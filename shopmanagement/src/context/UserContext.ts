import { createContext } from "react";

export interface IUserContext {
  email: boolean;
  login: () => void;
}

export default createContext<IUserContext>({
  email: true,
  login: () => {},
});
