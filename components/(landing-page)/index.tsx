import Footer from "./footer";
import Header from "./header";
import Hero from "./hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}
