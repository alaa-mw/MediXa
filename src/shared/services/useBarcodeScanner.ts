import { useEffect, useRef } from "react";

interface UseBarcodeScannerProps {
  onScan: (code: string) => void;
  /** ms to wait after last keystroke to consider scan finished (only used when requireEnter is false) */
  scanTimeout?: number;
  /** If time between keys larger than this, treat as new stream (ms) */
  interKeyDelayThreshold?: number;
  /** Require an explicit terminator (Enter) to emit scans. Recommended: true */
  requireEnter?: boolean;
  /** If true, do not capture when a page input/textarea/select or contentEditable is focused */
  ignoreWhenFocusedOnInputs?: boolean;
}

export const useBarcodeScanner = ({
  onScan,
  scanTimeout = 80,
  interKeyDelayThreshold = 100,
  requireEnter = true,
  ignoreWhenFocusedOnInputs = true,
}: UseBarcodeScannerProps) => {
  const bufferRef = useRef("");
  const lastKeyTimeRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    function clearTimer() {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    function flushBuffer() {
      const code = bufferRef.current;
      if (code) {
        try {
          onScan(code);
        } catch  {
          // swallow errors from handler
        }
      }
      bufferRef.current = "";
      lastKeyTimeRef.current = null;
      clearTimer();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      const tag = (active?.tagName || "").toLowerCase();
      const activeIsEditable = !!(
        active &&
        (tag === "input" ||
          tag === "textarea" ||
          tag === "select" ||
          active.isContentEditable)
      );

      const now = Date.now();

      const gap = lastKeyTimeRef.current
        ? now - lastKeyTimeRef.current
        : Infinity;
      const isFast = gap < interKeyDelayThreshold;

      if (lastKeyTimeRef.current && gap > interKeyDelayThreshold) {
        // gap too large -> treat as new stream
        bufferRef.current = "";
      }

      // update last key time for next event
      lastKeyTimeRef.current = now;

      // Terminator (Enter)
      if (e.key === "Enter" || e.code === "Enter") {
        // Only suppress default if we already have a buffer (likely scanner stream)
        if (bufferRef.current.length > 0) {
          try {
            e.preventDefault();
          } catch {}
        }

        if (requireEnter) {
          if (bufferRef.current) {
            flushBuffer();
          }
          return;
        }
        // if not requiring Enter, continue to allow Enter through when not part of a scan
      }

      // collect printable characters
      if (e.key.length === 1) {
        // decide if this keystroke looks like scanner input
        const shouldCapture = bufferRef.current.length > 0 || isFast;

        if (activeIsEditable && !shouldCapture) {
          // manual typing into a focused input -> don't capture or preventDefault
          return;
        }

        // preventDefault only when capturing (scanner stream)
        if (shouldCapture) {
          try {
            e.preventDefault();
          } catch { /* empty */ }
        }

        bufferRef.current += e.key;

        // schedule a flush when not requiring explicit terminator
        if (!requireEnter) {
          clearTimer();
          timerRef.current = window.setTimeout(() => {
            flushBuffer();
          }, scanTimeout) as unknown as number;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [
    onScan,
    scanTimeout,
    interKeyDelayThreshold,
    requireEnter,
    ignoreWhenFocusedOnInputs,
  ]);
};
