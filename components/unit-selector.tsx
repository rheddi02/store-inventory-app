import { useThemeColor } from "@/hooks/use-theme-color";
import { useEffect, useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface UnitSelectorProps {
  units: string[];
  selectedUnit?: string;
  onSelect: (unit: string) => void;
}

export const UnitSelector = ({
  units,
  selectedUnit,
  onSelect,
}: UnitSelectorProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = useWindowDimensions();

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

  useEffect(() => {
    // Find indices of -1 and 1
    const indexMinus1 = units.indexOf("-1");
    const index1 = units.indexOf("1");

    if (indexMinus1 !== -1 && index1 !== -1) {
      // Each badge is 60px + 10px gap = 70px
      const itemWidth = 70;
      const centerOfMinus1 = indexMinus1 * itemWidth + 30; // 30 is half of 60
      const centerOf1 = index1 * itemWidth + 30;
      const midpoint = (centerOfMinus1 + centerOf1) / 2;
      const scrollOffset = midpoint - screenWidth / 2;

      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: Math.max(0, scrollOffset),
          animated: true,
        });
      }, 100);
    }
  }, [units, screenWidth]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}
      scrollEventThrottle={16}
    >
      {units.map((unit) => {
        const isSelected = unit === selectedUnit;
        const unitValue = Number(unit);
        const unitBorderColor = unitValue < 0 ? "#85241f" : "#337945"; // Red for negative, green for positive

        return (
          <Pressable key={unit} onPress={() => onSelect(unit)}>
            <ThemedView
              style={[
                styles.badge,
                { borderColor: unitBorderColor },
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    height: 60,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
  },
  badge: {
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
});
