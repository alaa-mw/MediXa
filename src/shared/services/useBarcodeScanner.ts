import { useEffect } from 'react';

interface UseBarcodeScannerProps {
  onScan: (code: string) => void;
}

export const useBarcodeScanner = ({ onScan }: UseBarcodeScannerProps) => {
  useEffect(() => {
    let buffer = '';
    let lastKeyTime = Date.now();

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentTime = Date.now();

      if (currentTime - lastKeyTime > 50) {
        buffer = '';
      }

      lastKeyTime = currentTime;

      if (e.key === 'Enter') {
        if (buffer) {
          onScan(buffer);
          buffer = '';
        }
        return;
      }

      if (e.key.length === 1) {
        buffer += e.key;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onScan]);
};