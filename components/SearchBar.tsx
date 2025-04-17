import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, TextInput } from "react-native";

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: () => void;
  placeholder: string;
};

export default function SearchBar({
  value,
  onChangeText,
  onSearch,
  placeholder,
}: Props) {
  return (
    <View className="bg-dark-200 flex flex-row items-center px-5 py-4 rounded-full">
      <Ionicons
        className="text-accent"
        name="search"
        size={16}
        color="#ab8bff"
      />

      <TextInput
        className="flex-1 ml-2 text-white"
        value={value}
        onChangeText={onChangeText}
        onPress={onSearch}
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
      />
    </View>
  );
}
