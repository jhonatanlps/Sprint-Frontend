# Frontend Metaindustria

Aplicativo mobile desenvolvido com **React Native**, **Expo** e **TypeScript** para gerenciamento de sensores industriais.

O aplicativo permite visualizar, cadastrar, consultar, atualizar e excluir sensores através da integração com uma API REST desenvolvida em Spring Boot.

## Tecnologias

* React Native
* Expo
* TypeScript
* React Navigation
* Axios

## Funcionalidades

O aplicativo possui as seguintes funcionalidades:

* Listagem de sensores
* Cadastro de sensores
* Visualização dos detalhes de um sensor
* Comunicação com o backend através de API REST
* Tratamento de erro de conexão com o servidor

## Estrutura

```text
Sprint-Frontend/
├── assets/
├── src/
│   ├── navigation/
│   ├── screens/
│   └── services/
├── App.tsx
├── index.ts
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Pré-requisitos

Para executar o projeto, é necessário possuir:

* Node.js
* npm
* Expo
* Aplicativo Expo Go, caso seja utilizado um dispositivo físico

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/jhonatanlps/Sprint-Frontend.git
```

### 2. Entrar na pasta

```bash
cd Sprint-Frontend
```

### 3. Instalar as dependências

```bash
npm install
```

## Executando o aplicativo

Para iniciar o projeto:

```bash
npx expo start
```

Após iniciar, o Expo exibirá um QR Code que pode ser utilizado para abrir o aplicativo no Expo Go.

Também podem ser utilizados os comandos:

```bash
npm run android
```

ou:

```bash
npm run web
```

## Integração com o Backend

O aplicativo utiliza **Axios** para realizar as requisições HTTP para o backend.

O backend utilizado pelo projeto está disponível em:

```text
https://github.com/jhonatanlps/Sprint-Backend
```

A comunicação segue o seguinte fluxo:

```text
┌──────────────────────┐
│   Aplicativo Mobile  │
│   React Native       │
└──────────┬───────────┘
           │
           │ Axios / HTTP
           ▼
┌──────────────────────┐
│     Spring Boot      │
│       Backend        │
└──────────┬───────────┘
           │
           │ JPA
           ▼
┌──────────────────────┐
│     H2 Database      │
└──────────────────────┘
```

## `BASE_URL`

A URL utilizada pelo frontend para acessar o backend deve ser definida na configuração dos serviços.

Exemplo:

```typescript
const BASE_URL = "http://192.168.1.10:8080";
```

O endereço deve ser alterado de acordo com o ambiente em que o backend estiver sendo executado.

### Executando no mesmo computador

Caso o aplicativo esteja sendo executado em um ambiente que consiga acessar o backend pelo próprio computador:

```typescript
const BASE_URL = "http://localhost:8080";
```

### Executando em celular físico

Quando o aplicativo estiver sendo executado em um celular físico, deve ser utilizado o IP do computador que está executando o backend:

```typescript
const BASE_URL = "http://192.168.1.10:8080";
```

O computador e o celular precisam estar conectados à mesma rede.

## Pasta `services`

A pasta `services` concentra a comunicação do aplicativo com a API.

```text
src/
└── services/
    ├── api.ts
    └── sensorService.ts
```

A ideia é evitar que as telas tenham diretamente toda a lógica de comunicação HTTP.

### `api.ts`

O arquivo pode centralizar a configuração do Axios:

```typescript
import axios from "axios";

export const BASE_URL = "http://192.168.1.10:8080";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

### `sensorService.ts`

Os métodos relacionados aos sensores ficam centralizados no serviço:

```typescript
import { api } from "./api";

export async function listarSensores() {
  const response = await api.get("/sensores");
  return response.data;
}

export async function buscarSensor(id: number) {
  const response = await api.get(`/sensores/${id}`);
  return response.data;
}

export async function criarSensor(sensor: any) {
  const response = await api.post("/sensores", sensor);
  return response.data;
}

export async function atualizarSensor(
  id: number,
  sensor: any
) {
  const response = await api.put(`/sensores/${id}`, sensor);
  return response.data;
}

export async function excluirSensor(id: number) {
  await api.delete(`/sensores/${id}`);
}
```

## Endpoints utilizados

O frontend utiliza os endpoints disponibilizados pelo backend:

| Operação  | Método   | Endpoint         |
| --------- | -------- | ---------------- |
| Listar    | `GET`    | `/sensores`      |
| Buscar    | `GET`    | `/sensores/{id}` |
| Cadastrar | `POST`   | `/sensores`      |

## Como testar a integração

Para testar a integração completa, é necessário executar os dois projetos.

### 1. Iniciar o Backend

Em um terminal:

```bash
git clone https://github.com/jhonatanlps/Sprint-Backend.git
cd Sprint-Backend
./mvnw spring-boot:run
```

O backend deverá estar disponível em:

```text
http://localhost:8080
```

### 2. Configurar a `BASE_URL`

Se estiver usando um celular físico, descubra o IP do computador e configure:

```typescript
const BASE_URL = "http://IP_DO_COMPUTADOR:8080";
```

Exemplo:

```typescript
const BASE_URL = "http://192.168.1.10:8080";
```

### 3. Iniciar o Frontend

Em outro terminal:

```bash
git clone https://github.com/jhonatanlps/Sprint-Frontend.git
cd Sprint-Frontend
npm install
npx expo start
```

### 4. Testar as operações

No aplicativo, teste:

1. Visualização da lista de sensores;
2. Cadastro de um sensor;
3. Visualização dos detalhes;
4. Alteração de um sensor;
5. Exclusão de um sensor.

Cada operação deverá realizar uma requisição para o backend.

## Testando diretamente a API

Antes de testar pelo aplicativo, também é possível verificar se o backend está funcionando.

Acesse:

```text
http://localhost:8080/sensores
```

Ou utilize:

```bash
curl http://localhost:8080/sensores
```

Se a API estiver funcionando, deverá ser retornada uma resposta JSON contendo os sensores cadastrados.

## Backend desligado

O aplicativo também deve tratar a situação em que o backend não esteja disponível.

Por exemplo, caso o backend esteja desligado e o usuário tente carregar os sensores, a requisição do Axios apresentará um erro de conexão.

A aplicação deve capturar esse erro e informar o usuário.

Exemplo:

```typescript
try {
  const sensores = await listarSensores();

  setSensores(sensores);
} catch (error) {
  console.error("Erro ao conectar com o backend:", error);

  setError(
    "Não foi possível conectar ao servidor."
  );
}
```

Dessa forma, o aplicativo não deve ser encerrado ou apresentar uma tela de erro não tratada.

O usuário deverá receber uma mensagem informando que o servidor não está disponível.

## Problemas comuns

### `Network Error`

Se o Axios apresentar:

```text
Network Error
```

verifique:

* Se o backend está executando;
* Se a `BASE_URL` está correta;
* Se a porta `8080` está liberada;
* Se o celular e o computador estão na mesma rede;
* Se está sendo utilizado o IP correto do computador.

### `localhost` não funciona no celular

No celular físico, não utilize:

```text
http://localhost:8080
```

Utilize:

```text
http://IP_DO_COMPUTADOR:8080
```

Por exemplo:

```text
http://192.168.1.10:8080
```

## Fluxo de uma requisição

Quando o usuário abre a tela de sensores, o fluxo esperado é:

```text
Usuário abre a tela
       │
       ▼
Tela de Sensores
       │
       ▼
sensorService
       │
       ▼
Axios
       │
       ▼
BASE_URL + /sensores
       │
       ▼
Spring Boot
       │
       ▼
H2 Database
       │
       ▼
Resposta JSON
       │
       ▼
Tela atualizada
```

## Integrantes

| Nome                         | RM       | Turma |
| ---------------------------- | -------- | ----- |
| Felipe Pinheiro Sombra       | RM559167 | 3ECA  |
| Fernando de Freitas Carvalho | RM555194 | 3ECR  |
| Jhonatan Lopes Da Silva      | RM559174 | 3ECA  |
| Nicolas Alves dos Santos     | RM558993 | 3ECR  |

## Vídeo

Demonstração do projeto:

https://youtu.be/6DIuKqNw2e0

## Repositório

[GitHub - Sprint Backend](https://github.com/jhonatanlps/Sprint-Backend)
