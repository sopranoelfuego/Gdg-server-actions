import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gdg-sample-demo-app",
  description: "This project explore server actions and ways to implement them",
};
const menus: Array<{ id: number; name: string; path: string }> = [
  {
    id: 1,
    name: "Server actions way",
    path: "/",
  },
  {
    id: 2,
    name: "Classic way",
    path: "/client-side-way",
  },
  
];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full flex justify-center items-center">

      <ul className="flex items-center gap-3 py-5">
        {menus?.map((_) => (
          <li
            key={_?.id}
            className="p-2 text-sm hover:cursor-pointer transition-all duration-300 rounded-lg hover:bg-slate-400 hover:text-white sm:p-2 bg-green-300"
          >
            <Link href={_?.path}>{_.name}</Link>
          </li>
        ))}
      </ul>
        </div>

        {children}
      </body>
    </html>
  );
}
