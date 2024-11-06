import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name= "index"
          options = {{
            title: 'Menú',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'restaurant' : 'restaurant-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Historial"
          options={{
            title: 'Historial',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="carrito"
          options={{
            title: 'Carrito',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'cart' : 'cart'} color={color} />
            ),
          }}
        />
      </Tabs>
  );
}