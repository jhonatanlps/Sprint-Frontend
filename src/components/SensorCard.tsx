import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { Sensor } from "../types/Sensor";

type Props = {
  sensor: Sensor;
  onPress: () => void;
};

export function SensorCard({
  sensor,
  onPress,
}: Props) {
  const getStatusColor = () => {
    switch (sensor.status) {
      case "Ativo":
        return "#22C55E";

      case "Manutenção":
        return "#EAB308";

      case "Inativo":
        return "#EF4444";

      default:
        return "#000";
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: "#FFF",
          borderRadius: 12,
          padding: 15,
          marginVertical: 8,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,

          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {sensor.nome}
        </Text>

        <Text>Tipo: {sensor.tipo}</Text>

        <Text>Local: {sensor.localizacao}</Text>

        <Text
          style={{
            color: getStatusColor(),
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          {sensor.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}