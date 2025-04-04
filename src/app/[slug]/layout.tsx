import type { Metadata } from "next";
// import "./../globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://unpkg.com/@tailwindcss/browser@4"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
