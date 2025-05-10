import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { AlertCircle } from "lucide-react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import Background from "../../components/Background";
import { AuthNavigationProp } from "../../navigation/AuthStack";

const RegisterScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  // Estados de los campos
  const [fullName, setFullName] = useState("");
  const [idCard, setIdCard] = useState("");
  const [whatsapp, setWhatsapp] = useState("+591");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados de errores
  const [errors, setErrors] = useState({
    fullName: false,
    idCard: false,
    whatsapp: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Validaciones en tiempo real
  const validateFields = () => {
    const newErrors = {
      fullName: fullName.trim() === "",
      idCard: idCard.trim() === "",
      whatsapp: !/^\+591\d{7,8}$/.test(whatsapp), // Asegurar que tenga 7 u 8 dígitos después del +591
      email: !/\S+@\S+\.\S+/.test(email),
      password: password.length < 6,
      confirmPassword: password !== confirmPassword || confirmPassword === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleRegister = () => {
    if (validateFields()) {
      navigation.navigate("RegisterVerification");
    } else {
      Alert.alert("Error", "Por favor, corrija los campos en rojo antes de continuar.");
    }
  };

  return (
    <Background>
      <View style={tw`flex-1 justify-center items-center px-5`}>
        <View style={tw`w-full`}>
          {/* Campo Nombre Completo */}
          <View style={tw`relative mb-2`}>
            <TextInput
              style={[
                tw`w-full bg-white p-3 rounded-xl border`,
                errors.fullName ? tw`border-red-500` : tw`border-gray-300`
              ]}
              placeholder="Nombres y apellidos"
              value={fullName}
              onChangeText={setFullName}
            />
            {errors.fullName && <AlertCircle size={20} color="red" style={tw`absolute right-3 top-4`} />}
          </View>

          {/* Campo CI */}
          <View style={tw`relative mb-2`}>
            <TextInput
              style={[
                tw`w-full bg-white p-3 rounded-xl border`,
                errors.idCard ? tw`border-red-500` : tw`border-gray-300`
              ]}
              placeholder="Carnet de identidad"
              value={idCard}
              onChangeText={setIdCard}
            />
            {errors.idCard && <AlertCircle size={20} color="red" style={tw`absolute right-3 top-4`} />}
          </View>

          {/* Campo WhatsApp */}
          <View style={tw`relative mb-2`}>
            <TextInput
              style={[
                tw`w-full bg-white p-3 rounded-xl border`,
                errors.whatsapp ? tw`border-red-500` : tw`border-gray-300`
              ]}
              placeholder="Número de Whatsapp"
              keyboardType="phone-pad"
              value={whatsapp}
              onChangeText={(text) => {
                if (!text.startsWith("+591")) {
                  text = "+591" + text.replace(/\D/g, ""); // Elimina caracteres no numéricos
                }
                setWhatsapp(text);
              }}
            />
            {errors.whatsapp && <AlertCircle size={20} color="red" style={tw`absolute right-3 top-4`} />}
          </View>

          {/* Campo Email */}
          <View style={tw`relative mb-2`}>
            <TextInput
              style={[
                tw`w-full bg-white p-3 rounded-xl border`,
                errors.email ? tw`border-red-500` : tw`border-gray-300`
              ]}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            {errors.email && <AlertCircle size={20} color="red" style={tw`absolute right-3 top-4`} />}
          </View>

          {/* Campo Contraseña */}
          <View style={tw`relative mb-2`}>
            <TextInput
              style={[
                tw`w-full bg-white p-3 rounded-xl border`,
                errors.password ? tw`border-red-500` : tw`border-gray-300`
              ]}
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {errors.password && <AlertCircle size={20} color="red" style={tw`absolute right-3 top-4`} />}
          </View>

          {/* Campo Confirmar Contraseña */}
          <View style={tw`relative mb-2`}>
            <TextInput
              style={[
                tw`w-full bg-white p-3 rounded-xl border`,
                errors.confirmPassword ? tw`border-red-500` : tw`border-gray-300`
              ]}
              placeholder="Verificar contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {errors.confirmPassword && <AlertCircle size={20} color="red" style={tw`absolute right-3 top-4`} />}
          </View>
        </View>

        {/* Botón Registrar */}
        <TouchableOpacity style={tw`bg-green-500 p-3 rounded-xl mt-4 w-full`} onPress={handleRegister}>
          <Text style={tw`text-white text-center text-lg font-bold`}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default RegisterScreen;
