import { Pressable, View } from "react-native";
import { ThemedText } from "./themed-text";

export const FloatingButton = ({
  setSelectedProduct,
  setModalVisible,
}: {
  setSelectedProduct: (product: any) => void;
  setModalVisible: (visible: boolean) => void;
}) => {
  return (
    <Pressable
      onPress={() => {
        setSelectedProduct(null);
        setModalVisible(true);
      }}
    >
      <View
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          backgroundColor: "#007AFF",
          padding: 16,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText
            style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
          >
            +
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
};

export default FloatingButton;
