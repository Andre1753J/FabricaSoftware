import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import StatusGate from "@/components/StatusGate";

export const metadata = {
  title: "Pet's World",
  description: "Projeto do IFRO-Vilhena materia Fabrica de Software",
  charset: 'UTF-8',
  author: 'André Orocondo Lopes Aguirre',
  keywords: 'HTML, CSS, JavaScript, React, Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StatusGate>
        <Header/>
        {children}
        <Footer/>
        </StatusGate>
      </body>
    </html>
  );
}