import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, SafeAreaView, Text } from "react-native";

export default function SavedScreen() {
  return (
    <SafeAreaView className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Ionicons name="bookmark" size={100} color="white" />

        <Text className="text-gray-500 text-base">Saved</Text>
      </View>
    </SafeAreaView>
  );
}
