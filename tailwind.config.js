/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				apple: [
					"SF Pro",
					"-apple-system",
					"BlinkMacSystemFont",
					'"Segoe UI"',
					"Roboto",
					'"Helvetica Neue"',
					"Arial",
					"sans-serif",
				],
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".no-scrollbar": {
					/* Hide scrollbar for modern browsers */
					"scrollbar-width": "none", // Firefox
					"-ms-overflow-style": "none", // IE 10+
				},
				".no-scrollbar::-webkit-scrollbar": {
					display: "none", // Chrome, Safari, Edge
				},
			});
		},
	],
};
