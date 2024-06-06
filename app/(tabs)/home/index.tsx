import { Link, useNavigation } from "expo-router";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Icon from "@expo/vector-icons/AntDesign";


export default function Home() {
  const navigation = useNavigation();

const [radio,setRadio] = useState([])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}> 

        <Text style={styles.title}>Música</Text>
        <Text style={styles.text}>As mais tocadas</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
 content:{
marginTop:30,
marginStart:20
 },
  
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignItems:'flex-start'
  },
  containerInputs: {
    marginTop: 50,
    borderTopLeftRadius: 90,
    width: "100%",
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
 
 
});
