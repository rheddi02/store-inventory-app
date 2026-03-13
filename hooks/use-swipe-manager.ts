import { useRef } from "react"
import { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable"

export function useSwipeManager() {
  const openRow = useRef<SwipeableMethods | null>(null)

  const onRowOpen = (row: SwipeableMethods | null) => {
    if (openRow.current && openRow.current !== row) {
      openRow.current.close()
    }

    openRow.current = row
  }

  const closeOpenRow = () => {
    openRow.current?.close()
    openRow.current = null
  }

  return {
    onRowOpen,
    closeOpenRow
  }
}