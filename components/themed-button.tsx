import { useThemeColor } from '@/hooks/use-theme-color';
import { Pressable, PressableProps } from 'react-native';
import { ThemedText } from './themed-text';

type Props = PressableProps & {
  title: string;
  variant?: 'primary' | 'outline' | 'danger';
};

export function ThemedButton({
  title,
  variant = 'primary',
  style,
  ...props
}: Props) {
  const background = useThemeColor(
    {},
    variant === 'primary'
      ? 'tint'
      : 'background'
  );

  const textColor = useThemeColor(
    {},
    variant === 'outline'
      ? 'tint'
      : 'background'
  );

  const borderColor = useThemeColor({}, 'tint');

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        {
          backgroundColor:
            variant === 'outline' ? 'transparent' : background,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: variant === 'outline' ? borderColor : 'transparent',
          paddingVertical: 12,
          borderRadius: 10,
          alignItems: 'center',
          opacity: pressed ? 0.85 : 1,
          marginVertical: 6,
        },
        style,
      ]}
    >
      <ThemedText
        style={{
          color:
            variant === 'primary'
              ? textColor
              : borderColor,
          fontWeight: '600',
        }}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}
