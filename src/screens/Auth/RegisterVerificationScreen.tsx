import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import { AuthNavigationProp } from "../../navigation/AuthStack";
import LogoImg from "../../../assets/images/Logo.png";

const RegisterVerificationScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [code, setCode] = useState("");
  const [counter, setCounter] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [counter]);

  const handleVerification = () => {
    if (code.length !== 6) {
      Alert.alert("Error", "Ingrese un código válido de 6 dígitos.");
      return;
    }
    Alert.alert("Éxito", "Código verificado correctamente.");
    navigation.navigate("Login");
  };

  const handleResend = () => {
    setCounter(60);
    setIsResendDisabled(true);
    Alert.alert("Código reenviado", "Se ha enviado un nuevo código.");
  };

  return (
    <Background>
      <View style={tw`flex-1 justify-center items-center px-5`}>
        {/* Logo */}
        <Image source={LogoImg} style={{ width: 100, height: 100, marginBottom: 20 }} />

        {/* Mensaje de instrucción */}
        <Text style={tw`text-white text-center mb-5`}>
          Introduzca el código enviado a su WhatsApp o correo electrónico (revise el buzón de spam)
        </Text>

        {/* Input del código */}
        <TextInput
          style={tw`w-full bg-white p-3 rounded-xl border border-gray-300 mb-4 text-center text-lg`}
          placeholder="Código"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
        />

        {/* Botón de Verificar */}
        <TouchableOpacity
          style={tw`bg-green-500 p-3 rounded-xl w-full`}
          onPress={handleVerification}
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>Verificar</Text>
        </TouchableOpacity>

        {/* Contador y botón de reenviar */}
        <View style={tw`flex-row items-center mt-4`}>
          <Text style={tw`text-white`}>Reenviar en {counter}s</Text>
          <TouchableOpacity
            style={[tw`ml-3 p-2 rounded`, isResendDisabled ? tw`bg-gray-400` : tw`bg-green-500`]}
            onPress={handleResend}
            disabled={isResendDisabled}
          >
            <Text style={tw`text-white text-center`}>Reenviar código</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default RegisterVerificationScreen;
