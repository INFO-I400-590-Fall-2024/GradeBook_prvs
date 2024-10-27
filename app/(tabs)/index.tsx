import {Image, StyleSheet, Platform, View} from "react-native";

import {HelloWave} from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import FirebaseFetcher from "@/components/FirebaseFetcher";
import FirebaseAddData from "@/components/FirebaseAddData";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{light: "#A1CEDC", dark: "#1D3D47"}}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.headerSection}>
          <ThemedText type='title'>Welcome!</ThemedText>
          <FirebaseAddData />
        </ThemedView>
        <ThemedView style={styles.contentSection}>
          <FirebaseFetcher />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  headerSection: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 8,
  },
  contentSection: {
    flex: 1,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
  },
});
