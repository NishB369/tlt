import { Navbar } from '@/src/components/landing/Navbar';
import { Hero } from '@/src/components/landing/Hero';
import { Features } from '@/src/components/landing/Features';
import { Footer } from '@/src/components/landing/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
