import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ProductProvider } from "@/context/ProductContext";
import { initDB, seedCategories } from "@/db";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

  useEffect(() => {
    async function checkForUpdates() {
      try {
        if (__DEV__) {
          return; // Skip updates in development
        }

        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          Alert.alert(
            "Update Available",
            "App will restart to apply updates.",
            [
              {
                text: "Update",
                onPress: () => Updates.reloadAsync(),
              },
            ],
          );
        }
      } catch (error) {
        console.log("Error checking for updates:", error);
      }
    }

    checkForUpdates();
  }, []);

  if (!ready) return null; // or splash screen

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ActionSheetProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ProductProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ProductProvider>
      </ThemeProvider>
    </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}
