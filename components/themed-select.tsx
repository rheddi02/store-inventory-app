import { useThemeColor } from "@/hooks/use-theme-color";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type Props = {
  selectedValue: any;
  onValueChange: (value: any) => void;
  items: { label: string; value: any }[];
  placeholder?: string;
};

export function ThemedSelect({
  selectedValue,
  onValueChange,
  items,
  placeholder,
}: Props) {
  const [open, setOpen] = useState(false);
  const background = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const border = useThemeColor({}, "icon");

  return (
    <View style={styles.wrapper}>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={selectedValue}
        setValue={onValueChange}
        items={items}
        placeholder={placeholder || "Select..."}
        containerStyle={styles.container}
        style={[
          styles.picker,
          {
            backgroundColor: background,
            borderColor: border,
          },
        ]}
        dropDownContainerStyle={{
          backgroundColor: background,
          borderColor: border,
        }}
        textStyle={{
          color: text,
        }}
        placeholderStyle={{
          color: border,
        }}
        arrowIconStyle={{
          tintColor: text,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 6,
    zIndex: 10,
  },
  container: {
    height: 50,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 8,
  },
});
