import { useState } from "react";

import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

export default function CadastroSensorScreen({
  route,
  navigation,
}: any) {
  const { sensores, setSensores } =
    route.params;

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [localizacao, setLocalizacao] =
    useState("");
  const [status, setStatus] =
    useState("Ativo");

  function salvarSensor() {
    const novoSensor = {
      id: Date.now(),
      nome,
      tipo,
      localizacao,
      status,
    };

    setSensores([
      ...sensores,
      novoSensor,
    ]);

    navigation.goBack();
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

      <TextInput
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
        style={{
          backgroundColor: "#FFF",
          borderRadius: 10,
          padding: 12,
          marginBottom: 20,
        }}
      />

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