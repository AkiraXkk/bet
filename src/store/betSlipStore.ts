'use client';

import { create } from 'zustand';

export interface BetSelection {
  eventId: string;
  eventTitle: string;
  odds: number;
  team: string;
}

interface UserState {
  id: string;
  username: string;
  balance: number;
}

interface BetSlipStore {
  selections: BetSelection[];
  addSelection: (selection: BetSelection) => void;
  removeSelection: (eventId: string) => void;
  clearSelections: () => void;
  user: UserState | null;
  setUser: (user: UserState | null) => void;
  updateBalance: (balance: number) => void;
}

export const useBetSlipStore = create<BetSlipStore>((set) => ({
  selections: [],
  addSelection: (selection) =>
    set((state) => {
      const exists = state.selections.find((s) => s.eventId === selection.eventId);
      if (exists) return state;
      return { selections: [...state.selections, selection] };
    }),
  removeSelection: (eventId) =>
    set((state) => ({
      selections: state.selections.filter((s) => s.eventId !== eventId),
    })),
  clearSelections: () => set({ selections: [] }),
  user: null,
  setUser: (user) => set({ user }),
  updateBalance: (balance) =>
    set((state) => ({
      user: state.user ? { ...state.user, balance } : null,
    })),
}));
