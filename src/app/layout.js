import "./globals.css"
import { NavBar } from "./components/NavBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-100">
        <NavBar />
      {children}
      </body>
    </html>
  );
}
