import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          A&Y Inventory App
        </ThemedText>
      </ThemedView>
      <ThemedText>
        This app is only intended for A&Y Sippop snack hauz usage.
      </ThemedText>
      <Collapsible title="Proprietor">
        <ThemedText>
          <ThemedText type="defaultSemiBold">
            Yhenna Mae Antonio Bayog
          </ThemedText>
        </ThemedText>
        <ThemedText>+63 935 811 4619</ThemedText>
        <ExternalLink href="https://web.facebook.com/AYSIPPOP/">
          <ThemedText type="link">FB Page</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android App">
        <ExternalLink href="https://drive.google.com/file/d/1ibrL80itd7i-jN94OePsPDiQjxL8CEeX/view?usp=sharing">
          <ThemedText type="link">APK File</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Images">
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
