// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
	rules: {
		"no-unused-vars": "off",
		"import/first": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"vue/html-self-closing": "off",
		"vue/multi-word-component-names": "off",
		"@typescript-eslint/no-explicit-any": "off","
              :
	},
});
// Your custom configs here
