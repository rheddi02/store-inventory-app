import { useThemeColor } from "@/hooks/use-theme-color";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface UnitSelectorProps {
  units: string[];
  selectedUnit: string;
  onSelect: (unit: string) => void;
}

export const UnitSelector = ({
  units,
  selectedUnit,
  onSelect,
}: UnitSelectorProps) => {
  const textColor = useThemeColor({ light: "#000", dark: "#fff" }, "text");
  const borderColor = useThemeColor(
    { light: "#888", dark: "#aaa" },
    "background",
  );
  const selectedBackground = useThemeColor(
    { light: "#007AFF", dark: "#0A84FF" },
    "tint",
  );
  const selectedTextColor = useThemeColor(
    { light: "#fff", dark: "#fff" },
    "icon",
  );

  return (
    <View style={styles.container}>
      {units.map((unit) => {
        const isSelected = unit === selectedUnit;

        return (
          <Pressable key={unit} onPress={() => onSelect(unit)}>
            <ThemedView
              style={[
                styles.badge,
                { borderColor },
                isSelected && { backgroundColor: selectedBackground },
              ]}
            >
              <ThemedText
                style={{ color: isSelected ? selectedTextColor : textColor }}
              >
                {unit}
              </ThemedText>
            </ThemedView>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 8,
  },
  badge: {
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "transparent", // default, overridden by selected
  },
});
