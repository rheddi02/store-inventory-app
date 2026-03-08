import { useThemeColor } from "@/hooks/use-theme-color";
import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

export const ThemedInput = forwardRef(
  ({ style, ...props }: TextInputProps, ref) => {
    const textColor = useThemeColor({}, "text");
    const backgroundColor = useThemeColor({}, "background");
    const borderColor = useThemeColor({}, "icon");

    return (
      <TextInput
        ref={ref}
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
  },
);

ThemedInput.displayName = "ThemedInput";
