import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import api from "@/api";
import axios from "axios";
import CardComponent from "@/components/CardComponents";
import Close from "@expo/vector-icons/AntDesign";

export default function Search() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function SearchMusic() {
    setLoading(true);
    console.log(`${api}search?q=track:'${search}'&index=0&limit=2&output=json`);
    await axios
      .get(`${api}search?q=track:'${search}'&index=0&limit=10&output=json`)
      .then((res) => {
        const dados = res.data;
        setData(dados.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Erro ao realizar pesquisa", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (search !== "") {
      SearchMusic();
      console.log("buscando músicas");
    } else {
      setData([]);
    }
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.containerInput}>
          <TextInput
            placeholder="Procurar músicas, artistas ou álbuns"
            style={styles.input}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          {search === "" ? (
            <TouchableOpacity style={styles.icon}>
              <Icon name="search" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.icon} onPress={() => setSearch("")}>
              <Close name="close" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ flex: 1, marginTop: 10 }}>
          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#1E90FF" />
            </View>
          ) : data.length === 0 ? (
            <Text style={styles.text}>Faça uma nova busca</Text>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CardComponent data={item} />}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  searchContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 50,
  },
  containerInput: {
    alignItems: "center",
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    height: 50,
    borderRadius: 10,
    width: '100%',
    paddingLeft: 10,
    backgroundColor: "white",
  },
  icon: {
    position: "absolute",
    top: "20%",
    bottom: 0,
    right: 30,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginTop: "50%",
  },
  listContent: {
    paddingBottom: 20,
  },
});

