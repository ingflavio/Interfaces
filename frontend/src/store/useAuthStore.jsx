import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const useAuthStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       isAuthenticated: false,
//       login: (userData) => set({ user: userData, isAuthenticated: true }),
//       logout: () => set({ user: null, isAuthenticated: false }),
//     }),
//     {
//       name: "auth-storage",
//       getStorage: () => localStorage,
//     }
//   )
// );

// export default useAuthStore;
