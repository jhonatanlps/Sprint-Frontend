import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import { Sensor } from "../types/Sensor";
import { buscarSensorPorId } from "../services/sensorService";

export default function DetalheSensorScreen({ route }: any) {
  const { sensorId } = route.params;
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarSensorPorId(sensorId)
      .then((s) => {
        setSensor(s);
      })
      .finally(() => setCarregando(false));
  }, [sensorId]);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando dados do sensor...</Text>
      </View>
    );
  }

  if (!sensor) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Sensor não encontrado. {sensorId}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6", padding: 20 }}>
      <View
        style={{
          backgroundColor: "#FFF",
          padding: 20,
          borderRadius: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
          {sensor.nome}
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Tipo: {sensor.tipo}
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Localização: {sensor.localizacao}
        </Text>

        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Status: {sensor.status}
        </Text>
      </View>
    </View>
  );
}