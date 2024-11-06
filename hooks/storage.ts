import AsyncStorage from "@react-native-async-storage/async-storage";
import { canasta } from "@/app/screens/CarritoCompras";

const CARRITO_KEY='canasta'

export const agregarPedido = async(item:any, cantidad:number)=>{
    const carritoExistente= await AsyncStorage.getItem(CARRITO_KEY);
    const carro= carritoExistente? JSON.parse(carritoExistente):[];
    const itemComida= carro.findComida((pedido:any)=>pedido.id===item.id);

    if (itemComida>1){
        carro[itemComida].cantidad+=cantidad;
    } else {
        carro.push ({...item, cantidad});
    }
    await AsyncStorage.setItem(CARRITO_KEY, JSON.stringify(carro));
};

export const obtenerPedido = async ()=>{
    const canasta = await AsyncStorage.getItem(CARRITO_KEY);
    return canasta ? JSON.parse(canasta) : [];
}

export const vaciarPedido = async ()=>{
    await AsyncStorage.removeItem(CARRITO_KEY);
}

export const eliminarPedido = async (id: string)=>{
    const canasta = await obtenerPedido();
    const nuevaCanasta = canasta.filter((item: any)=>item.id !==id);
    await AsyncStorage.setItem(CARRITO_KEY,JSON.stringify(nuevaCanasta))
}

export const historial=async()=>{
    const historial = await AsyncStorage.getItem('historial');
    return historial ? JSON.parse(historial):[];
}

export const guardarhistorial = async (canasta: canasta)=>{
    const historialObterner= await AsyncStorage.getItem('historial');
    const historial=historialObterner?JSON.parse(historialObterner):[];
    historial.push(canasta);
    await AsyncStorage.setItem('historial', JSON.parse(historial)) 
}
