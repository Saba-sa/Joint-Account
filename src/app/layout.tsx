"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { AppProvider } from "./store/AppContext";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <html lang="en">
        <body>
          <AppProvider>
            {children}
          </AppProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Sidebar />
          {children}
        </AppProvider>

      </body>
    </html>
  );
}
