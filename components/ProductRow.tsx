import { Pressable } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';

export function ProductRow({
  item,
  onPress,
}: {
  item: any;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
        }}
      >
        <ThemedText style={{ flex: 2 }}>{item.name}</ThemedText>
        <ThemedText style={{ flex: 1, textAlign: 'center' }}>
          ₱{item.unitPrice}
        </ThemedText>
        <ThemedText style={{ flex: 1, textAlign: 'center' }}>
          {item.stock} {item.unit}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}
