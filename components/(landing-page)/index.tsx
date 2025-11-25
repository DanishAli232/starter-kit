import FAQ from "./faqs";
import Features from "./features";
import Pricing from "./pricing";
import Footer from "./footer";
import Header from "./header";
import Hero from "./hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
