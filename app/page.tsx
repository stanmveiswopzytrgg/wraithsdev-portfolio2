import Image from 'next/image';
import { GithubIcon, Mail, Clock, Users, ExternalLink } from 'lucide-react';
import ProfileHeader from '@/components/profile/profile-header';
import AboutSection from '@/components/profile/about-section';
import TechnologiesSection from '@/components/profile/technologies-section';
import SocialLinks from '@/components/profile/social-links';
import Footer from '@/components/profile/footer';

export default function Home() {
  return (
    <div className="min-h-screen text-foreground relative">
      {/* Arka plan resmi için ayrı bir div */}
      <div
        style={{
          backgroundImage: "url('/logos/backround.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(35px)', // Sadece arka plan resmine blur uygular
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Arka planı içeriğin altına yerleştirir
        }}
      />
      {/* İçerik için ana div */}
      <main className="flex flex-col md:flex-row gap-12 w-full max-w-6xl mx-auto px-4 py-12 relative z-10">
        <ProfileHeader />
        <div className="text-lg">
          <AboutSection />
          <TechnologiesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}