import React from "react";
import Header from "../components/header";

export default function RootLayout(
  {children,}: 
    Readonly<{children: React.ReactNode;}>
  
  ) {
    
  return (
    <html lang="en">
      <body>
        <Header />

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
