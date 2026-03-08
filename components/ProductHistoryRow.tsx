import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { formatDate } from "@/utils/date-helper";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export function ProductHistoryRow({ productHistory }: { productHistory: any }) {
  const theme = useColorScheme() ?? "light";
  const changeValue = Number(productHistory.change);
  const changeColor = changeValue < 0 ? "#FF3B30" : "#34C759"; // Red for negative, green for positive

  return (
    <ThemedView
      style={{
        flexDirection: "row",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors[theme].tint,
      }}
    >
      <ThemedText style={{ flex: 1 }}>
        {formatDate(productHistory.createdAt, true)}
      </ThemedText>
      <ThemedText style={{ flex: 1, textAlign: "center" }}>
        {productHistory.previousStock} {productHistory.unit}
      </ThemedText>
      <ThemedText style={{ flex: 1, textAlign: "center", color: changeColor }}>
        {productHistory.change}
      </ThemedText>
      <ThemedText style={{ flex: 1, textAlign: "center" }}>
        {productHistory.newStock} {productHistory.unit}
      </ThemedText>
      {/* <ThemedText style={{ flex: 1, textAlign: "center" }}>
          {productHistory.reason}
        </ThemedText> */}
    </ThemedView>
  );
}
