import Link from 'next/link';
import { GithubIcon, Mail, Youtube } from 'lucide-react';
import { FiInstagram, FiYoutube, FiTwitter } from "react-icons/fi";


export default function SocialLinks() {
  return (
    <div className="flex flex-col gap-2 text-lg">
      <SocialLink 
        href="https://github.com/wraithsdev" 
        icon={<GithubIcon className="text-violet-400" size={20} />}
        label="GitHub"
        username="github.com/wraithsdev"
      />
      
      <SocialLink 
        href="mailto:wraithsisbirligi@gmail.com" 
        icon={<Mail className="text-violet-400" size={20} />}
        label="Email"
        username="wraithsisbirligi@gmail.com"
      />
      
      <SocialLink 
        href="https://youtube.com/@WraithsDev" 
        icon={<FiYoutube className="text-violet-400" size={20} />}
        label="Youtube"
        username="youtube.com/@WraithsDev"
      />
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  username: string;
}

function SocialLink({ href, icon, label, username }: SocialLinkProps) {
  return (
    <Link 
      href={href}
      target="_blank"
      rel="noopener noreferrer" 
      className="flex items-center gap-2 w-full group transition-colors duration-200"
    >
      <span>{icon}</span>
      <span>{label}</span>
      <span className="ml-auto text-base text-violet-400 group-hover:text-violet-300 transition-colors duration-200">
        {username}
      </span>
    </Link>
  );
}