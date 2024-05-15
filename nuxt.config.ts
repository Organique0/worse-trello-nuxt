// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  devtools: { enabled: true },
  colorMode: {
    preference: 'light',
  },
  runtimeConfig: {
    public: {
      backendUrl: "http://localhost:8000",
      frontendUrl: "http://localhost:3000",
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    "@nuxt/ui",
    "@nuxt/image",
    "vue3-carousel-nuxt",
    '@formkit/nuxt',
    '@pinia/nuxt',
    "shadcn-nuxt"
  ],
  formkit: {
    autoImport: true
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
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon',
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './shadComponents/ui'
  }

})