/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue",
		"./error.vue",
		"./formkit.theme.ts",
	],
	theme: {
		extend: {
			backgroundImage: {
				whiteCurves: "url('/public/white-wave-bg.svg')",
				download: "url('/public/download.svg')",
				footerLeft: "url('/public/footer-left.svg')",
				footerRight: "url('/public/footer-right.svg')",
				viewsBgRight: "url('/public/ViewsBackground_Right_Narrow.svg')",
				viewsBgLeft: "url('/public/ViewsBackground_Left_Narrow.svg')",
			},
			colors: {
				wierdBlue: "#091E42",
				wierdGreen: "#e6fcff",
				surveyPink: "#f99cdb",
				surveyPurple: "#6554C0",
			},
		},
	},
};
