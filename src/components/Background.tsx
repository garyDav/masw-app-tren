import React from "react";
import { View, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import DoodleImg from "../../assets/images/doodle.png";

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View style={tw`flex-1 bg-blue-700 relative`}>
      {/* Imagen de fondo */}
      <Image source={DoodleImg} style={tw`absolute w-full h-full`} resizeMode="cover" />
      
      {/* Contenido de la pantalla */}
      {children}
    </View>
  );
};

export default Background;
