// tailwind.config.js

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#65D6FC",
        "dark": "#08061B",
        "secondary": "#5E17EB",
        "white": "#FFFFFF"
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        AlmendraBold: ["Almendra-Bold", "sans-serif"],
        AlmendraRegular: ["Almendra-Regular", "sans-serif"],
        AlmendraBoldItalic: ["Almendra-BoldItalic", "sans-serif"],
        AlmendraItalic: ["Almendra-Italic", "sans-serif"],
        AmiriBold : ["Amiri-Bold", "sans-serif"],
        AmiriRegular : ["Amiri-Regular", "sans-serif"],
        AmiriBoldItalic : ["Amiri-BoldItalic", "sans-serif"],
        AmiriItalic : ["Amiri-Italic", "sans-serif"],
        quran: ["quran", "sans-serif"],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #65D6FC 0%, #0DC7D2 100%)',
      },
    },
  },
  plugins: [],
}