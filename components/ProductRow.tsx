import { useActionSheet } from "@expo/react-native-action-sheet";
import { Pressable } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Colors } from '@/constants/theme';

export function ProductRow({
  product,
  onEdit,
  onDelete,
  onView,
}: {
  product: any;
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
  onView: (product: any) => void;
}) {
  const { showActionSheetWithOptions } = useActionSheet();
  const theme = useColorScheme() ?? 'light';

  const onPress = () => {
    const options = ["View", "Edit", "Delete", "Cancel"];
    const cancelButtonIndex = 3;
    const destructiveButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (index) => {
        if (index === 0) onView(product);
        if (index === 1) onEdit(product);
        if (index === 2) onDelete(product);
      }
    );
  };

  return (
    <Pressable onPress={onPress}>
      <ThemedView
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderBottomColor: Colors[theme].tint,
        }}
      >
        <ThemedText style={{ flex: 2 }}>{product.name}</ThemedText>
        <ThemedText style={{ flex: 1, textAlign: "center" }}>
          {product.stock} {product.unit}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}
