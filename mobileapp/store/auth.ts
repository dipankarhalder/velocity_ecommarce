import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,

  setToken: async (token) => {
    if (token) {
      await AsyncStorage.setItem("authToken", token);
      set({ token, isAuthenticated: true });
    } else {
      await AsyncStorage.removeItem("authToken");
      set({ token: null, isAuthenticated: false });
    }
  },

  login: async (token) => {
    await AsyncStorage.setItem("authToken", token);
    set({ token, isAuthenticated: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem("authToken");
    set({ token: null, isAuthenticated: false });
  },

  hydrate: async () => {
    const storedToken = await AsyncStorage.getItem("authToken");
    set({ token: storedToken, isAuthenticated: !!storedToken });
  },
}));
