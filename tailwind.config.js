/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue",
		"./error.vue",
	],
	theme: {
		extend: {
			backgroundImage: {
				whiteCurves: "url('/public/white-wave-bg.svg')",
				download: "url('/public/download.svg')",
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
