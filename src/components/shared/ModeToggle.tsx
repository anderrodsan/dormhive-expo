import { useColorScheme } from "nativewind";
import { Switch, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ModeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      className="px-5 rounded-lg flex-row items-center"
    >
      {colorScheme === "dark" ? (
        <Feather name="moon" size={20} color="white" />
      ) : (
        <Feather name="sun" size={20} color="black" />
      )}
      <Switch value={colorScheme === "dark"} onChange={toggleColorScheme} />
    </TouchableOpacity>
  );
}
