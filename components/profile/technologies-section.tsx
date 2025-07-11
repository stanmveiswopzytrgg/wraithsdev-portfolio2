"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

const technologies = [
  { name: "Windows", id: "windows" },
  { name: "HTML", id: "html" },
  { name: "CSS", id: "css" },
  { name: "Java", id: "java" },
  { name: "JavaScript", id: "js" },
  { name: "TypeScript", id: "ts" },
  { name: "Python", id: "python" },
  { name: "Node.js", id: "nodejs" },
  { name: "Express", id: "express" },
  { name: "MongoDB", id: "mongodb" },
  { name: "Git", id: "git" },
  { name: "GitHub", id: "github" },
  { name: "VSCode", id: "vscode" },
  { name: "Visual Studio", id: "visualstudio" },
  { name: "Azure", id: "azure" },
  { name: "Discord", id: "discord" },
];

export default function TechnologiesAndProjects() {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/wraithsdev/repos");
        const data = await response.json();
        const sorted = data.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
        setRepos(sorted.slice(0, 6));
      } catch (error) {
        console.error("GitHub verisi alınamadı:", error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section className="space-y-12">

      {/* Teknolojiler */}
      <div>
        <Separator className="my-6" />
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
          <span className="text-red-500">🤖</span> Teknolojiler ve Araçlar
        </h3>
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
              title={tech.name}
            >
              <img
                src={`https://skillicons.dev/icons?i=${tech.id}&theme=dark`}
                alt={tech.name}
                className="w-16 h-16"
              />
            </div>
          ))}
        </div>
      </div>

      {/* GitHub Projeleri */}
      <div>
        <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
    <span className="text-yellow-400">🌍</span> Açık Kaynak Projelerim
  </h3>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-zinc-900 rounded-2xl p-4 border border-zinc-800 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59..." />
                </svg>
                <h4 className="text-md font-semibold text-white truncate">{repo.name}</h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-auto h-4 w-4 text-white opacity-60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0 0L10 21l-7-7L21 3z" />
                </svg>
              </div>
              <p className="text-sm text-zinc-400 mb-3">
                {repo.description || "No description provided"}
              </p>
              <div className="flex items-center text-sm text-zinc-400 gap-4">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    />
                    {repo.language}
                  </div>
                )}
                <div className="flex items-center gap-1">⭐ {repo.stargazers_count}</div>
                <div className="flex items-center gap-1">⚙️ {repo.forks_count}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
{/* Deneyim (Experience) Bölümü */}
<div>
  <Separator className="my-6" />
  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
    <span className="text-green-500">💼</span> Çalıştığım Projeler
  </h3>
  
  <div className="space-y-4">
    {/* Proje 1 */}
    <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4 hover:bg-zinc-800 transition-colors">
      <img
        src="/logos/celestial.png"
        alt="SetScript Logo"
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div>
        <h4 className="text-white font-semibold text-md">Celestial Network</h4>
        <p className="text-zinc-400 text-sm">Minecraft Sunucusu</p>
        <p className="text-zinc-500 text-xs mt-1">Yardımcı Kurucu - Ekip Yönetimi</p>
      </div>
      <div className="ml-auto text-zinc-400 text-sm">2025 - Günümüz</div>
    </div>
    {/* Proje 2 */}
    <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4 hover:bg-zinc-800 transition-colors">
      <img
        src="/logos/siparis.webp"
        alt="SetScript Logo"
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div>
        <h4 className="text-white font-semibold text-md">Sipariş Hanem</h4>
        <p className="text-zinc-400 text-sm">Güvenilir SMM Hizmeti</p>
        <p className="text-zinc-500 text-xs mt-1">Kurulum ve Bot Geliştirme</p>
      </div>
      <div className="ml-auto text-zinc-400 text-sm">2025 - Günümüz</div>
    </div>
    {/* Proje 3 */}
    <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4 hover:bg-zinc-800 transition-colors">
      <img
        src="/logos/altron.webp"
        alt="SetScript Logo"
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div>
        <h4 className="text-white font-semibold text-md">Altron 🎵</h4>
        <p className="text-zinc-400 text-sm">Türkçe En İyi Müzik Botu</p>
        <p className="text-zinc-500 text-xs mt-1">Bot Geliştirme</p>
      </div>
      <div className="ml-auto text-zinc-400 text-sm">2024 - 2025</div>
    </div>
    {/* Proje 4 */}
    <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4 hover:bg-zinc-800 transition-colors">
      <img
        src="/logos/eldoria.gif"
        alt="React Logo"
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div>
        <h4 className="text-white font-semibold text-md">Eldoria Network</h4>
        <p className="text-zinc-400 text-sm">Minecraft Sunucusu</p>
        <p className="text-zinc-500 text-xs mt-1">Plugin ve Script Geliştirme</p>
      </div>
      <div className="ml-auto text-zinc-400 text-sm">2023 - 2024</div>
    </div>
    {/* Proje 5 */}
    <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4 hover:bg-zinc-800 transition-colors">
      <img
        src="/logos/dark.webp"
        alt="React Logo"
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div>
        <h4 className="text-white font-semibold text-md">Dark Uptime</h4>
        <p className="text-zinc-400 text-sm">Discord Bot Uptime Hizmeti</p>
        <p className="text-zinc-500 text-xs mt-1">Bot Geliştirme</p>
      </div>
      <div className="ml-auto text-zinc-400 text-sm">2019 - 2023</div>
    </div>
    {/* Proje 6 */}
    <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4 hover:bg-zinc-800 transition-colors">
      <img
        src="/logos/via.png"
        alt="Node.js Logo"
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div>
        <h4 className="text-white font-semibold text-md">Via Network</h4>
        <p className="text-zinc-400 text-sm">Minecraft Hub Sunucusu</p>
        <p className="text-zinc-500 text-xs mt-1">Sunucu Yönetimi</p>
      </div>
      <div className="ml-auto text-zinc-400 text-sm">2015 - 2019</div>
    </div>
  </div>
</div>

    </section>
  );
}

function getLanguageColor(language: string) {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    C: "#555555",
    "C++": "#f34b7d",
    Go: "#00ADD8",
    Ruby: "#701516",
  };
  return colors[language] || "#999";
}

