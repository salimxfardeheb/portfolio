/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      lg: "1290px",
      md: "900px",
      sm: "600px",
    },
    colors: {
      redOrange: "#FF302F",
      nevada: "#676869",
      white: "#FFFFFF",
      black: "#00000",
    },
    fontFamily: {
      poppins: ["Poppins"],
    },
    fontSize: {
      // Desktop
      Header1: ["55px", { fontWeight: "800" }],
      Header2: ["45px", { fontWeight: "800" }],
      Header3: ["35px", { fontWeight: "800" }],
      Header4: ["25px", { fontWeight: "500" }],
      Header5: ["18px", { fontWeight: "300" }],
      // Mobile
      MobileHeader1: ["45px", { fontWeight: "800" }],
      MobileHeader2: ["35px", { fontWeight: "800" }],
      MobileHeader3: ["25px", { fontWeight: "800" }],
      MobileHeader4: ["18px", { fontWeight: "500" }],
      MobileHeader5: ["16px", { fontWeight: "300" }],

      //text
      p: ["16px", { fontWeight: "400" }],
    },


    extend: {
      backgroundImage: {
        hero: "url('/Herosection.png')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
