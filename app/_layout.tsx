import { ThemeProvider } from "@/components/themeContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <SafeAreaProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index"></Stack.Screen>
                    <Stack.Screen name="todos/[id]"></Stack.Screen>
                </Stack>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}
