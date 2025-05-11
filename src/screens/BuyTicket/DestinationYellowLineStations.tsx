import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import { AuthNavigationProp } from "../../navigation/AuthStack";
import { useTicket } from "../../context/TicketContext"; //Importar el contexto

const DestinationYellowLineStations = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { setTicketData } = useTicket(); //Obtener setTicketData del contexto

  const stations = [
    "Estación Antigua Cochabamba",
    "Estación Central San Antonio",
    "Cementerio",
    "Aeropuerto",
    "Jorge Wilstermann",
    "Albarrancho",
  ];

  const selectStation = (station: string) => {
    setTicketData((prev) => ({ ...prev, destinationStation: station })); //Guardar estación de destino
    Alert.alert("Estación seleccionada", station);
    navigation.navigate("QuantityCategory");
  };

  return (
    <Background>
      <View
        style={tw`flex-1 px-6 py-10 ${
          Platform.OS === "ios" ? "pt-10" : "pt-20"
        }`} // Ajuste de padding para dispositivos iOS
      >
        {/* Contenedor superior */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-white text-center text-lg mb-4`}>
            Selecciona la estación de destino {"\n"}
            <Text style={tw`text-white text-lg font-bold mr-2`}>Línea amarilla </Text>
            <View style={tw`w-4 h-4 bg-yellow-300 rounded-full`} />
          </Text>
        </View>

        {/* Contenedor scrolleable */}
        <ScrollView
          style={tw`flex-1`}
          contentContainerStyle={tw`pb-6`}
          showsVerticalScrollIndicator={false} // Desactivar el indicador de scroll
        >
          {stations.map((station, index) => (
            <TouchableOpacity
              key={index}
              style={tw`w-full bg-white p-4 rounded-xl border border-gray-300 mb-3`}
              onPress={() => selectStation(station)} // ✅ Llamar a la función selectStation
            >
              <Text style={tw`text-center text-gray-700 font-bold`}>{station}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Botón "Atrás" */}
        <TouchableOpacity
          style={tw`bg-red-600 p-3 rounded-xl mt-4`}
          onPress={() => navigation.goBack()}
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>Atrás</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default DestinationYellowLineStations;
