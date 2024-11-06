import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './screens/menu';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menú del Restaurante' }} />
      </Stack.Navigator>
  );
};

export default App;