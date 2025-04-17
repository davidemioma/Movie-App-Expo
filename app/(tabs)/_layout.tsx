import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          position: "absolute",
          height: 52,
          backgroundColor: "#0F0D23",
          marginHorizontal: 20,
          marginBottom: 36,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#0F0D23",
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              className="mt-2"
              name="home"
              size={size}
              color={focused ? "#AB8BFF" : "#A8B5DB"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              className="mt-2"
              name="search"
              size={size}
              color={focused ? "#AB8BFF" : "#A8B5DB"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              className="mt-2"
              name="bookmark"
              size={size}
              color={focused ? "#AB8BFF" : "#A8B5DB"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              className="mt-2"
              name="person"
              size={size}
              color={focused ? "#AB8BFF" : "#A8B5DB"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
