import React, { createContext, useContext, useState } from "react";

// Definir el tipo de datos
interface BalanceData {
  amount: number;
}

// Estado inicial vacío
const initialState: BalanceData = {
  amount: 0,
};

// Crear contexto
const BalanceContext = createContext<{
  balanceData: BalanceData;
  setBalanceData: React.Dispatch<React.SetStateAction<BalanceData>>;
}>({
  balanceData: initialState,
  setBalanceData: () => {},
});

// Proveedor de contexto
export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balanceData, setBalanceData] = useState<BalanceData>(initialState);

  // Log para depuración
  console.log("BalanceData actualizado:", balanceData);

  return (
    <BalanceContext.Provider value={{ balanceData, setBalanceData }}>
      {children}
    </BalanceContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useBalance = () => useContext(BalanceContext);