import localFont from "next/font/local";

export const Graphik = localFont({
  src: [
    {
      path: "./font_files/Graphik-Medium-Web.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font_files/Graphik-Regular-Web.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-graphik",
});
export const GuardianEgyp = localFont({
  src: [
    {
      path: "./font_files/GuardianEgyp-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font_files/GuardianEgyp-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font_files/GuardianEgyp-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-guardian-egyp",
});
