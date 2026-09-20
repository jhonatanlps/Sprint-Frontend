import { useState } from "react";

import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

import { criarSensor } from "../services/sensorService";
import { Sensor } from "../types/Sensor";

export default function CadastroSensorScreen({
  route,
  navigation,
}: any) {
  const { sensores, setSensores } =
    route.params;

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [status, setStatus] = useState<"Ativo" | "Inativo" | "Manutenção">("Ativo");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function salvarSensor() {
    if (!nome.trim() || !tipo.trim() || !localizacao.trim() || !status.trim()) {
      setErro("Preencha os campos obrigatorios: nome, tipo, localizção e status");
      return;
    }
    try {
      setSalvando(true);
      setErro("");

      await criarSensor({
        nome: nome.trim(),
        tipo: tipo.trim(),
        localizacao: localizacao.trim(),
        status: status,
      });
    } catch {
      setErro("Erro ao cadastrar.");
    } finally {
      setSalvando(false);
    }
    navigation.replace("Lista");
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F3F4F6",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Cadastro de Sensor
      </Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{
          backgroundColor: "#FFF",
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Tipo"
        value={tipo}
        onChangeText={setTipo}
        style={{
          backgroundColor: "#FFF",
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
        style={{
          backgroundColor: "#FFF",
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
        }}
      />

    <View style={{ marginBottom: 20, backgroundColor: "#FFF", padding: 15, borderRadius: 10 }}>
      <Text style={{ marginBottom: 10, fontWeight: "bold", color: "#333" }}>Status:</Text>
      
      {(["Ativo", "Inativo", "Manutenção"] as const).map((opcao) => (
        <TouchableOpacity
          key={opcao}
          onPress={() => setStatus(opcao)}
          style={{
            flexDirection: "row", // Coloca a bolinha e o texto lado a lado
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          {/* Círculo Externo (A borda do Radio) */}
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 12, // Faz virar um círculo
            borderWidth: 2,
            borderColor: status === opcao ? "#2563EB" : "#9CA3AF", // Azul se selecionado, cinza se não
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          {/* Círculo Interno (A bolinha preenchida que aparece quando selecionado) */}
          {status === opcao && (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#2563EB", // Bolinha azul
              }}
            />
          )}
        </View>

        {/* Texto da opção */}
        <Text style={{ fontSize: 16, color: "#333" }}>{opcao}</Text>
        </TouchableOpacity>
      ))}
    </View>

      <TouchableOpacity
        onPress={salvarSensor}
        style={{
          backgroundColor: "#2563EB",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Salvar Sensor
        </Text>
      </TouchableOpacity>
    </View>
  );
}