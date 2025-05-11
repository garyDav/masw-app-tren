import React, { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from "expo-media-library"; // Para guardar en la galería
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import LogoImg from "../../../assets/images/Logo.png";
import { AuthNavigationProp } from "../../navigation/AuthStack"; // Importa el tipo de navegación

const QrPaymentTicket: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const viewShotRef = useRef<ViewShot | null>(null);
  const [isDownloaded, setIsDownloaded] = useState(false);

  // Código QR en base64
  const qrBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQAAAACFI5MzAAABGUlEQVR42u2YSw7DIAxEzYpjcFM+N+UYrErtMUkjpd2WWQQlyudtLI89JpH5a8lDHvJnUkVXmkMPKcMeAg1peo70inrpRbm/ISFDwkhNX4NUSWxEo26WVFKisgc2ArWncSO3OthJvEs0nTju/bOT+NJKzJK++c5OovJWRIob2AwNsf6YXWJ3eFGbgXS4skgEGafaDGSifVONS/ZCQ/Q2YI5l8BdSS0ImwtTezehjiM9C3FG8fbVdykft/URTeEY918hlIZZFC9Yq0Rw6ns63nyxXtkTCYK6VuJv4NKvmMdgFMBHfBbRjb8JFxgoWW04RPmKfEaY2pgcZcT/OsL3GQ5baFrUN23iZZrvJ6pKjDJFXFvL8P3jIfvIGvNX7jsCaJvEAAAAASUVORK5CYII=";
  const qrImageUri = `data:image/png;base64,${qrBase64}`;

  const saveToGallery = async () => {
    try {
      // Solicitar permisos para acceder a la galería
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Error", "Se necesitan permisos para guardar la imagen en la galería.");
        return;
      }

      if (viewShotRef.current) {
        const uri = await viewShotRef.current.capture?.();
        if (!uri) throw new Error("No se pudo capturar la vista.");

        const newPath = `${FileSystem.cacheDirectory}PagoMiTren.jpg`;
        await FileSystem.moveAsync({ from: uri, to: newPath });

        // Guardar la imagen en la galería
        await MediaLibrary.saveToLibraryAsync(newPath);

        Alert.alert("Éxito", "QR guardado en la galería");
        setIsDownloaded(true);
      } else {
        Alert.alert("Error", "No se pudo capturar la vista");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo guardar la imagen");
    }
  };

  // Función para simular el pago realizado
  const handlePaymentCompleted = () => {
    const success = Math.random() > 0.5; // Simula un 50% de éxito
    if (success) {
      navigation.navigate("WrongProcess");
    } else {
      navigation.navigate("SuccessfulTicket");
    }
  };

  return (
    <Background>
      <View style={tw`flex-1 justify-center items-center px-6`}>
        {/* Logo */}
        <Image source={LogoImg} style={tw`w-24 h-24 mb-6`} />

        {/* Título */}
        <Text style={tw`text-white text-lg mb-4`}>Descargue el QR y realice el pago</Text>

        {/* Contenedor del QR */}
        <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 1.0 }}>
          <View style={tw`items-center bg-white p-4 rounded-lg`}>
            <Text style={tw`text-black font-bold mb-2`}>Pago mi tren</Text>
            <Image
              source={{ uri: qrImageUri }}
              style={tw`w-40 h-40`}
              resizeMode="contain" // Asegura que el QR se ajuste correctamente
            />
          </View>
        </ViewShot>

        {/* Botón para descargar el QR */}
        <TouchableOpacity
          style={tw`w-full bg-white px-6 py-3 rounded-xl mt-4`}
          onPress={saveToGallery}
        >
          <Text style={tw`text-center text-gray-700 font-bold`}>Descargar imagen QR</Text>
        </TouchableOpacity>

        {/* Botones de navegación */}
        <View style={tw`w-full flex-row justify-between mt-4`}>
          <TouchableOpacity
            style={tw`flex-1 bg-red-600 px-6 py-3 rounded-xl mr-2`}
            onPress={() => navigation.goBack()}
          >
            <Text style={tw`text-white text-center text-lg font-bold`}>Atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-1 bg-green-600 px-6 py-3 rounded-xl ml-2`}
            onPress={handlePaymentCompleted}
          >
            <Text style={tw`text-white text-center text-lg font-bold`}>Pago realizado</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default QrPaymentTicket;
