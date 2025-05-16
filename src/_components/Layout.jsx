import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-row max-w-4xl mx-auto w-full p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
