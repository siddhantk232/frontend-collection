module.exports = {
  mode: "jit",
  purge: ["./src/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gaccent: "#00C365",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
