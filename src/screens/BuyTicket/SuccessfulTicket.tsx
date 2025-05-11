import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import { AuthNavigationProp } from "../../navigation/AuthStack";
import { useTicket } from "../../context/TicketContext";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { CheckCircle } from "lucide-react-native"; // Importa el ícono de tickeado

const SuccessfulTicket: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { ticketData } = useTicket();

  const { originStation, originLine, destinationStation, destinationLine, categoryQuantities } = ticketData;

  const prices = {
    preferencial: 10,
    general: 15,
    estudiante: 5,
  };

  const total = Object.entries(categoryQuantities).reduce((acc, [category, quantity]) => {
    return acc + quantity * prices[category as keyof typeof prices];
  }, 0);

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Ticket de Pago</h1>
          <table>
            <tr>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
            ${Object.entries(categoryQuantities)
              .map(
                ([category, quantity]) => `
              <tr>
                <td>${category.charAt(0).toUpperCase() + category.slice(1)}</td>
                <td>${quantity}</td>
                <td>${quantity * prices[category as keyof typeof prices]}.00 Bs</td>
              </tr>`
              )
              .join("")}
          </table>
          <p><strong>Estación Origen:</strong> ${originStation}</p>
          <p><strong>Línea Origen:</strong> ${originLine}</p>
          <p><strong>Estación Destino:</strong> ${destinationStation}</p>
          <p><strong>Línea Destino:</strong> ${destinationLine}</p>
          <p><strong>Total:</strong> ${total}.00 Bs</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      const pdfName = `${FileSystem.documentDirectory}ticket.pdf`;
      await FileSystem.moveAsync({ from: uri, to: pdfName });
      await Sharing.shareAsync(pdfName, {
        mimeType: "application/pdf",
        dialogTitle: "Descargar Ticket",
      });
    } catch (error) {
      console.error("Error generando el PDF:", error);
      Alert.alert("Error", "No se pudo generar el PDF. Intente nuevamente.");
    }
  };

  return (
    <Background>
      <View style={tw`flex-1 justify-center items-center px-6`}>
        {/* Título */}
        <Text style={tw`text-white text-lg mb-4`}>Pago exitoso!</Text>
        <Text style={tw`text-white text-lg mb-4`}>El ticket tiene una duración de 4 Hrs</Text>

        {/* Ícono de tickeado verde */}
        <CheckCircle size={100} color="green" style={tw`mb-4`} />

        {/* Resumen del ticket */}
        <View style={tw`bg-white p-4 rounded-lg mb-4`}>
          <Text style={tw`text-black font-bold mb-2`}>Resumen del Ticket</Text>
          <Text style={tw`text-sm`}>Estación Origen: {originStation}</Text>
          <Text style={tw`text-sm`}>Línea Origen: {originLine}</Text>
          <Text style={tw`text-sm`}>Estación Destino: {destinationStation}</Text>
          <Text style={tw`text-sm`}>Línea Destino: {destinationLine}</Text>
          {Object.entries(categoryQuantities).map(([category, quantity]) => (
            <Text key={category} style={tw`text-sm`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}: {quantity} tickets
            </Text>
          ))}
          <Text style={tw`text-sm font-bold mt-2`}>Total: {total}.00 Bs</Text>
        </View>

        {/* Botón para descargar el ticket */}
        <TouchableOpacity
          style={tw`w-full bg-white px-6 py-3 rounded-xl mb-4`}
          onPress={generatePDF}
        >
          <Text style={tw`text-center text-gray-700 font-bold`}>Descargar ticket</Text>
        </TouchableOpacity>

        {/* Botón para ir al menú */}
        <TouchableOpacity
          style={tw`w-full bg-green-600 px-6 py-3 rounded-xl`}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={tw`text-center text-white font-bold`}>Menú</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default SuccessfulTicket;
