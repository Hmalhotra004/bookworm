import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
