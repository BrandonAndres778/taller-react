import AsyncStorage from '@react-native-async-storage/async-storage';
import { Canasta } from '@/app/screens/CarritoCompras';

const CARRITO_KEY = 'canasta';

// Agregar un producto al carrito con la cantidad especificada
export const agregarPedido = async (item: any, cantidad: number) => {
    const carritoExistente = await AsyncStorage.getItem(CARRITO_KEY);
    const carro = carritoExistente ? JSON.parse(carritoExistente) : [];
    const itemIndex = carro.findIndex((pedido: any) => pedido.id === item.id);
    
    if (itemIndex > -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        carro[itemIndex].cantidad += cantidad;
    } else {
        // Si el producto no está en el carrito, agrégalo con la cantidad especificada
        carro.push({ ...item, cantidad });
    }
    await AsyncStorage.setItem(CARRITO_KEY, JSON.stringify(carro));
};

// Obtener el carrito actual
export const obtenerPedido = async () => {
    const canasta = await AsyncStorage.getItem(CARRITO_KEY);
    return canasta ? JSON.parse(canasta) : [];
};

// Vaciar el carrito
export const vaciarPedido = async () => {
    await AsyncStorage.removeItem(CARRITO_KEY);
};

// Obtener el historial de compras
export const obtenerhistorial = async () => {
    const historial = await AsyncStorage.getItem('historial');
    return historial ? JSON.parse(historial) : [];
};

// Guardar una compra en el historial
export const guardarhistorial = async (canasta: Canasta) => {
    try {
        const historialObtenido = await AsyncStorage.getItem('historial');
        const historial = historialObtenido ? JSON.parse(historialObtenido) : [];
        historial.push(canasta);
        await AsyncStorage.setItem('historial', JSON.stringify(historial));
    } catch (error) {
        console.error("Error al guardar en el historial:", error);
    }
};

// Limpiar el historial de compras
export const vaciarHistorial = async () => {
    try {
        await AsyncStorage.removeItem('historial');
        console.log("Historial de compras eliminado");
    } catch (error) {
        console.error("Error al limpiar el historial:", error);
    }
};

// Eliminar un producto específico del carrito
export const eliminarPedido = async (id: string) => {
    const canasta = await obtenerPedido();
    const nuevaCanasta = canasta.filter((item: any) => item.id !== id);
    await AsyncStorage.setItem(CARRITO_KEY, JSON.stringify(nuevaCanasta)); 
};
