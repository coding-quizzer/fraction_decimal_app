import { useEffect } from "react";

export default function useDebounce(operation: () => void, ms = 1000) {
  useEffect(() => {
    const timeout = setTimeout(operation, ms);
    return () => clearTimeout(timeout);
  }, [operation, ms]);
}
