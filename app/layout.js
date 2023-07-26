"use client";
import "@styles/globals.css";
import { Inter } from "next/font/google";
import Provider from "@components/Provider";
import Nav from "@components/Nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sambatdotcom",
  description: "Create and Share Your Personal Unek Unek Here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
