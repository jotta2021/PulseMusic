import ContextProvider from "@/context";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
export default function RootLayout() {
  return (
    <ContextProvider>
      <ToastProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="player/[id]" options={{ headerShown: false }} />
        </Stack>
      </ToastProvider>
    </ContextProvider>
  );
}
