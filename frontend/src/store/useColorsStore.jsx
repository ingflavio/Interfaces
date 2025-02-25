import { create } from "zustand";

// Crear el store para la paleta de colores
const usePaletteStore = create((set) => ({
  primary_color: "#ffffff",
  secondary: "#303334",
  accent: "#303334",
  button: "#59ab6e",
  titleSize: 15,
  subtitleSize: 12,
  paragraphSize: 12,
  activa: false,
  nombrePaleta: "",

  // Función para actualizar el estado de la paleta
  setPalette: (newPalette) => set((state) => ({ ...state, ...newPalette })),
}));

export default usePaletteStore;
