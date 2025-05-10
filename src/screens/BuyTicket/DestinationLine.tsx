import React from "react";
import { View, Text, TouchableOpacity, Image, Platform, StatusBar } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTicket } from "../../context/TicketContext";
import LogoImg from "../../../assets/images/Logo.png";
import Background from "../../components/Background";

type NavigationProp = StackNavigationProp<AuthStackParamList, "DestinationLine">;

const DestinationLine = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setTicketData } = useTicket();

  const selectLine = (
    line: string,
    screen: "DestinationRedLineStations" | "DestinationYellowLineStations" | "DestinationGreenLineStations"
  ) => {
    setTicketData((prev) => ({ ...prev, destinationLine: line }));
    navigation.navigate(screen);
  };

  return (
    <Background>
      <View
        style={tw`flex-1 justify-center items-center px-6 ${
          Platform.OS === "ios" ? "pt-10" : "pt-20"
        }`} // Ajuste de padding para iOS
      >
        {/* Logo */}
        <Image source={LogoImg} style={tw`w-24 h-24 mb-8`} />

        {/* Título */}
        <Text style={tw`text-white text-xl font-bold mb-4 text-center`}>
          Seleccione la línea de destino
        </Text>

        {/* Botón Línea Roja */}
        <TouchableOpacity
          style={tw`w-full flex-row items-center bg-white p-4 rounded-full mb-3 border border-gray-300`}
          onPress={() => selectLine("Roja", "DestinationRedLineStations")}
        >
          <View style={tw`w-6 h-6 bg-red-500 rounded-full mr-3`} />
          <Text style={tw`text-black text-lg font-bold`}>Roja</Text>
        </TouchableOpacity>

        {/* Botón Línea Amarilla */}
        <TouchableOpacity
          style={tw`w-full flex-row items-center bg-white p-4 rounded-full mb-3 border border-gray-300`}
          onPress={() => selectLine("Amarilla", "DestinationYellowLineStations")}
        >
          <View style={tw`w-6 h-6 bg-yellow-300 rounded-full mr-3`} />
          <Text style={tw`text-black text-lg font-bold`}>Amarilla</Text>
        </TouchableOpacity>

        {/* Botón Línea Verde */}
        <TouchableOpacity
          style={tw`w-full flex-row items-center bg-white p-4 rounded-full mb-6 border border-gray-300`}
          onPress={() => selectLine("Verde", "DestinationGreenLineStations")}
        >
          <View style={tw`w-6 h-6 bg-green-500 rounded-full mr-3`} />
          <Text style={tw`text-black text-lg font-bold`}>Verde</Text>
        </TouchableOpacity>

        {/* Botón Cancelar */}
        <TouchableOpacity
          style={tw`w-full bg-red-500 p-4 rounded-full`}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={tw`text-white text-lg font-bold text-center`}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default DestinationLine;
