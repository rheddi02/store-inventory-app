import MilkCategory from '@/components/categories/milk';
import SyrupCategory from '@/components/categories/syrup';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

const CATEGORIES = ['Syrup', 'Milk'] as const;

export default function HomeScreen() {
  const [active, setActive] = useState<typeof CATEGORIES[number]>('Syrup');

  return (
    <ThemedView style={styles.container}>
      {/* Category Tabs */}
      <ThemedView style={styles.tabs}>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setActive(cat)}
            style={[
              styles.tab,
              active === cat && styles.activeTab,
            ]}
          >
            <ThemedText
              style={[
                styles.tabText,
                active === cat && styles.activeText,
              ]}
            >
              {cat}
            </ThemedText>
          </Pressable>
        ))}
      </ThemedView>

      {/* Content */}
      <ThemedView style={styles.content}>
        {active === 'Syrup' && <SyrupCategory />}
        {active === 'Milk' && <MilkCategory />}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#007AFF',
  },
  tabText: {
    color: '#777',
  },
  activeText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
});
