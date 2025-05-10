import React from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

//Importaciones /screens/Auth/
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import RegisterVerificationScreen from "../screens/Auth/RegisterVerificationScreen";
import PasswordRecoveryScreen from "../screens/Auth/PasswordRecoveryScreen";
import PasswordVerificationScreen from "../screens/Auth/PasswordVerificationScreen";
import HomeScreen from "../screens/Auth/HomeScreen";

//Importaciones /screens/BuyTicket/
import OriginLine from "../screens/BuyTicket/OriginLine";
import OriginRedLineStations from "../screens/BuyTicket/OriginRedLineStations";
import OriginYellowLineStations from "../screens/BuyTicket/OriginYellowLineStations";
import OriginGreenLineStations from "../screens/BuyTicket/OriginGreenLineStations";
import DestinationLine from "../screens/BuyTicket/DestinationLine";
import DestinationRedLineStations from "../screens/BuyTicket/DestinationRedLineStations";
import DestinationYellowLineStations from "../screens/BuyTicket/DestinationYellowLineStations";
import DestinationGreenLineStations from "../screens/BuyTicket/DestinationGreenLineStations";
import QuantityCategory from "../screens/BuyTicket/QuantityCategory";
import MethodPayments from "../screens/BuyTicket/MethodPayments";
import QrPaymentTicket from "../screens/BuyTicket/QrPaymentTicket";
import SuccessfulTicket from "../screens/BuyTicket/SuccessfulTicket";
import WrongProcess from "../screens/BuyTicket/WrongProcess";

// Definir el tipo de las rutas
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterVerification: undefined;
  PasswordRecovery: undefined;
  PasswordVerification: undefined;
  NewPassword: undefined;
  Home: undefined;
  OriginLine: undefined;
  OriginRedLineStations: undefined;
  DestinationLine: undefined;
  DestinationRedLineStations: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RegisterVerification" component={RegisterVerificationScreen} />
      <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
      <Stack.Screen name="PasswordVerification" component={PasswordVerificationScreen} />
      <Stack.Screen name="OriginLine" component={OriginLine} />
      <Stack.Screen name="OriginRedLineStations" component={OriginRedLineStations} />
      <Stack.Screen name="DestinationLine" component={DestinationLine} />
      <Stack.Screen name="DestinationRedLineStations" component={DestinationRedLineStations} />
    </Stack.Navigator>
  );
};

export default AuthStack;

// Tipos para usar en otros archivos
export type AuthNavigationProp = StackNavigationProp<AuthStackParamList>;
export type AuthRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;
