import { create } from "zustand";
import { Cca3List } from "../types";

interface CountriesState {
  cca3List: Cca3List | null;
  setCca3List: any;
}

export const useCountriesStore = create<CountriesState>()((set) => ({
  cca3List: null,
  setCca3List: (cca3List: Cca3List | null) => set({ cca3List }),
}));
