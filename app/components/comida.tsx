import { useRouter } from "expo-router"
import React from "react"
import { View, StyleSheet, Button, Text, Image, TouchableOpacity} from "react-native"

interface Comida {
  id: number,
  name: string,
  price: number,
  description: string,
  image: string
}

interface ComidaProps{
  plato: Comida;
}

const Comida : React.FC<ComidaProps> = ({plato})=>{
const router= useRouter();
const VerComida = () => {
  router.push(`/screens/comida?id=${plato.id}&name=${plato.name}&image=${plato.image}&price=${plato.price}&description=${plato.description}`);
};

return (
  <View style={styles.card}>
  <Image source={{ uri: plato.image }} style={styles.image} />
  <View style={styles.info}>
    <Text style={styles.name}>{plato.name}</Text>
    <Text style={styles.price}>${plato.price}</Text>
    <Text style={styles.description}>{plato.description}</Text>
    
    <TouchableOpacity style={styles.button} onPress={VerComida}>
      <Text style={styles.buttonText}>Ver Detalle</Text>
    </TouchableOpacity>
  </View>
</View>
);
};

const styles = StyleSheet.create({  
  card: { 
    flexDirection: 'row', 
    padding: 16, 
    marginVertical: 8, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#0f3460', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.4, 
    shadowRadius: 4, 
    elevation: 5
  }, 
  image: { 
    width: 80, 
    height: 80, 
    borderRadius: 8, 
    marginRight: 16 
  }, 
  info: { 
    flex: 1, 
    justifyContent: 'center' 
  }, 
  name: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#e94560', 
    marginBottom: 4 
  }, 
  price: { 
    fontSize: 16, 
    color: '#131c46', 
    fontWeight: '500', 
    marginBottom: 4 
  }, 
  description: { 
    fontSize: 14, 
    color: '#131c46', 
    marginBottom: 8 
  }, 
  button: { 
    backgroundColor: '#16213e', 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 16, 
    alignItems: 'center', 
    alignSelf: 'flex-start' 
  }, 
  buttonText: { 
    color: '#ffffff', 
    fontSize: 14, 
    fontWeight: '600' 
  } 
}); 


export default Comida;
