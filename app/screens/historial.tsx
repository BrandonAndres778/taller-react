import React, { useEffect, useState } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { obtenerhistorial, vaciarHistorial } from '@/hooks/storage';
import { Canasta } from './CarritoCompras';

const HistorialScreen: React.FC = () => {
  const [historial, setHistorial] = useState<Canasta[]>([]);

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    const historialData: Canasta[] = await obtenerhistorial();
    const historialOrdenado = historialData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setHistorial(historialOrdenado);
  };

  const limpiarHistorialCompras = async () => {
    await vaciarHistorial();
    cargarHistorial();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={historial}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.dateText}>Fecha: {new Date(item.date).toLocaleString()}</Text>
            {item.items.map((producto) => (
              <Text key={producto.id} style={styles.productText}>
                {producto.name} - Cantidad: {producto.cantidad}
              </Text>
            ))}
            <Text style={styles.totalText}>
              Total con domicilio: ${item.totalConEnvio ? item.totalConEnvio : '0.00'}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={limpiarHistorialCompras}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Limpiar Historial</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
   
  },
  itemContainer: {
    backgroundColor: '#16213e', 
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0f3460',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  dateText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#e94560', 
    marginBottom: 10,
  },
  productText: {
    fontSize: 16,
    color: '#e1e1e1', 
    marginVertical: 6,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#e94560', 
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#a8dadc', 
    marginTop: 12,
  },
  buttonContainer: {
    marginTop: 24,
    backgroundColor: '#e94560', 
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
});

export default HistorialScreen;
