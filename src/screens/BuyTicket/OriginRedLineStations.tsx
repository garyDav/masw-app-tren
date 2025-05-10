import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import { AuthNavigationProp } from "../../navigation/AuthStack";
import { useTicket } from "../../context/TicketContext";

const OriginRedLineStations = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { setTicketData } = useTicket();

  const stations = [
    "Estación Antigua Cochabamba",
    "Estación Central San Antonio",
    "El Arco",
    "Santa Bárbara",
    "Alejo Calatayud",
    "OTB Universitario",
    "Politécnico",
    "El Molino",
    "Municipal Agronomía",
    "Santa Vera Cruz",
    "Kiñiloma",
  ];

  const selectStation = (station: string) => {
    setTicketData((prev) => ({ ...prev, originStation: station }));
    navigation.navigate("DestinationLine"); // Navegar a la selección de línea de destino
  };

  return (
    <Background>
      <View style={tw`flex-1 px-5 py-20`}>
        {/* Contenedor superior */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-white text-center text-lg mb-4`}>
            Selecciona la estación de origen {"\n"}
            <Text style={tw`text-white text-lg font-bold mr-2`}>Línea roja </Text>
            <View style={tw`w-4 h-4 bg-red-500 rounded-full`} />
          </Text>
        </View>

        {/* Contenedor scrolleable */}
        <ScrollView style={tw`flex-1`} contentContainerStyle={tw`pb-6`}>
          {stations.map((station, index) => (
            <TouchableOpacity
              key={index}
              style={tw`w-full bg-white p-4 rounded-xl border border-gray-300 mb-4 shadow-md`}
              onPress={() => selectStation(station)}
            >
              <Text style={tw`text-center text-gray-700 font-bold`}>{station}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Botón "Atrás" */}
        <TouchableOpacity
          style={tw`bg-red-600 p-3 rounded-xl mt-4 shadow-md`}
          onPress={() => navigation.goBack()}
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>Atrás</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default OriginRedLineStations;
