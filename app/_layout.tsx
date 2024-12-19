import { ThemeProvider } from "@/components/themeContext";
import { Stack } from "expo-router";
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
    </ThemeProvider>
  );
}
