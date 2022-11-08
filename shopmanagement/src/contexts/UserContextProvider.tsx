import { ReactElement } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Role } from "../model/Role";
import UserContext from "./UserContext";

interface IWithChildren {
  children: ReactElement | ReactElement[];
}

export default function UserContextProvider({ children }: IWithChildren) {
  const [role, setRole] = useLocalStorage("role");
  const [email, setEmail] = useLocalStorage("email");
  const [loggedIn, setlogin] = useLocalStorage("loggedIn");

  const login = (email: string, role: Role) => {
    setEmail(email);
    setRole(role);
    setlogin(true);
  };

  const logout = () => {
    setEmail("");
    setlogin(false);
    setRole(Role.Guest);
  };

  return (
    <UserContext.Provider value={{  loggedIn, email, role, login, logout}}>
      {children}
    </UserContext.Provider>
  );
}
