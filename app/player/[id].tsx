import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import api from "@/api";
import { useNavigation } from "expo-router";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { contextAuth } from "@/context";
import { useToast } from "react-native-toast-notifications";

interface Track {
  title: string;
  preview: string;
  artist: {
    name: string;
  };
  album: {
    cover_big: string;
    tracklist: string;
  };
}

export default function PlayerMusic() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [track, setTrack] = useState<Track | null>(null);
  const [like, setLike] = useState(false);
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState<Audio.Sound | null>(null);
  const [repeat, setRepeat] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackId, setTrackId] = useState(0);
  const authContext = useContext(contextAuth);
  const data = authContext?.data || [];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const toast = useToast();
  async function getTrack() {
    const searchTrack = data.find((item) => item.id === Number(id));
    console.log(searchTrack);
    setTrack(searchTrack);
  }

  useEffect(() => {
    getTrack();
    setTrackId(Number(id));
  }, [id]);

  useEffect(() => {
    if (track) {
      Reproduze();
    }
  }, [track, repeat]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.unloadAsync();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [audio]);

  const Substring = (text: string) => {
    if (text.length > 60) {
      return text.substring(0, 60) + "...";
    }
    return text;
  };

  async function Reproduze() {
    if (audio) {
      await audio.stopAsync();
      await audio.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: track?.preview || "" },
      {
        shouldPlay: true,
        isLooping: repeat,
      }
    );

    setAudio(sound);
    setPlay(true);

    const status = await sound.getStatusAsync();
    setDuration(status.durationMillis || 0);

    intervalRef.current = setInterval(async () => {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setPosition(status.positionMillis);
        if (status.positionMillis >= (status.durationMillis || 0)) {
          await sound.setPositionAsync(0);
          if (repeat) {
            await sound.playAsync();
            setPlay(true);
          } else {
            setPlay(false);
            SetNextTrack();
          }
        }
      }
    }, 1000);
  }

  async function pauseAudio() {
    if (audio) {
      try {
        await audio.pauseAsync();
        setPlay(false);
        console.log("Reprodução de áudio pausada.");
      } catch (error) {
        getTrack();
        setPlay(false);
        setPosition(0);
        setDuration(0);
        console.error("Erro ao pausar a reprodução de áudio:", error);
      }
    } else {
      console.warn("Não há áudio para pausar.");
    }
  }

  async function resumeAudio() {
    if (audio) {
      try {
        await audio.playAsync();
        setPlay(true);
        console.log("Reprodução de áudio retomada.");
      } catch (error) {
        console.error("Erro ao retomar a reprodução de áudio:", error);
        setPlay(false);
        setPosition(0);
        setDuration(0);
        setAudio(null);
        getTrack();
      }
    } else {
      console.warn("Não há áudio para retomar.");
    }
  }

  const onSliderValueChange = async (value: number) => {
    if (audio) {
      await audio.setPositionAsync(value);
      if (!play) {
        await audio.playAsync();
        setPlay(true);
      }
    }
  };

  //salva a proxima track da lista na state
  function SetNextTrack() {
    //pega o id da proxima musica

    const trackIndex = data.findIndex((item) => item.id === trackId);
    const nextTrackIndex = Number(trackIndex) + 1;

    if (nextTrackIndex < data.length) {
      setTrack(data[nextTrackIndex]);
      setTrackId(data[nextTrackIndex].id);
      console.log("trackId", trackId, "proxima track", nextTrackIndex);
      setPosition(0);

      setDuration(0);
    } else {
      Alert.alert("Não há mais músicas");
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="setting" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentImage}>
          {track && track.album && track.album.cover_big && (
            <Image
              source={{ uri: track.album.cover_big }}
              style={styles.image}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            height: 80,
          }}
        >
          <View style={styles.contentInfo}>
            <Text style={styles.title}> {track && Substring(track.title)}</Text>
            <Text style={styles.subtitle}>
              {" "}
              {track && track.artist && track.artist.name}
            </Text>
          </View>
          {like ? (
            <TouchableOpacity onPress={() => {setLike(false)
              toast.show("Música removida dos meus favoritos")

            }}>
              <Entypo name="heart" color="red" size={30} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setLike(true);
                toast.show("Música adicionada aos meus favoritos");
              }}
            >
              <Entypo name="heart-outlined" color="white" size={30} />
            </TouchableOpacity>
          )}
        </View>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={onSliderValueChange}
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#000000"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{Math.floor(position / 1000)}s</Text>
          <Text style={styles.timeText}>{Math.floor(duration / 1000)}s</Text>
        </View>

        <View style={styles.buttonsGroup}>
          <TouchableOpacity>
            <AntDesign name="stepbackward" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (play) {
                pauseAudio();
              } else {
                resumeAudio();
              }
            }}
          >
            {play ? (
              <Ionicons name="pause-circle" size={80} color="#1E90FF" />
            ) : (
              <Ionicons name="play-circle" size={80} color="#1E90FF" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => SetNextTrack()}>
            <AntDesign name="stepforward" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.repeat}
            onPress={() => setRepeat(!repeat)}
          >
            {repeat ? (
              <MaterialCommunityIcons name="repeat" size={30} color="white" />
            ) : (
              <MaterialCommunityIcons
                name="repeat-off"
                size={30}
                color="white"
              />
            )}
          </TouchableOpacity>
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
  content: {
    marginTop: 30,
    marginStart: 20,
    marginEnd: 20,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentImage: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 380,
    height: 280,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
  },
  contentInfo: {
    gap: 5,
  },
  title: {
    color: "white",
    fontSize: 18,
    width: 280,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#e6e6e6",
    fontSize: 14,
    width: 280,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    color: "white",
  },
  buttonsGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  repeat: {
    position: "absolute",
    right: 20,
  },
});
