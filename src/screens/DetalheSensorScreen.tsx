import {
  View,
  Text,
} from "react-native";

export default function DetalheSensorScreen({
  route,
}: any) {
  const { sensor } = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F3F4F6",
        padding: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "#FFF",
          padding: 20,
          borderRadius: 15,

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
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          {sensor.nome}
        </Text>

        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          Tipo: {sensor.tipo}
        </Text>

        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          Localização: {sensor.localizacao}
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Status: {sensor.status}
        </Text>
      </View>
    </View>
  );
}