const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./mdx-components.tsx",
		"content/**/*.mdx",
	],

	theme: {
		extend: {
			colors: {
				cream: "#F7E7CE",
				forest: "#1a4a3a",
			},
			typography: {
				DEFAULT: {
					css: {
						"--tw-prose-body": "#1a4a3a",
						"--tw-prose-headings": "#1a4a3a",
						"--tw-prose-lead": "#1a4a3a99",
						"--tw-prose-links": "#1a4a3a",
						"--tw-prose-bold": "#1a4a3a",
						"--tw-prose-counters": "#1a4a3a66",
						"--tw-prose-bullets": "#1a4a3a66",
						"--tw-prose-hr": "#1a4a3a40",
						"--tw-prose-quotes": "#1a4a3a",
						"--tw-prose-quote-borders": "#1a4a3a40",
						"--tw-prose-captions": "#1a4a3a99",
						"--tw-prose-code": "#1a4a3a",
						"--tw-prose-pre-code": "#F7E7CE",
						"--tw-prose-pre-bg": "#1a4a3a",
						"--tw-prose-th-borders": "#1a4a3a40",
						"--tw-prose-td-borders": "#1a4a3a20",
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			},
			fontFamily: {
				sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
				display: ["var(--font-calsans)"],
			},
			backgroundImage: {
				"gradient-radial":
					"radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
			},
			animation: {
				"fade-in": "fade-in 3s ease-in-out forwards",
				title: "title 3s ease-out forwards",
				"fade-left": "fade-left 3s ease-in-out forwards",
				"fade-right": "fade-right 3s ease-in-out forwards",
			},
			keyframes: {
				"fade-in": {
					"0%": {
						opacity: "0%",
					},
					"75%": {
						opacity: "0%",
					},
					"100%": {
						opacity: "100%",
					},
				},
				"fade-left": {
					"0%": {
						transform: "translateX(100%)",
						opacity: "0%",
					},

					"30%": {
						transform: "translateX(0%)",
						opacity: "100%",
					},
					"100%": {
						opacity: "0%",
					},
				},
				"fade-right": {
					"0%": {
						transform: "translateX(-100%)",
						opacity: "0%",
					},

					"30%": {
						transform: "translateX(0%)",
						opacity: "100%",
					},
					"100%": {
						opacity: "0%",
					},
				},
				title: {
					"0%": {
						"line-height": "0%",
						"letter-spacing": "0.25em",
						opacity: "0",
					},
					"25%": {
						"line-height": "0%",
						opacity: "0%",
					},
					"80%": {
						opacity: "100%",
					},

					"100%": {
						"line-height": "100%",
						opacity: "100%",
					},
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-debug-screens"),
	],
};
