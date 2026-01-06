import { ScrollView, Pressable } from 'react-native';
import { ThemedView } from '../themed-view';
import { ThemedText } from '../themed-text';

type Category = {
  id: number;
  name: string;
};

type Props = {
  categories: Category[];
  activeId: number | null;
  onSelect: (id: number | null) => void;
};

export function CategoryTabs({ categories, activeId, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginVertical: 10 }}
    >
      <Pressable onPress={() => onSelect(null)}>
        <ThemedView
          style={{
            padding: 10,
            marginRight: 8,
            borderRadius: 8,
            opacity: activeId === null ? 1 : 0.5,
          }}
        >
          <ThemedText>All</ThemedText>
        </ThemedView>
      </Pressable>

      {categories.map(cat => (
        <Pressable key={cat.id} onPress={() => onSelect(cat.id)}>
          <ThemedView
            style={{
              padding: 10,
              marginRight: 8,
              borderRadius: 8,
              opacity: activeId === cat.id ? 1 : 0.5,
            }}
          >
            <ThemedText>{cat.name}</ThemedText>
          </ThemedView>
        </Pressable>
      ))}
    </ScrollView>
  );
}
