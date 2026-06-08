import { useSyncExternalStore } from 'react';

// Tiny global store so the Hydration count is shared between the home screen,
// the widget snapshot, and the widget-tap interaction listener.
let glasses = 5;
export const GOAL = 8;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

export const Hydration = {
  get: () => glasses,
  set: (n: number) => {
    glasses = Math.max(0, n);
    emit();
  },
  add: (d: number) => Hydration.set(glasses + d),
  subscribe: (f: () => void) => {
    subs.add(f);
    return () => {
      subs.delete(f);
    };
  },
};

export function useGlasses() {
  return useSyncExternalStore(Hydration.subscribe, Hydration.get, Hydration.get);
}
