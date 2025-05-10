import React, { createContext, useContext, useState } from "react";

// Definir el tipo de datos que manejaremos
interface TicketData {
  originStation: string;
  originLine: string;
  destinationStation: string;
  destinationLine: string;
  categoryQuantities: { [key: string]: number };
  total: number;
}

// Estado inicial vacío
const initialState: TicketData = {
  originStation: "",
  originLine: "",
  destinationStation: "",
  destinationLine: "",
  categoryQuantities: {},
  total: 0,
};

// Crear contexto
const TicketContext = createContext<{
  ticketData: TicketData;
  setTicketData: React.Dispatch<React.SetStateAction<TicketData>>;
}>({
  ticketData: initialState,
  setTicketData: () => {},
});

// Proveedor de contexto
export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ticketData, setTicketData] = useState<TicketData>(initialState);

  return (
    <TicketContext.Provider value={{ ticketData, setTicketData }}>
      {children}
    </TicketContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useTicket = () => useContext(TicketContext);
