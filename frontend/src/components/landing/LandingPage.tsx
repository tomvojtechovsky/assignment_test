// LandingPage.tsx

import Hero from './Hero';
import Overview from './Overview';
import Header from '../shared/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-start bg-gray-100">
      <Header />
      <Hero />
      <Overview />
    </div>
  );
}