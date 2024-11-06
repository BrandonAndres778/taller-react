import { useRouter } from "expo-router"
import React from "react"
import { View, StyleSheet, Button, Text, Image, StyleProp} from "react-native"

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
    <View style={styles.info} >
      <Text style={styles.name}>{plato.name}</Text>
      <Text style={styles.price}>${plato.price}</Text>
      <Text style={styles.description}>{plato.description}</Text>
      <View >
      <Button title="Ver Detalles"  onPress={VerComida} />
      </View>
      
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 16, marginVertical: 8, backgroundColor: '#f9f9f9', borderRadius: 50 },
  image: { width: 100, height: 80, borderRadius: 8, marginRight: 16 },
  info: { flex: 1 },
  name: { fontSize: 30, fontWeight: 'bold' },
  price: { fontSize: 16, color: 'green', marginVertical: 4 },
  description: { fontSize: 14, color: '#555' },
});

export default Comida;
