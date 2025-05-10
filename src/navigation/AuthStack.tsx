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

// Definir el tipo de las rutas
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterVerification: undefined;
  PasswordRecovery: undefined;
  PasswordVerification: undefined;
  NewPassword: undefined;
  Home: undefined;
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
    </Stack.Navigator>
  );
};

export default AuthStack;

// Tipos para usar en otros archivos
export type AuthNavigationProp = StackNavigationProp<AuthStackParamList>;
export type AuthRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;
