import api from "@/lib/db";
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
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<result>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,

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
          console.log(error.response);
          return { success: false, error: error.response?.data.message };
        }
      }
      return { success: false, error: "Something went wrong!" };
    }
  },
}));

export default useAuthStore;
