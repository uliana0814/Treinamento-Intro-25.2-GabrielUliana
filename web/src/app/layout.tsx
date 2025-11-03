import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; 


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "027 Store",
  description: "A melhor loja capixaba!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gradient-to-br from-[#9ac8ff] to-[#ffa8f0]`}>

        <Toaster /> 
        
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}