/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "./scripts/inputs.js",
  ],
  theme: {
    extend: {
      screens:{
        'xs':'320px',
        's':'375px',
        'sm':'412px',
        'md':'760px',
        'lg':'1024px',
        'xl':'1280px',
        '2xl':'1536px',
      },
      colors:{
        priPurple:'hsl(259, 100%, 65%)',
        priLightRed:'hsl(0, 100%, 67%)',
        neuWhite:'hsl(0, 0%, 100%)',
        neuOffWhite:'hsl(0, 0%, 94%)',
        neuLightGrey:'hsl(0, 0%, 86%)',
        neuSmokeGrey:'hsl(0, 1%, 44%)',
        neuOffBlack:' hsl(0, 0%, 8%)'
      },
      fontFamily:{
        poppins:'poppins',
        poppinsItalics:'poppins-italics',
        poppinsLightItalics:'poppins-lightItalics',
      }
    },
  },
  plugins: [],
}

