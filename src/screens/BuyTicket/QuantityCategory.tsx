import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import { AuthNavigationProp } from "../../navigation/AuthStack";
import { useTicket } from "../../context/TicketContext";

const QuantityCategory = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { ticketData, setTicketData } = useTicket();

  const { originStation, originLine, destinationStation, destinationLine, total } = ticketData;

  const prices = {
    preferencial: 10,
    general: 15,
    estudiante: 5,
  };

  const [quantities, setQuantities] = useState({
    preferencial: 0,
    general: 0,
    estudiante: 0,
  });

  const adjustQuantity = (category: keyof typeof quantities, increment: boolean) => {
    setQuantities((prev) => {
      const newQuantities = {
        ...prev,
        [category]: Math.max(0, prev[category] + (increment ? 1 : -1)),
      };

      // Calculate the new total
      const newTotal = Object.entries(newQuantities).reduce((acc, [cat, qty]) => {
        return acc + qty * prices[cat as keyof typeof prices];
      }, 0);

      // Update the ticket data context
      setTicketData((prevData) => ({
        ...prevData,
        categoryQuantities: newQuantities,
        total: newTotal,
      }));

      return newQuantities;
    });
  };

  const isTransfer = originLine !== destinationLine;
  const transferStation = isTransfer ? "Estación central San Antonio" : "";

  const handlePayment = () => {
    alert("Dirigiendo a pasarelas de pago");
    navigation.navigate("MethodPayments");
  };

  return (
    <Background>
      <View style={tw`flex-1 px-5 py-20`}>
        <Text style={tw`text-white text-center text-lg font-bold mb-2`}>
          Seleccione la cantidad y categoría
        </Text>

        <View style={tw`bg-white rounded-xl p-4 mb-2`}>
          <Text style={tw`font-bold text-center mb-2`}>
            {"CANT".padEnd(20)}{"TICKET".padEnd(20)}{"PRECIO".padEnd(20)}TOTAL
          </Text>
          <Text style={tw`border-b border-dotted border-gray-400 mb-2`} />

          {["preferencial", "general", "estudiante"].map((category, index) => (
            <Text key={index} style={tw`text-sm mb-2`}>
              {quantities[category as keyof typeof quantities]
                .toString()
                .padEnd(22)}
              {category.charAt(0).toUpperCase() + category.slice(1).padEnd(20)}
              {prices[category as keyof typeof prices]}.00 Bs{"         "}
              {quantities[category as keyof typeof quantities] * prices[category as keyof typeof prices]}.00 Bs
            </Text>
          ))}

          <Text style={tw`border-b border-dotted border-gray-400 mb-2`} />

          <View>
            <Text style={tw`text-sm`}>Estación origen: {originStation}</Text>
            <Text style={tw`text-sm`}>Línea origen: {originLine}</Text>
            <Text style={tw`text-sm`}>Estación destino: {destinationStation}</Text>
            <Text style={tw`text-sm`}>Línea destino: {destinationLine}</Text>
            <Text style={tw`border-b border-dotted border-gray-400 mb-`} />

            <Text style={tw`text-sm`}>Transbordo: {isTransfer ? "Sí" : "No"}</Text>
            {isTransfer && <Text style={tw`text-sm`}>Transbordo en: {transferStation}</Text>}
          </View>

          <Text style={tw`font-bold text-right mt-4`}>TOTAL: {total}.00 Bs</Text>
        </View>

        {Object.entries(prices).map(([category, price], index) => (
          <View key={index} style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={tw`text-white text-lg w-20`}>
              {price}bs ticket
            </Text>
            <Text style={tw`text-white text-lg w-24`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity
                style={tw`bg-red-600 px-4 py-2 rounded-full`}
                onPress={() => adjustQuantity(category as keyof typeof prices, false)}
              >
                <Text style={tw`text-white text-lg`}>-</Text>
              </TouchableOpacity>
              <Text style={tw`text-white text-lg mx-4`}>
                {quantities[category as keyof typeof prices]}
              </Text>
              <TouchableOpacity
                style={tw`bg-green-600 px-4 py-2 rounded-full`}
                onPress={() => adjustQuantity(category as keyof typeof prices, true)}
              >
                <Text style={tw`text-white text-lg`}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={tw`flex-row justify-between mt-6`}>
          <TouchableOpacity
            style={tw`bg-red-600 px-6 py-3 rounded-lg`}
            onPress={() => navigation.goBack()}
          >
            <Text style={tw`text-white text-lg`}>Atrás</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-green-600 px-6 py-3 rounded-lg`}
            onPress={handlePayment}
          >
            <Text style={tw`text-white text-lg`}>Pagar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default QuantityCategory;
