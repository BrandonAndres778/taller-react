import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { obtenerPedido, vaciarPedido, eliminarPedido, guardarhistorial } from '@/hooks/storage';

export interface Canasta {
  id: string;
  date: string;
  items: Pedido[];
  totalSinEnvio: number;
  costoEnvio: number;
  totalConEnvio: number;
}

export interface Pedido {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  cantidad: number;
}

const CarritoScreen: React.FC = () => {
  const [carrito, setCarrito] = useState<Pedido[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = async () => {
    const itemsCarrito = await obtenerPedido();
    console.log("Carrito cargado:", itemsCarrito);
    setCarrito(itemsCarrito);
  };

  const confirmarCompra = async () => {
    if (carrito.length === 0) {
      setModalMessage("No hay nada en el carrito.");
      setModalVisible(true);
      return;
    }
    const { totalSinEnvio, costoEnvio, totalConEnvio } = calcularTotal();
    const compra: Canasta = {
      id: new Date().getTime().toString(),
      date: new Date().toISOString(),
      items: carrito,
      totalSinEnvio,
      costoEnvio,
      totalConEnvio,
    };
    console.log("Confirmando compra...");
    await guardarhistorial(compra);
    await vaciarPedido();
    setModalMessage("La compra fue realizada con éxito.");
    setModalVisible(true);
    cargarCarrito();
  };

  const eliminarItem = async (id: string) => {
    console.log("Eliminando item con ID:", id);
    await eliminarPedido(id);
    cargarCarrito();
    setModalMessage("El producto ha sido eliminado del carrito.");
    setModalVisible(true);
  };

  const modificarCantidad = (id: string, cantidad: number) => {
    const newCarrito = carrito.map(item => {
      if (item.id === id) {
        return { ...item, cantidad };
      }
      return item;
    });
    setCarrito(newCarrito);
  };

  const calcularTotal = () => {
    const totalSinEnvio = carrito.reduce((total, item) => total + item.price * item.cantidad, 0);
    let costoEnvio = 5000;

    if (totalSinEnvio > 90000) {
      costoEnvio = 0;
    } else if (totalSinEnvio > 70000) {
      costoEnvio = 3000;
    }

    const totalConEnvio = totalSinEnvio + costoEnvio;
    return { totalSinEnvio, costoEnvio, totalConEnvio };
  };

  const { totalSinEnvio, costoEnvio, totalConEnvio } = calcularTotal();

  const renderItem = ({ item }: { item: Pedido }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>Precio: ${item.price}</Text>
      <Text style={styles.itemCantidad}>Cantidad: {item.cantidad}</Text>
      
      <View style={styles.cantidadContainer}>
        <Button title="-" onPress={() => modificarCantidad(item.id, Math.max(1, item.cantidad - 1))} />
        <Text style={styles.cantidadText}>{item.cantidad}</Text>
        <Button title="+" onPress={() => modificarCantidad(item.id, item.cantidad + 1)} />
      </View>
      <TouchableOpacity style={styles.eliminarButton} onPress={() => eliminarItem(item.id)}>
        <Text style={styles.eliminarButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const cancelarPedido = async () => {
    await vaciarPedido();
    await cargarCarrito();
    setModalMessage("Se ha cancelado el pedido.");
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      <FlatList
        data={carrito}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total sin Envío: ${totalSinEnvio}</Text>
        <Text style={styles.totalText}>Costo de Envío: ${costoEnvio}</Text>
        <Text style={styles.totalText}>Total a Pagar: ${totalConEnvio}</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={confirmarCompra}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Confirmar Compra</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={cancelarPedido}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Cancelar Pedido</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button title="Aceptar" onPress={() => setModalVisible(false)} />
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
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e94560', 
    textAlign: 'center',
    marginBottom: 20,
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
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e94560', 
  },
  itemPrice: {
    fontSize: 18,
    color: '#a8dadc', 
    marginVertical: 6,
  },
  itemCantidad: {
    fontSize: 16,
    color: '#e1e1e1', 
  },
  cantidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  cantidadText: {
    fontSize: 18,
    color: '#e94560', 
    marginHorizontal: 16,
  },
  eliminarButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#e94560', 
    borderRadius: 5,
    alignItems: 'center',
  },
  eliminarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#0f3460', 
    borderRadius: 8,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    color: '#a8dadc', 
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#e94560',
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 320,
    padding: 25,
    backgroundColor: '#1a1a2e', 
    borderRadius: 12,
    alignItems: 'center',
    elevation: 6,
  },
  modalText: {
    fontSize: 18,
    color: '#a8dadc', 
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default CarritoScreen;
