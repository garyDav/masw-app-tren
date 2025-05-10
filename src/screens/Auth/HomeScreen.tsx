import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import tw from "tailwind-react-native-classnames";
import Background from "../../components/Background";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProp } from "../../navigation/AuthStack";
import LogoImg from "../../../assets/images/Logo.png";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  const [balanceVisible, setBalanceVisible] = useState(false);
  const [balance] = useState("100.00 Bs"); // El saldo se consumirá de una API más adelante
  const [nfcStatus] = useState("Sincronizado");
  const [nfcCode] = useState("04123FA2AD0F90");

  return (
    <Background>
      <SafeAreaView style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`flex-grow justify-center px-6 py-8`}>
          <View style={tw`items-center`}>
            {/* Logo */}
            <Image source={LogoImg} style={tw`w-24 h-24 mb-6`} resizeMode="contain" />

            {/* Saludo */}
            <Text style={tw`text-white text-lg font-bold mb-2`}>¡Hola! UserName</Text>

            {/* Título */}
            <Text style={tw`text-white text-2xl font-bold mb-2`}>Hola:</Text>

            {/* Saldo */}
            <View style={tw`w-full flex-row items-center bg-white p-3 rounded-xl border border-gray-300 my-4`}>
              <TextInput
                style={tw`flex-1 text-lg font-bold text-center`}
                value={balanceVisible ? balance : "************"}
                editable={false}
              />
              <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
                {balanceVisible ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
              </TouchableOpacity>
            </View>

            {/* Tarjeta NFC */}
            <View style={tw`w-full mb-6`}>
              <Text style={tw`text-white text-lg mb-1`}>
                Tarjeta NFC "MiTren": <Text style={tw`font-bold`}>{nfcStatus}</Text>
              </Text>
              <Text style={tw`text-white text-lg`}>
                Código: <Text style={tw`font-bold`}>{nfcCode}</Text>
              </Text>
            </View>

            {/* Botones */}
            <TouchableOpacity
              style={tw`w-full bg-white p-3 rounded-xl mb-4`}
              onPress={() => navigation.navigate("OriginLine")}
            >
              <Text style={tw`text-center text-lg font-bold text-gray-800`}>Comprar ticket</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-full bg-white p-3 rounded-xl mb-4`}
              onPress={() => navigation.navigate("RechargeBalance")}
            >
              <Text style={tw`text-center text-lg font-bold text-gray-800`}>Recargar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-full bg-white p-3 rounded-xl`}
              onPress={() => navigation.navigate("Record")}
            >
              <Text style={tw`text-center text-lg font-bold text-gray-800`}>Historial</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default HomeScreen;
