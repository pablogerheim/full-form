module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(230, 230, 230, 0.25)',
        '4xl': [
          '0 35px 35px rgba(230, 230, 230, 0.25)',
          '0 45px 65px rgba(230, 230, 230, 0.15)'
        ]
      },
      backgroundImage: {
        'edit': "url('./src/img/edit.png')",
      }
},
  },
  plugins: [],
}
