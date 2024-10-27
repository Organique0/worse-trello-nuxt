import { defineStore } from "pinia";

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type ResetPasswordCredentials = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};

export const useMyUserStore = defineStore({
  id: "myUserStore",
  persist: { storage: piniaPluginPersistedstate.cookies() },
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async refresh() {
      try {
        this.user = await fetchCurrentUser();
        return true;
      } catch {
        this.user = null;
        return false;
      }
    },

    async fetchCurrentUser<T = User>() {
      try {
        return await $larafetch<T>("/api/user");
      } catch (error: any) {
        if ([401, 419].includes(error?.response?.status)) return null;
        throw error;
      }
    },

    async register(credentials: RegisterCredentials) {
      await $larafetch("/register", { method: "post", body: credentials });
      await this.refresh();
    },

    async login(credentials: LoginCredentials) {
      await $larafetch("/login", { method: "post", body: credentials });
      await this.refresh();
    },

    async logout() {
      const router = useRouter();
      if (!this.isLoggedIn) console.log("not logged");

      await $larafetch("/logout", { method: "post" });
      this.user = null;
      router.push("/");
    },

    async resendEmailVerification() {
      return await $larafetch<{ status: string }>(
        "/email/verification-notification",
        {
          method: "post",
        },
      );
    },

    async forgotPassword(email: string) {
      return await $larafetch<{ status: string }>("/forgot-password", {
        method: "post",
        body: { email },
      });
    },

    async resetPassword(credentials: ResetPasswordCredentials) {
      return await $larafetch<{ status: string }>("/reset-password", {
        method: "post",
        body: credentials,
      });
    },
  },
});
