import { createContext, useContext, useEffect, useState } from "react";

const SellerContext = createContext();

export function SellerProvider({ children }) {
  const [properties, setProperties] = useState(() => {
    const savedProperties = localStorage.getItem("sellerProperties");
    return savedProperties ? JSON.parse(savedProperties) : [];
  });

  const [sellerLoggedIn, setSellerLoggedIn] = useState(() => {
    return localStorage.getItem("sellerLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sellerProperties", JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem("sellerLoggedIn", String(sellerLoggedIn));
  }, [sellerLoggedIn]);

  function addProperty(property) {
    const newProperty = {
      id: Date.now(),
      ...property,
    };
    setProperties((prevProperties) => [...prevProperties, newProperty]);
  }

  function deleteProperty(id) {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== id)
    );
  }

  function updateProperty(id, updatedProperty) {
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === id
          ? { ...property, ...updatedProperty }
          : property
      )
    );
  }

  function sellerLogin() {
    setSellerLoggedIn(true);
  }

  function sellerLogout() {
    setSellerLoggedIn(false);
    localStorage.removeItem("sellerLoggedIn");
    
  }

  return (
    <SellerContext.Provider
      value={{
        properties,
        addProperty,
        deleteProperty,
        updateProperty,
        sellerLoggedIn,
        sellerLogin,
        sellerLogout,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
}

export function useSeller() {
  return useContext(SellerContext);
}