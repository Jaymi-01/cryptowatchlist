import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FavoritesProvider } from "../context/FavoritesContext";

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000000",
    card: "#000000",
    border: "#1a1a1a",
    text: "#ffffff",
  },
};

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <ThemeProvider value={CustomDarkTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Crypto Watchlist" }} />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </FavoritesProvider>
  );
}
