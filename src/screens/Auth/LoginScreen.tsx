import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import LogoImg from "../../../assets/images/Logo.png";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProp } from "../../navigation/AuthStack";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [ci, setCi] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isButtonDisabled = ci.trim() === "" || password.trim() === "";

  const handleLogin = () => {
    if (ci === "10917763" && password === "10917763") {
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos.");
    }
  };

  return (
    <Background>
      <SafeAreaView style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`flex-grow justify-center px-6 py-8`}>
          <View style={tw`items-center`}>
            {/* Logo */}
            <Image source={LogoImg} style={tw`w-32 h-32 mb-8`} resizeMode="contain" />

            {/* Input CI */}
            <TextInput
              style={tw`w-full bg-white p-3 rounded-xl border border-gray-300 mb-4 text-lg`}
              placeholder="Introduzca su CI"
              keyboardType="numeric"
              value={ci}
              onChangeText={setCi}
            />

            {/* Input Contraseña */}
            <View style={tw`w-full flex-row items-center bg-white p-3 rounded-xl border border-gray-300 mb-4`}>
              <TextInput
                style={tw`flex-1 text-lg`}
                placeholder="Introduzca su contraseña"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <EyeOff size={24} color="gray" /> : <Eye size={24} color="gray" />}
              </TouchableOpacity>
            </View>

            {/* Botón de Ingreso */}
            <TouchableOpacity
              style={tw`w-full p-3 rounded-xl mb-4 ${isButtonDisabled ? "bg-gray-400" : "bg-green-500"}`}
              onPress={handleLogin}
              disabled={isButtonDisabled}
            >
              <Text style={tw`text-white text-center text-lg font-bold`}>Ingresar</Text>
            </TouchableOpacity>

            {/* Enlace de Registro */}
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={tw`text-white text-center mb-2 text-lg`}>
                ¿Aún no tienes una cuenta?{" "}
                <Text style={tw`text-green-400 font-bold`}>Regístrate</Text>
              </Text>
            </TouchableOpacity>

            {/* Enlace de Recuperar Contraseña */}
            <TouchableOpacity onPress={() => navigation.navigate("PasswordRecovery")}>
              <Text style={tw`text-white text-center mt-2 text-lg`}>
                ¿Olvidaste tu contraseña?{" "}
                <Text style={tw`text-green-400 font-bold`}>Recupérala</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default LoginScreen;
