"use client";
import { useEffect, useState } from "react";

export function useData(fn, deps = []) {
  const [s, set] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let off = false;
    set({ data: null, loading: true, error: null });
    if (typeof fn !== "function") {
      set({ data: null, loading: false, error: new Error("lib/api.js e function nei") });
      return;
    }
    fn()
      .then((data) => !off && set({ data, loading: false, error: null }))
      .catch((error) => !off && set({ data: null, loading: false, error }));
    return () => { off = true; };
    // eslint-disable-next-line
  }, deps);
  return s;
}