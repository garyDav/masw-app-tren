import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import { AuthNavigationProp } from "../../navigation/AuthStack";
import { MaterialIcons } from "@expo/vector-icons"; // Importa el ícono de la "X"

const WrongProcess: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  return (
    <Background>
      <View style={tw`flex-1 justify-center items-center px-6`}>
        {/* Mensaje de error */}
        <Text style={tw`text-white text-lg mb-4`}>Hubo un error al procesar el pago</Text>
        <Text style={tw`text-white text-lg mb-4`}>Por favor, vuelva a intentarlo</Text>

        {/* Ícono de "X" roja */}
        <MaterialIcons name="close" size={100} color="red" style={tw`mb-8`} />

        {/* Botón para ir al menú */}
        <TouchableOpacity
          style={tw`w-full bg-red-600 px-6 py-3 rounded-xl`} // Cambiado a rojo
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={tw`text-center text-white font-bold`}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default WrongProcess;
