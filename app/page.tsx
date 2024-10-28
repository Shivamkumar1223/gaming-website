import Image from "next/image";
import AnimatedBackground from "./components/AnimatedBackground";

export default function Home() {
  return (
    <div className="min-h-screen text-white p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                NexusGaming
              </h1>
            </div>
            <div className="hidden sm:flex items-center space-x-8">
              <a href="#games" className="hover:text-purple-400 transition-colors">Games</a>
              <a href="#tournaments" className="hover:text-purple-400 transition-colors">Tournaments</a>
              <a href="#news" className="hover:text-purple-400 transition-colors">News</a>
              <a href="#support" className="hover:text-purple-400 transition-colors">Support</a>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <main className="flex flex-col gap-12 items-center max-w-7xl mx-auto relative pt-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-7xl font-bold leading-tight">
              Enter the World of
              <span className="block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Epic Gaming
              </span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl max-w-xl">
              Experience next-generation gaming with stunning graphics, competitive tournaments, and a vibrant community.
            </p>
            <div className="flex gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-md transition-all transform hover:scale-105">
                Play Now
              </button>
              <button className="border border-purple-500 px-8 py-4 rounded-md hover:bg-purple-500/10 transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {/* Add a featured game image here */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        </div>

        {/* Featured Games */}
        <section className="w-full mt-20">
          <h3 className="text-2xl font-bold mb-8">Featured Games</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((game) => (
              <div key={game} className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-purple-900/20 hover:transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <h4 className="font-bold text-lg">Game Title</h4>
                  <p className="text-sm text-gray-300">Action RPG</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Tournaments */}
        <section className="w-full bg-purple-900/10 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
          <h3 className="text-2xl font-bold mb-6">Live Tournaments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((tournament) => (
              <div key={tournament} className="bg-black/40 rounded-lg p-4 hover:bg-black/60 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-red-400">LIVE</span>
                </div>
                <h4 className="font-bold">Championship Series</h4>
                <p className="text-sm text-gray-400">Prize Pool: $10,000</p>
                <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors">
                  Watch Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500 relative border-t border-purple-500/20 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 mb-8">
          <div>
            <h4 className="font-bold text-white mb-4">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400">Company</a></li>
              <li><a href="#" className="hover:text-purple-400">Careers</a></li>
              <li><a href="#" className="hover:text-purple-400">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400">Safety</a></li>
              <li><a href="#" className="hover:text-purple-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400">Privacy</a></li>
              <li><a href="#" className="hover:text-purple-400">Terms</a></li>
              <li><a href="#" className="hover:text-purple-400">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4 justify-center">
              {["Discord", "Twitter", "YouTube", "Twitch"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="hover:text-purple-400 transition-all hover:scale-110"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-purple-500/20 py-8">
          <p>© 2024 NexusGaming. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
