module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: '#EB5757',
				grey: {
					50: '#F2F2F2',
					100: '#BDBDBD',
					200: '#828282',
					300: '#4F4F4F',
					400: '#333',
				},
			},
			fontFamily: {
				font1: "'Montserrat', sans-serif",
				font2: "'Mulish', sans-serif",
			},
			boxShadow: {
				base: '0px 1px 6px rgba(0, 0, 0, 0.1)',
			},
		},
	},
	plugins: [],
};
