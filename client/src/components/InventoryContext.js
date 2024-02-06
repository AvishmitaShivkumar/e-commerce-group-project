import { createContext, useState, useEffect } from "react";

export const InventoryContext = createContext(null);

export const InventoryProvider = ({children}) => {
    const [allItems, setAllItems] = useState([]);
    const [allCompanies, setAllCompanies] = useState([]);
    
      // fetches all items and the companies and stores it in state
    useEffect(() => {
        Promise.all([
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/items`).then((response) => response.json()),
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/companies`).then((response) => response.json())
        ]).then(([itemsData, companiesData]) => {
            setAllItems(itemsData.data);
            setAllCompanies(companiesData.data);
        });
        }, []);

    return (
        <InventoryContext.Provider value={{ allItems, allCompanies }}>
            {children}
        </InventoryContext.Provider>
    )
};