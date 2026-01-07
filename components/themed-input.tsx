import { useThemeColor } from '@/hooks/use-theme-color';
import { TextInput, TextInputProps } from 'react-native';

export function ThemedInput({
  style,
  ...props
}: TextInputProps) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'icon');

  return (
    <TextInput
      {...props}
      placeholderTextColor={borderColor}
      style={[
        {
          color: textColor,
          backgroundColor,
          borderWidth: 1,
          borderColor,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 10,
          marginVertical: 6,
          fontSize: 16,
        },
        style,
      ]}
    />
  );
}
