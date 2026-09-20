import { useEffect, useState } from "react";

import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { SensorCard } from "../components/SensorCard";

import { listarSensores } from "../services/sensorService";

import { Sensor } from "../types/Sensor";

export default function ListaSensoresScreen({
  navigation,
}: any) {

  useEffect(() => {
    carregarDados();
  }, []);

  const [sensores, setSensores] = useState<Sensor[]>([]);
  const ativos = sensores.filter((s) => s.status === "Ativo").length;
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro(null);
    
    const [listaSensores] = await Promise.all([
      listarSensores(),
    ]);
    
    setSensores(listaSensores);

    } catch (error) {
      setErro("Não foi possível carregar os dados.\nVerifique se o backend está rodando em http://localhost:8080");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F3F4F6",
        padding: 15,
      }}
    >

       {/* Indicador de carregamento */}
      {carregando && (
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
      )}
      
      {/* Mensagem de erro */}
      {erro && (
      <View 
        style={{
          marginTop: 24,
          padding: 16,
          backgroundColor: "rgba(255, 80, 80, 0.2)",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "rgba(255, 80, 80, 0.5)",
        }}
      >
        <Text 
          style={{
            fontSize: 14,
            color: "#fff",
            textAlign: "center",
            lineHeight: 22,
          }}
        >{erro}</Text>
      </View>
      )}

      {!carregando && !erro && (<>
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
      </>)}

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
                sensorId: item.id,
              })
            }
          />
        )}
      />
    </View>
  );
}