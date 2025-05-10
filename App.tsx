import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";
import { TicketProvider } from "./src/context/TicketContext";
import { BalanceProvider } from "./src/context/BalanceContext";


export default function App() {
  return (
    <BalanceProvider>
      <TicketProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </TicketProvider>
    </BalanceProvider>
  );
}
