import { useState } from "react";

import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import { SensorCard } from "../components/SensorCard";

import { sensoresMock } from "../data/sensoresMock";

export default function ListaSensoresScreen({
  navigation,
}: any) {
  const [sensores, setSensores] =
    useState(sensoresMock);

  const ativos = sensores.filter(
    (s) => s.status === "Ativo"
  ).length;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F3F4F6",
        padding: 15,
      }}
    >
      <View
        style={{
          backgroundColor: "#1E3A5F",
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          Dashboard
        </Text>

        <Text style={{ color: "#FFF" }}>
          Total de Sensores: {sensores.length}
        </Text>

        <Text style={{ color: "#FFF" }}>
          Sensores Ativos: {ativos}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#2563EB",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
        onPress={() =>
          navigation.navigate("Cadastro", {
            sensores,
            setSensores,
          })
        }
      >
        <Text
          style={{
            color: "#FFF",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          + Novo Sensor
        </Text>
      </TouchableOpacity>

      <FlatList
        data={sensores}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <SensorCard
            sensor={item}
            onPress={() =>
              navigation.navigate("Detalhe", {
                sensor: item,
              })
            }
          />
        )}
      />
    </View>
  );
}