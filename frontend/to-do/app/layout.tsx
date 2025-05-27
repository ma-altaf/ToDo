import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TodoContextProvider from "@/features/items/components/TodoProvider";
import { getItems } from "@/features/items/services/main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToDo",
  description: "Manage todo items",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const todosPromise = getItems();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TodoContextProvider todosPromise={todosPromise}>
          {children}
        </TodoContextProvider>
      </body>
    </html>
  );
}
