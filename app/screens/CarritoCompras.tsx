import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { obtenerPedido, eliminarPedido,guardarhistorial,vaciarPedido } from '@/hooks/storage';

export interface canasta {
  id: string;
  date: string;
  items:pedido[];
  totalSinEnvio: number, 
  costoEnvio:number,
  totalConEnvio:number,
};

export interface pedido{
    id:number;
    name:string;
    image:string;
    description: string;
    cantidad:number;
    price: number;
}


const CarritoScreen: React.FC = () => {
const [carritoCompras, setCarritoComras]=useState<any[]>([]);

useEffect(()=> {

})
const cargar = async ()=>{

}
  const modificarCantidad = (id: string, cantidad: number) => {
    const nuevoPedido = carritoCompras.map(item =>{
        if(item.id===id){
            return {...item,cantidad};
        }
        return item;
    });
    setCarritoComras(nuevoPedido);
  };

  const eliminarProducto = async (id: string) => {
    await eliminarPedido(id);
    cargar();
};

  const cancelarCompra = async () => {
    await vaciarPedido();
    await cargar();
};

const compra = async () => {
    const { totalSinEnvio, costoEnvio, totalConEnvio } = calcularTotal();
    const canasta: canasta = {
      id: new Date().getTime().toString(),
      date: new Date().toISOString(),
      items: carritoCompras,
      totalSinEnvio, 
      costoEnvio,
      totalConEnvio,
    };
    await guardarhistorial(canasta);
    await vaciarPedido();      
    cargar();
  };

  const calcularTotal = () => {
    const totalSinEnvio = carritoCompras.reduce((total, item) => total + item.price * item.cantidad, 0);
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

  const renderProducto = ({ item }: { item: pedido }) => (
    <View style={styles.productoItem}>
      <Text style={styles.nombre}>{item.name}</Text>
      <Text style={styles.precio}>${item.price} </Text>
      <View style={styles.cantidadContenedor}>
        <TouchableOpacity onPress={() => modificarCantidad(item.id, Math.max(1,item.cantidad-1))} style={styles.botonCantidad}>
          <Text style={styles.botonCantidadText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.cantidad}>{item.cantidad}</Text>
        <TouchableOpacity onPress={() => modificarCantidad(item.id, 1)} style={styles.botonCantidad}>
          <Text style={styles.botonCantidadText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => eliminarProducto(item.id)} style={styles.botonEliminar}>
        <Text style={styles.botonEliminarText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrito de Compras</Text>
      {productos.length > 0 ? (
        <FlatList
          data={productos}
          renderItem={renderProducto}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaProductos}
        />
      ) : (
        <Text style={styles.mensajeVacio}>Tu carrito está vacío.</Text>
      )}
      <TouchableOpacity onPress={cancelarCompra} style={styles.botonCancelar}>
        <Text style={styles.botonCancelarText}>Cancelar Compra</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Comprar} style={styles.botonCancelar}>
        <Text style={styles.botonCancelarText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listaProductos: {
    paddingBottom: 16,
  },
  productoItem: {
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
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  precio: {
    fontSize: 16,
    color: '#888',
    marginVertical: 4,
  },
  cantidadContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cantidad: {
    fontSize: 16,
    marginHorizontal: 12,
    color: '#333',
  },
  botonCantidad: {
    backgroundColor: '#ededed',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  botonCantidadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  botonEliminar: {
    marginTop: 12,
    backgroundColor: '#ff6b6b',
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: 'center',
  },
  botonEliminarText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  botonCancelar: {
    marginTop: 20,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botonCancelarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  mensajeVacio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CarritoScreen;
