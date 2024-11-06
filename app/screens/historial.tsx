import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type HistorialItem = {
  id: string;
  fecha: string;
  descripcion: string;
};

const historialData: HistorialItem[] = [
  { id: '1', fecha: '2024-10-12', descripcion: 'Papas fritas crujientes' },
  { id: '2', fecha: '2024-11-05', descripcion: 'No pude' },
  { id: '3', fecha: '2025-11-25', descripcion: 'Profe colabore por favor' },
];

const historial: React.FC = () => {
  const renderHistorialItem = ({ item }: { item: HistorialItem }) => (
    <View style={styles.historialItem}>
      <Text style={styles.fecha}>{item.fecha}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Historial</Text>
      <FlatList
        data={historialData}
        renderItem={renderHistorialItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.historialList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  historialList: {
    paddingBottom: 16,
  },
  historialItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fecha: {
    fontSize: 14,
    color: '#666',
  },
  descripcion: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
});

export default historial;
