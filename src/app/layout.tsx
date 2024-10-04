import type { Metadata } from "next";
import Sidebar from "./components/Sidebar"
// import Deposit from "./components/Deposit"
// import Accountdepositorhistory from "./components/Accountdepositorhistory"
import RequestWithdrawal from "./components/RequestWithdrawal"
import "./globals.css";



export const metadata: Metadata = {
  title: "Decentralized Joint Account",
  description: "Developed by Saba Ali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Sidebar />
        {children}
        {/* <Deposit /> */}
        {/* <Accountdepositorhistory /> */}
        <RequestWithdrawal />
      </body>
    </html>
  );
}
