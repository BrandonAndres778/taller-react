import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const Comida: React.FC = () => {
  const { id, name, image, price, description } = useLocalSearchParams();
  const router = useRouter();
  const [cantidad, setCantidad] = useState(1);  
    
  const volverMenu = () => {
    router.back();
  };


  return (
    <View style={styles.Contenedor}>
      <Image source={{ uri: image as string }} style={styles.image} />
      <Text style={styles.nombre}>{name}</Text>
      <Text style={styles.precio}>Precio: ${price}</Text>
      <Text style={styles.descripcion}>{description}</Text>

      <View style={styles.cantidadContenedor}>
        <Button title="-" onPress={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)} />
        <Text style={styles.cantidadText}>{cantidad}</Text>
        <Button title="+" onPress={() => setCantidad(cantidad + 1)} />
      </View>

      <TouchableOpacity style={styles.BotonContent} onPress={volverMenu}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Volver al Menú</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    Contenedor: { 
      flex: 1, 
      padding: 24, 
      backgroundColor: '#f0e7d8', 
      borderRadius: 20, 
      shadowColor: '#4a4a4a', 
      shadowOffset: { width: 2, height: 6 }, 
      shadowOpacity: 0.3, 
      shadowRadius: 8, 
      elevation: 6, 
    },
    image: { 
      width: '100%', 
      height: 250, 
      marginBottom: 24, 
      borderRadius: 15, 
      borderColor: '#c6a87d',
      borderWidth: 2,
    },
    nombre: { 
      fontSize: 30, 
      fontWeight: '800',
      color: '#563d2d', 
      marginBottom: 12,
    },
    precio: { 
      fontSize: 24, 
      color: '#b04a00', 
      marginVertical: 12,
      fontWeight: '700', 
    },
    descripcion: { 
      fontSize: 18, 
      color: '#735f45', 
      lineHeight: 28, 
      marginBottom: 24,
    },
    cantidadContenedor: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center', 
      marginVertical: 20, 
      borderWidth: 2,
      borderColor: '#a78a5a', 
      borderRadius: 10,
      padding: 12,
    },
    cantidadText: { 
      marginHorizontal: 20, 
      fontSize: 24, 
      fontWeight: '700',
      color: '#563d2d',
    },
    button: {
      marginTop: 30,
      paddingVertical: 16,
      paddingHorizontal: 24,
      backgroundColor: '#7f5539',
      borderRadius: 12,
      alignItems: 'center',
      elevation: 4, 
    },
    buttonText: {
      color: '#ffe8d6',
      fontSize: 20,
      fontWeight: '700', 
    },
    BotonContent: {
      marginVertical: 14,
      borderRadius: 12, 
      overflow: 'hidden', 
    },
  });
  

export default Comida;