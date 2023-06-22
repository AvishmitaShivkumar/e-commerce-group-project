import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState(() => {
    

    let user = localStorage.getItem("user");
    
    if(user){
        return JSON.parse(user)
    }
    else{
        return null
    }
})
  
  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
    </UserContext.Provider>
  )

};


