import { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Header } from "../../components/Header";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Entypo } from "@expo/vector-icons";
import logoImg from "../../assets/logo-nlw-esports.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Background } from "../../components/Background";
import { GameParams } from "../../@types/navigation";
import { LOCAL } from "@env";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscorUser(adsId: string) {
    fetch(`${LOCAL}:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => setDiscordDuoSelected(data.discord));
  }

  useEffect(() => {
    fetch(`${LOCAL}:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="contain" />

        <Header title={game.title} subtitle={"Conecte-se e comece a jogar!"} />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DuoCard data={item} onConnect={() => getDiscorUser(item.id)} />}
          style={styles.containerList}
          horizontal
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
        />
        <DuoMatch
          visible={discordDuoSelected.length > 0}
          onClose={() => setDiscordDuoSelected("")}
          discord={discordDuoSelected}
        />
      </SafeAreaView>
    </Background>
  );
}
