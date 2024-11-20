import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { agregarPedido } from '@/hooks/storage';

const Detalle: React.FC = () => {
  const { id, name, image, price, description } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);  
  const [cantidad, setCantidad] = useState(1);  

  const volverMenu = () => {
    router.back();
  };

  const agregarAlCarrito = async () => {
    await agregarPedido(
      { id: id as string, name: name as string, image: image as string, price: Number(price), description: description as string },
      cantidad
    );
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: image as string }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>Precio: ${price}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.cantidadContainer}>
        <Button title="-" onPress={() => setCantidad(Math.max(1, cantidad - 1))} />
        <Text style={styles.cantidadText}>{cantidad}</Text>
        <Button title="+" onPress={() => setCantidad(cantidad + 1)} />
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={agregarAlCarrito}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Agregar al Carrito</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={volverMenu}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Volver al Menú</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Agregado al carrito!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={cerrarModal}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={volverMenu}>
              <Text style={styles.modalButtonText}>Volver al Menú</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, 
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 16,
    borderRadius: 8, 
    borderColor: '#0f3460', 
    borderWidth: 1,
  },
  name: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#e94560', 
    marginBottom: 4,
  },
  price: {
    fontSize: 16, 
    color: '#131c46',
    fontWeight: '500',
    marginVertical: 4,
  },
  description: {
    fontSize: 14, 
    color: '#131c46', 
    lineHeight: 24,
    marginBottom: 8,
  },
  cantidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#0f3460', 
    borderRadius: 12, 
    padding: 8,
  },
  cantidadText: {
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94560', 
  },
  button: {
    marginTop: 20,
    paddingVertical: 6, 
    paddingHorizontal: 12,
    backgroundColor: '#16213e', 
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 14, 
    fontWeight: '600',
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#1a1a2e', 
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#ffffff', 
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#16213e', 
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Detalle;
