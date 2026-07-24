import { useRef } from "react";
import { v4 as uuid } from "uuid";

export const useIdempotency = () => {
  const keyRef = useRef<string | null>(null);

  const getKey = () => {
    if (!keyRef.current) {
      keyRef.current = uuid();
    }

    return keyRef.current;
  };

  const clearKey = () => {
    keyRef.current = null;
  };

  return {
    getKey,
    clearKey,
  };
};
