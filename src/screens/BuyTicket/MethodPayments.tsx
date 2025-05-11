import React from "react";
import { View, Text, TouchableOpacity, Image, Platform, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import { AuthNavigationProp } from "../../navigation/AuthStack";

const MethodPayments = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  return (
    <Background>
      <View
        style={tw`flex-1 items-center justify-center px-6 ${
          Platform.OS === "ios" ? "pt-12" : "pt-20"
        }`} // Ajustar el padding para la barra de estado en iOS
      >
        {/* Logo */}
        <Image
          source={require("../../../assets/images/Logo.png")}
          style={tw`w-28 h-28 mb-6`}
          resizeMode="contain"
        />

        {/* Título */}
        <Text style={tw`text-white text-2xl font-bold mb-8 text-center`}>
          Método de pago
        </Text>

        {/* Botón Saldo */}
        <TouchableOpacity
          style={tw`w-full bg-white py-3 rounded-xl mb-4 shadow-md`}
          onPress={() => {
            // Simulación: Se deberá hacer una consulta al servidor antes de redirigir
            const hasEnoughBalance = true; // Simulación, se consumirá el backend después
            navigation.navigate(hasEnoughBalance ? "SuccessfulTicket" : "WrongProcess");
          }}
        >
          <Text style={tw`text-center text-lg font-bold text-gray-700`}>Saldo</Text>
        </TouchableOpacity>

        {/* Botón QR */}
        <TouchableOpacity
          style={tw`w-full bg-white py-3 rounded-xl mb-4 shadow-md`}
          onPress={() => navigation.navigate("QrPaymentTicket")}
        >
          <Text style={tw`text-center text-lg font-bold text-gray-700`}>QR</Text>
        </TouchableOpacity>

        {/* Botón Cancelar */}
        <TouchableOpacity
          style={tw`w-full bg-red-600 py-3 rounded-xl mt-6 shadow-md`}
          onPress={() => navigation.goBack()}
        >
          <Text style={tw`text-center text-lg font-bold text-white`}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default MethodPayments;
