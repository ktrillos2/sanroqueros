import localFont from "next/font/local"

export const moonglade = localFont({
  src: [
    { path: "./1-Moonglade light DEMO.ttf", weight: "300", style: "normal" },
    { path: "./2- Moonglade Regular DEMO.ttf", weight: "400", style: "normal" },
    { path: "./3- Moonglade Bold DEMO.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-moonglade",
  display: "swap",
})

export default moonglade
