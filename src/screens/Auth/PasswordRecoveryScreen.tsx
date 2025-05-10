import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import LogoImg from "../../../assets/images/Logo.png";
import { AuthNavigationProp } from "../../navigation/AuthStack";

const PasswordRecoveryScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [recoveryInput, setRecoveryInput] = useState("");

  const isValidRecovery = () => {
    return (
      /\S+@\S+\.\S+/.test(recoveryInput) || // Validar correo electrónico
      /^\+591\d{7,8}$/.test(recoveryInput)   // Validar número de WhatsApp con prefijo +591
    );
  };

  const handleRecovery = () => {
    if (!isValidRecovery()) {
      Alert.alert("Error", "Ingrese un correo electrónico válido o un número de WhatsApp válido.");
      return;
    }
    navigation.navigate("PasswordVerification");
  };

  return (
    <Background>
      <SafeAreaView style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`flex-grow justify-center px-6 py-8`}>
          <View style={tw`items-center`}>
            {/* Logo */}
            <Image source={LogoImg} style={tw`w-24 h-24 mb-6`} />
            
            {/* Texto descriptivo */}
            <Text style={tw`text-white text-center text-lg mb-4`}>
              Introduzca su correo electrónico o su número de WhatsApp
            </Text>

            {/* Input de recuperación */}
            <TextInput
              style={tw`w-full bg-white p-3 rounded-xl border border-gray-300 mb-4 text-lg`}
              placeholder="Ej: usuario@gmail.com o +59171234567"
              keyboardType="email-address"
              value={recoveryInput}
              onChangeText={(text) =>
                setRecoveryInput(text.startsWith("+591") ? text : text.includes("@") ? text : "+591" + text.replace(/\D/g, ""))
              }
            />

            {/* Botón Recuperar */}
            <TouchableOpacity
              disabled={!isValidRecovery()}
              style={tw`w-full p-3 rounded-xl ${isValidRecovery() ? "bg-green-500" : "bg-gray-400"}`}
              onPress={handleRecovery}
            >
              <Text style={tw`text-white text-center text-lg font-bold`}>
                Recuperar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default PasswordRecoveryScreen;
