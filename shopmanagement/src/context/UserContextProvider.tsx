import { ReactElement } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import UserContext from "./UserContext";

interface IWithChildren {
  children: ReactElement | ReactElement[];
}

export default function UserContextProvider({ children }: IWithChildren) {
  const [email, setEmail] = useLocalStorage("email");

  const login = () => setEmail(!email);
  return (
    <UserContext.Provider value={{ email, login }}>
      {children}
    </UserContext.Provider>
  );
}
