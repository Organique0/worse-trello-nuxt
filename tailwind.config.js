const animate = require("tailwindcss-animate");
const {
	iconsPlugin,
	getIconCollections,
} = require("@egoist/tailwindcss-icons");
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	safelist: ["dark"],
	prefix: "",
	content: [
		"./components/**/*.{js,vue,ts}",
		"./shadComponents/ui/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue",
		"./error.vue",
		"./formkit.theme.ts",
	],

	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			boxShadow: {
				blueLeft: "inset 2px 0 0 0 #0c66e4",
			},
			backgroundImage: {
				whiteCurves: "url('/public/white-wave-bg.svg')",
				download: "url('/public/download.svg')",
				footerLeft: "url('/public/footer-left.svg')",
				footerRight: "url('/public/footer-right.svg')",
				viewsBgRight: "url('/public/ViewsBackground_Right_Narrow.svg')",
				viewsBgLeft: "url('/public/ViewsBackground_Left_Narrow.svg')",
				logoGif: "url('/public/logoGif.gif')",
				createWorkspaceFormBg: "url('/public/createWorkspaceFormBg.svg')",
			},
			colors: {
				wierdBlue: "#091E42",
				wierdGreen: "#e6fcff",
				surveyPink: "#f99cdb",
				surveyPurple: "#6554C0",
				lightBlueBg: "#e9f2ff",
				darkBlueBg: "#0c66e4",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				xl: "calc(var(--radius) + 4px)",
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				xs: "calc(var(--radius) - 8px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
				"collapsible-down": {
					from: { height: 0 },
					to: { height: "var(--radix-collapsible-content-height)" },
				},
				"collapsible-up": {
					from: { height: "var(--radix-collapsible-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"collapsible-down": "collapsible-down 0.2s ease-in-out",
				"collapsible-up": "collapsible-up 0.2s ease-in-out",
			},
		},
	},
	plugins: [
		animate,
		"prettier-plugin-tailwindcss",
		iconsPlugin({
			// Select the icon collections you want to use
			// You can also ignore this option to automatically discover all individual icon packages you have installed
			// If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
			//collections: getIconCollections(["mdi", "lucide"]),
			// If you want to use all icons from @iconify/json, you can do this:
			// collections: getIconCollections("all"),
			// and the more recommended way is to use `dynamicIconsPlugin`, see below.
		}),
	],
};
