import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { initDB, seedCategories } from "@/db";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect, useState } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await initDB();
        await seedCategories();
        setReady(true);
      } catch (e) {
        console.error("DB init failed", e);
      }
    })();
  }, []);

  if (!ready) return null; // or splash screen

  return (
    <ActionSheetProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ActionSheetProvider>
  );
}
