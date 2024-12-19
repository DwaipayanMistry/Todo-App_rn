import { ThemeProvider } from "@/components/themeContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack>
      </SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00BCD4"
        translucent={true}
      />
    </ThemeProvider>
  );
}
