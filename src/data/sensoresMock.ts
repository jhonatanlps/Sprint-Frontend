import { Sensor } from "../types/Sensor";

export const sensoresMock: Sensor[] = [
  {
    id: 1,
    nome: "Sensor de Temperatura",
    tipo: "Temperatura",
    localizacao: "Setor A",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Sensor de Umidade",
    tipo: "Umidade",
    localizacao: "Setor B",
    status: "Manutenção",
  },
];