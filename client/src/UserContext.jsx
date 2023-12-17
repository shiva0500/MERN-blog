import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [emailInfo, setEmailInfo] = useState({});

  return (
    <UserContext.Provider value={{ emailInfo, setEmailInfo }}>
      {children}
    </UserContext.Provider>
  );
};
