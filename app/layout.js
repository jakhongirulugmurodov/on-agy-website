import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "O'N — O'sish Nuqtasi | Biznesingizning o'sish nuqtasini topamiz",
  description:
    "O'N SMM agentligi: interaktiv yo'l xaritasi — strategiya, kontent ishlab chiqarish va oylik tahlil orqali biznesingizning o'sish nuqtasini topamiz.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05060a] text-slate-100">
        {children}
      </body>
    </html>
  );
}
