import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
// import { Container } from './styles';
import { Link } from 'expo-router';
interface DataProps {
    data: {
        name: string;
        id: string;
        album: {
            title: string;
            cover_big: string;
        };
        artist: {
            name: string;
        };
    };
}
export default function CardComponent({ data }: DataProps) {


    //se o texto for muito grande ele reduz e adiciona reticencias
    const Substring = (text: string) => {
        if (text.length > 20) {
            return text.substring(0, 20) + "...";
        }
        return text;
    };


    // essa conta armazena a musica selecionada 
    const [selecionedId, setSelecionedId] = useState<DataProps['data'] | null>(null);

   
    return (

        <TouchableOpacity style={styles.card}
            onPress={() => setSelecionedId(data)}
        >
            <View style={{ flexDirection: "row", gap: 20, justifyContent: "center" }}>
                <Image src={data.album.cover_big} style={styles.image} />
                <View>
                    <Text style={styles.title}>{Substring(data.album.title)}</Text>
                    <Text style={styles.subtitle}>{data.artist.name}</Text>
                </View>

            </View>
            <Link href={`/player/${data.id}`}>
                <AntDesign name="play" size={24} color="white" />
            </Link>


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 70,
        position: "relative",
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: 20,
        marginStart: 10,
        marginEnd: 10,
        flexDirection: 'row'

    },
    image: {
        width: 70,
        height: 70,
        objectFit: "cover",
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
    },
    subtitle: {
        color: "white",
    },

});
