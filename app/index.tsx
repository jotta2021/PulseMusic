import { Link, router, useNavigation } from "expo-router";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useContext, useState } from "react";
import Icon from "@expo/vector-icons/AntDesign";
import { contextAuth } from "@/context";


export default function Index() {
  

  const [user, setUser] = useState("");

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>

<TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>


    <SafeAreaView style={{alignItems:'center'}} >
        <Image
         src="https://i.ibb.co/6NY5qxP/pulse-azul.png"
          alt="logo"
         style={{objectFit:'contain',width:150,height:150}}
        />

      <View style={styles.header}>
      
        <View>
          <Text style={styles.title}>Milhões de músicas em um só lugar !</Text>
        </View>
      </View>

      <View style={styles.containerInputs}>
        <View style={styles.contentInputs}>
          <TextInput
            style={styles.input}
            placeholder="Email ou Usuário"
            value={user}
            onChangeText={(text) => setUser(text)}
            placeholderTextColor={"white"}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={user}
            onChangeText={(text) => setUser(text)}
            placeholderTextColor={"white"}
          />

          
            <TouchableOpacity style={styles.button}
        onPress={()=> router.push('home')}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
            </TouchableOpacity>
    

        

        
        </View>
      </View>
 
    </SafeAreaView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    justifyContent:'center'
  },
  header: {
    backgroundColor: "black",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    objectFit: "cover",
    
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  containerInputs: {
    marginTop: 50,
    borderTopLeftRadius: 90,
    width: "100%",
    backgroundColor: "black",

  },
  contentInputs: {
    marginTop: 30,
    alignItems: "center",
    gap: 20,
  },
  input: {
    width: 350,
    borderRadius: 8,
    height: 50,
    fontSize: 14,
    backgroundColor: "#9999",
    color: "white",
    borderWidth: 0,
    paddingHorizontal:10
  },
  text: {
    color: "white",
  },
  button: {
    width: 300,
    borderRadius: 10,
    height: 50,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "white",
    width: 90,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
});
