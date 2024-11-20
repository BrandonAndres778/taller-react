import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Comida from '../components/comida';


interface plato {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

const Productos: plato[] = [
  { id: 1, name: 'Papas fritas', category: 'Platos de la carta', image: '../assets/images/papas fritas crujientes.jpg', price: 10000, description: 'papas fritas crujientes ' },
  { id: 2, name: 'CocaCola', category: 'Bebidas Frías', image: '../assets/images/cocacola.jpg', price: 5000, description: 'Refrescate con una gaseosa fria' },
  { id: 3, name: 'late', category: 'Bebidas Calientes', image: '../assets/images/late.jpg', price: 4000, description: 'Late colombiano realizado e¿a base de leche y cafe' },
  { id: 4, name: 'Pechuga a ranchera', category: 'Platos de la carta', image: '../assets/images/pechugaRanchera.jpg', price: 30000, description: 'Pechuga a la plancha, con salsa de chorizo y maiz'},
  { id: 5, name: 'Lasagna', category: 'Platos del día', image: '../assets/images/lasagna.jpg', price: 30000, description: 'Lasagna realizada a base de carne molida' },
  { id: 6, name: 'Picada', category: 'Platos de la carta', image: '../assets/images/picada.jpg', price: 25000, description: 'Picada del dia con dierentes tipo de carne y papa' },
  // Agrega más Productos según sea necesario
];

const Menu: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');

  // Filtra los platos según la categoría seleccionada
  const filteredPlatos = categoriaSeleccionada === 'Todas'
    ? Productos
    : Productos.filter(plato => plato.category === categoriaSeleccionada);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>
      <View style={styles.categoryContainer}>
        {['Todas', 'Bebidas Frías', 'Bebidas Calientes', 'Sopas', 'Platos del día', 'Platos de la carta', 'Menú infantil'].map(category => (
          <TouchableOpacity key={category} onPress={() => setCategoriaSeleccionada(category)} style={styles.botonCategoria}>
            <Text style={[styles.categoriaTexto, categoriaSeleccionada === category && styles.categoriaSeleccionada]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredPlatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id}>
            <Comida plato={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
  },
  title: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#e94560', 
    textAlign: 'center',
  },
  categoryContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 16, 
    justifyContent: 'center',
  },
  botonCategoria: { 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    margin: 6, 
    borderRadius: 25, 
    backgroundColor: '#16213e',
    borderWidth: 1, 
    borderColor: '#0f3460', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  categoriaTexto: { 
    fontSize: 16, 
    color: '#a8dadc', 
  },
  categoriaSeleccionada: { 
    color: '#e94560', 
    fontWeight: 'bold',
  },
});

export default Menu;