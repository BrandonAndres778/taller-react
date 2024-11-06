import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ProductoComida from '../components/comida';


interface Producto {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

const Productos: Producto[] = [
  { id: 1, name: 'Papas fritas', category: 'Productos a la Carta', image: '../assets/images/papas fritas crujientes.jpg', price: 5000, description: 'papas fritas crujientes ' },
  // Agrega más Productos según sea necesario
];

const Menu: React.FC = () => {
  const [CatSelected, setCatSelected] = useState<string>('Todas');
  const router = useRouter();

  const filteredProductos = CatSelected === 'Todas'
    ? Productos
    : Productos.filter(Producto => Producto.category === CatSelected);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Menú Restaurante</Text>
      <View style={styles.CatContent}>
        {['Todas', 'Bebidas Frías', 'Bebidas Calientes', 'Sopas', 'Productos del día', 'Productos de la carta', 'Menú infantil'].map(category => (
          <TouchableOpacity key={category} onPress={() => setCatSelected(category)} style={styles.CatBoton}>
            <Text style={[, CatSelected === category && styles.CatSelected]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredProductos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <ProductoComida plato={item}/>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f5f5f5',
  },
  titulo: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 1, 
    color: '#333',
    alignSelf: 'center'
  },
  CatContent: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 5, 
  },
  CatBoton: { 
    paddingVertical: 10, 
    paddingHorizontal: 8, 
    margin: 1, 
    backgroundColor: '#9DFAF0', 
    borderWidth: 1, 
  },
  CategoriaTexto: { 
    fontSize: 16, 
    color: '#444'
  },
  CatSelected: { 
    color: '#fffff', 
    fontWeight: 'bold',
  }
});



export default Menu;