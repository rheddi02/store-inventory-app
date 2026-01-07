import { useThemeColor } from '@/hooks/use-theme-color';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';

type Props = {
  selectedValue: any;
  onValueChange: (value: any) => void;
  items: { label: string; value: any }[];
  placeholder?: string
};

export function ThemedSelect({
  selectedValue,
  onValueChange,
  items,
  placeholder
}: Props) {
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const border = useThemeColor({}, 'icon');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: background,
          borderColor: border,
        },
      ]}
    >
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        dropdownIconColor={text}
        style={{ color: text }}
      >
        <Picker.Item label={placeholder || "Select..."} value={null} enabled={false} color={border}/>
        {items.map(item => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 6,
    overflow: 'hidden',
  },
});
