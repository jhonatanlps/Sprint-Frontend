import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaSensoresScreen from "../screens/ListaSensoresScreen";

import CadastroSensorScreen from "../screens/CadastroSensorScreen";

import DetalheSensorScreen from "../screens/DetalheSensorScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Lista"
          component={ListaSensoresScreen}
        />

        <Stack.Screen
          name="Cadastro"
          component={CadastroSensorScreen}
        />

        <Stack.Screen
          name="Detalhe"
          component={DetalheSensorScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}