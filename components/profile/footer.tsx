import { Separator } from '@/components/ui/separator';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-4 pb-8">
      <Separator className="mb-6" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
        </div>
        
        <div className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} - All rights reserved
        </div>
      </div>
    </footer>
  );
}