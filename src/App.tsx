import React, { useState, useEffect } from 'react';
import { MapPin, Mail, ArrowRight, Heart, Shield, Mountain, Menu, X, Users, Lock } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated in this browser session/storage
    const storedAuth = localStorage.getItem('rvsar_preview_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check. Not secure against inspection, but stops casual browsing.
    if (passwordInput === 'review2026') {
      setIsAuthenticated(true);
      localStorage.setItem('rvsar_preview_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
      setPasswordInput('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 font-sans text-stone-800">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-8 text-center">
          <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-md mx-auto mb-6">
            R
          </div>
          <h1 className="text-2xl font-bold text-emerald-950 mb-2">RVSAR Preview</h1>
          <p className="text-stone-500 mb-8">Please enter the password to view the site draft.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border ${authError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-stone-300 focus:ring-emerald-500 focus:border-emerald-500'} rounded-xl leading-5 bg-stone-50 placeholder-stone-400 focus:outline-none focus:bg-white sm:text-sm transition-colors`}
                  placeholder="Enter password"
                  autoFocus
                />
              </div>
              {authError && <p className="mt-2 text-sm text-red-600 text-left">Incorrect password. Please try again.</p>}
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-800 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              Access Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'CORSAR', href: '#corsar' },
    { name: 'Join', href: '#join' },
    { name: 'Donate', href: '#donate' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-emerald-950/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-orange-500 transition-colors">
                  R
                </div>
                <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-white' : 'text-white drop-shadow-md'}`}>
                  RVSAR
                </span>
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium hover:text-orange-500 transition-colors ${
                    isScrolled ? 'text-stone-300' : 'text-stone-100 drop-shadow-md'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#donate"
                className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-md"
              >
                Donate
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md ${isScrolled ? 'text-white' : 'text-white drop-shadow-md'}`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-emerald-950 border-t border-emerald-900">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-white hover:bg-emerald-900"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop"
            alt="Southern Oregon Mountains"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-emerald-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/40 to-stone-50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-600/20 border border-orange-500/50 text-orange-400 text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
            Volunteer Search & Rescue
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            Answering the Call in <br className="hidden md:block" />
            <span className="text-orange-500">Southern Oregon</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-stone-200 max-w-3xl mx-auto font-light drop-shadow-md mb-10">
            Dedicated volunteers providing critical search, rescue, and recovery services across the rugged terrain of Jackson County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#about"
              className="bg-emerald-800 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Learn More <ArrowRight size={20} />
            </a>
            <a
              href="#donate"
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Support Our Mission <Heart size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-orange-600" size={32} />
                <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">About RVSAR</h2>
              </div>
              <div className="w-20 h-1 bg-orange-600 mb-8"></div>
              
              <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                <p>
                  Rogue Valley Search and Rescue (RVSAR) is a dedicated team of highly trained volunteers serving the diverse and challenging landscapes of Southern Oregon. From the dense forests of the Siskiyou Mountains to the turbulent waters of the Rogue River, our members are ready to deploy in all weather conditions, day or night.
                </p>
                <p>
                  We serve at the behest of the Jackson County Sheriff's Office, acting as their primary volunteer arm for search and rescue operations. When the Sheriff's Office receives a call for a lost hiker, a stranded climber, or a missing person, RVSAR is activated to provide the specialized manpower and expertise required to bring them home safely.
                </p>
                <div className="bg-emerald-50 border-l-4 border-emerald-800 p-6 rounded-r-lg mt-8">
                  <p className="text-emerald-900 font-medium italic">
                    "While we work hand-in-hand with law enforcement during missions, RVSAR operates as an independent 501(c)(3) non-profit organization. We are funded entirely by community support and driven by the passion of our volunteers."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-orange-600/10 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1888&auto=format&fit=crop"
                alt="Search and Rescue Team in the Mountains"
                className="relative rounded-2xl shadow-2xl object-cover h-[600px] w-full"
                referrerPolicy="no-referrer"
              />
              
              {/* Stats overlay */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-emerald-900">24/7</div>
                  <div className="text-sm text-stone-500 font-medium uppercase tracking-wider">Readiness</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-stone-500 font-medium uppercase tracking-wider">Volunteer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORSAR Section */}
      <section id="corsar" className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Users className="text-orange-500 mx-auto mb-6" size={48} />
            <h2 className="text-3xl md:text-5xl font-bold text-emerald-950 mb-6">Regional Mutual Aid</h2>
            <p className="text-xl text-stone-600">
              Our commitment extends beyond Jackson County. We are proud members of the California Oregon Regional Search and Rescue Task Force (CORSAR).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  'Jackson County', 'Douglas County', 'Josephine County', 
                  'Klamath County', 'Curry County', 'Coos County', 
                  'Oregon State Police', 'Siskiyou County', 'Del Norte County', 
                  'Bureau of Land Management', 'US Forest Service'
                ].map((agency, i) => (
                  <div key={i} className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-center flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-sm font-semibold text-emerald-900">{agency}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6 text-lg text-stone-600 leading-relaxed">
              <p>
                Search and Rescue emergencies don't respect county lines or state borders. That's why RVSAR actively participates in CORSAR, a coalition of agencies dedicated to providing mutual aid across the region.
              </p>
              <p>
                When a neighboring county faces a massive search effort or a complex rescue operation that exhausts their local resources, our volunteers deploy to assist them. In return, when Jackson County experiences a critical incident, we can rely on these partner agencies to send their highly trained personnel to help us.
              </p>
              <p className="font-medium text-emerald-800">
                This collaborative approach ensures that anyone lost or injured in the region receives the fastest, most effective response possible, regardless of jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-24 bg-emerald-950 text-stone-300 relative overflow-hidden">
        {/* Abstract topographic background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Mountain className="text-orange-500 mx-auto mb-6" size={48} />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Join the Team</h2>
            <p className="text-xl text-stone-400">
              Are you ready to answer the call? We are always looking for dedicated individuals to join our ranks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Requirements',
                desc: 'Volunteers must be at least 18 years old, pass a background check, and maintain a high level of physical fitness suitable for carrying heavy packs over rough terrain.'
              },
              {
                title: 'Training Academy',
                desc: 'All new recruits must complete our comprehensive SAR Academy. Training covers wilderness navigation, survival, first aid, tracking, and specialized rescue techniques.'
              },
              {
                title: 'Commitment',
                desc: 'RVSAR requires a significant time commitment. Members are expected to attend regular monthly trainings, meetings, and be available for emergency call-outs.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-emerald-900/50 border border-emerald-800 p-8 rounded-2xl hover:bg-emerald-900 transition-colors">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-600/20 text-orange-500 text-sm">{i + 1}</span>
                  {item.title}
                </h3>
                <p className="text-stone-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-emerald-900 border border-emerald-800 p-8 rounded-2xl max-w-2xl mx-auto">
              <h4 className="text-2xl font-bold text-white mb-4">Upcoming Recruitment</h4>
              <p className="text-stone-300 mb-6">
                [Placeholder: Information about the next SAR Academy, application deadlines, and informational meetings will be posted here. Please check back later or contact us for more details.]
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 text-orange-500 font-medium hover:text-orange-400 transition-colors">
                Contact us for more info <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-24 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Support Our Mission</h2>
              <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                As a 100% volunteer-driven 501(c)(3) non-profit, we rely on the generosity of our community to fund life-saving equipment, specialized training, and operational costs.
              </p>
              <p className="text-lg text-orange-200 mb-10">
                Your contribution directly supports our ability to respond quickly and effectively when someone is lost or injured in the Southern Oregon wilderness.
              </p>
              <a
                href="https://b89282c8-8269-4aad-b5fc-204442ef6154.paylinks.godaddy.com/7c0ae106-de66-42c1-8872-6f7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-orange-600 hover:bg-stone-100 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Donate Now <Heart className="fill-orange-600" size={20} />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=1740&auto=format&fit=crop" alt="Rescue Gear" className="rounded-2xl h-64 w-full object-cover shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1516655855035-d5215bcb5604?q=80&w=1740&auto=format&fit=crop" alt="Wilderness Navigation" className="rounded-2xl h-64 w-full object-cover shadow-lg mt-8" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">Get in Touch</h2>
            <div className="w-20 h-1 bg-orange-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mb-6">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-emerald-950 mb-2">Headquarters</h3>
              <p className="text-stone-600 text-lg">
                Station 7<br />
                620 Antelope Rd.<br />
                White City, OR 97503
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mb-6">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold text-emerald-950 mb-2">Email Us</h3>
              <p className="text-stone-600 text-lg">
                <a href="mailto:jcrvsarboard@gmail.com" className="hover:text-orange-600 transition-colors">
                  jcrvsarboard@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-stone-400 py-12 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white font-bold text-sm">
              R
            </div>
            <span className="font-bold text-white tracking-tight">RVSAR</span>
          </div>
          <p className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Rogue Valley Search and Rescue. A 501(c)(3) Non-Profit Organization.
          </p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-white transition-colors text-sm">About</a>
            <a href="#corsar" className="hover:text-white transition-colors text-sm">CORSAR</a>
            <a href="#join" className="hover:text-white transition-colors text-sm">Join</a>
            <a href="#donate" className="hover:text-white transition-colors text-sm">Donate</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
