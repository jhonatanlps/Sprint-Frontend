export type Sensor = {
  id: number;
  nome: string;
  tipo: string;
  localizacao: string;
  status: "Ativo" | "Inativo" | "Manutenção";
};