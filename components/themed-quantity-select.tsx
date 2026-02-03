import { useThemeColor } from "@/hooks/use-theme-color";
import { useState } from "react";
import { FlatList, Modal, Pressable } from "react-native";
import { ThemedButton } from "./themed-button";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export function ThemedQuantitySelect({ value, onChange }: Props) {
  const [visible, setVisible] = useState(false);
  const borderColor = useThemeColor({}, "icon");

  const numbers = Array.from({ length: 100 }, (_, i) => i);

  return (
    <>
      {/* OPEN PICKER */}
      <Pressable onPress={() => setVisible(true)}>
        <ThemedView
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 14,
            borderColor,
          }}
        >
          <ThemedText>{value}</ThemedText>
        </ThemedView>
      </Pressable>

      {/* MODAL */}
      <Modal visible={visible} animationType="slide" transparent>
        {/* BACKDROP (tap to close) */}
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
          }}
          onPress={() => setVisible(false)}
        >
          {/* STOP PROPAGATION */}
          <Pressable onPress={() => {}}>
            <ThemedView
              style={{
                margin: 20,
                borderRadius: 12,
                maxHeight: "70%",
              }}
            >
              <FlatList
                data={numbers}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      onChange(item);
                      setVisible(false);
                    }}
                  >
                    <ThemedView
                      style={{
                        padding: 16,
                        alignItems: "center",
                      }}
                    >
                      <ThemedText
                        style={{
                          fontSize: 18,
                          fontWeight:
                            item === value ? "bold" : "normal",
                        }}
                      >
                        {item}
                      </ThemedText>
                    </ThemedView>
                  </Pressable>
                )}
              />

              {/* CANCEL BUTTON */}
              <ThemedButton title="Cancel" onPress={() => setVisible(false)} />
            </ThemedView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
