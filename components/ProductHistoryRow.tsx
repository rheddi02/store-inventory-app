import { Colors } from '@/constants/theme';
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { formatDate } from '@/utils/date-helper';
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export function ProductHistoryRow({
  productHistory,
}: {
  productHistory: any;
}) {
  const theme = useColorScheme() ?? 'light';

  return (
      <ThemedView
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderBottomColor: Colors[theme].tint,
        }}
      >
        <ThemedText style={{ flex: 1 }}>{formatDate(productHistory.createdAt)}</ThemedText>
        <ThemedText style={{ flex: 1, textAlign: "center" }}>
          {productHistory.previousStock} {productHistory.unit}
        </ThemedText>
        <ThemedText style={{ flex: 1, textAlign: "center" }}>
          {productHistory.change}
        </ThemedText>
        <ThemedText style={{ flex: 1, textAlign: "center" }}>
          {productHistory.newStock} {productHistory.unit}
        </ThemedText>
        <ThemedText style={{ flex: 1, textAlign: "center" }}>
          {productHistory.reason}
        </ThemedText>
      </ThemedView>
  );
}
