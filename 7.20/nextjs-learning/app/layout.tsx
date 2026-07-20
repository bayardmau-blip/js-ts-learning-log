export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <h2>My Next.js App</h2>
          <hr />
        </header>

        {children}

        <footer>
          <hr />
          <p>Learning Next.js</p>
        </footer>
      </body>
    </html>
  );
}