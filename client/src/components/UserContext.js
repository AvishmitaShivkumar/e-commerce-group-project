import { createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {

  
  return (
    <UserContext.Provider>
            {children}
        </UserContext.Provider>
  )

};


