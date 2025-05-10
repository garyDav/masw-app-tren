import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProp, AuthStackParamList } from "../../navigation/AuthStack";
import { useTicket } from "../../context/TicketContext";
import LogoImg from "../../../assets/images/Logo.png";
import Background from "../../components/Background";

const OriginLine = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { setTicketData } = useTicket();

  const selectLine = (line: string, screen: keyof AuthStackParamList) => {
    setTicketData((prev) => ({ ...prev, originLine: line }));
    navigation.navigate(screen);
  };

  const handleCancel = () => {
    Alert.alert(
      "Confirmar cancelación",
      "¿Estás seguro de que quieres cancelar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
  };

  return (
    <Background>
      <View style={tw`flex-1 justify-center items-center px-6`}>
        {/* Logo */}
        <Image source={LogoImg} style={tw`w-24 h-24 mb-8`} />

        {/* Título */}
        <Text style={tw`text-white text-xl font-bold mb-4 text-center`}>
          Seleccione la línea de origen
        </Text>

        {/* Botón Línea Roja */}
        <TouchableOpacity
          style={tw`w-full flex-row items-center bg-white p-4 rounded-full mb-3 border border-gray-300 shadow-md`}
          onPress={() => selectLine("Roja", "OriginRedLineStations")}
        >
          <View style={tw`w-6 h-6 bg-red-500 rounded-full mr-3`} />
          <Text style={tw`text-black text-lg font-bold`}>Roja</Text>
        </TouchableOpacity>

        {/* Botón Línea Amarilla */}
        <TouchableOpacity
          style={tw`w-full flex-row items-center bg-white p-4 rounded-full mb-3 border border-gray-300 shadow-md`}
          onPress={() => selectLine("Amarilla", "OriginYellowLineStations")}
        >
          <View style={tw`w-6 h-6 bg-yellow-300 rounded-full mr-3`} />
          <Text style={tw`text-black text-lg font-bold`}>Amarilla</Text>
        </TouchableOpacity>

        {/* Botón Línea Verde */}
        <TouchableOpacity
          style={tw`w-full flex-row items-center bg-white p-4 rounded-full mb-6 border border-gray-300 shadow-md`}
          onPress={() => selectLine("Verde", "OriginGreenLineStations")}
        >
          <View style={tw`w-6 h-6 bg-green-500 rounded-full mr-3`} />
          <Text style={tw`text-black text-lg font-bold`}>Verde</Text>
        </TouchableOpacity>

        {/* Botón Cancelar */}
        <TouchableOpacity
          style={tw`w-full bg-red-500 p-4 rounded-full shadow-md`}
          onPress={handleCancel}
        >
          <Text style={tw`text-white text-lg font-bold text-center`}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default OriginLine;
