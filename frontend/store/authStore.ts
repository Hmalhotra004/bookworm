import api from "@/lib/api";
import { User } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { create } from "zustand";

export type result = {
  success: boolean;
  error?: string;
};

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (email: string, password: string) => Promise<result>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<result>;
  checkAuth: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", data.token);

        set({ user: data.user, token: data.token, isLoading: false });

        return {
          success: true,
        };
      } else {
        set({ isLoading: false });
        return { success: false, error: "Something went wrong!" };
      }
    } catch (error) {
      set({ isLoading: false });
      if (axios.isAxiosError(error)) {
        return { success: false, error: error.response?.data.message };
      }
      return { success: false, error: "Something went wrong!" };
    }
  },

  register: async (username: string, email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/auth/register", {
        email,
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", data.token);

        set({ user: data.user, token: data.token, isLoading: false });

        return {
          success: true,
        };
      } else {
        set({ isLoading: false });
        return { success: false, error: "Something went wrong!" };
      }
    } catch (error) {
      set({ isLoading: false });
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400 || error.response?.status === 409) {
          return { success: false, error: error.response?.data.message };
        }
      }
      return { success: false, error: "Something went wrong!" };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
