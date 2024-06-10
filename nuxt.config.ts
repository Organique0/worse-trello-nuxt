// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  devtools: { enabled: true },
  colorMode: {
    preference: "light",
  },
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
      frontendUrl: process.env.NUXT_PUBLIC_FRONTEND_URL,
      unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
      unsplashSecretKey: process.env.UNSPLASH_SECRET_KEY
    },
  },
  css: ["~/assets/css/main.css"],
  modules: [
    "nuxt-icon",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/ui",
    "@nuxt/image",
    "vue3-carousel-nuxt",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/eslint"
  ],
  formkit: {
    autoImport: true,
  },
  imports: {
    dirs: ["./utils"],
  },
  experimental: {
    asyncContext: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./shadComponents/ui",
  },
});
