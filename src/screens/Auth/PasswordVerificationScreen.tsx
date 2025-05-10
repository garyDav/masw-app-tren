import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import { AuthNavigationProp } from "../../navigation/AuthStack";
import LogoImg from "../../../assets/images/Logo.png";

const RegisterVerificationScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [code, setCode] = useState("");
  const [counter, setCounter] = useState(60);

  // Manejo del contador
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  const handleVerification = () => {
    if (!code.trim()) {
      Alert.alert("Error", "Por favor, ingrese el código.");
      return;
    }
    Alert.alert("Éxito", "Código verificado correctamente.");
    navigation.navigate("NewPassword");
  };

  const handleResend = () => {
    setCounter(60); // Reinicia el contador
    Alert.alert("Código reenviado", "Se ha enviado un nuevo código.");
  };

  return (
    <Background>
      <SafeAreaView style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`flex-grow justify-center px-6 py-8`}>
          <View style={tw`items-center`}>
            {/* Logo */}
            <Image source={LogoImg} style={tw`w-24 h-24 mb-6`} />

            {/* Mensaje de instrucción */}
            <Text style={tw`text-white text-center text-lg mb-5`}>
              Introduzca el código enviado a su WhatsApp o correo electrónico{"\n"}
              (revise el buzón de spam)
            </Text>

            {/* Input del código */}
            <TextInput
              style={tw`w-full bg-white p-3 rounded-xl border border-gray-300 mb-4 text-lg text-center`}
              placeholder="Código"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
            />

            {/* Botón de Verificar */}
            <TouchableOpacity
              style={tw`w-full p-3 rounded-xl ${code.trim() ? "bg-green-500" : "bg-gray-400"}`}
              onPress={handleVerification}
              disabled={!code.trim()}
            >
              <Text style={tw`text-white text-center text-lg font-bold`}>
                Verificar
              </Text>
            </TouchableOpacity>

            {/* Contador y botón de reenviar */}
            <View style={tw`flex-row items-center mt-4`}>
              <Text style={tw`text-white text-lg`}>
                Reenviar en {counter}s
              </Text>
              <TouchableOpacity
                style={[tw`ml-3 p-2 rounded-lg`, counter === 0 ? tw`bg-green-500` : tw`bg-gray-400`]}
                onPress={handleResend}
                disabled={counter > 0}
              >
                <Text style={tw`text-white text-center font-bold`}>
                  Reenviar código
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default RegisterVerificationScreen;
